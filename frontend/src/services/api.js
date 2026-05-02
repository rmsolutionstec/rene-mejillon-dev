import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL:  BASE_URL,
  timeout:  15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  },
})

/* ─── Request interceptor: attach token ─── */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

/* ─── Response interceptor: handle 401 ─── */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  },
)

/* ============================================================
   PUBLIC API
   ============================================================ */
export const publicApi = {
  getProjects:     () => api.get('/projects'),
  getSkills:       () => api.get('/skills'),
  getServices:     () => api.get('/services'),
  getExperience:   () => api.get('/experience'),
  getTestimonials: () => api.get('/testimonials'),
  sendContact:     (data) => api.post('/contact', data),
}

/* ============================================================
   ADMIN API
   ============================================================ */
export const adminApi = {
  /* Auth */
  login:  (credentials) => api.post('/admin/login',  credentials),
  logout: ()            => api.post('/admin/logout'),
  me:     ()            => api.get('/admin/me'),

  /* Stats */
  getStats: () => api.get('/admin/stats'),

  /* Projects CRUD */
  getProjects:   ()         => api.get('/admin/projects'),
  createProject: (data)     => api.post('/admin/projects', data),
  updateProject: (id, data) => api.put(`/admin/projects/${id}`, data),
  deleteProject: (id)       => api.delete(`/admin/projects/${id}`),

  /* Skills CRUD */
  getSkills:   ()         => api.get('/admin/skills'),
  createSkill: (data)     => api.post('/admin/skills', data),
  updateSkill: (id, data) => api.put(`/admin/skills/${id}`, data),
  deleteSkill: (id)       => api.delete(`/admin/skills/${id}`),

  /* Services CRUD */
  getServices:   ()         => api.get('/admin/services'),
  createService: (data)     => api.post('/admin/services', data),
  updateService: (id, data) => api.put(`/admin/services/${id}`, data),
  deleteService: (id)       => api.delete(`/admin/services/${id}`),

  /* Contacts */
  getContacts:   ()    => api.get('/admin/contacts'),
  markRead:      (id)  => api.patch(`/admin/contacts/${id}/read`),
  deleteContact: (id)  => api.delete(`/admin/contacts/${id}`),
}

export default api

