import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { testimonials } from '../../data/portfolioData'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar
          key={i}
          size={13}
          className={i < rating ? 'text-red-main' : 'text-gray-elegant'}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const active = testimonials[current]

  return (
    <section
      id="testimonios"
      ref={ref}
      className="section-padding relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,30,30,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
        <SectionTitle
          eyebrow="Testimonios"
          title="Lo que dicen mis clientes"
          subtitle="La satisfacción de mis clientes es mi mejor referencia"
          inView={inView}
        />

        <div className="mt-14 max-w-4xl mx-auto">
          {/* Main testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="p-10 rounded-2xl text-center relative"
              style={{
                background: 'rgba(18,18,18,0.9)',
                border: '1px solid rgba(255,30,30,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Quote icon */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'rgba(255,30,30,0.1)',
                  border: '1px solid rgba(255,30,30,0.2)',
                }}
              >
                <FaQuoteLeft size={22} className="text-red-main" />
              </div>

              {/* Stars */}
              <div className="flex justify-center mb-6">
                <StarRating rating={active.rating} />
              </div>

              {/* Quote */}
              <blockquote className="text-white-text text-lg leading-relaxed font-medium max-w-2xl mx-auto mb-8 italic">
                "{active.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg text-white flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                    boxShadow: '0 0 15px rgba(255,30,30,0.3)',
                  }}
                >
                  {active.name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-white-text">{active.name}</p>
                  <p className="text-gray-text text-sm">
                    {active.role} · <span className="text-red-main">{active.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-text hover:text-red-main transition-all duration-200"
              style={{
                background: 'rgba(31,31,31,0.8)',
                border: '1px solid rgba(42,42,42,0.8)',
              }}
            >
              <FaChevronLeft size={14} />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: current === i ? '24px' : '8px',
                    height: '8px',
                    background: current === i
                      ? 'linear-gradient(90deg, #ff1e1e, #cc0000)'
                      : 'rgba(42,42,42,0.8)',
                    boxShadow: current === i ? '0 0 8px rgba(255,30,30,0.4)' : 'none',
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-text hover:text-red-main transition-all duration-200"
              style={{
                background: 'rgba(31,31,31,0.8)',
                border: '1px solid rgba(42,42,42,0.8)',
              }}
            >
              <FaChevronRight size={14} />
            </motion.button>
          </div>

          {/* All testimonials mini */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
          >
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setCurrent(i)}
                className={`p-4 rounded-xl text-left transition-all duration-200 ${
                  current === i ? 'ring-1 ring-red-main/40' : ''
                }`}
                style={{
                  background: current === i
                    ? 'rgba(255,30,30,0.06)'
                    : 'rgba(18,18,18,0.6)',
                  border: current === i
                    ? '1px solid rgba(255,30,30,0.2)'
                    : '1px solid rgba(42,42,42,0.6)',
                }}
              >
                <p className="text-xs text-gray-dim font-semibold uppercase tracking-wider mb-1">
                  {t.company}
                </p>
                <p className="text-white-text text-sm font-medium">{t.name}</p>
                <p className="text-gray-text text-xs mt-0.5">{t.role}</p>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
