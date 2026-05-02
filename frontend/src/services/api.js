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

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnon)

/*
 * Helper: ejecuta una query de Supabase y lanza el error si existe.
 * Retorna { data } para mantener compatibilidad con el patrón
 * `const { data } = await adminApi.xxx()` usado en los componentes.
 * Los componentes hacen `data.data || data`, por lo que:
 *   - listas  → return { data: [...] }  → data.data=undefined → fallback a data (array)
 *   - single  → return { data: item  }  → data.data=undefined → fallback a data (object)
 */
const q = async (query) => {
  const { data, error } = await query
  if (error) throw error
  return { data }
}

/* ============================================================
   PUBLIC API — cualquier visitante puede llamarlo
   ============================================================ */
export const publicApi = {
  getProjects:     () => q(
    supabase.from('projects').select('*')
      .order('featured', { ascending: false })
      .order('year',     { ascending: false })
  ),
  getSkills:       () => q(
    supabase.from('skills').select('*')
      .order('category')
      .order('level', { ascending: false })
  ),
  getServices:     () => q(
    supabase.from('services').select('*')
      .order('popular', { ascending: false })
      .order('id')
  ),
  // Experiencia y testimonios son datos estáticos en portfolioData.js
  getExperience:   () => Promise.resolve({ data: [] }),
  getTestimonials: () => Promise.resolve({ data: [] }),

  sendContact: (payload) => q(
    supabase.from('contacts').insert([{
      name:    payload.name,
      email:   payload.email,
      subject: payload.subject  || null,
      service: payload.service  || null,
      message: payload.message,
    }])
  ),
}

/* ============================================================
   ADMIN API — requiere sesión Supabase Auth
   ============================================================ */
export const adminApi = {
  /* ── Auth ── */
  login:  ({ email, password }) =>
    supabase.auth.signInWithPassword({ email, password }),
  logout: () => supabase.auth.signOut(),
  me:     () => supabase.auth.getUser(),

  /* ── Stats (agregación en cliente) ── */
  getStats: async () => {
    const [proj, skill, svc, cont, unread] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('skills')  .select('*', { count: 'exact', head: true }),
      supabase.from('services').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true }),
      supabase.from('contacts').select('*', { count: 'exact', head: true })
              .is('read_at', null),
    ])

    // Contactos últimos 6 meses → agrupados por mes en el cliente
    const since = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data: recent } = await supabase
      .from('contacts').select('created_at').gte('created_at', since)
    const monthMap = {}
    ;(recent || []).forEach((c) => {
      const m = new Date(c.created_at).toLocaleString('en', { month: 'short' })
      monthMap[m] = (monthMap[m] || 0) + 1
    })
    const monthly = Object.entries(monthMap).map(([month, total]) => ({ month, total }))

    // Habilidades por categoría
    const { data: allSkills } = await supabase.from('skills').select('category')
    const catMap = {}
    ;(allSkills || []).forEach((s) => { catMap[s.category] = (catMap[s.category] || 0) + 1 })
    const byCategory = Object.entries(catMap).map(([category, total]) => ({ category, total }))

    return {
      data: {
        projects:   proj.count   ?? 0,
        skills:     skill.count  ?? 0,
        services:   svc.count    ?? 0,
        contacts:   cont.count   ?? 0,
        unread:     unread.count ?? 0,
        monthly,
        byCategory,
      },
    }
  },

  /* ── Projects CRUD ── */
  getProjects:   () => q(
    supabase.from('projects').select('*')
      .order('featured', { ascending: false })
      .order('year',     { ascending: false })
  ),
  createProject: (data) => q(
    supabase.from('projects').insert([data]).select().single()
  ),
  updateProject: (id, data) => q(
    supabase.from('projects').update(data).eq('id', id).select().single()
  ),
  deleteProject: (id) => q(
    supabase.from('projects').delete().eq('id', id)
  ),

  /* ── Skills CRUD ── */
  getSkills:   () => q(
    supabase.from('skills').select('*')
      .order('category')
      .order('level', { ascending: false })
  ),
  createSkill: (data) => q(
    supabase.from('skills').insert([data]).select().single()
  ),
  updateSkill: (id, data) => q(
    supabase.from('skills').update(data).eq('id', id).select().single()
  ),
  deleteSkill: (id) => q(
    supabase.from('skills').delete().eq('id', id)
  ),

  /* ── Services CRUD ── */
  getServices:   () => q(
    supabase.from('services').select('*')
      .order('popular', { ascending: false })
      .order('id')
  ),
  createService: (data) => q(
    supabase.from('services').insert([data]).select().single()
  ),
  updateService: (id, data) => q(
    supabase.from('services').update(data).eq('id', id).select().single()
  ),
  deleteService: (id) => q(
    supabase.from('services').delete().eq('id', id)
  ),

  /* ── Contacts ── */
  getContacts:   () => q(
    supabase.from('contacts').select('*').order('created_at', { ascending: false })
  ),
  markRead:      (id) => q(
    supabase.from('contacts')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id).select().single()
  ),
  deleteContact: (id) => q(
    supabase.from('contacts').delete().eq('id', id)
  ),
}

export default supabase
