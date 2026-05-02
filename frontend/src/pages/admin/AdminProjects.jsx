import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash, FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { adminApi } from '../../services/api'

const EMPTY = {
  title: '', description: '', short_desc: '', category: 'Web App',
  status: 'Completado', tech: '', year: new Date().getFullYear(),
  live_url: '', github_url: '', featured: false,
}

const STATUS_OPT = ['Completado', 'En desarrollo', 'Próximamente']
const CAT_OPT    = ['Web App', 'Ecommerce', 'Landing Page', 'API', 'Mobile', 'Otro']

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: '#161616',
            border: '1px solid rgba(255,30,30,0.2)',
            boxShadow: '0 25px 80px rgba(0,0,0,0.9)',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: 'rgba(42,42,42,0.8)' }}
          >
            <h2 className="font-display font-bold text-lg text-white-text">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-text hover:text-white-text"
              style={{ background: 'rgba(31,31,31,0.8)' }}
            >
              <FaTimes size={14} />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [modal,    setModal]    = useState(null)  // null | 'create' | 'edit'
  const [form,     setForm]     = useState(EMPTY)
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(null)

  const load = () => {
    setLoading(true)
    adminApi.getProjects()
      .then(({ data }) => setProjects(data.data || data))
      .catch(() => toast.error('No se pudieron cargar los proyectos'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => { setForm(EMPTY); setModal('create') }
  const openEdit   = (p) => {
    setForm({ ...p, tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '' })
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
      tech: typeof form.tech === 'string'
        ? form.tech.split(',').map((t) => t.trim()).filter(Boolean)
        : form.tech,
    }
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createProject(payload)
        toast.success('Proyecto creado')
        setProjects((prev) => [data.data || data, ...prev])
      } else {
        const { data } = await adminApi.updateProject(form.id, payload)
        toast.success('Proyecto actualizado')
        setProjects((prev) => prev.map((p) => p.id === form.id ? (data.data || data) : p))
      }
      closeModal()
    } catch {
      toast.error('Error al guardar el proyecto')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto?')) return
    setDeleting(id)
    try {
      await adminApi.deleteProject(id)
      toast.success('Proyecto eliminado')
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch {
      toast.error('Error al eliminar')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-white-text">Proyectos</h1>
          <p className="text-gray-text text-sm mt-0.5">{projects.length} proyectos en total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={openCreate}
          className="btn-primary gap-2"
        >
          <FaPlus size={13} />
          Nuevo proyecto
        </motion.button>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(18,18,18,0.9)',
          border: '1px solid rgba(42,42,42,0.8)',
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-2 border-red-main/30 border-t-red-main rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-gray-dim">
            <p className="text-lg mb-2">Sin proyectos aún</p>
            <button onClick={openCreate} className="text-red-main hover:underline text-sm">
              Crear el primero
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(42,42,42,0.8)' }}>
                  {['Proyecto', 'Categoría', 'Estado', 'Año', 'Links', 'Acciones'].map((h) => (
                    <th
                      key={h}
                      className="text-left px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-dim"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group transition-colors"
                    style={{ borderBottom: '1px solid rgba(42,42,42,0.4)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,30,30,0.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="px-5 py-4">
                      <p className="text-white-text font-medium text-sm">{p.title}</p>
                      <p className="text-gray-dim text-xs mt-0.5 line-clamp-1">{p.short_desc}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="tech-badge text-xs">{p.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          color:       p.status === 'Completado' ? '#4ade80' : '#fbbf24',
                          background:  p.status === 'Completado' ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)',
                          border:      `1px solid ${p.status === 'Completado' ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.3)'}`,
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-text text-sm">{p.year}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {p.live_url && (
                          <a href={p.live_url} target="_blank" rel="noopener noreferrer"
                            className="text-gray-dim hover:text-red-main transition-colors">
                            <FaExternalLinkAlt size={13} />
                          </a>
                        )}
                        {p.github_url && (
                          <a href={p.github_url} target="_blank" rel="noopener noreferrer"
                            className="text-gray-dim hover:text-red-main transition-colors">
                            <FaGithub size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main transition-colors"
                          style={{ background: 'rgba(31,31,31,0.8)' }}
                        >
                          <FaEdit size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main transition-colors"
                          style={{ background: 'rgba(31,31,31,0.8)' }}
                        >
                          {deleting === p.id
                            ? <span className="w-3 h-3 border border-t-red-main rounded-full animate-spin" />
                            : <FaTrash size={12} />
                          }
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

      {/* Create / Edit Modal */}
      <Modal
        open={!!modal}
        onClose={closeModal}
        title={modal === 'create' ? 'Nuevo proyecto' : 'Editar proyecto'}
      >
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Título *
              </label>
              <input
                type="text" name="title" value={form.title}
                onChange={handleChange} placeholder="Nombre del proyecto"
                required className="form-input"
              />
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Categoría
              </label>
              <select name="category" value={form.category} onChange={handleChange} className="form-input">
                {CAT_OPT.map((o) => <option key={o} value={o} style={{ background: '#181818' }}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Estado
              </label>
              <select name="status" value={form.status} onChange={handleChange} className="form-input">
                {STATUS_OPT.map((o) => <option key={o} value={o} style={{ background: '#181818' }}>{o}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Descripción corta
              </label>
              <input
                type="text" name="short_desc" value={form.short_desc}
                onChange={handleChange} placeholder="Descripción breve (para cards)"
                className="form-input"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Descripción completa
              </label>
              <textarea
                name="description" value={form.description} onChange={handleChange}
                rows={3} placeholder="Descripción detallada del proyecto"
                className="form-input resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Tecnologías (separadas por coma)
              </label>
              <input
                type="text" name="tech" value={form.tech}
                onChange={handleChange} placeholder="Laravel, React, MySQL, ..."
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                URL en vivo
              </label>
              <input
                type="url" name="live_url" value={form.live_url}
                onChange={handleChange} placeholder="https://..."
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                URL GitHub
              </label>
              <input
                type="url" name="github_url" value={form.github_url}
                onChange={handleChange} placeholder="https://github.com/..."
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
                Año
              </label>
              <input
                type="number" name="year" value={form.year}
                onChange={handleChange} min="2015" max="2030"
                className="form-input"
              />
            </div>
            <div className="flex items-center gap-3 self-end pb-1">
              <input
                type="checkbox" id="featured" name="featured"
                checked={form.featured} onChange={handleChange}
                className="w-4 h-4 accent-red-500"
              />
              <label htmlFor="featured" className="text-gray-text text-sm cursor-pointer">
                Proyecto destacado
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={!saving ? { scale: 1.02 } : {}}
              whileTap={!saving ? { scale: 0.98 } : {}}
              className={`btn-primary flex-1 justify-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Guardando...</>
                : modal === 'create' ? 'Crear proyecto' : 'Guardar cambios'
              }
            </motion.button>
            <button type="button" onClick={closeModal} className="btn-ghost px-5">
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
