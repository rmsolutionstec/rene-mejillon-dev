import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  return (
    <AnimatePresence>
      <motion.div
        className="loader-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        {/* Radial red glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,30,30,0.12) 0%, transparent 65%)',
          }}
        />

        <div className="relative flex flex-col items-center gap-10">
          {/* Logo monogram */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative"
          >
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #1f1f1f 0%, #121212 100%)',
                border: '2px solid rgba(255,30,30,0.4)',
                boxShadow: '0 0 40px rgba(255,30,30,0.3)',
              }}
            >
              <span
                className="font-display font-black text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #ff1e1e, #ff6b6b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                RM
              </span>
            </div>

            {/* Rotating border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 60%, rgba(255,30,30,0.8), transparent)',
              }}
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-2xl text-white-text tracking-wide">
              René{' '}
              <span className="text-gradient">Mejillón</span>
            </h1>
            <p className="text-gray-text text-sm mt-1 tracking-widest uppercase">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-64"
          >
            <div className="skill-bar-track">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.6 }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-dim">Cargando...</span>
              <motion.span
                className="text-xs text-red-main font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                100%
              </motion.span>
            </div>
          </motion.div>

          {/* Dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-red-main"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
