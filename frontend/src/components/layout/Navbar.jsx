import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'

const NAV_LINKS = [
  { href: '#inicio',      label: 'Inicio'      },
  { href: '#sobre-mi',    label: 'Sobre mí'    },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos',   label: 'Proyectos'   },
  { href: '#servicios',   label: 'Servicios'   },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto',    label: 'Contacto'    },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const observerRef = useRef(null)

  /* Scroll: change navbar bg */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Intersection Observer: highlight active nav link */
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observerRef.current.observe(s))
    return () => observerRef.current?.disconnect()
  }, [])

  /* Close menu on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,30,30,0.12)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo('#inicio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-black text-lg text-white transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                  boxShadow: '0 0 15px rgba(255,30,30,0.35)',
                }}
              >
                RM
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-bold text-white-text text-lg leading-none block">
                  René{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ff1e1e, #ff6b6b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Mejillón
                  </span>
                </span>
                <span className="text-gray-dim text-xs tracking-widest">
                  FULL STACK DEV
                </span>
              </div>
            </motion.button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const sectionId = href.replace('#', '')
                const isActive  = activeSection === sectionId
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive
                        ? 'text-red-main bg-red-main/5'
                        : 'text-gray-text hover:text-white-text hover:bg-white/5'
                      }`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-red-main"
                        style={{ boxShadow: '0 0 6px rgba(255,30,30,0.6)' }}
                      />
                    )}
                  </button>
                )
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex btn-primary text-xs px-5 py-2.5"
              >
                Descargar CV
              </motion.a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-text hover:text-white-text transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTimes size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBars size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-18 left-4 right-4 z-40 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(18,18,18,0.97)',
              border: '1px solid rgba(255,30,30,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(href)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200
                    ${activeSection === href.replace('#', '')
                      ? 'text-red-main bg-red-main/10'
                      : 'text-gray-text hover:text-white-text hover:bg-white/5'
                    }`}
                >
                  {label}
                </motion.button>
              ))}

              <div className="divider-red my-2" />

              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                Descargar CV
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
