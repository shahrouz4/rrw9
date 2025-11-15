import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)


  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ]

  const galleryImages = Array.from({ length: 7 }, (_, i) => `/gallery/${i + 1}.jpeg`)
  const totalImages = galleryImages.length

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % totalImages)
  }


  return (
    <div className="min-h-screen font-sans">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <img loading="lazy" src="/logo.png" alt="Reimagine Renovations Logo" className="w-96 h-96 object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: showSplash ? 2 : 0 }}
      >
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setLightboxOpen(false) }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <div className="flex items-center gap-4 max-w-4xl w-full justify-center">
              <button
                type="button"
                className="text-white text-3xl px-2"
                onClick={(e) => { e.stopPropagation(); handlePrevImage() }}
              >
                &#8249;
              </button>
              <img loading="lazy" src={galleryImages[lightboxIndex]}
                alt="Project photo"
                className="max-h-[80vh] max-w-full rounded shadow-lg"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                className="text-white text-3xl px-2"
                onClick={(e) => { e.stopPropagation(); handleNextImage() }}
              >
                &#8250;
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <img loading="lazy" src="/logo.png" alt="Reimagine Renovations Logo" className="w-96 h-96 object-contain" />
              <div>
                <div className="text-lg font-semibold text-[var(--accent)]">Reimagine Renovations LLC</div>
                <div className="text-xs text-gray-700">Licensed & Insured • Northern Virginia</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(n => (
                <a key={n.id} href={`#${n.id}`} className="header-link hover:text-[var(--accent)]">{n.label}</a>
              ))}
            </nav>

            <button className="md:hidden p-2" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden bg-white/95 shadow-inner border-t">
              <div className="flex flex-col px-4 pb-4 pt-2 gap-2">
                {navItems.map(n => (
                  <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="py-2 border-b">{n.label}</a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" style={{backgroundImage: "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f')", backgroundSize: "cover", backgroundPosition: "center"}} className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80')", filter: 'brightness(0.98)'}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold text-[var(--accent)] leading-tight">Your Home, Reimagined to Perfection</motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mt-4 text-lg md:text-xl text-white max-w-xl">Experience the next level of home renovation — where every detail is planned, perfected, and built to last.</motion.p>
            <motion.a initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}} href="#contact" className="inline-block mt-6 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-orange-700">Get a Free Quote</motion.a>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 bg-transparent text-center pt-24">
          <h2 className="text-3xl font-bold text-[var(--accent)] mb-8">Our Services</h2>
          <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {['Bathroom Remodeling','Flooring','Paint','Roofing','Landscape','Basement Finishing','Room Additions','Custom Decks & Patios','Whole-Home Remodeling'].map((s) => (
              <div key={s} className="p-6 border border-orange-200 rounded-lg bg-white text-black font-medium hover:bg-[var(--accent)] hover:text-white transition">
                {s}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold text-[var(--accent)] mb-6">Gallery</h2>
          <div className="max-w-5xl mx-auto grid gap-4 grid-cols-2 md:grid-cols-3 px-4">
            {galleryImages.map((src, index) => (
              <button
                key={index}
                type="button"
                className="relative group h-40 overflow-hidden rounded-lg focus:outline-none"
                onClick={() => { setLightboxIndex(index); setLightboxOpen(true) }}
              >
                <img loading="lazy" src={src}
                  alt="Home remodeling project in Northern Virginia"
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 bg-transparent text-center">
          <h2 className="text-3xl font-bold text-[var(--accent)] mb-6">Contact Us</h2>
          <form action="https://formspree.io/f/xblzooko" method="POST" className="max-w-lg mx-auto space-y-4 text-left">
            <input type="text" name="name" placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded" />
            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded" />
            <textarea name="message" placeholder="Your Message" required className="w-full p-3 border border-gray-300 rounded" rows="5"></textarea>
            <div className="flex items-center gap-4">
              <button type="submit" className="px-6 py-3 bg-[var(--accent)] text-white rounded font-semibold hover:bg-orange-700">Send Message</button>
              <div className="text-sm text-black">Or call: <a href="tel:+17033008414" className="text-[var(--accent)]"> (703) 300-8414</a></div>
            </div>
          </form>

          <div className="mt-8 space-y-1 text-black">
            <p>✉️ <a href="mailto:info@reimagine-reno.com" className="text-[var(--accent)]">info@reimagine-reno.com</a></p>
            <p>📸 <a href="https://instagram.com/reimagine.reno" target="_blank" rel="noreferrer" className="text-[var(--accent)]">@reimagine.reno</a></p>
          </div>
        </section>

        <footer className="py-8 text-center bg-white border-t">
          <p className="text-sm">&copy; {new Date().getFullYear()} Reimagine Renovations. All rights reserved.</p>
        </footer>
      </motion.div>
    </div>
  )
}
