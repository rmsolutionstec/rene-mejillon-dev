# René Mejillón Dev — Portfolio Full Stack

Portfolio profesional y CV digital de **René Mejillón**, Full Stack Developer especializado en Laravel, React y MySQL.

**Stack:** React 19 + Vite · Laravel 12 API REST · MySQL · Tailwind CSS · Framer Motion

---

## Estructura del proyecto

```
rene-mejillon-dev/
├── frontend/    # React 19 + Vite + Tailwind CSS (deploy → Vercel)
└── backend/     # Laravel 12 API REST            (deploy → Render)
```

---

## Frontend — Setup

```bash
cd frontend
npm install
cp .env.example .env          # editar VITE_API_URL
npm run dev                   # http://localhost:5173
npm run build                 # build de producción
```

### Deploy en Vercel
1. Conecta el repo en [vercel.com](https://vercel.com)
2. Root Directory → `frontend`
3. Variable de entorno: `VITE_API_URL=https://tu-backend.onrender.com/api`
4. El `vercel.json` ya maneja el routing SPA

---

## Backend — Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configurar DB_* en .env
php artisan migrate --seed
php artisan serve                          # http://localhost:8000
```

Ver [backend/README.md](backend/README.md) para la lista completa de endpoints y despliegue en Render.

---

## Panel Admin

Accede en `/admin/login` con las credenciales de `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

| Módulo       | Funcionalidad                                    |
|--------------|--------------------------------------------------|
| Dashboard    | Estadísticas, gráficas mensuales y por categoría |
| Proyectos    | Crear · editar · eliminar proyectos              |
| Habilidades  | CRUD con categorías y nivel porcentual            |
| Servicios    | Gestión de servicios y precios                   |
| Contactos    | Ver mensajes · marcar leídos · eliminar          |

---

## Variables de entorno

### `frontend/.env`
```env
VITE_API_URL=http://localhost:8000/api
```

### `backend/.env` (claves principales)
```env
APP_KEY=                             # php artisan key:generate
DB_DATABASE=rene_mejillon_dev
ADMIN_EMAIL=admin@renemejillon.dev
ADMIN_PASSWORD=cambia_esto
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

---

## Tecnologías utilizadas

### Frontend
- React 19 + Vite 6
- Tailwind CSS 3
- Framer Motion
- React Type Animation
- React Icons
- React Intersection Observer

### Backend
- Laravel 12 + PHP 8.2
- MySQL (producción) / SQLite (dev)
- API REST con Sanctum
- Deployado en Render

### Herramientas & DevOps
- Git & GitHub
- Vercel (frontend)
- Render (backend)
- Docker (Dockerfile incluido)

---

## Proyectos destacados

### 🎓 Academia Luz al Mundo — *Casi terminado*
Plataforma de gestión académica multi-rol (admin, teacher, student, representative, secretary) para academia de danza. Gestión de clases, pagos, asistencias, calificaciones y reportes PDF.

**Stack:** Laravel 12 · React 19 · Inertia 2 · MySQL · Spatie Permission

🔗 https://academialuzalmundo.com

---

### 🏥 Fundación Clínica del Alma — *Casi terminado*
Sistema integral de gestión para fundación de salud mental. Producción audiovisual, transmisiones en vivo y gestión de contenido digital.

**Stack:** Laravel · React · MySQL · Tailwind CSS

🔗 https://fundacionclinicadelalma.org

---

### 🛒 Alpha Publicidad y Soporte Ecommerce — *En desarrollo*
Plataforma ecommerce para empresa de publicidad, soporte técnico y producción multimedia. Catálogo de servicios, pasarela de pagos y módulo de presupuestos.

**Stack:** Laravel · React · MySQL · Stripe · Tailwind CSS

---

### 💼 Portfolio René Mejillón — *Este proyecto*
CV digital y portfolio profesional con diseño dark, efecto terminal interactivo y animaciones. Frontend en Vercel + Backend API en Render.

**Stack:** React 19 · Vite · Laravel 12 · Tailwind CSS · Framer Motion

🔗 https://rene-mejillon-dev.vercel.app

---

## Objetivo profesional

Seguir creciendo como desarrollador Full Stack, construyendo productos digitales modernos, útiles y rentables que generen valor real para clientes y usuarios.

---

## Contacto

📧 Rm.solutions.tec@gmail.com · 📱 +593 981817493 · 📍 Guayaquil, Ecuador

> *La tecnología no solo se usa, se transforma en soluciones.*


---

## Estructura del proyecto

```
rene-mejillon-dev/
├── frontend/    # React 18 + Vite + Tailwind CSS (deploy → Vercel)
└── backend/     # Laravel 10 API REST            (deploy → Railway)
```

---

## Frontend — Setup

```bash
cd frontend
npm install
cp .env.example .env          # editar VITE_API_URL
npm run dev                   # http://localhost:3000
npm run build                 # build de producción
```

### Deploy en Vercel
1. Conecta el repo en [vercel.com](https://vercel.com)
2. Root Directory → `frontend`
3. Variable de entorno: `VITE_API_URL=https://tu-backend.railway.app/api`
4. El `vercel.json` ya maneja el routing SPA

---

## Backend — Setup

```bash
cd backend
composer create-project laravel/laravel . "^10"   # instalar Laravel
# Copiar los archivos del repo (routes, Models, Controllers, migrations, seeders)
cp .env.example .env
php artisan key:generate
# Configurar DB_* en .env
php artisan migrate --seed
php artisan serve                                   # http://localhost:8000
```

Ver [backend/README.md](backend/README.md) para la lista completa de endpoints y despliegue en Railway.

---

## Panel Admin

Accede en `/admin/login` con las credenciales de `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

| Módulo       | Funcionalidad                                   |
|--------------|-------------------------------------------------|
| Dashboard    | Estadísticas, gráficas mensuales y por categoría|
| Proyectos    | Crear · editar · eliminar proyectos             |
| Habilidades  | CRUD con categorías y nivel porcentual           |
| Servicios    | Gestión de servicios y precios                  |
| Contactos    | Ver mensajes · marcar leídos · eliminar         |

---

## Variables de entorno

### `frontend/.env`
```env
VITE_API_URL=http://localhost:8000/api
```

### `backend/.env` (claves principales)
```env
APP_KEY=                          # php artisan key:generate
DB_DATABASE=rene_mejillon_dev
ADMIN_EMAIL=admin@renemejillon.dev
ADMIN_PASSWORD=cambia_esto
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
```

---

## Contacto

📧 Rm.solutions.tec@gmail.com · 📍 Guayaquil, Ecuador

---

## 🚀 Tecnologías que utilizo

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Tailwind CSS

### Backend
- Laravel
- PHP
- Python
- MySQL
- API REST

### Herramientas
- Git & GitHub
- Vercel
- Railway
- Adobe Suite

---

## 📌 Proyectos Destacados

### 🎓 Academia Luz al Mundo
Sistema web institucional con plataforma administrativa escolar.

🔗 https://www.academialuzalmundo.com/

### 🏥 Fundación Clínica del Alma
Sitio web institucional con proyección a sistema autoadministrable.

🔗 https://fundacionclinicadelalma.org/

### 🛒 Próximamente
Sistema Ecommerce escalable orientado a ventas online.

---

## 📈 Actualmente aprendiendo

- TypeScript
- Next.js
- Docker
- Arquitectura escalable
- Automatización de procesos

---

## 🎯 Objetivo Profesional

Seguir creciendo como desarrollador Full Stack, creando productos digitales modernos, útiles y rentables.

---

## 📫 Contacto

📧 Rm.solutions.tec@gmail.com  
📍 Guayaquil, Ecuador

---

## ⚡ Frase personal

> La tecnología no solo se usa, se transforma en soluciones.
