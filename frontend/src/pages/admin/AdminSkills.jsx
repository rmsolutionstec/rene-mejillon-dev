import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { experienceLabels } from '../../data/portfolioData'
import Modal from '../../components/ui/Modal'
import { adminApi } from '../../services/api'

const EMPTY    = { is_published: true, name: '', experience: 'practice', category: 'frontend', icon: '' }
const CATS     = ['frontend', 'backend', 'database', 'devops']
const CAT_LABELS = { frontend: 'Frontend', backend: 'Backend', database: 'Base de datos', devops: 'Infraestructura / herramientas' }

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
    setForm((f) => ({ ...f, [name]: value }))
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
                <span className="text-gray-text text-sm flex-1">{experienceLabels[skill.experience]}</span>
                <div className="flex gap-1 opacity-100 transition-opacity">
                  <button aria-label="Editar habilidad" onClick={() => openEdit(skill)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-dim hover:text-red-main"
                    style={{ background: 'rgba(31,31,31,0.8)' }}>
                    <FaEdit size={11} />
                  </button>
                  <button aria-label="Eliminar habilidad" onClick={() => handleDelete(skill.id)}
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
            <label htmlFor="field-name" className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Nombre *</label>
            <input id="field-name" type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="React.js, Laravel, MySQL..." required className="form-input" />
          </div>
          <div>
            <label htmlFor="skill-experience" className="block text-gray-text mb-2">Tipo de experiencia</label>
            <select id="skill-experience" name="experience" value={form.experience} onChange={handleChange} className="form-input">
              {Object.entries(experienceLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="field-category" className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Categoría</label>
            <select id="field-category" name="category" value={form.category} onChange={handleChange} className="form-input">
              {CATS.map((c) => <option key={c} value={c} style={{ background: '#181818' }}>{CAT_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="field-icon" className="block text-gray-text text-xs font-medium mb-2 uppercase tracking-wider">Icono (nombre react-icons)</label>
            <input id="field-icon" type="text" name="icon" value={form.icon} onChange={handleChange}
              placeholder="SiReact, SiLaravel..." className="form-input" />
          </div>
          <label className="flex gap-3 items-center text-gray-text"><input type="checkbox" checked={!!form.is_published} onChange={(event) => setForm((previous) => ({ ...previous, is_published: event.target.checked }))} />Publicar en el portafolio</label>
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
