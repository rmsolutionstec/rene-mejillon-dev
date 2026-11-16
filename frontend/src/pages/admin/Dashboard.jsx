import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { adminApi } from '../../services/api'
const labels = { projects: 'Proyectos', skills: 'Habilidades', services: 'Servicios', contacts: 'Contactos', unread: 'Sin leer' }
export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [errors, setErrors] = useState({})
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    setErrors({}); setStats(null); setContacts(null)
    adminApi.getStats().then(({ data }) => { if (active) setStats(data.data) })
      .catch(() => { if (active) setErrors((previous) => ({ ...previous, stats: true })) })
    adminApi.getContacts().then(({ data }) => { if (active) setContacts(data.data.slice(0, 5)) })
      .catch(() => { if (active) setErrors((previous) => ({ ...previous, contacts: true })) })
    return () => { active = false }
  }, [attempt])
  return <div className="space-y-8">
    <h1 className="text-2xl font-bold">Resumen del portafolio</h1>
    {Object.keys(errors).length > 0 && <div role="alert" className="glass-card p-5"><p>No se pudieron cargar {errors.stats ? 'las estadísticas' : ''}{errors.stats && errors.contacts ? ' ni ' : ''}{errors.contacts ? 'los contactos' : ''}.</p><button className="btn-secondary mt-3" onClick={() => setAttempt((value) => value + 1)}>Reintentar</button></div>}
    {!stats && !errors.stats && <p role="status">Cargando estadísticas…</p>}
    {stats && <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{Object.entries(labels).map(([key, label]) => <div key={key} className="glass-card p-5"><p className="text-3xl font-bold text-red-light">{stats[key]}</p><p className="text-gray-text">{label}</p></div>)}</div>
      <section className="glass-card p-5">
        <h2 className="text-lg font-semibold mb-4">Contactos de los últimos seis meses</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={stats.monthly}><XAxis dataKey="month" stroke="#a0a0a0" /><YAxis allowDecimals={false} stroke="#a0a0a0" /><Tooltip contentStyle={{ background: '#181818', color: '#fff' }} /><Bar dataKey="total" name="Contactos" fill="#ff4444" isAnimationActive={false} /></BarChart>
        </ResponsiveContainer>
        <ul className="flex flex-wrap gap-3 text-sm text-gray-text" aria-label="Contactos por mes">{stats.monthly.map((item) => <li key={item.month}>{item.month}: {item.total}</li>)}</ul>
      </section>
      <section className="glass-card p-5"><h2 className="text-lg font-semibold mb-3">Habilidades por categoría</h2>
        {!stats.byCategory.length ? <p>Sin habilidades registradas.</p> : <ul className="space-y-2 text-gray-text">{stats.byCategory.map((item) => <li key={item.category}>{item.category}: {item.total}</li>)}</ul>}
      </section>
    </>}
    <section className="glass-card p-5"><h2 className="text-lg font-semibold">Contactos recientes</h2>
      {!contacts && !errors.contacts && <p role="status">Cargando contactos…</p>}
      {contacts?.length === 0 && <p className="text-gray-text mt-4">No hay mensajes todavía.</p>}
      <ul className="space-y-3 my-4">{contacts?.map((contact) => <li key={contact.id} className="border-b border-gray-border pb-3"><p>{contact.name} · {contact.read_at ? 'Leído' : 'Nuevo'}</p><p className="text-gray-text break-all">{contact.email}</p></li>)}</ul>
      <Link to="/admin/contacts" className="text-red-light">Ver todos los contactos</Link>
    </section>
  </div>
}
