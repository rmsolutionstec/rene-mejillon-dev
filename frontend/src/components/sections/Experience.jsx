import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { experience } from '../../data/portfolioData'

export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section
      id="experiencia"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 80% 50%, rgba(255,30,30,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Experiencia"
          title="Trayectoria profesional"
          subtitle="Mi recorrido como desarrollador, construyendo soluciones reales que impactan negocios y vidas"
          inView={inView}
        />

        {/* Timeline */}
        <div className="mt-14 relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5"
            style={{
              background: 'linear-gradient(180deg, #ff1e1e, rgba(255,30,30,0.3), transparent)',
            }}
          />

          <div className="space-y-10">
            {experience.map((exp, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row items-start gap-6 md:gap-10`}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[10px] md:left-1/2 md:-translate-x-1/2 top-5 w-5 h-5 rounded-full z-10 flex items-center justify-center
                      ${exp.current ? 'animate-pulse-red' : ''}`}
                    style={{
                      background: exp.current
                        ? 'linear-gradient(135deg, #ff1e1e, #cc0000)'
                        : '#1f1f1f',
                      border: '2px solid #ff1e1e',
                      boxShadow: exp.current ? '0 0 15px rgba(255,30,30,0.5)' : 'none',
                    }}
                  >
                    {exp.current && (
                      <span className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>

                  {/* Spacer for desktop centering */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 w-full md:w-[calc(50%-2rem)] p-6 rounded-2xl space-y-4 transition-all duration-300 group`}
                    style={{
                      background: 'rgba(18,18,18,0.9)',
                      border: exp.current
                        ? '1px solid rgba(255,30,30,0.25)'
                        : '1px solid rgba(42,42,42,0.8)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,30,30,0.3)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = exp.current
                        ? 'rgba(255,30,30,0.25)'
                        : 'rgba(42,42,42,0.8)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display font-bold text-lg text-white-text">
                          {exp.role}
                        </h3>
                        <p className="text-red-main font-medium text-sm">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-semibold text-green-400 flex-shrink-0"
                          style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}
                        >
                          Actual
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-dim">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt size={11} className="text-red-main" />
                        {exp.period} · {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt size={11} className="text-red-main" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaBriefcase size={11} className="text-red-main" />
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-text text-sm leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-1.5">
                      {exp.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-gray-text">
                          <FaCheckCircle size={12} className="text-red-main mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.tech.map((t) => (
                        <span key={t} className="tech-badge text-xs">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
