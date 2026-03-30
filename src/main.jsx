import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Studio from './pages/Studio'
import About from './pages/About'
import Community from './pages/Community'
import Resources from './pages/Resources'
import Newsletter from './pages/Newsletter'
import Partners from './pages/Partners'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/partners" element={<Partners />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
