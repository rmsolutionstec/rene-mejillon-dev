import { FaEnvelope, FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo, contactLinks } from '../../data/portfolioData'
export default function Contact() {
  return <section id="contacto" className="section-padding bg-black-secondary">
    <div className="section-container">
      <SectionTitle eyebrow="Contacto" title="Hablemos de tu proyecto" subtitle="Desarrollo web, mantenimiento y servicios TI. Cuéntame qué necesitas y podremos definir el alcance." inView />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <article className="glass-card p-6 sm:p-8 space-y-5">
          <FaEnvelope className="text-red-light" size={30} aria-hidden="true" />
          <h3 className="text-2xl font-semibold">Correo profesional</h3>
          <p className="text-gray-text break-all">{personalInfo.email}</p>
          <a className="btn-primary" href={contactLinks.email}>Escribirme por correo</a>
          <p className="text-sm text-gray-text">Se abrirá tu aplicación de correo. Si lo prefieres, copia la dirección y escribe desde tu proveedor habitual.</p>
        </article>
        <article className="glass-card p-6 sm:p-8 space-y-5">
          <FaWhatsapp className="text-green-400" size={30} aria-hidden="true" />
          <h3 className="text-2xl font-semibold">WhatsApp</h3>
          <p className="text-gray-text">{personalInfo.phone}</p>
          <a className="btn-secondary" href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer">Conversar por WhatsApp <FaExternalLinkAlt size={12} aria-hidden="true" /></a>
          <p className="text-sm text-gray-text">Se abrirá una conversación con un mensaje inicial que puedes editar antes de enviarlo.</p>
        </article>
      </div>
      <div className="mt-8 text-gray-text space-y-3">
        <p>Servicios de Alpha: <a className="text-red-light break-all hover:underline" href={contactLinks.services}>{personalInfo.servicesEmail}</a></p>
        <p>{personalInfo.location} · <a className="text-red-light hover:underline" href="https://alphaecuador.com/" target="_blank" rel="noopener noreferrer">Alpha Ecuador</a></p>
      </div>
    </div>
  </section>
}
