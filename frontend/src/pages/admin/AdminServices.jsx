import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaStar } from 'react-icons/fa'
import { adminApi } from '../../services/api'

const EMPTY = { title: '', description: '', icon: 'FaCode', price: '', popular: false, features: '' }
const ICONS  = ['FaCode', 'FaRocket', 'FaMobile', 'FaShoppingCart', 'FaDatabase', 'FaCloud', 'FaDesktop', 'FaCogs']

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg rounded-2xl overflow-hidden"
          style={{ background: '#161616', border: '1px solid rgba(255,30,30,0.2)', boxShadow: '0 25px 80px rgba(0,0,0,0.9)', maxHeight: '90vh', overflowY: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(42,42,42,0.8)' }}>
            <h2 className="font-display font-bold text-base text-white-text">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-text hover:text-white-text" style={{ background: 'rgba(31,31,31,0.8)' }}>
              <FaTimes size={14} />
            </button>
          </div>
          <div className="p-5">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(null)
  const [form,     setForm]     = useState(EMPTY)
  const [saving,   setSaving]   = useState(false)

  const load = () => {
    adminApi.getServices()
      .then(({ data }) => setServices(data.data || data))
      .catch(() => toast.error('Error al cargar servicios'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setModal('create') }
  const openEdit   = (s) => {
    setForm({ ...s, features: Array.isArray(s.features) ? s.features.join('\n') : (s.features || '') })
    setModal('edit')
  }
  const closeModal = () => { setModal(null); setForm(EMPTY) }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      features: typeof form.features === 'string'
        ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
        : form.features,
    }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createService(payload)
        toast.success('Servicio creado')
        setServices((prev) => [...prev, data.data || data])
      } else {
        const { data } = await adminApi.updateService(form.id, payload)
        toast.success('Servicio actualizado')
        setServices((prev) => prev.map((s) => s.id === form.id ? (data.data || data) : s))
      }
      closeModal()
    } catch {
      toast.error('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este servicio?')) return
    try {
      await adminApi.deleteService(id)
      toast.success('Servicio eliminado')
      setServices((prev) => prev.filter((s) => s.id !== id))
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-white-text">Servicios</h1>
          <p className="text-gray-text text-sm mt-0.5">{services.length} servicios activos</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={openCreate} className="btn-primary gap-2">
          <FaPlus size={13} /> Nuevo servicio
        </motion.button>
      </div>

      {/* Services grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-red-main/30 border-t-red-main rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="relative p-5 rounded-2xl group"
              style={{
                background: 'rgba(18,18,18,0.9)',
                border: service.popular ? '1px solid rgba(255,30,30,0.3)' : '1px solid rgba(42,42,42,0.8)',
              }}
            >
              {service.popular && (
                <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-red-main"
                  style={{ background: 'rgba(255,30,30,0.1)', border: '1px solid rgba(255,30,30,0.2)', borderRadius: '999px', padding: '2px 8px' }}>
                  <FaStar size={9} /> Popular
                </div>
              )}
              <h3 className="font-display font-bold text-sm text-white-text mb-1 pr-14">{service.title}</h3>
              <p className="text-gray-text text-xs leading-relaxed mb-3 line-clamp-2">{service.description}</p>
              <p className="text-red-main font-bold text-sm mb-3">{service.price}</p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(service)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-dim hover:text-red-main transition-colors"
                  style={{ background: 'rgba(31,31,31,0.8)' }}>
                  <FaEdit size={11} /> Editar
                </button>
                <button onClick={() => handleDelete(service.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-dim hover:text-red-main transition-colors"
                  style={{ background: 'rgba(31,31,31,0.8)' }}>
                  <FaTrash size={11} /> Eliminar
                </button>
              </div>
            </motion.div>
          ))}

          {services.length === 0 && (
            <div className="col-span-3 text-center py-12 text-gray-dim">
              <p className="mb-2">Sin servicios aún</p>
              <button onClick={openCreate} className="text-red-main hover:underline text-sm">Agregar</button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <Modal open={!!modal} onClose={closeModal} title={modal === 'create' ? 'Nuevo servicio' : 'Editar servicio'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Título *</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="Nombre del servicio" required className="form-input" />
          </div>
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Descripción</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3} placeholder="Descripción del servicio" className="form-input resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Precio</label>
              <input type="text" name="price" value={form.price} onChange={handleChange}
                placeholder="Desde $500" className="form-input" />
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Icono</label>
              <select name="icon" value={form.icon} onChange={handleChange} className="form-input">
                {ICONS.map((ic) => <option key={ic} value={ic} style={{ background: '#181818' }}>{ic}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
              Características (una por línea)
            </label>
            <textarea name="features" value={form.features} onChange={handleChange}
              rows={4} placeholder="React / Next.js&#10;Laravel APIs&#10;MySQL optimizado"
              className="form-input resize-none font-mono text-xs" />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="popular" name="popular" checked={form.popular} onChange={handleChange}
              className="w-4 h-4 accent-red-500" />
            <label htmlFor="popular" className="text-gray-text text-sm cursor-pointer">Marcar como popular</label>
          </div>
          <div className="flex gap-3 pt-2">
            <motion.button type="submit" disabled={saving}
              whileHover={!saving ? { scale: 1.02 } : {}} whileTap={!saving ? { scale: 0.98 } : {}}
              className={`btn-primary flex-1 justify-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Guardando...</> : modal === 'create' ? 'Crear' : 'Guardar'}
            </motion.button>
            <button type="button" onClick={closeModal} className="btn-ghost px-5">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
