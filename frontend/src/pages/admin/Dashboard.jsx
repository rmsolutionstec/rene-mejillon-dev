import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts'
import {
  FaProjectDiagram, FaCode, FaCogs, FaEnvelope,
  FaEye, FaCheckCircle, FaClock, FaArrowUp,
} from 'react-icons/fa'
import { adminApi } from '../../services/api'

/* Default stats when API is unavailable */
const DEFAULT_STATS = {
  projects:    3,
  skills:      24,
  services:    6,
  contacts:    0,
  unread:      0,
  views:       0,
}

const MONTHLY_CONTACTS = [
  { month: 'Ene', contacts: 2 },
  { month: 'Feb', contacts: 5 },
  { month: 'Mar', contacts: 3 },
  { month: 'Abr', contacts: 8 },
  { month: 'May', contacts: 6 },
  { month: 'Jun', contacts: 11 },
]

const PIE_DATA = [
  { name: 'Frontend', value: 6,  color: '#ff1e1e' },
  { name: 'Backend',  value: 6,  color: '#cc0000' },
  { name: 'Database', value: 5,  color: '#ff6b6b' },
  { name: 'DevOps',   value: 6,  color: '#990000' },
]

function StatCard({ icon: Icon, label, value, sub, color = '#ff1e1e', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 rounded-2xl space-y-3 relative overflow-hidden"
      style={{
        background: 'rgba(18,18,18,0.9)',
        border: '1px solid rgba(42,42,42,0.8)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,30,30,0.25)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(42,42,42,0.8)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-xl"
        style={{ background: color, transform: 'translate(30%, -30%)' }}
      />
      <div className="flex items-center justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `rgba(255,30,30,0.1)`,
            border: `1px solid rgba(255,30,30,0.2)`,
          }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {sub !== undefined && (
          <span className="text-xs text-green-400 flex items-center gap-1">
            <FaArrowUp size={10} />
            {sub}
          </span>
        )}
      </div>
      <div>
        <p className="font-display font-black text-3xl text-white-text">{value}</p>
        <p className="text-gray-text text-sm mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: '#1f1f1f',
    border: '1px solid rgba(255,30,30,0.2)',
    borderRadius: '8px',
    color: '#f5f5f5',
    fontSize: '12px',
  },
  cursor: { fill: 'rgba(255,30,30,0.05)' },
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(DEFAULT_STATS)
  const [recentContacts, setRecentContacts] = useState([])

  useEffect(() => {
    adminApi.getStats()
      .then(({ data }) => setStats(data))
      .catch(() => {})

    adminApi.getContacts()
      .then(({ data }) => setRecentContacts((data.data || data).slice(0, 5)))
      .catch(() => {})
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display font-bold text-2xl text-white-text">Dashboard</h1>
        <p className="text-gray-text text-sm mt-1">
          Resumen de tu portafolio y actividad reciente
        </p>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FaProjectDiagram} label="Proyectos"    value={stats.projects} delay={0.05} />
        <StatCard icon={FaCode}           label="Habilidades"  value={stats.skills}   delay={0.1}  />
        <StatCard icon={FaCogs}           label="Servicios"    value={stats.services} delay={0.15} />
        <StatCard icon={FaEnvelope}       label="Contactos"    value={stats.contacts}
          sub={stats.unread > 0 ? `${stats.unread} nuevos` : undefined}
          delay={0.2}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 p-6 rounded-2xl"
          style={{
            background: 'rgba(18,18,18,0.9)',
            border: '1px solid rgba(42,42,42,0.8)',
          }}
        >
          <h3 className="font-display font-semibold text-white-text mb-1 text-sm">
            Contactos por mes
          </h3>
          <p className="text-gray-dim text-xs mb-6">Mensajes recibidos en el año</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_CONTACTS} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,42,42,0.6)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#666', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip {...CHART_TOOLTIP_STYLE} />
              <Bar dataKey="contacts" fill="#ff1e1e" radius={[6, 6, 0, 0]}
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,30,30,0.4))' }}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(18,18,18,0.9)',
            border: '1px solid rgba(42,42,42,0.8)',
          }}
        >
          <h3 className="font-display font-semibold text-white-text mb-1 text-sm">
            Skills por categoría
          </h3>
          <p className="text-gray-dim text-xs mb-4">Distribución del stack</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {PIE_DATA.map(({ color, name }) => (
                  <Cell key={name} fill={color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE.contentStyle}
                formatter={(value, name) => [`${value} skills`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {PIE_DATA.map(({ name, value, color }) => (
              <div key={name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <span className="text-gray-text">{name}</span>
                </div>
                <span className="text-white-text font-medium">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(18,18,18,0.9)',
          border: '1px solid rgba(42,42,42,0.8)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-semibold text-white-text text-sm">
              Contactos recientes
            </h3>
            <p className="text-gray-dim text-xs mt-0.5">Últimos mensajes recibidos</p>
          </div>
          <a href="/admin/contacts" className="text-red-main text-xs hover:underline">
            Ver todos →
          </a>
        </div>

        {recentContacts.length === 0 ? (
          <div className="text-center py-8 text-gray-dim text-sm">
            No hay contactos aún
          </div>
        ) : (
          <div className="space-y-3">
            {recentContacts.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'rgba(31,31,31,0.5)', border: '1px solid rgba(42,42,42,0.6)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #ff1e1e, #cc0000)' }}
                  >
                    {c.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <p className="text-white-text text-sm font-medium">{c.name}</p>
                    <p className="text-gray-dim text-xs">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {c.read_at ? (
                    <FaCheckCircle size={13} className="text-green-400" />
                  ) : (
                    <FaClock size={13} className="text-yellow-400" />
                  )}
                  <span className={`text-xs ${c.read_at ? 'text-gray-dim' : 'text-yellow-400'}`}>
                    {c.read_at ? 'Leído' : 'Nuevo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
