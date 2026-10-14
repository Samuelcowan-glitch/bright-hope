import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Mission from './pages/Mission.jsx'
import Gede from './pages/Gede.jsx'
import Sponsor from './pages/Sponsor.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Contact from './pages/Contact.jsx'
import ThankYou from './pages/ThankYou.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import NotFound from './pages/NotFound.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* The router takes its base from the build, so the same source works
        served at the root on the live domain and under /bright-hope/ on the
        github.io address it is checked on first. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/gede" element={<Gede />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* The old WordPress addresses, kept alive so existing links and
            anything already indexed still land somewhere useful. */}
        <Route path="/donate" element={<Navigate to="/sponsor" replace />} />
        <Route path="/316-2" element={<Navigate to="/blog" replace />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
