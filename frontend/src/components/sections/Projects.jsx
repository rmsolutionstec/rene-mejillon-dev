import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaExternalLinkAlt, FaGithub, FaTimes,
  FaCheckCircle, FaClock, FaCode,
} from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { projects } from '../../data/portfolioData'

function StatusBadge({ status }) {
  const config = {
    'Completado':    { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.3)' },
    'En desarrollo': { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.3)'  },
    'Próximamente':  { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.3)'  },
  }
  const c = config[status] || config['Completado']
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {status}
    </span>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: '#121212',
            border: '1px solid rgba(255,30,30,0.2)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-gray-text hover:text-white-text transition-colors"
            style={{ background: 'rgba(31,31,31,0.9)' }}
          >
            <FaTimes size={14} />
          </button>

          {/* Imagen del proyecto o placeholder */}
          <div
            className="w-full h-48 flex items-center justify-center bg-black/60 relative"
            style={{ background: 'linear-gradient(135deg, rgba(255,30,30,0.15), rgba(18,18,18,0.9))' }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={`Imagen de ${project.title}`}
                className="object-cover w-full h-full"
                style={{ maxHeight: '192px' }}
                loading="lazy"
              />
            ) : (
              <FaCode size={48} className="text-red-main opacity-40" />
            )}
          </div>

          <div className="p-8 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-xl text-white-text">
                  {project.title}
                </h3>
                <p className="text-red-main text-sm mt-1">{project.category} · {project.year}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>

            <p className="text-gray-text text-sm leading-relaxed">
              {project.description}
            </p>

            {/* Achievements */}
            {project.achievements?.length > 0 && (
              <div>
                <p className="text-white-text text-sm font-semibold mb-3 uppercase tracking-wider">
                  Logros clave
                </p>
                <ul className="space-y-2">
                  {project.achievements.map((a) => (
                    <li key={a} className="flex items-center gap-2.5 text-sm text-gray-text">
                      <FaCheckCircle size={13} className="text-red-main flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              {project.links.live && (
                <motion.a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary gap-2 text-sm"
                >
                  <FaExternalLinkAlt size={12} />
                  Ver en vivo
                </motion.a>
              )}
              {project.links.github && (
                <motion.a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-ghost gap-2 text-sm"
                >
                  <FaGithub size={14} />
                  Código
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section
      id="proyectos"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,30,30,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Proyectos"
          title="Trabajo destacado"
          subtitle="Soluciones reales para clientes reales — desde plataformas educativas hasta sistemas clínicos"
          inView={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              onClick={() => setSelected(project)}
              className="glass-card group cursor-pointer overflow-hidden relative"
            >
              {/* Top glow on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent, #ff1e1e, transparent)' }}
              />


              {/* Imagen del proyecto o placeholder */}
              <div
                className="h-44 flex items-center justify-center relative overflow-hidden bg-black/60"
                style={{ background: 'linear-gradient(135deg, rgba(255,30,30,0.1) 0%, rgba(18,18,18,0.9) 100%)' }}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`Imagen de ${project.title}`}
                    className="object-cover w-full h-full"
                    style={{ maxHeight: '176px' }}
                    loading="lazy"
                  />
                ) : (
                  <FaCode size={40} className="text-red-main opacity-30 group-hover:opacity-60 transition-opacity" />
                )}
                {project.status === 'En desarrollo' && (
                  <div className="absolute top-3 right-3">
                    <span className="flex items-center gap-1.5 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2.5 py-1 rounded-full">
                      <FaClock size={10} />
                      En desarrollo
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display font-bold text-lg text-white-text group-hover:text-red-main transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <StatusBadge status={project.status} />
                </div>

                <p className="text-gray-text text-sm leading-relaxed line-clamp-2">
                  {project.shortDesc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="tech-badge text-xs">{t}</span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="tech-badge text-xs">+{project.tech.length - 4}</span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'rgba(42,42,42,0.8)' }}>
                  <span className="text-gray-dim text-xs">{project.year}</span>
                  <div className="flex items-center gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-dim hover:text-red-main transition-colors"
                        title="Ver en vivo"
                      >
                        <FaExternalLinkAlt size={13} />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-dim hover:text-red-main transition-colors"
                        title="Código fuente"
                      >
                        <FaGithub size={14} />
                      </a>
                    )}
                    <span className="text-red-main text-xs font-medium group-hover:underline">
                      Ver más →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/rmsolutionstec"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary gap-2"
          >
            <FaGithub size={15} />
            Ver más en GitHub
          </motion.a>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
