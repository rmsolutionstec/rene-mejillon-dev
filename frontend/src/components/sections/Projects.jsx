import { useState } from 'react'
import { FaCode, FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import Modal from '../ui/Modal'
import { projects } from '../../data/portfolioData'
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('Todos')
  const categories = ['Todos', ...new Set(projects.map((project) => project.category))]
  const visible = projects.filter((project) => category === 'Todos' || category === project.category)
  return <section id="proyectos" className="section-padding bg-black-secondary">
    <div className="section-container">
      <SectionTitle eyebrow="Proyectos" title="Trabajo y proyectos personales" subtitle="Academia Luz al Mundo y Fundación Clínica del Alma encabezan mi experiencia en desarrollo. También comparto proyectos complementarios y de aprendizaje." inView />
      <div className="flex flex-wrap gap-2 mt-10" aria-label="Filtrar proyectos">
        {categories.map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={category === name ? 'btn-primary text-sm' : 'btn-secondary text-sm'}>{name}</button>)}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {visible.map((project) => <article key={project.id} className="glass-card overflow-hidden flex flex-col">
          <div className="h-36 bg-red-main/5 flex items-center justify-center" aria-hidden="true"><FaCode size={38} className="text-red-main" /></div>
          <div className="p-6 flex flex-col flex-1 gap-4">
            <p className="text-sm text-gray-text">{project.status} · {project.period || project.year}</p>
            <h3 className="text-xl font-semibold text-white-text">{project.title}</h3>
            <p className="text-gray-text text-sm flex-1">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-2">{project.tech.slice(0, 4).map((tech) => <span key={tech} className="tech-badge">{tech}</span>)}</div>
            <button type="button" className="btn-secondary w-full" onClick={() => setSelected(project)} aria-label={'Ver detalles de ' + project.title}>Ver proyecto</button>
          </div>
        </article>)}
      </div>
      {!visible.length && <p className="text-gray-text mt-8" role="status">No hay proyectos publicados en esta categoría.</p>}
    </div>
    <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
      {selected && <div className="space-y-5">
        <p className="text-red-light">{selected.status} · {selected.period || selected.year}</p>
        <p className="text-gray-text">{selected.description}</p>
        {selected.participation && <p><strong>Mi participación: </strong>{selected.participation}</p>}
        <ul className="list-disc pl-5 space-y-2 text-gray-text">{selected.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="flex flex-wrap gap-2">{selected.tech.map((tech) => <span key={tech} className="tech-badge">{tech}</span>)}</div>
        <div className="flex flex-wrap gap-3">
          {selected.links.live && <a href={selected.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary"><FaExternalLinkAlt /> Sitio público</a>}
          {selected.links.github && <a href={selected.links.github} target="_blank" rel="noopener noreferrer" className="btn-secondary"><FaGithub /> Repositorio público</a>}
        </div>
      </div>}
    </Modal>
  </section>
}
