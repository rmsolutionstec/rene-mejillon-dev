import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { adminApi } from '../../services/api'

const EMPTY    = { name: '', level: 80, category: 'frontend', icon: '' }
const CATS     = ['frontend', 'backend', 'database', 'devops']
const CAT_LABELS = { frontend: 'Frontend', backend: 'Backend', database: 'Base de datos', devops: 'DevOps' }

function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md rounded-2xl overflow-hidden"
          style={{ background: '#161616', border: '1px solid rgba(255,30,30,0.2)', boxShadow: '0 25px 80px rgba(0,0,0,0.9)' }}
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

export default function AdminSkills() {
  const [skills,    setSkills]   = useState([])
  const [loading,   setLoading]  = useState(true)
  const [modal,     setModal]    = useState(null)
  const [form,      setForm]     = useState(EMPTY)
  const [saving,    setSaving]   = useState(false)
  const [activeTab, setActiveTab] = useState('frontend')

  const load = () => {
    adminApi.getSkills()
      .then(({ data }) => setSkills(data.data || data))
      .catch(() => toast.error('Error al cargar habilidades'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const filtered = skills.filter((s) => s.category === activeTab)

  const openCreate = () => { setForm({ ...EMPTY, category: activeTab }); setModal('create') }
  const openEdit   = (s) => { setForm(s); setModal('edit') }
  const closeModal = () => { setModal(null); setForm(EMPTY) }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'level' ? Number(value) : value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal === 'create') {
        const { data } = await adminApi.createSkill(form)
        toast.success('Habilidad creada')
        setSkills((prev) => [...prev, data.data || data])
      } else {
        const { data } = await adminApi.updateSkill(form.id, form)
        toast.success('Habilidad actualizada')
        setSkills((prev) => prev.map((s) => s.id === form.id ? (data.data || data) : s))
      }
      closeModal()
    } catch {
      toast.error('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta habilidad?')) return
    try {
      await adminApi.deleteSkill(id)
      toast.success('Habilidad eliminada')
      setSkills((prev) => prev.filter((s) => s.id !== id))
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-white-text">Habilidades</h1>
          <p className="text-gray-text text-sm mt-0.5">{skills.length} habilidades en total</p>
        </div>
        <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={openCreate} className="btn-primary gap-2">
          <FaPlus size={13} /> Nueva habilidad
        </motion.button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button key={c} onClick={() => setActiveTab(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === c ? 'text-white' : 'text-gray-text hover:text-white-text'}`}
            style={activeTab === c
              ? { background: 'linear-gradient(135deg, #ff1e1e, #cc0000)', boxShadow: '0 4px 15px rgba(255,30,30,0.3)' }
              : { background: 'rgba(31,31,31,0.7)', border: '1px solid rgba(42,42,42,0.8)' }
            }
          >
            {CAT_LABELS[c]} ({skills.filter((s) => s.category === c).length})
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(18,18,18,0.9)', border: '1px solid rgba(42,42,42,0.8)' }}>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-red-main/30 border-t-red-main rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-dim">
            <p className="mb-2">Sin habilidades en esta categoría</p>
            <button onClick={openCreate} className="text-red-main hover:underline text-sm">Agregar</button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 group"
              >
                <div className="flex items-center gap-3 w-36 flex-shrink-0">
                  <span className="text-white-text text-sm font-medium truncate">{skill.name}</span>
                </div>
                <div className="flex-1 skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
                <span className="text-red-main text-xs font-semibold w-10 text-right">{skill.level}%</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(skill)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main"
                    style={{ background: 'rgba(31,31,31,0.8)' }}>
                    <FaEdit size={11} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main"
                    style={{ background: 'rgba(31,31,31,0.8)' }}>
                    <FaTrash size={11} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal open={!!modal} onClose={closeModal} title={modal === 'create' ? 'Nueva habilidad' : 'Editar habilidad'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Nombre *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="React.js, Laravel, MySQL..." required className="form-input" />
          </div>
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">
              Nivel: <span className="text-red-main">{form.level}%</span>
            </label>
            <input type="range" name="level" min="10" max="100" step="5" value={form.level}
              onChange={handleChange} className="w-full accent-red-500" />
            <div className="flex justify-between text-xs text-gray-dim mt-1">
              <span>Básico</span><span>Experto</span>
            </div>
          </div>
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Categoría</label>
            <select name="category" value={form.category} onChange={handleChange} className="form-input">
              {CATS.map((c) => <option key={c} value={c} style={{ background: '#181818' }}>{CAT_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Icono (nombre react-icons)</label>
            <input type="text" name="icon" value={form.icon} onChange={handleChange}
              placeholder="SiReact, SiLaravel..." className="form-input" />
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
