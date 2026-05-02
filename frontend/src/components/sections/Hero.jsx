import { useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUpLib from 'react-countup'
const CountUp = CountUpLib?.default ?? CountUpLib
import { useInView } from 'react-intersection-observer'
import {
  FaGithub, FaLinkedin, FaWhatsapp,
  FaArrowDown, FaDownload, FaPaperPlane, FaEye,
} from 'react-icons/fa'
import { personalInfo } from '../../data/portfolioData'

const STATS = [
  { value: 5,   suffix: '+', label: 'Años de exp.' },
  { value: 30,  suffix: '+', label: 'Proyectos'    },
  { value: 25,  suffix: '+', label: 'Clientes'     },
  { value: 100, suffix: '%', label: 'Satisfacción' },
]

const SOCIALS = [
  { Icon: FaGithub,   href: 'https://github.com/renemejillon',      label: 'GitHub'   },
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/renemejillon', label: 'LinkedIn' },
  { Icon: FaWhatsapp, href: 'https://wa.me/593990000000',           label: 'WhatsApp' },
]

/* Floating geometric decorations */
function FloatingShape({ style, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={style}
      className="absolute pointer-events-none"
    />
  )
}

export default function Hero() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const scrollToProjects = () => {
    document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* ─── Background Layers ─── */}
      {/* Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Radial red glow left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 15% 50%, rgba(255,30,30,0.13) 0%, transparent 65%)',
        }}
      />
      {/* Radial subtle right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 85% 25%, rgba(255,30,30,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Floating decorative shapes */}
      <FloatingShape
        delay={0}
        style={{
          top: '15%', right: '12%',
          width: 180, height: 180,
          border: '1px solid rgba(255,30,30,0.12)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          background: 'rgba(255,30,30,0.03)',
        }}
      />
      <FloatingShape
        delay={1.5}
        style={{
          top: '60%', right: '5%',
          width: 90, height: 90,
          border: '1px solid rgba(255,30,30,0.1)',
          borderRadius: '50%',
          background: 'rgba(255,30,30,0.04)',
        }}
      />
      <FloatingShape
        delay={3}
        style={{
          bottom: '20%', left: '3%',
          width: 60, height: 60,
          border: '1px solid rgba(255,30,30,0.08)',
          borderRadius: '50%',
          background: 'rgba(255,30,30,0.03)',
        }}
      />

      {/* ─── Main Content ─── */}
      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* LEFT — Text Content */}
          <div className="space-y-7 order-2 lg:order-1">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'rgba(255,30,30,0.08)',
                border: '1px solid rgba(255,30,30,0.25)',
                color: '#ff6b6b',
              }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-main opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-main" />
              </span>
              Disponible para proyectos
            </motion.div>

            {/* Name */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                className="font-display font-black leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                <span className="text-white-text block">René</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(135deg, #ff1e1e 0%, #ff6b6b 50%, #cc0000 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: 'none',
                    filter: 'drop-shadow(0 0 20px rgba(255,30,30,0.4))',
                  }}
                >
                  Mejillón
                </span>
              </motion.h1>
            </div>

            {/* Type animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg sm:text-xl font-medium text-gray-text h-8"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',   2000,
                  'Laravel Expert',         2000,
                  'React Specialist',       2000,
                  'API Architect',          2000,
                  'Tech Solutions Builder', 2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: '#ff1e1e' }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-gray-text text-base leading-relaxed max-w-lg"
            >
              Construyo soluciones digitales robustas y escalables.
              Especialista en{' '}
              <span className="text-white-text font-medium">Laravel</span>,{' '}
              <span className="text-white-text font-medium">React</span> y{' '}
              <span className="text-white-text font-medium">MySQL</span> —
              enfocado en rendimiento, seguridad y experiencias de usuario
              excepcionales.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToProjects}
                className="btn-primary gap-2"
              >
                <FaEye size={14} />
                Ver Proyectos
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToContact}
                className="btn-secondary gap-2"
              >
                <FaPaperPlane size={14} />
                Contactarme
              </motion.button>

              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost gap-2"
              >
                <FaDownload size={13} />
                Descargar CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 pt-2"
            >
              <span className="text-gray-dim text-xs tracking-widest uppercase">Sígueme</span>
              <div className="h-px flex-1 max-w-[40px]" style={{ background: 'rgba(255,30,30,0.3)' }} />
              <div className="flex gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-text hover:text-red-main transition-all duration-200"
                    style={{
                      background: 'rgba(31,31,31,0.8)',
                      border: '1px solid rgba(42,42,42,0.8)',
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Main card */}
            <div
              className="relative w-full max-w-md rounded-3xl overflow-hidden p-1"
              style={{
                background: 'linear-gradient(135deg, rgba(255,30,30,0.3), rgba(255,30,30,0.05), rgba(255,30,30,0.2))',
              }}
            >
              <div
                className="rounded-[22px] p-8"
                style={{
                  background: 'rgba(18,18,18,0.95)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-main" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-gray-dim text-xs font-mono">
                    rene@portfolio:~$
                  </span>
                </div>

                {/* Code snippet */}
                <div className="font-mono text-sm space-y-1.5">
                  <div>
                    <span className="text-purple-400">const </span>
                    <span className="text-blue-400">developer</span>
                    <span className="text-white-text"> = {'{'}</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-green-400">name</span>
                    <span className="text-white-text">: </span>
                    <span className="text-yellow-400">'René Mejillón'</span>
                    <span className="text-white-text">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-green-400">role</span>
                    <span className="text-white-text">: </span>
                    <span className="text-yellow-400">'Full Stack Dev'</span>
                    <span className="text-white-text">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-green-400">stack</span>
                    <span className="text-white-text">: [</span>
                    <span className="text-red-light">'Laravel'</span>
                    <span className="text-white-text">, </span>
                    <span className="text-red-light">'React'</span>
                    <span className="text-white-text">, </span>
                    <span className="text-red-light">'MySQL'</span>
                    <span className="text-white-text">],</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-green-400">available</span>
                    <span className="text-white-text">: </span>
                    <span className="text-orange-400">true</span>
                    <span className="text-white-text">,</span>
                  </div>
                  <div className="pl-5">
                    <span className="text-green-400">passion</span>
                    <span className="text-white-text">: </span>
                    <span className="text-yellow-400">'Building solutions'</span>
                  </div>
                  <div><span className="text-white-text">{'}'}</span></div>
                  <div className="pt-2 flex items-center gap-1">
                    <span className="text-gray-dim">$</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-red-main rounded-sm ml-1"
                    />
                  </div>
                </div>

                {/* Stats mini grid */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {STATS.map(({ value, suffix, label }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="text-center p-3 rounded-xl"
                      style={{
                        background: 'rgba(255,30,30,0.05)',
                        border: '1px solid rgba(255,30,30,0.12)',
                      }}
                    >
                      <div className="font-display font-black text-xl text-red-main leading-none">
                        {inView && (
                          <CountUp end={value} duration={2.5} delay={0.8} suffix={suffix} />
                        )}
                      </div>
                      <div className="text-gray-dim text-[11px] mt-1">{label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating red glow behind card */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-20"
              style={{
                background: 'radial-gradient(ellipse at center, #ff1e1e 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.querySelector('#sobre-mi')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-gray-dim text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-red-main"
          >
            <FaArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
