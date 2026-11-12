# 📋 PROJECT.md — Portfolio René Mejillón
> Documentación técnica completa para desarrollo con IA y equipos.  
> Última actualización: 12 Nov 2026 | Mantenida por: René Mejillón / Antigravity AI

---

## 🗂️ Índice

1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Variables de Entorno](#variables-de-entorno)
5. [Deploy & Infraestructura](#deploy--infraestructura)
6. [API Reference](#api-reference)
7. [Seguridad — Estado Actual](#seguridad--estado-actual)
8. [Flujo de Trabajo Git](#flujo-de-trabajo-git)
9. [Comandos Frecuentes](#comandos-frecuentes)
10. [Plan de Mejoras Priorizadas](#plan-de-mejoras-priorizadas)
11. [Guía para Agentes de IA](#guía-para-agentes-de-ia)

---

## ⚙️ Stack Tecnológico

### Frontend
| Tecnología | Versión | Rol |
|-----------|---------|-----|
| React | 18.3.1 | UI framework (SPA) |
| Vite | 8.0.10 | Build tool + dev server |
| React Router DOM | 6.22.3 | Enrutamiento SPA |
| Tailwind CSS | 3.4.4 | Estilos utility-first |
| Framer Motion | 11.2.10 | Animaciones |
| Axios | 1.15.2 | HTTP client |
| React Helmet Async | 2.0.4 | SEO / meta tags |
| React Hot Toast | 2.4.1 | Notificaciones UI |
| React Icons | 5.2.1 | Iconografía |
| React Type Animation | 3.2.0 | Efecto de escritura (Hero) |
| React CountUp | 6.5.3 | Animación de contadores |
| React Intersection Observer | 9.10.3 | Lazy animations on scroll |
| Recharts | 2.12.7 | Gráficos (panel admin) |
| Zustand | 4.5.2 | State management (admin) |
| Clsx | 2.1.1 | Clases condicionales |

### Backend
| Tecnología | Versión | Rol |
|-----------|---------|-----|
| PHP | 8.2+ | Lenguaje |
| Laravel | 12.x | Framework API REST |
| Laravel Sanctum | 4.3 | Autenticación (Bearer token) |
| PostgreSQL | 14+ | Base de datos producción |
| SQLite | — | Base de datos desarrollo (opcional) |

### DevOps & Infra
| Servicio | Rol |
|---------|-----|
| Vercel | Deploy frontend (auto-deploy desde `main`) |
| Render | Deploy backend (Docker) |
| GitHub | Repositorio: `rmsolutionstec/rene-mejillon-dev` |
| Docker | Containerización del backend Laravel (php:8.2-cli) |

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────┐
│          USUARIO / NAVEGADOR             │
└──────────────┬──────────────────────────┘
               │ HTTPS
               ▼
┌─────────────────────────────────────────┐
│   VERCEL — Frontend React (SPA)          │
│   https://rene-mejillon-dev.vercel.app   │
│                                          │
│   ┌─────────┐  ┌──────────────────────┐  │
│   │ / Home  │  │ /admin/* (protegido) │  │
│   └─────────┘  └──────────────────────┘  │
└──────────────┬──────────────────────────┘
               │ Axios + Bearer Token
               │ CORS controlado
               ▼
┌─────────────────────────────────────────┐
│   RENDER — Backend Laravel 12 API        │
│   https://rene-mejillon-api.onrender.com │
│                                          │
│   /api/projects    (GET — público)       │
│   /api/skills      (GET — público)       │
│   /api/services    (GET — público)       │
│   /api/contact     (POST — público)      │
│   /api/admin/*     (Bearer — protegido)  │
│                                          │
│   Docker (php:8.2-cli)                   │
└──────────────┬──────────────────────────┘
               │ pgsql SSL (require)
               ▼
┌─────────────────────────────────────────┐
│   RENDER — PostgreSQL 14                 │
│   rene-mejillon-db (plan free, Oregon)   │
└─────────────────────────────────────────┘
```

**Patrón de datos:**
Los datos pueden venir de **dos fuentes** según disponibilidad de la API:
1. **Estático** (`src/data/portfolioData.js`) — fallback siempre disponible
2. **Dinámico** (API Laravel) — proyectos, skills, services, contacts desde la DB

---

## 📁 Estructura de Archivos

```
rene-mejillon-dev/                     ← Raíz del monorepo
├── .gitignore                         ← Ignora .env, node_modules, vendor, dist
├── AGENTS.md                          ← Configuración de agentes IA
├── PROJECT.md                         ← Este archivo — documentación técnica
├── README.md                          ← README público del proyecto
├── render.yaml                        ← Config declarativa Render (backend + DB)
│
├── backend/                           ← Laravel 12 API REST
│   ├── .env                           ← ⚠️ Local only — NUNCA subir a git
│   ├── .env.example                   ← Plantilla pública (sin valores reales)
│   ├── Dockerfile                     ← php:8.2-cli para Render
│   ├── composer.json                  ← Dependencias PHP
│   ├── app/
│   │   ├── Http/Controllers/API/
│   │   │   ├── AuthController.php     ← Login/logout/me (Sanctum)
│   │   │   ├── ContactController.php  ← Formulario de contacto
│   │   │   ├── ProjectController.php  ← CRUD proyectos
│   │   │   ├── SkillController.php    ← CRUD skills
│   │   │   ├── ServiceController.php  ← CRUD servicios
│   │   │   └── StatsController.php    ← Stats del dashboard admin
│   │   └── Models/
│   │       ├── Contact.php
│   │       ├── Project.php
│   │       ├── Service.php
│   │       ├── Skill.php
│   │       └── User.php
│   ├── config/
│   │   ├── cors.php                   ← CORS config (restringido por dominio)
│   │   └── sanctum.php                ← Token auth config
│   ├── database/
│   │   ├── migrations/                ← 6 tablas: users, PAT, projects, skills, services, contacts
│   │   └── seeders/
│   │       └── DatabaseSeeder.php     ← Crea admin user desde env vars
│   ├── routes/
│   │   └── api.php                    ← Todas las rutas API
│   └── public/
│       └── .htaccess                  ← Rewrite rules para Laravel
│
└── frontend/                          ← React + Vite SPA
    ├── .env                           ← ⚠️ Local only — solo VITE_API_URL
    ├── .env.example                   ← Plantilla pública
    ├── vercel.json                    ← Config Vercel: rewrites SPA + security headers
    ├── vite.config.js                 ← Build config con code splitting
    ├── tailwind.config.js
    ├── index.html                     ← Entry point HTML con meta SEO
    ├── public/
    │   ├── favicon.svg
    │   └── images/                    ← Imágenes de proyectos (JPG)
    └── src/
        ├── main.jsx                   ← Entry React (BrowserRouter + HelmetProvider)
        ├── App.jsx                    ← Router principal + ProtectedRoute
        ├── index.css                  ← Design system (variables CSS + Tailwind)
        ├── data/
        │   └── portfolioData.js       ← Datos estáticos del portfolio (fallback)
        ├── pages/
        │   ├── Home.jsx               ← Página principal (todas las secciones)
        │   └── admin/
        │       ├── Login.jsx
        │       ├── AdminLayout.jsx
        │       ├── Dashboard.jsx
        │       ├── AdminProjects.jsx
        │       ├── AdminSkills.jsx
        │       ├── AdminServices.jsx
        │       └── AdminContacts.jsx
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx
        │   │   ├── Footer.jsx
        │   │   └── Loader.jsx
        │   └── sections/
        │       ├── Hero.jsx
        │       ├── About.jsx
        │       ├── Skills.jsx
        │       ├── Projects.jsx
        │       ├── Services.jsx
        │       ├── Experience.jsx
        │       ├── Testimonials.jsx
        │       └── Contact.jsx
        └── services/
            └── api.js                 ← Axios + interceptors + publicApi + adminApi
```

---

## 🔐 Variables de Entorno

> ADVERTENCIA: Los archivos `.env` reales NUNCA se suben a git.
> Usar las variables del dashboard de Render/Vercel en producción.

### `backend/.env` (local — referencia de claves)
```env
APP_NAME="René Mejillón Dev"
APP_ENV=local                    # producción: production
APP_KEY=base64:...               # artisan key:generate
APP_DEBUG=true                   # producción: false ← CRÍTICO
APP_URL=http://localhost:8000    # producción: https://tu-api.onrender.com

LOG_LEVEL=debug                  # producción: error

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=rene_mejillon_dev
DB_USERNAME=postgres
DB_PASSWORD=***                  # Solo en Render via fromDatabase
DB_SSLMODE=prefer                # producción: require

ADMIN_EMAIL=admin@renemejillon.dev
ADMIN_PASSWORD=***               # Solo en Render env vars dashboard

SANCTUM_STATEFUL_DOMAINS=localhost:3000
CORS_ALLOWED_ORIGINS=http://localhost:3000

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false            # producción: true
```

### `frontend/.env` (local)
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=René Mejillón Portfolio
VITE_APP_ENV=development
```

---

## 🚀 Deploy & Infraestructura

### Frontend — Vercel
- **Trigger:** Push a `main` → auto-deploy
- **Build:** `npm run build` desde `/frontend`
- **Output:** `dist/`
- **Rewrites:** Todo a `index.html` (SPA)
- **Headers:** `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`

### Backend — Render (Docker)
- **Dockerfile:** `php:8.2-cli`
- **Start:** `php artisan serve --host=0.0.0.0 --port=${PORT:-8000}`
- **Health check:** `GET /api/projects`
- **Plan:** Free tier (spin-down tras inactividad → latencia inicial ~30s)
- **DB:** PostgreSQL en Render Free (Oregon)

---

## 📡 API Reference

### Públicas (sin auth)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/projects` | Lista todos los proyectos |
| GET | `/api/projects/{id}` | Detalle de un proyecto |
| GET | `/api/skills` | Lista todas las habilidades |
| GET | `/api/services` | Lista todos los servicios |
| GET | `/api/services/{id}` | Detalle de un servicio |
| POST | `/api/contact` | Enviar mensaje de contacto |

**Body POST /api/contact:**
```json
{
  "name": "string (max 150, required)",
  "email": "email (max 200, required)",
  "subject": "string (max 200, nullable)",
  "service": "string (max 150, nullable)",
  "message": "string (max 3000, required)"
}
```

### Admin (Bearer Token requerido)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login → retorna token |
| POST | `/api/admin/logout` | Logout (revoca token) |
| GET | `/api/admin/me` | Usuario autenticado |
| GET | `/api/admin/stats` | Stats del dashboard |
| GET/POST | `/api/admin/projects` | CRUD proyectos |
| PUT/DELETE | `/api/admin/projects/{id}` | Editar/eliminar proyecto |
| GET/POST | `/api/admin/skills` | CRUD skills |
| PUT/DELETE | `/api/admin/skills/{id}` | Editar/eliminar skill |
| GET/POST | `/api/admin/services` | CRUD servicios |
| PUT/DELETE | `/api/admin/services/{id}` | Editar/eliminar servicio |
| GET | `/api/admin/contacts` | Lista mensajes de contacto |
| PATCH | `/api/admin/contacts/{id}/read` | Marcar como leído |
| DELETE | `/api/admin/contacts/{id}` | Eliminar contacto |

**Header requerido:** `Authorization: Bearer {token}`

---

## 🔐 Seguridad — Estado Actual

### ✅ Verificado — Seguro
- `.env` real **NO está en git** (verificado con `git log --all -- backend/.env`)
- `.env.example` solo tiene placeholders (`changeme_before_deploy`)
- `DatabaseSeeder` usa `env()` — no hardcodea contraseñas reales
- `render.yaml` usa `fromDatabase` — DB credentials auto-inyectadas
- `sourcemap: false` en build de producción
- Headers de seguridad en `vercel.json`
- CORS restringido por dominio

### ⚠️ Pendiente de Implementar
| Prioridad | Issue | Archivo |
|-----------|-------|---------|
| 🔴 Alta | Sin rate limiting en `/contact` y `/admin/login` | `routes/api.php` |
| 🔴 Alta | Token en `localStorage` (vulnerable a XSS) | `api.js`, `App.jsx` |
| 🟠 Media | Sin CSP header | `vercel.json` |
| 🟠 Media | Tokens Sanctum sin expiración (`null`) | `sanctum.php` |
| 🟠 Media | `SESSION_ENCRYPT=false` local | `.env` |
| 🟠 Media | `ProtectedRoute` no valida token contra API | `App.jsx` |
| 🟠 Media | `allowed_headers: ['*']` en CORS | `cors.php` |
| 🟡 Baja | Sin `og:image`, `twitter:card`, `canonical` | `index.html` |
| 🟡 Baja | Google Fonts importado dos veces | `index.html` + `index.css` |
| 🟡 Baja | Loader de 2.2s fijo | `App.jsx` |
| 🟡 Baja | `@supabase/supabase-js` instalado sin usar | `node_modules` |

---

## 🌿 Flujo de Trabajo Git

```
main     ← producción (auto-deploy Vercel + Render)
develop  ← integración (recomendado — aún no creado)
feature/* ← nuevas funcionalidades
fix/*    ← correcciones de bugs
hotfix/* ← críticos en producción
```

### Formato de commits (Conventional Commits)
```
feat(seo): agregar og:image y twitter:card
fix(security): agregar rate limiting en contact y login
fix(auth): migrar token de localStorage a sessionStorage
chore(deps): remover supabase no usado
docs: actualizar PROJECT.md
```

**Remote:** `git@github.com:rmsolutionstec/rene-mejillon-dev.git`

---

## 💻 Comandos Frecuentes

### Frontend
```bash
cd frontend
npm run dev          # Dev server → http://localhost:3000
npm run build        # Build producción → dist/
npm run preview      # Preview del build
npm run lint         # ESLint
```

### Backend
```bash
cd backend
php artisan serve                    # Dev server → http://localhost:8000
php artisan migrate                  # Ejecutar migraciones
php artisan db:seed                  # Seedear DB (crea admin user)
php artisan key:generate             # Generar APP_KEY
php artisan config:cache             # Cache config (producción)
php artisan route:cache              # Cache rutas (producción)
php artisan optimize                 # Optimización completa
php artisan tinker                   # REPL interactivo
```

---

## 📅 Plan de Mejoras Priorizadas

### Sprint 1 — Seguridad Crítica
- [ ] Rate limiting: `throttle:3,60` en `/contact`, `throttle:5,1` en `/admin/login`
- [ ] Expiración de tokens Sanctum: `1440` minutos en `sanctum.php`
- [ ] Mover token a `sessionStorage` (mínimo) o cookies httpOnly (ideal)
- [ ] Verificar `APP_DEBUG=false` en Render dashboard

### Sprint 2 — Seguridad Media
- [ ] CSP + HSTS + Permissions-Policy en `vercel.json`
- [ ] `SESSION_ENCRYPT=true` en `.env`
- [ ] `allowed_headers` restrictivo en `cors.php`
- [ ] `AuthContext` con validación real del token vs API

### Sprint 3 — SEO & UX
- [ ] `og:image`, `twitter:card`, `canonical` en `index.html`
- [ ] `robots.txt` y `sitemap.xml` en `frontend/public/`
- [ ] Eliminar doble import de Google Fonts
- [ ] Reducir loader: 2200ms → 800ms
- [ ] `theme-color` → `#0a0a0a`
- [ ] `favicon.ico` como respaldo al SVG
- [ ] `npm uninstall @supabase/supabase-js`

### Sprint 4 — Mejoras de Desarrollo
- [ ] Crear rama `develop` y proteger `main`
- [ ] GitHub Actions: lint + build check en PRs
- [ ] Tests de feature para contacto y login
- [ ] Documentación Swagger del API
- [ ] CV PDF real en `public/cv/rene-mejillon-cv.pdf`

---

## 🤖 Guía para Agentes de IA

### Contexto rápido (pegar al inicio de cada sesión con un agente)
```
Proyecto: Portfolio René Mejillón
Stack: React 18 + Vite (frontend, /frontend) + Laravel 12 API REST (backend, /backend)
Deploy: Vercel (frontend) + Render Docker (backend) + PostgreSQL Render
Auth: Laravel Sanctum Bearer Token (panel admin en /admin/*)
Datos: Estáticos en src/data/portfolioData.js + API dinámica via axios (src/services/api.js)
Repo: github.com/rmsolutionstec/rene-mejillon-dev
Branch: main
Leer siempre: PROJECT.md + AGENTS.md para contexto completo
```

### Reglas para cualquier agente
1. **NUNCA** modificar `backend/.env` real — solo `.env.example`
2. **SIEMPRE** usar `throttle` en rutas POST públicas nuevas
3. **SIEMPRE** validar con `$request->validate()` en controladores
4. **Frontend:** componentes en `src/components/`, páginas en `src/pages/`
5. **Git:** commits en formato Conventional Commits
6. **Código:** PSR-12 en PHP, ESLint config del proyecto en JS/JSX
7. **NO instalar** `@supabase/supabase-js` — fue removido intencionalmente
8. **Fallback:** si la API no está disponible, usar `portfolioData.js`

### Archivos clave a revisar primero
1. `frontend/src/App.jsx` — enrutamiento y auth guard
2. `frontend/src/services/api.js` — toda la comunicación con el backend
3. `backend/routes/api.php` — todas las rutas
4. `backend/app/Http/Controllers/API/` — lógica de endpoints
5. `frontend/src/data/portfolioData.js` — datos estáticos
6. `frontend/vercel.json` — headers de seguridad y rewrites
7. `render.yaml` — configuración de producción backend

### Setup local para el agente
```bash
# Backend
cd backend && php artisan serve
# → http://localhost:8000

# Frontend (en otra terminal)
cd frontend && npm run dev
# → http://localhost:3000

# Admin panel
# http://localhost:3000/admin/login
# Credenciales en backend/.env (ADMIN_EMAIL / ADMIN_PASSWORD)
```
