import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
import compress from 'astro-compress'
import tailwindcss from '@tailwindcss/vite'
import AstroPWA from '@vite-pwa/astro'

const SITE = 'https://allthingsflooringntile.com'

export default defineConfig({
  site: SITE,

  image: {
    domains: ['pub-f2cd6c5142ad4f2aacad0d8e2f818744.r2.dev'],
  },

  integrations: [
    preact(),
    sitemap(),
    icon({ include: { tabler: ['*'] } }),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'All Things Flooring & Tile',
        short_name: 'All Things',
        description:
          'Your local flooring experts in Eastman, GA. Visualize floors, get estimates, and more.',
        theme_color: '#1a2744',
        background_color: '#fdf8f0',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/pub-.*\.r2\.dev\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'r2-images',
              expiration: { maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
    compress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
