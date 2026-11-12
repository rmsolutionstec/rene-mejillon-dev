---
name: fullstack-security-audit
description: >-
  Auditoría completa de seguridad (ciberseguridad) y calidad para proyectos
  Full Stack con React + Laravel API REST (o cualquier SPA + backend REST).
  Revisa git history de secretos, headers HTTP, CORS, autenticación, rate
  limiting, SEO, accesibilidad y genera documentación PROJECT.md lista para
  trabajar con cualquier agente de IA (Antigravity, Codex, Cursor, Copilot).
  Aplica fixes directamente en el código y hace commit con conventional commits.
---

# Skill: fullstack-security-audit

## Cuándo activar este skill

Usar cuando el usuario pida:
- "revisar seguridad del proyecto"
- "auditar vulnerabilidades"
- "hacer un security check"
- "documentar el proyecto para IA"
- "crear PROJECT.md"
- "preparar el proyecto para trabajar con otro agente"

---

## FASE 1 — Discovery & Git History (hacer todo en paralelo)

### 1.1 Explorar estructura del proyecto
```bash
# Mapa de archivos (sin node_modules ni vendor)
Get-ChildItem -Recurse -Depth 4 | Where-Object { 
  $_.FullName -notmatch 'node_modules|vendor|\.git|dist|build' 
} | Select-Object FullName
```

### 1.2 Verificar si secretos fueron al git history

> CRÍTICO: ejecutar SIEMPRE antes de cualquier otra acción

```bash
# Buscar .env en todo el historial
git log --all --full-history -- "**/.env" ".env"

# Buscar contenido sensible en todos los commits
git grep -l "DB_PASSWORD\|APP_KEY\|SECRET\|ADMIN_PASSWORD" $(git log --all --format="%H")

# Verificar .env.example por placeholders reales vs seguros
git show HEAD:backend/.env.example
git show HEAD:frontend/.env.example
```

**Si se encuentra un .env con valores reales en el historial:**
1. Alertar INMEDIATAMENTE al usuario
2. Recomendar rotar todas las credenciales expuestas
3. Usar `git filter-repo` o BFG Repo Cleaner para purgar el historial
4. Forzar push y notificar a colaboradores
5. Invalidar cualquier token/key expuesto en los servicios externos

### 1.3 Leer archivos clave de seguridad
Leer en paralelo:
- `backend/config/cors.php`
- `backend/config/sanctum.php`
- `backend/routes/api.php`
- `frontend/vercel.json` (o `netlify.toml`, `nginx.conf`)
- `frontend/index.html`
- `frontend/src/services/api.js` (o el cliente HTTP principal)
- `frontend/src/App.jsx` (o el router principal — buscar ProtectedRoute)
- `.gitignore` (raíz y subcarpetas)

---

## FASE 2 — Checklist de Seguridad

### 2.1 Backend (Laravel / Node / cualquier API REST)

| Check | Qué buscar | Fix |
|-------|-----------|-----|
| `APP_DEBUG` | Debe ser `false` en producción | `.env` / deploy dashboard |
| Rate limiting | `throttle:N,M` en rutas POST públicas (contact, login) | `routes/api.php` |
| CORS `allowed_methods` | No debe ser `['*']` | `cors.php` → lista explícita |
| CORS `allowed_headers` | No debe ser `['*']` | `cors.php` → lista explícita |
| CORS `allowed_origins` | Debe ser lista restringida por dominio | `.env` CORS_ALLOWED_ORIGINS |
| Token expiration | `sanctum.expiration` no debe ser `null` | `sanctum.php` → `1440` min |
| Session encrypt | `SESSION_ENCRYPT=true` en producción | `.env` |
| Validación de inputs | `$request->validate()` + `strip_tags()` en todos los stores públicos | Controladores |
| SQL Injection | Usar Eloquent ORM o query builder con binding — nunca `DB::statement("... $var")` | Modelos |
| Mass assignment | `$fillable` definido explícitamente, nunca `$guarded = []` | Modelos |

### 2.2 Frontend (React / Vue / cualquier SPA)

| Check | Qué buscar | Fix |
|-------|-----------|-----|
| Token storage | `localStorage` es vulnerable a XSS → preferir `sessionStorage` o cookies httpOnly | `api.js` |
| ProtectedRoute | ¿Solo verifica existencia del token o lo valida contra la API? | `App.jsx` → interceptor 401 |
| Loader innecesario | Tiempos fijos de loading > 1000ms | Reducir a 800ms o basarse en estado real |
| CSP header | ¿Está en `vercel.json`/`netlify.toml`/`nginx.conf`? | Agregar `Content-Security-Policy` |
| HSTS header | `Strict-Transport-Security` con `max-age=63072000; includeSubDomains` | Config deploy |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | Config deploy |
| Dependencias sin usar | `@supabase`, paquetes removidos que siguen en `node_modules` | `npm uninstall` |

### 2.3 SEO & Meta Tags

| Check | Qué verificar |
|-------|-------------|
| `og:image` | Debe apuntar a imagen real (1200×630px) |
| `og:url` | URL canónica del sitio |
| `twitter:card` | `summary_large_image` |
| `canonical` | `<link rel="canonical">` |
| `theme-color` | Debe coincidir con el color principal del diseño |
| `robots.txt` | En `public/` → `Allow: /`, `Disallow: /admin/` |
| `sitemap.xml` | En `public/` → lista de URLs indexables |
| Fuentes duplicadas | `@import` en CSS + `<link>` en HTML = 2 requests → eliminar el CSS |
| `favicon.ico` | Respaldo al SVG para apps/emails que no soportan SVG |

### 2.4 Infraestructura & Deploy

| Check | Qué verificar |
|-------|-------------|
| `.gitignore` raíz | ¿Cubre `backend/.env` y `frontend/.env` explícitamente? |
| `render.yaml` | ¿Usa `fromDatabase` para DB credentials? ¿No tiene secrets hardcodeados? |
| Dockerfile | ¿Usa `--no-dev` en composer/npm install? |
| `APP_KEY` en Render | ¿Usa `generateValue: true`? |
| SSL en DB | `DB_SSLMODE=require` en producción |

---

## FASE 3 — Fixes a Aplicar Directamente

### 3.1 Rate limiting (Laravel)
```php
// routes/api.php
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:3,60');  // 3 por hora

Route::post('/admin/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');   // 5 por minuto
```

### 3.2 Expiración de tokens (Laravel Sanctum)
```php
// config/sanctum.php
'expiration' => env('SANCTUM_TOKEN_EXPIRATION', 1440), // 24h
```

### 3.3 CORS restrictivo (Laravel)
```php
// config/cors.php
'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
'allowed_headers' => ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
```

### 3.4 Sanitización de inputs (Laravel)
```php
// En store() de controladores con inputs públicos
$validated['name']    = strip_tags($validated['name']);
$validated['message'] = strip_tags($validated['message']);
```

### 3.5 Headers completos (Vercel)
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
      { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.onrender.com; frame-ancestors 'none'; base-uri 'self';" }
    ]
  }]
}
```

### 3.6 Meta tags SEO (index.html)
```html
<meta property="og:image" content="https://tudominio.com/images/og-preview.jpg" />
<meta property="og:url" content="https://tudominio.com/" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://tudominio.com/images/og-preview.jpg" />
<link rel="canonical" href="https://tudominio.com/" />
```

### 3.7 Eliminar doble import de Google Fonts
```css
/* index.css — ELIMINAR esta línea: */
/* @import url('https://fonts.googleapis.com/...'); */
/* Cargar solo desde <link> en index.html */
```

---

## FASE 4 — Generar PROJECT.md

Después de la auditoría, crear `PROJECT.md` en la raíz del proyecto con:

1. **Stack tecnológico** — tabla con todas las dependencias y versiones
2. **Arquitectura del sistema** — diagrama ASCII del flujo Frontend → Backend → DB
3. **Estructura de archivos** — árbol comentado con rol de cada archivo/carpeta
4. **Variables de entorno** — lista de CLAVES (sin valores reales) con descripción
5. **Deploy & Infraestructura** — cómo funciona el deploy en cada servicio
6. **API Reference** — tabla de endpoints con método, path, auth requerida, body
7. **Seguridad — Estado actual** — qué está bien y qué queda pendiente
8. **Flujo de trabajo Git** — ramas, formato de commits
9. **Comandos frecuentes** — dev, build, migrate, seed, etc.
10. **Plan de mejoras priorizadas** — sprints con checkboxes
11. **Guía para agentes de IA** — contexto rápido + reglas + archivos clave

---

## FASE 5 — Commit de todos los cambios

```bash
# Agregar todos los cambios de seguridad
git add backend/routes/api.php
git add backend/config/sanctum.php
git add backend/config/cors.php
git add backend/app/Http/Controllers/API/ContactController.php
git add frontend/vercel.json
git add frontend/index.html
git add frontend/src/index.css
git add frontend/src/App.jsx
git add frontend/public/robots.txt
git add frontend/public/sitemap.xml
git add PROJECT.md
git add .agents/

git commit -m "fix(security): rate limiting, CSP headers, CORS restrictivo, sanitización inputs, meta SEO"
```

---

## Notas para el agente

- **Nunca borrar credenciales de git history sin alertar primero al usuario** — es una operación destructiva
- **Verificar SIEMPRE** con `git log --all -- "backend/.env"` antes de reportar como seguro
- **Los placeholders en `.env.example`** como `changeme_before_deploy` son SEGUROS — no alertar por ellos
- **El `.env` real** con valores de producción jamás debe aparecer en ningún commit
- **Si se detecta un secreto real en git history**: parar, alertar, pedir confirmación antes de purgar
- **Reportar hallazgos** en un archivo `docs/security-audit-YYYY-MM-DD.md` para trazabilidad
