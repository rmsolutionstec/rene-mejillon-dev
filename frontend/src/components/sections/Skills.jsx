import SectionTitle from '../ui/SectionTitle'
import { groupSkills } from '../../data/portfolioData'
import { usePortfolio } from '../../hooks/usePortfolio'
export default function Skills() {
  const { skills } = usePortfolio()
  return <section id="habilidades" className="section-padding bg-black-deep">
    <div className="section-container">
      <SectionTitle eyebrow="Habilidades" title="Experiencia y aprendizaje" subtitle="Distingo el trabajo práctico, la formación académica y las herramientas que continúo aprendiendo." inView />
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {groupSkills(skills).map(({ id, label, skills: items }) => <article className="glass-card p-6" key={id}>
          <h3 className="text-xl font-semibold text-white-text mb-5">{label}</h3>
          <ul className="space-y-3 text-gray-text">{items.map((skill) => <li key={skill.id || skill.name}>{skill.name}</li>)}</ul>
          {!items.length && <p className="text-gray-text">Sin habilidades publicadas en esta categoría.</p>}
        </article>)}
      </div>
    </div>
  </section>
}
