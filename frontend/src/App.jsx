import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Home from './pages/Home'
import { adminApi } from './services/api'
const AdminLogin = lazy(() => import('./pages/admin/Login'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'))
const AdminSkills = lazy(() => import('./pages/admin/AdminSkills'))
const AdminServices = lazy(() => import('./pages/admin/AdminServices'))
const AdminContacts = lazy(() => import('./pages/admin/AdminContacts'))
function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    if (!localStorage.getItem('admin_token')) { setStatus('unauthorized'); return }
    setStatus('loading')
    adminApi.me().then(() => { if (active) setStatus('ready') }).catch((error) => {
      if (active) setStatus(error.response?.status === 401 ? 'unauthorized' : 'error')
    })
    return () => { active = false }
  }, [attempt])
  if (status === 'unauthorized') return <Navigate to="/admin/login" replace />
  if (status === 'error') return <main className="section-container py-20"><p role="alert">No se pudo verificar la sesión. Revisa la conexión con la API.</p><button className="btn-secondary mt-4" onClick={() => setAttempt((value) => value + 1)}>Reintentar</button></main>
  if (status !== 'ready') return <p className="p-10" role="status">Verificando sesión…</p>
  return children
}
export default function App() {
  const { pathname } = useLocation()
  return <>
    {pathname.startsWith('/admin') && <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>}
    <Suspense fallback={<p className="p-10" role="status">Cargando…</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </>
}
