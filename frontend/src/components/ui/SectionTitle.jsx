import { motion } from 'framer-motion'

const variants = {
  default: {
    container: 'text-center',
    bar:       'red-line-center mt-3',
  },
  left: {
    container: 'text-left',
    bar:       'red-line mt-3',
  },
}

/**
 * SectionTitle
 * @param {string}  eyebrow   - small top label (optional)
 * @param {string}  title     - main heading
 * @param {string}  subtitle  - paragraph below (optional)
 * @param {'default'|'left'} align
 * @param {boolean} inView    - trigger animation when true
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'default',
  inView = true,
  className = '',
}) {
  const v = variants[align] || variants.default

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`${v.container} ${className}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-red-main mb-3"
        >
          {eyebrow}
        </motion.span>
      )}

      <h2
        className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white-text leading-tight"
      >
        {title}
      </h2>

      <div className={v.bar} />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
          className={`mt-5 text-gray-text leading-relaxed text-base max-w-2xl
            ${align === 'default' ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
