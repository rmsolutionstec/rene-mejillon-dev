import catalog from './catalog.json'
export const personalInfo = catalog.personalInfo
export const education = catalog.education
export const experience = catalog.experience
export const experienceLabels = { practice: 'Experiencia práctica', academic: 'Experiencia académica', learning: 'Aprendizaje aplicado' }
export const skills = catalog.skills.map((skill, index) => ({ id: index + 1, ...skill }))
export const groupSkills = (items) => Object.entries(experienceLabels).map(([id, label]) => ({
  id, label, skills: items.filter((skill) => skill.experience === id),
}))
export const skillCategories = groupSkills(skills)
export const toProject = (project) => ({
  ...project, shortDesc: project.short_desc, image: project.image || null,
  tech: Array.isArray(project.tech) ? project.tech : [], achievements: Array.isArray(project.achievements) ? project.achievements : [],
  links: { live: project.live_url || null, github: project.github_url || null },
})
export const projects = catalog.projects.map((project) => toProject({ id: project.catalog_key, ...project }))
export const services = catalog.services.map((service) => ({ id: service.catalog_key, ...service }))
// Publish testimonials only after their text and authorization are evidenced.
export const testimonials = []
