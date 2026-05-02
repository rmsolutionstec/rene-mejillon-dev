import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  FaTachometerAlt, FaProjectDiagram, FaCode, FaCogs,
  FaEnvelope, FaBars, FaTimes, FaSignOutAlt, FaExternalLinkAlt,
  FaUser,
} from 'react-icons/fa'
import { adminApi } from '../../services/api'

const NAV = [
  { to: '/admin/dashboard', Icon: FaTachometerAlt, label: 'Dashboard'  },
  { to: '/admin/projects',  Icon: FaProjectDiagram, label: 'Proyectos' },
  { to: '/admin/skills',    Icon: FaCode,           label: 'Habilidades'},
  { to: '/admin/services',  Icon: FaCogs,           label: 'Servicios'  },
  { to: '/admin/contacts',  Icon: FaEnvelope,       label: 'Contactos'  },
]

export default function AdminLayout() {
  const navigate   = useNavigate()
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('admin_user') || '{"name":"Admin","email":""}')

  const handleLogout = async () => {
    try { await adminApi.logout() } catch {}
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    toast.success('Sesión cerrada')
    navigate('/admin/login')
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: '#0a0a0a' }}
    >
      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          transition-all duration-300
          ${open ? 'w-64' : 'w-0 md:w-20 lg:w-64'}
          overflow-hidden
        `}
        style={{
          background: '#121212',
          borderRight: '1px solid rgba(255,30,30,0.1)',
        }}
      >
        {/* Sidebar header */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: 'rgba(255,30,30,0.1)' }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-black text-base text-white flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
              boxShadow: '0 0 15px rgba(255,30,30,0.3)',
            }}
          >
            RM
          </div>
          <div className="hidden lg:block overflow-hidden">
            <p className="font-display font-bold text-sm text-white-text whitespace-nowrap">
              Panel Admin
            </p>
            <p className="text-gray-dim text-xs">CMS Portafolio</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-5 space-y-1 px-3">
          {NAV.map(({ to, Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'text-white bg-red-main/10 border border-red-main/25'
                  : 'text-gray-text hover:text-white-text hover:bg-white/5 border border-transparent'
                }`
              }
              style={({ isActive }) => isActive
                ? { boxShadow: '0 0 10px rgba(255,30,30,0.1)' }
                : {}
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} className={isActive ? 'text-red-main' : ''} />
                  <span className="hidden lg:block">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user + logout */}
        <div
          className="p-3 border-t space-y-1"
          style={{ borderColor: 'rgba(42,42,42,0.8)' }}
        >
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(31,31,31,0.6)' }}
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #ff1e1e, #cc0000)',
              }}
            >
              <FaUser size={11} className="text-white" />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-white-text text-xs font-semibold truncate">{user.name}</p>
              <p className="text-gray-dim text-xs">Administrator</p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-text hover:text-white-text hover:bg-white/5 transition-all"
          >
            <FaExternalLinkAlt size={13} />
            <span className="hidden lg:block">Ver portafolio</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-text hover:text-red-main hover:bg-red-main/5 transition-all"
          >
            <FaSignOutAlt size={15} />
            <span className="hidden lg:block">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-20 lg:ml-64">
        {/* Top bar */}
        <header
          className="h-16 flex items-center justify-between px-6 sticky top-0 z-20"
          style={{
            background: 'rgba(10,10,10,0.95)',
            borderBottom: '1px solid rgba(42,42,42,0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-text hover:text-white-text"
          >
            {open ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
          <div />
          <div className="flex items-center gap-3">
            <span className="text-gray-dim text-sm hidden sm:block">
              {user.name}
            </span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: 'linear-gradient(135deg, #ff1e1e, #cc0000)' }}
            >
              {user.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
