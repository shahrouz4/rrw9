// Reimagine Renovations - Build v1.4 - Updated Hero + Contact Fix - 2025-11-15
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
  { id: 'about', label: 'About Us' },
  { id: 'service-areas', label: 'Service Areas' },
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
            className="fixed inset-0 flex items-center justify-center bg-transparent"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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
              <img loading="lazy" src="/logo.png" alt="Reimagine Renovations Logo" className="w-12 h-12 object-contain" />
              <div>
                <div className="text-lg font-semibold text-[var(--accent)]">Reimagine Renovations LLC</div>
                <div className="text-xs text-gray-700">Licensed & Insured &nbsp;&nbsp;&nbsp;• &nbsp;&nbsp;&nbsp;Northern Virginia</div>
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
        <section id="home" style={{backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center"}} className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/60"></div>
          <div className="relative z-10 text-center px-6 max-w-3xl">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-extrabold text-[var(--accent)] leading-tight italic text-center">Your Home, Reimagined to Perfection</motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mt-4 text-lg md:text-xl text-black max-w-xl text-center mx-auto">Experience the next level of home renovation — where every detail is planned, perfected, and built to last.</motion.p>
            <motion.a initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}} href="#contact" className="inline-block mt-6 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-orange-700">Get a Free Quote</motion.a>
          </div>
        </section>
{/* About Us */}
<section id="about" className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-6 md:px-8">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-[var(--accent)] text-center mb-10"
    >
      About Us
    </motion.h2>

    <div className="space-y-8">

      {/* Who We Are */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold text-black mb-3">Who We Are</h3>
        <p className="text-gray-700 leading-relaxed">
          Reimagine Renovations LLC was founded on a simple belief: improving your home 
          should be exciting, transparent, and stress-free. As a Class A licensed and fully 
          insured contractor in Virginia and with over 20 years of experience in different 
          aspects of the industry, we bring a personal and reliable approach to every project. 
          We treat your home as if it were our own and take pride in delivering upgrades that 
          feel meaningful, lasting, and tailored to your lifestyle.
        </p>
      </motion.div>

      {/* How We Work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h3 className="text-xl font-semibold text-black mb-3">How We Work</h3>
        <p className="text-gray-700 leading-relaxed">
          Our process is design-driven, detail-oriented, and tailored to your lifestyle. 
          We take time to understand your needs, aesthetic preferences, and expectations, 
          then execute with precision from concept to completion. Clean lines, thoughtful 
          layouts, and reliable construction define our work. When you want a renovation 
          that feels elevated, intentional, and built to last — we deliver.
        </p>
      </motion.div>

    </div>
  </div>
</section>

{/* Service Areas */}
<section id="service-areas" className="py-16 bg-gray-50">
  <div className="max-w-5xl mx-auto px-6 md:px-8">

    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-[var(--accent)] text-center mb-10"
    >
      Service Areas
    </motion.h2>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="text-gray-700 text-left max-w-5xl mx-auto mb-10 leading-relaxed"
    >
      Reimagine Renovations LLC proudly serves homeowners throughout all of Northern Virginia. 
      As a Class A licensed and fully insured contractor with over 20 years of experience, 
      we provide high-quality kitchen, bathroom, basement, and full-home renovation services 
      across Fairfax County, Loudoun County, Prince William County, Arlington, Alexandria, 
      Culpeper County, and surrounding areas.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h3 className="text-xl font-semibold text-black mb-4 text-center">Counties We Serve</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800 text-center">
        <div>Arlington County</div>
        <div>Culpeper County</div>
        <div>Fairfax County</div>
        <div>Fauquier County</div>
        <div>Loudoun County</div>
        <div>Prince William County</div>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className=""
    >
      <h3 className="text-xl font-semibold text-black mb-4 text-center">Cities & Communities</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-800 text-center">
        <div>Alexandria</div>
        <div>Annandale</div>
        <div>Ashburn</div>
        <div>Bristow</div>
        <div>Burke</div>
        <div>Centreville</div>
        <div>Chantilly</div>
        <div>Culpeper</div>
        <div>Dumfries</div>
        <div>Fairfax</div>
        <div>Gainesville</div>
        <div>Great Falls</div>
        <div>Haymarket</div>
        <div>Herndon</div>
        <div>Leesburg</div>
        <div>Lorton</div>
        <div>Manassas</div>
        <div>Manassas Park</div>
        <div>McLean</div>
        <div>Occoquan</div>
        <div>Reston</div>
        <div>Springfield</div>
        <div>Sterling</div>
        <div>Tysons</div>
        <div>Vienna</div>
        <div>Warrenton</div>
        <div>Woodbridge</div>
      </div>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      viewport={{ once: true }}
      className="text-gray-700 text-left max-w-5xl mx-auto mt-10 leading-relaxed"
    >
      If your area isn’t listed, there’s a very good chance we still serve it. 
      Contact us today for more information or to request a free quote.
    </motion.p>

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
        

<section id="contact" className="py-16 bg-[#fdfaf5] text-center">
  <h2 className="text-3xl font-bold text-[var(--accent)] mb-8">Contact Us</h2>

  <form action="https://formspree.io/f/xblzooko" method="POST" className="max-w-lg mx-auto space-y-4">
    <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded" required />
    <input type="email" name="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded" required />
    <textarea name="message" placeholder="Message" className="w-full p-3 border border-gray-300 rounded h-32" required></textarea>

    <button type="submit" className="bg-[var(--accent)] text-white py-3 px-8 rounded font-medium hover:bg-black transition mx-auto block">
      Send Message
    </button>
  </form>

  <div className="mt-8 space-y-1 text-black">
    <p>📞 <a href="tel:7033008414" className="text-[var(--accent)]">(703) 300-8414</a></p>
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
