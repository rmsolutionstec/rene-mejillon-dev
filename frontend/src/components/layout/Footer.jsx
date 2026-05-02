import { motion } from 'framer-motion'
import {
  FaGithub, FaLinkedin, FaTwitter, FaWhatsapp,
  FaEnvelope, FaMapMarkerAlt, FaHeart,
} from 'react-icons/fa'
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

const SOCIAL = [
  { href: 'https://github.com/renemejillon',      Icon: FaGithub,   label: 'GitHub'   },
  { href: 'https://linkedin.com/in/renemejillon', Icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://wa.me/593990000000',           Icon: FaWhatsapp, label: 'WhatsApp' },
]

const TECH_STACK = ['Laravel', 'React', 'MySQL', 'Tailwind', 'Docker', 'Vercel']

export default function Footer() {
  const scrollTo = (href) => {
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,30,30,0.1)',
      }}
    >
      {/* Divider gradient */}
      <div className="divider-red" />

      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                  boxShadow: '0 0 20px rgba(255,30,30,0.35)',
                }}
              >
                RM
              </div>
              <div>
                <p className="font-display font-bold text-white-text text-lg leading-tight">
                  René Mejillón
                </p>
                <p className="text-gray-dim text-xs tracking-widest">FULL STACK DEV</p>
              </div>
            </div>
            <p className="text-gray-text text-sm leading-relaxed">
              Construyo soluciones digitales robustas y escalables. Especialista en
              Laravel, React y MySQL.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-text transition-all duration-200"
                  style={{
                    background: 'rgba(31,31,31,0.8)',
                    border: '1px solid rgba(42,42,42,0.8)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff1e1e'
                    e.currentTarget.style.borderColor = 'rgba(255,30,30,0.4)'
                    e.currentTarget.style.background = 'rgba(255,30,30,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ''
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.background = 'rgba(31,31,31,0.8)'
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-5">
            <h4 className="font-display font-semibold text-white-text text-sm tracking-widest uppercase">
              Navegación
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-gray-text text-sm hover:text-red-main transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-red-main opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-5">
            <h4 className="font-display font-semibold text-white-text text-sm tracking-widest uppercase">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'rgba(255,30,30,0.05)',
                border: '1px solid rgba(255,30,30,0.12)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400 font-medium">
                  Disponible para proyectos
                </span>
              </div>
              <p className="text-xs text-gray-text">
                Abierto a propuestas freelance
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="font-display font-semibold text-white-text text-sm tracking-widest uppercase">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-text text-sm">
                <FaEnvelope size={14} className="text-red-main flex-shrink-0" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="hover:text-red-main transition-colors"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-text text-sm">
                <FaWhatsapp size={14} className="text-red-main flex-shrink-0" />
                <a
                  href="https://wa.me/593990000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-main transition-colors"
                >
                  {personalInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-text text-sm">
                <FaMapMarkerAlt size={14} className="text-red-main flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </li>
            </ul>

            <motion.a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-xs px-5 py-2.5 w-full justify-center"
            >
              Descargar CV
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider-red my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-dim text-sm">
            © {new Date().getFullYear()} René Mejillón. Todos los derechos reservados.
          </p>
          <p className="text-gray-dim text-sm flex items-center gap-1.5">
            Hecho con{' '}
            <FaHeart className="text-red-main animate-pulse" size={13} />
            {' '}por René Mejillón
          </p>
        </div>
      </div>
    </footer>
  )
}
