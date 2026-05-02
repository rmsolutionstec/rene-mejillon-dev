import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FaCode, FaRocket, FaMobileAlt, FaShoppingCart,
  FaDatabase, FaCloud, FaCheckCircle, FaStar,
} from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { services } from '../../data/portfolioData'

const ICON_MAP = {
  FaCode: FaCode, FaRocket: FaRocket, FaMobile: FaMobileAlt,
  FaShoppingCart: FaShoppingCart, FaDatabase: FaDatabase, FaCloud: FaCloud,
}

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <section
      id="servicios"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,30,30,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Servicios"
          title="¿Qué puedo hacer por ti?"
          subtitle="Ofrezco soluciones digitales completas, desde el concepto hasta el deploy en producción"
          inView={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {services.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || FaCode
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl p-7 space-y-5 transition-all duration-300 group overflow-hidden
                  ${service.popular ? 'ring-2 ring-red-main/40' : ''}`}
                style={{
                  background: service.popular
                    ? 'rgba(255,30,30,0.05)'
                    : 'rgba(18,18,18,0.8)',
                  border: service.popular
                    ? '1px solid rgba(255,30,30,0.3)'
                    : '1px solid rgba(42,42,42,0.8)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,30,30,0.25)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(255,30,30,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = service.popular
                    ? 'rgba(255,30,30,0.3)'
                    : 'rgba(42,42,42,0.8)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Popular badge */}
                {service.popular && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full text-red-main"
                    style={{
                      background: 'rgba(255,30,30,0.12)',
                      border: '1px solid rgba(255,30,30,0.3)',
                    }}
                  >
                    <FaStar size={10} />
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: service.popular
                      ? 'linear-gradient(135deg, #ff1e1e, #cc0000)'
                      : 'rgba(255,30,30,0.1)',
                    border: service.popular
                      ? 'none'
                      : '1px solid rgba(255,30,30,0.2)',
                    boxShadow: service.popular ? '0 0 20px rgba(255,30,30,0.3)' : 'none',
                  }}
                >
                  <Icon size={22} className={service.popular ? 'text-white' : 'text-red-main'} />
                </div>

                {/* Title & desc */}
                <div>
                  <h3 className="font-display font-bold text-lg text-white-text mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-text text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-text">
                      <FaCheckCircle size={12} className="text-red-main flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: 'rgba(42,42,42,0.8)' }}
                >
                  <span className="text-white-text font-bold text-lg">{service.price}</span>
                  <button
                    onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-red-main text-sm font-medium hover:text-red-hover transition-colors"
                  >
                    Solicitar →
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Custom project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,30,30,0.08), rgba(204,0,0,0.05))',
            border: '1px solid rgba(255,30,30,0.2)',
          }}
        >
          <h3 className="font-display font-bold text-xl text-white-text mb-2">
            ¿Tienes un proyecto personalizado?
          </h3>
          <p className="text-gray-text text-sm mb-6 max-w-md mx-auto">
            Cuéntame tu idea y trabajamos juntos para hacerla realidad.
            Ofrezco consultoría gratuita de 30 minutos.
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Hablemos de tu proyecto
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
