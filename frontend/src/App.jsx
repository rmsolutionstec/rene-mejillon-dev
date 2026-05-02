import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminSkills from './pages/admin/AdminSkills'
import AdminServices from './pages/admin/AdminServices'
import AdminContacts from './pages/admin/AdminContacts'
import Loader from './components/layout/Loader'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="projects"  element={<AdminProjects />} />
          <Route path="skills"    element={<AdminSkills />} />
          <Route path="services"  element={<AdminServices />} />
          <Route path="contacts"  element={<AdminContacts />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
