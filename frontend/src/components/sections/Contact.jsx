import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import toast from 'react-hot-toast'
import {
  FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin, FaTwitter,
  FaMapMarkerAlt, FaPaperPlane, FaCheckCircle,
} from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { personalInfo } from '../../data/portfolioData'
import { publicApi } from '../../services/api'

const CONTACT_INFO = [
  { Icon: FaEnvelope,      label: 'Email',    value: personalInfo.email,  href: `mailto:${personalInfo.email}` },
  { Icon: FaWhatsapp,      label: 'WhatsApp', value: personalInfo.phone,  href: 'https://wa.me/593990000000'   },
  { Icon: FaMapMarkerAlt,  label: 'Ubicación',value: personalInfo.location, href: null                         },
]

const SOCIALS = [
  { Icon: FaGithub,   href: 'https://github.com/renemejillon',      label: 'GitHub'   },
  { Icon: FaLinkedin, href: 'https://linkedin.com/in/renemejillon', label: 'LinkedIn' },
  { Icon: FaTwitter,  href: 'https://twitter.com/renemejillon',     label: 'Twitter'  },
  { Icon: FaWhatsapp, href: 'https://wa.me/593990000000',           label: 'WhatsApp' },
]

const SERVICES_OPTIONS = [
  'Desarrollo Web Full Stack',
  'API REST',
  'Aplicación PWA',
  'Ecommerce',
  'Consultoría técnica',
  'Otro',
]

const INITIAL = { name: '', email: '', subject: '', service: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim())    errors.name    = 'El nombre es requerido'
  if (!form.email.trim())   errors.email   = 'El email es requerido'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Email inválido'
  if (!form.message.trim()) errors.message = 'El mensaje es requerido'
  return errors
}

export default function Contact() {
  const [form,     setForm]     = useState(INITIAL)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      await publicApi.sendContact(form)
      setSent(true)
      setForm(INITIAL)
      toast.success('¡Mensaje enviado! Te responderé pronto.', { duration: 5000 })
    } catch {
      toast.error('No se pudo enviar. Intenta por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contacto"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0d0d0d' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(255,30,30,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          subtitle="¿Tienes una idea? Cuéntamela. Respondo en menos de 24 horas."
          inView={inView}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-14">

          {/* LEFT — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-display font-bold text-xl text-white-text mb-2">
                ¡Trabajemos juntos!
              </h3>
              <p className="text-gray-text text-sm leading-relaxed">
                Estoy disponible para proyectos freelance y colaboraciones.
                No dudes en escribirme por cualquiera de estos medios.
              </p>
            </div>

            {/* Contact items */}
            <div className="space-y-4">
              {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                  style={{
                    background: 'rgba(24,24,24,0.7)',
                    border: '1px solid rgba(42,42,42,0.8)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,30,30,0.25)'
                    e.currentTarget.style.background  = 'rgba(255,30,30,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(42,42,42,0.8)'
                    e.currentTarget.style.background  = 'rgba(24,24,24,0.7)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(255,30,30,0.1)',
                      border: '1px solid rgba(255,30,30,0.2)',
                    }}
                  >
                    <Icon size={16} className="text-red-main" />
                  </div>
                  <div>
                    <p className="text-gray-dim text-xs uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-white-text text-sm font-medium hover:text-red-main transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white-text text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-gray-dim text-xs uppercase tracking-widest mb-4">
                Redes sociales
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-text hover:text-red-main transition-all duration-200"
                    style={{
                      background: 'rgba(31,31,31,0.8)',
                      border: '1px solid rgba(42,42,42,0.8)',
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: 'rgba(255,30,30,0.05)',
                border: '1px solid rgba(255,30,30,0.2)',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="text-green-400 text-sm font-semibold">
                  Disponible para proyectos
                </span>
              </div>
              <p className="text-gray-text text-xs">
                Tiempo de respuesta habitual: menos de 24 horas
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center p-12 rounded-2xl text-center"
                style={{
                  background: 'rgba(18,18,18,0.9)',
                  border: '1px solid rgba(255,30,30,0.2)',
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                    boxShadow: '0 0 30px rgba(255,30,30,0.4)',
                  }}
                >
                  <FaCheckCircle size={36} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white-text mb-3">
                  ¡Mensaje enviado!
                </h3>
                <p className="text-gray-text mb-6">
                  Gracias por contactarme. Te responderé en menos de 24 horas.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-secondary"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl space-y-5"
                style={{
                  background: 'rgba(18,18,18,0.9)',
                  border: '1px solid rgba(42,42,42,0.8)',
                }}
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre completo"
                      className={`form-input ${errors.name ? 'border-red-main' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-main text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className={`form-input ${errors.email ? 'border-red-main' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-main text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                    Servicio de interés
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Selecciona un servicio</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s} style={{ background: '#181818' }}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                    Asunto
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Sobre qué quieres hablar"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                    Mensaje *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Cuéntame sobre tu proyecto, presupuesto y plazos..."
                    rows={5}
                    className={`form-input resize-none ${errors.message ? 'border-red-main' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-main text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className={`btn-primary w-full justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      Enviar mensaje
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
