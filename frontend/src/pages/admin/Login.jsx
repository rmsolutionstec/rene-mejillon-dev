import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa'
import { adminApi } from '../../services/api'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ email: '', password: '' })
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Completa todos los campos')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { data } = await adminApi.login(form)
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user',  JSON.stringify(data.user))
      toast.success(`Bienvenido, ${data.user.name}`)
      navigate('/admin/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Credenciales incorrectas'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* BG */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,30,30,0.1) 0%, transparent 65%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="p-10 rounded-2xl"
          style={{
            background: 'rgba(18,18,18,0.95)',
            border: '1px solid rgba(255,30,30,0.15)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 font-display font-black text-2xl text-white"
              style={{
                background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
                boxShadow: '0 0 30px rgba(255,30,30,0.4)',
              }}
            >
              RM
            </div>
            <h1 className="font-display font-bold text-2xl text-white-text">
              Panel Admin
            </h1>
            <p className="text-gray-text text-sm mt-1">
              René Mejillón — Portfolio CMS
            </p>
          </div>

          {/* Shield badge */}
          <div
            className="flex items-center justify-center gap-2 mb-6 px-4 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,30,30,0.05)',
              border: '1px solid rgba(255,30,30,0.15)',
            }}
          >
            <FaShieldAlt size={13} className="text-red-main" />
            <span className="text-gray-text text-xs">Área restringida — Solo administrador</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="admin@renemejillon.dev"
                className={`form-input ${error ? 'border-red-main/60' : ''}`}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className={`form-input pr-12 ${error ? 'border-red-main/60' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-dim hover:text-gray-text transition-colors"
                >
                  {show ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-main text-sm flex items-center gap-2"
              >
                <FaLock size={12} />
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`btn-primary w-full justify-center mt-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </>
              ) : (
                'Ingresar al panel'
              )}
            </motion.button>
          </form>

          <p className="text-center text-gray-dim text-xs mt-6">
            ← {' '}
            <a href="/" className="text-gray-text hover:text-red-main transition-colors">
              Volver al portafolio
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
