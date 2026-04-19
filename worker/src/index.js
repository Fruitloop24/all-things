/**
 * Room Studio Worker
 * One endpoint: POST /generate
 * - Origin allowlist (browser requests only from the marketing site)
 * - Rate limited: 10 requests / 60s / IP (Cloudflare ratelimit binding)
 * - Takes room photo + flooring sample
 * - Uploads both to R2 all-thing/uploads/
 * - Scans room + flooring with Gemini → JSON analysis
 * - Sends both photos + both JSONs to Gemini → edits the room photo with new floor
 * - Saves analyses + edited image to R2 all-thing/downloads/
 * - Falls back to ChatGPT/OpenAI if Gemini slips
 */

const ALLOWED_ORIGINS = new Set([
  'https://allthingsflooringntile.com',
  'https://www.allthingsflooringntile.com',
  'https://all-things.pages.dev',
  'http://localhost:4321',
  'http://localhost:4322',
  'http://localhost:4323',
]);

// CF Pages preview deploys: <hash>.all-things.pages.dev
const ALLOWED_ORIGIN_SUFFIXES = ['.all-things.pages.dev'];

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    const { hostname, protocol } = new URL(origin);
    if (protocol !== 'https:' && protocol !== 'http:') return false;
    return ALLOWED_ORIGIN_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
  } catch {
    return false;
  }
}

function corsHeadersFor(origin) {
  const allowed = isAllowedOrigin(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'null',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function jsonResponse(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeadersFor(origin) },
  });
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const url = new URL(request.url);
    const path = url.pathname;

    // Preflight
    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin(origin)) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, { status: 204, headers: corsHeadersFor(origin) });
    }

    // Health check — no origin check, no rate limit
    if (path === '/health') {
      return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, 200, origin);
    }

    // Enforce origin allowlist for all other routes
    if (!isAllowedOrigin(origin)) {
      return jsonResponse({ error: 'Forbidden origin' }, 403, origin);
    }

    // Rate limit by client IP (bound to this edge location)
    if (env.RATE_LIMITER) {
      const ip = request.headers.get('cf-connecting-ip') ?? 'anonymous';
      try {
        const { success } = await env.RATE_LIMITER.limit({ key: ip });
        if (!success) {
          return jsonResponse({ error: 'Too many requests. Please slow down.' }, 429, origin);
        }
      } catch (err) {
        console.error('Rate limiter error (allowing request):', err.message);
      }
    }

    try {
      if (path === '/generate' && request.method === 'POST') {
        return handleGenerate(request, env, origin);
      }

      return jsonResponse({ error: 'Not found' }, 404, origin);
    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({ error: 'Internal server error', detail: err.message }, 500, origin);
    }
  },
};

/**
 * THE ONE CALL — user hits generate, we do everything
 */
async function handleGenerate(request, env, origin) {
  const formData = await request.formData();
  const roomFile = formData.get('roomImage');
  const flooringFile = formData.get('flooringImage');
  const flooringDesc = formData.get('flooringDescription');

  if (!roomFile) {
    return jsonResponse({ error: 'roomImage is required' }, 400, origin);
  }
  if (!flooringFile && !flooringDesc) {
    return jsonResponse({ error: 'Need flooringImage or flooringDescription' }, 400, origin);
  }

  const id = generateId();
  const roomBytes = await roomFile.arrayBuffer();
  const roomBase64 = arrayBufferToBase64(roomBytes);
  const roomMime = roomFile.type || 'image/jpeg';

  const hasImage = flooringFile && flooringFile.size > 0;
  let flooringBytes, flooringBase64, flooringMime;
  if (hasImage) {
    flooringBytes = await flooringFile.arrayBuffer();
    flooringBase64 = arrayBufferToBase64(flooringBytes);
    flooringMime = flooringFile.type || 'image/jpeg';
  }

  const roomKey = `all-thing/uploads/room-${id}.jpg`;
  const r2Ops = [
    env.R2.put(roomKey, roomBytes, {
      httpMetadata: { contentType: roomMime },
      customMetadata: { type: 'room', uploadedAt: new Date().toISOString() },
    }),
  ];
  if (hasImage) {
    r2Ops.push(env.R2.put(`all-thing/uploads/flooring-${id}.jpg`, flooringBytes, {
      httpMetadata: { contentType: flooringMime },
      customMetadata: { type: 'flooring', uploadedAt: new Date().toISOString() },
    }));
  }
  await Promise.all(r2Ops);

  let roomAnalysis;
  let scanProvider = 'gemini';
  try {
    roomAnalysis = await analyzeWithGemini(env, roomBase64, roomMime, 'room');
  } catch {
    scanProvider = 'chatgpt';
    try { roomAnalysis = await analyzeWithChatGPT(env, roomBase64, roomMime, 'room'); }
    catch (e2) { return jsonResponse({ error: 'Room scan failed', detail: e2.message }, 502, origin); }
  }

  let flooringAnalysis;
  if (hasImage) {
    try { flooringAnalysis = await analyzeWithGemini(env, flooringBase64, flooringMime, 'flooring'); }
    catch {
      try { flooringAnalysis = await analyzeWithChatGPT(env, flooringBase64, flooringMime, 'flooring'); }
      catch (e2) { return jsonResponse({ error: 'Flooring scan failed', detail: e2.message }, 502, origin); }
    }
  }

  await env.R2.put(`all-thing/downloads/room-analysis-${id}.json`, JSON.stringify(roomAnalysis, null, 2), {
    httpMetadata: { contentType: 'application/json' },
  });

  const flooringContext = hasImage
    ? `Here is the analysis of the flooring sample (IMAGE 2):\n${JSON.stringify(flooringAnalysis, null, 2)}`
    : `The customer selected this flooring:\n${flooringDesc}`;

  const imageNote = hasImage
    ? 'I am giving you TWO images. IMAGE 1 is the room. IMAGE 2 is the flooring sample to install.'
    : 'I am giving you ONE image of a room. Install the flooring described below.';

  const editPrompt = `You are a photorealistic interior design photo editor.

${imageNote}

Room analysis:
${JSON.stringify(roomAnalysis, null, 2)}

${flooringContext}

EDIT the room photo — replace ONLY the floor with the new flooring:
- Match the flooring color, pattern, texture, and grain exactly
- Maintain the EXACT room perspective, vanishing points, camera angle
- Correct perspective distortion — planks/tiles converge to vanishing points
- Seamless blend at walls, baseboards, furniture legs
- Preserve all furniture, walls, trim, decor EXACTLY
- Must look PROFESSIONALLY INSTALLED, not pasted

LIGHTING — present in the best light:
- Gently lift brightness — clean and airy, not blown out
- Slightly warmer color temperature — golden hour feel
- Soft shadows, warm floor reflections
- "Sunday morning with curtains open" — bright, warm, aspirational
- NOT filtered or fake — real photo on a beautiful day

Do NOT change anything except the floor. Return the edited photo.`;

  let imageData = null;
  let imageMime = null;
  let designNotes = null;
  let editProvider = 'gemini';

  try {
    const parts = [
      { text: editPrompt },
      { inline_data: { mime_type: roomMime, data: roomBase64 } },
    ];
    if (hasImage) {
      parts.push({ inline_data: { mime_type: flooringMime, data: flooringBase64 } });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${env.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            responseModalities: ['TEXT', 'IMAGE'],
            temperature: 0.3,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API ${response.status}: ${errText}`);
    }

    const result = await response.json();
    const resParts = result.candidates?.[0]?.content?.parts;
    if (!resParts || resParts.length === 0) throw new Error('No parts in Gemini response');

    for (const part of resParts) {
      const imgPart = part.inline_data || part.inlineData;
      if (imgPart) {
        imageData = imgPart.data;
        imageMime = imgPart.mime_type || imgPart.mimeType || 'image/png';
      }
      if (part.text) {
        designNotes = part.text;
      }
    }

    if (!imageData) throw new Error('Gemini returned no image');

  } catch (geminiErr) {
    console.error('Gemini image edit failed:', geminiErr.message);

    if (!env.OPENAI_KEY) {
      return jsonResponse({ error: 'Image edit failed', detail: geminiErr.message }, 502, origin);
    }

    editProvider = 'chatgpt';
    try {
      const oaiForm = new FormData();
      oaiForm.append('model', 'gpt-image-1');
      oaiForm.append('image[]', new Blob([roomBytes], { type: roomMime }), 'room.jpg');
      if (hasImage) {
        oaiForm.append('image[]', new Blob([flooringBytes], { type: flooringMime }), 'flooring.jpg');
      }
      oaiForm.append('prompt', editPrompt);
      oaiForm.append('size', '1024x1024');

      const oaiResponse = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.OPENAI_KEY}` },
        body: oaiForm,
      });

      if (!oaiResponse.ok) throw new Error(`OpenAI ${oaiResponse.status}`);
      const oaiResult = await oaiResponse.json();
      imageData = oaiResult.data?.[0]?.b64_json;
      if (!imageData) throw new Error('OpenAI returned no image');
      imageMime = 'image/png';
    } catch (oaiErr) {
      return jsonResponse({ error: 'All providers failed', detail: oaiErr.message }, 502, origin);
    }
  }

  const ext = imageMime.includes('png') ? 'png' : 'jpg';
  const imageKey = `all-thing/downloads/edited-room-${id}.${ext}`;
  await env.R2.put(imageKey, base64ToArrayBuffer(imageData), {
    httpMetadata: { contentType: imageMime },
    customMetadata: { editProvider, scanProvider, editedAt: new Date().toISOString() },
  });

  return jsonResponse({
    success: true,
    id,
    designNotes,
    imageMime,
    imageBase64: imageData,
  }, 200, origin);
}

// ── Gemini Vision Analysis ──

async function analyzeWithGemini(env, base64, mimeType, type) {
  const prompt = type === 'room'
    ? `You are an expert interior designer and flooring specialist. Analyze this room photo and return a detailed JSON object with these fields:
{
  "room_type": "living room / bedroom / kitchen / bathroom / etc",
  "dimensions_estimate": "estimated room size",
  "current_flooring": "description of current flooring if visible",
  "lighting": {
    "type": "natural / artificial / mixed",
    "direction": "where light is coming from",
    "intensity": "bright / moderate / dim",
    "color_temperature": "warm / neutral / cool"
  },
  "perspective": {
    "angle": "eye level / above / below",
    "vanishing_point": "description of perspective lines",
    "floor_visible_percentage": "estimated % of floor visible"
  },
  "color_palette": {
    "walls": "dominant wall color",
    "trim": "trim/molding color",
    "furniture": ["main furniture colors"],
    "overall_tone": "warm / cool / neutral"
  },
  "style": "modern / traditional / farmhouse / industrial / etc",
  "recommendations": "brief note on what flooring styles would complement this room"
}
Return ONLY valid JSON, no markdown or extra text.`
    : `You are an expert flooring analyst. Analyze this flooring sample photo and return a detailed JSON object with these fields:
{
  "flooring_type": "hardwood / vinyl / tile / carpet / laminate / etc",
  "material": "specific material description",
  "color": {
    "primary": "main color",
    "secondary": "accent or grain color",
    "hex_estimate": "#hex color code",
    "tone": "warm / cool / neutral"
  },
  "pattern": {
    "type": "plank / herringbone / tile grid / random / etc",
    "direction": "horizontal / vertical / diagonal",
    "repeat_size": "estimated pattern repeat"
  },
  "texture": "smooth / textured / hand-scraped / matte / glossy",
  "grain": "description of wood grain or surface pattern if applicable",
  "condition": "new / good / worn / damaged",
  "style_match": "what room styles this flooring suits best",
  "warmth_rating": "1-10 scale of visual warmth"
}
Return ONLY valid JSON, no markdown or extra text.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inline_data: { mime_type: mimeType, data: base64 } },
          ],
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2048,
        },
      }),
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API ${response.status}: ${errText}`);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No response from Gemini');

  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

// ── ChatGPT Vision Fallback ──

async function analyzeWithChatGPT(env, base64, mimeType, type) {
  if (!env.OPENAI_KEY) throw new Error('No OPENAI_KEY configured');

  const prompt = type === 'room'
    ? 'Analyze this room photo as an interior design expert. Return JSON with: room_type, dimensions_estimate, current_flooring, lighting (type, direction, intensity, color_temperature), perspective (angle, vanishing_point, floor_visible_percentage), color_palette (walls, trim, furniture, overall_tone), style, recommendations. Return ONLY valid JSON.'
    : 'Analyze this flooring sample as a flooring expert. Return JSON with: flooring_type, material, color (primary, secondary, hex_estimate, tone), pattern (type, direction, repeat_size), texture, grain, condition, style_match, warmth_rating. Return ONLY valid JSON.';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
        ],
      }],
      max_tokens: 2048,
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API ${response.status}: ${errText}`);
  }

  const result = await response.json();
  const text = result.choices?.[0]?.message?.content;
  if (!text) throw new Error('No response from ChatGPT');

  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
}

// ── Helpers ──

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
