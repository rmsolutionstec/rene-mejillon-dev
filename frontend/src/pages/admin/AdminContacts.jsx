import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  FaEnvelope, FaTrash, FaTimes, FaCheckCircle, FaClock, FaEye,
} from 'react-icons/fa'
import { adminApi } from '../../services/api'

function ContactModal({ contact, onClose }) {
  if (!contact) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: '#161616', border: '1px solid rgba(255,30,30,0.2)', boxShadow: '0 25px 80px rgba(0,0,0,0.9)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(42,42,42,0.8)' }}>
            <h2 className="font-display font-bold text-base text-white-text">Mensaje de contacto</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-text hover:text-white-text" style={{ background: 'rgba(31,31,31,0.8)' }}>
              <FaTimes size={14} />
            </button>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-dim text-xs uppercase tracking-wider mb-1">Nombre</p>
                <p className="text-white-text font-medium text-sm">{contact.name}</p>
              </div>
              <div>
                <p className="text-gray-dim text-xs uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-red-main text-sm hover:underline">{contact.email}</a>
              </div>
              {contact.subject && (
                <div className="col-span-2">
                  <p className="text-gray-dim text-xs uppercase tracking-wider mb-1">Asunto</p>
                  <p className="text-white-text text-sm">{contact.subject}</p>
                </div>
              )}
              {contact.service && (
                <div>
                  <p className="text-gray-dim text-xs uppercase tracking-wider mb-1">Servicio</p>
                  <span className="tech-badge text-xs">{contact.service}</span>
                </div>
              )}
              <div>
                <p className="text-gray-dim text-xs uppercase tracking-wider mb-1">Fecha</p>
                <p className="text-gray-text text-sm">{new Date(contact.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-dim text-xs uppercase tracking-wider mb-2">Mensaje</p>
              <div className="p-4 rounded-xl text-gray-text text-sm leading-relaxed"
                style={{ background: 'rgba(31,31,31,0.6)', border: '1px solid rgba(42,42,42,0.8)' }}>
                {contact.message}
              </div>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${contact.email}?subject=Re: ${contact.subject || 'Tu mensaje'}`}
                className="btn-primary gap-2 text-sm flex-1 justify-center">
                <FaEnvelope size={13} /> Responder
              </a>
              <button onClick={onClose} className="btn-ghost px-5">Cerrar</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter,   setFilter]   = useState('all')

  const load = () => {
    adminApi.getContacts()
      .then(({ data }) => setContacts(data.data || data))
      .catch(() => toast.error('Error al cargar contactos'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const filtered = contacts.filter((c) => {
    if (filter === 'unread') return !c.read_at
    if (filter === 'read')   return !!c.read_at
    return true
  })

  const handleView = async (contact) => {
    setSelected(contact)
    if (!contact.read_at) {
      try {
        await adminApi.markRead(contact.id)
        setContacts((prev) => prev.map((c) => c.id === contact.id ? { ...c, read_at: new Date().toISOString() } : c))
      } catch {}
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm('¿Eliminar este contacto?')) return
    try {
      await adminApi.deleteContact(id)
      toast.success('Contacto eliminado')
      setContacts((prev) => prev.filter((c) => c.id !== id))
    } catch {
      toast.error('Error al eliminar')
    }
  }

  const unreadCount = contacts.filter((c) => !c.read_at).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-white-text">Contactos</h1>
          <p className="text-gray-text text-sm mt-0.5">
            {contacts.length} mensajes total{unreadCount > 0 && (
              <span className="ml-2 text-red-main font-semibold">({unreadCount} sin leer)</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all',    label: 'Todos'    },
          { key: 'unread', label: 'Sin leer' },
          { key: 'read',   label: 'Leídos'   },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${filter === key ? 'text-white' : 'text-gray-text hover:text-white-text'}`}
            style={filter === key
              ? { background: 'linear-gradient(135deg, #ff1e1e, #cc0000)', boxShadow: '0 4px 15px rgba(255,30,30,0.3)' }
              : { background: 'rgba(31,31,31,0.7)', border: '1px solid rgba(42,42,42,0.8)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(18,18,18,0.9)', border: '1px solid rgba(42,42,42,0.8)' }}>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-red-main/30 border-t-red-main rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-dim">No hay contactos en esta categoría</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(42,42,42,0.8)' }}>
                  {['', 'Nombre', 'Email', 'Asunto', 'Fecha', 'Estado', 'Acciones'].map((h) => (
                    <th key={h} className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-dim">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleView(c)}
                    className="cursor-pointer transition-colors"
                    style={{ borderBottom: '1px solid rgba(42,42,42,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,30,30,0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-4 py-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #ff1e1e, #cc0000)' }}
                      >
                        {c.name?.charAt(0) || '?'}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className={`text-sm font-medium ${!c.read_at ? 'text-white-text' : 'text-gray-text'}`}>{c.name}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-text text-sm">{c.email}</td>
                    <td className="px-4 py-4 text-gray-text text-sm max-w-xs">
                      <p className="truncate">{c.subject || c.message?.slice(0, 40) + '...'}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-dim text-xs whitespace-nowrap">
                      {new Date(c.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-4">
                      {c.read_at ? (
                        <span className="flex items-center gap-1.5 text-xs text-green-400">
                          <FaCheckCircle size={11} /> Leído
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs text-yellow-400">
                          <FaClock size={11} /> Nuevo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button onClick={(e) => { e.stopPropagation(); handleView(c) }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main transition-colors"
                          style={{ background: 'rgba(31,31,31,0.8)' }}>
                          <FaEye size={13} />
                        </button>
                        <button onClick={(e) => handleDelete(c.id, e)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main transition-colors"
                          style={{ background: 'rgba(31,31,31,0.8)' }}>
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ContactModal contact={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
