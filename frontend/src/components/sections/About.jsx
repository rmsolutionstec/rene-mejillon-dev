import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUpLib from 'react-countup'
const CountUp = CountUpLib?.default ?? CountUpLib
import {
  FaCode, FaRocket, FaHeart, FaAward,
  FaGithub, FaLinkedin,
} from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo } from '../../data/portfolioData'

const HIGHLIGHTS = [
  { Icon: FaCode,   label: 'Código limpio',     desc: 'Buenas prácticas siempre'    },
  { Icon: FaRocket, label: 'Alto rendimiento',  desc: 'Optimizado desde el inicio'  },
  { Icon: FaHeart,  label: 'Pasión genuina',    desc: 'El código es mi arte'        },
  { Icon: FaAward,  label: 'Calidad garantizada',desc: '100% satisfacción cliente'  },
]

const VALUES = ['Clean Code', 'SOLID Principles', 'TDD', 'Agile/Scrum', 'Clean Architecture', 'REST API Design', 'Security First', 'Performance Optimization', 'Testing Coverage', 'Documentation', 'Version Control', 'Code Review', 'DevOps Practices', 'Scalability', 'User Experience', 'Problem Solving', 'Continuous Learning', 'Team Collaboration']

const STATS = [
  { value: 5,   suffix: '+', label: 'Años de experiencia'   },
  { value: 4,  suffix: '+', label: 'Proyectos completados' },
  { value: 25,  suffix: '+', label: 'Clientes satisfechos'  },
  { value: 100, suffix: '%', label: 'Tasa de éxito'         },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* Subtle bg */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 90% 50%, rgba(255,30,30,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Sobre mí"
          title="Quién soy"
          subtitle="Desarrollador Full Stack apasionado por crear experiencias digitales extraordinarias"
          inView={inView}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 items-start">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Avatar & Name */}
            <div className="flex items-center gap-5">
              <div
                className="relative w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-white flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                  boxShadow: '0 0 30px rgba(255,30,30,0.4)',
                }}
              >
                RM
                <span
                  className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2"
                  style={{ borderColor: '#0d0d0d' }}
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white-text">
                  {personalInfo.name}
                </h3>
                <p className="text-red-main text-sm font-medium">{personalInfo.title}</p>
                <p className="text-gray-dim text-xs mt-0.5">{personalInfo.location}</p>
              </div>
            </div>

            {/* Bio paragraphs */}
            <p className="text-gray-text leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="text-gray-text leading-relaxed">
              {personalInfo.bioLong}
            </p>

            {/* Values / methodology badges */}
            <div>
              <p className="text-white-text text-sm font-semibold mb-3 uppercase tracking-wider">
                Principios
              </p>
              <div className="flex flex-wrap gap-2">
                {VALUES.map((v) => (
                  <span key={v} className="tech-badge">{v}</span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary"
              >
                Descargar CV
              </motion.a>
              <motion.a
                href="https://github.com/rmsolutionstec"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost gap-2"
              >
                <FaGithub size={15} /> Ver GitHub
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT — Stats + Highlights */}
          <div className="space-y-8">

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {STATS.map(({ value, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass-card p-5 text-center"
                >
                  <div className="font-display font-black text-3xl text-red-main leading-none">
                    {inView && (
                      <CountUp end={value} duration={2.5} delay={0.5} suffix={suffix} />
                    )}
                  </div>
                  <div className="text-gray-text text-sm mt-2">{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlight cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {HIGHLIGHTS.map(({ Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="flex items-start gap-3 p-4 rounded-xl transition-all duration-300 group cursor-default"
                  style={{
                    background: 'rgba(24,24,24,0.7)',
                    border: '1px solid rgba(42,42,42,0.8)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,30,30,0.25)'
                    e.currentTarget.style.background  = 'rgba(255,30,30,0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(42,42,42,0.8)'
                    e.currentTarget.style.background  = 'rgba(24,24,24,0.7)'
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255,30,30,0.1)',
                      border: '1px solid rgba(255,30,30,0.2)',
                    }}
                  >
                    <Icon size={16} className="text-red-main" />
                  </div>
                  <div>
                    <p className="text-white-text text-sm font-semibold">{label}</p>
                    <p className="text-gray-dim text-xs mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
