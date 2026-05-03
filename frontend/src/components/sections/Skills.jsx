import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionTitle from '../ui/SectionTitle'
import { skillCategories } from '../../data/portfolioData'

function SkillBar({ name, level, delay = 0, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="space-y-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white-text">{name}</span>
        <span className="text-xs font-semibold text-red-main">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay: delay + 0.2, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  )
}

// Herramientas y metodologías utilizadas en el proyecto y en el flujo de trabajo
const EXTRA_TOOLS = [
  // Herramientas
  'React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'ESLint', 'Prettier',
  'VS Code', 'npm', 'Git', 'Notion', 'Postman', 'Yarn', 'Jest', 'React Testing Library', 'Chrome DevTools', 'Netlify', 'Vercel', 'GitHub', 'GitHub Actions',
  // Metodologías
  'Mobile First', 'Atomic Design', 'BEM', 'Component Driven Development',
  'Scrum', 'Kanban', 'Code Review', 'CI/CD', 'Documentación Técnica',
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const activeCategory = skillCategories.find((c) => c.id === activeTab)

  return (
    <section
      id="habilidades"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* BG accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(255,30,30,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Habilidades"
          title="Mi stack tecnológico"
          subtitle="Tecnologías y herramientas con las que construyo soluciones modernas y escalables"
          inView={inView}
        />

        <div className="mt-14 space-y-10">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {skillCategories.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === id
                    ? 'text-white'
                    : 'text-gray-text hover:text-white-text'
                  }`}
                style={
                  activeTab === id
                    ? {
                      background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                      boxShadow: '0 4px 15px rgba(255,30,30,0.35)',
                    }
                    : {
                      background: 'rgba(31,31,31,0.7)',
                      border: '1px solid rgba(42,42,42,0.8)',
                    }
                }
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* Skills grid with animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Main skills */}
              <div
                className="col-span-1 md:col-span-2 p-8 rounded-2xl space-y-5"
                style={{
                  background: 'rgba(18,18,18,0.8)',
                  border: '1px solid rgba(42,42,42,0.8)',
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {activeCategory?.skills.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={i * 0.07}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Other tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="p-8 rounded-2xl"
            style={{
              background: 'rgba(18,18,18,0.6)',
              border: '1px solid rgba(42,42,42,0.8)',
            }}
          >
            <h3 className="font-display font-semibold text-white-text mb-5 text-center">
              Herramientas & Metodologías
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {EXTRA_TOOLS.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="tech-badge cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Proficiency legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
            className="flex justify-center flex-wrap gap-6 text-xs text-gray-dim"
          >
            {[
              { range: '90-100%', label: 'Experto' },
              { range: '75-89%', label: 'Avanzado' },
              { range: '60-74%', label: 'Intermedio' },
              { range: '<60%', label: 'En aprendizaje' },
            ].map(({ range, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'linear-gradient(135deg, #ff1e1e, #cc0000)' }}
                />
                <span>{range} — {label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
