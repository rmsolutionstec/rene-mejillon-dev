# Reglas de Proyecto: Portfolio René Mejillón
# Compatible con: Antigravity, OpenAI Codex, Cursor (.cursorrules), GitHub Copilot

## 1. Stack Tecnológico
- **Frontend**: React 18/19 + Vite + Tailwind CSS + Framer Motion (en `/frontend`)
- **Backend**: Laravel 12 API REST + PHP 8.2+ + Laravel Sanctum (en `/backend`)
- **Base de Datos**: PostgreSQL en producción (Render) / SQLite o PostgreSQL en desarrollo
- **Despliegue**: Frontend en Vercel, Backend en Render (Docker)

## 2. Directivas de Ciberseguridad Obligatorias
- **Credenciales y Secretos**: NUNCA subir ni commitear `.env`, `.env.production` ni claves API reales. Usar siempre `.env.example` con placeholders.
- **Rate Limiting**: Rutas públicas tipo POST (`/api/contact`, `/api/admin/login`) DEBEN tener middleware de `throttle`.
- **Sanitización**: Todo input público recibido en controladores DEBE pasar por `strip_tags()` y `$request->validate()` antes de guardarse en base de datos.
- **CORS y Sanctum**: Restringir orígenes (`CORS_ALLOWED_ORIGINS`), métodos (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`) y encabezados permitidos.
- **Tokens**: No usar tokens perpetuos. `sanctum.expiration` configurado a 1440 minutos (24 horas).
- **HTTP Security Headers**: Mantener CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff en `vercel.json`.

## 3. Guía de Desarrollo Frontend
- Modos de datos: soportar siempre datos dinámicos de API con fallback a datos estáticos en `src/data/portfolioData.js`.
- Rendimiento: no usar loaders con timeouts mayores a 800ms.
- SEO: Mantener meta tags Open Graph, Twitter Cards, canonical y etiquetas semánticas (`<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`).
- Accesibilidad (a11y): botones interactivos con `aria-label`, contraste adecuado y foco visible.

## 4. Convenciones de Git
- Formato Conventional Commits:
  `feat(scope): descripción`, `fix(scope): descripción`, `docs(scope): descripción`, `refactor(scope): descripción`, `chore(scope): descripción`.
