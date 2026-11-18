> Documento histórico de la etapa con backend (15/11/2026). La arquitectura vigente es estática; consultar STATIC-PORTFOLIO.md, README.md y PROJECT.md antes de seguir instrucciones de API, administrador, seeders o Render.

# AUDIT.md — Diagnóstico Técnico Inicial del Portafolio

**Fecha:** 12 de Noviembre de 2026  
**Auditor:** Tech Lead / Arquitecto de Software Senior  
**Estado General:** Operativo pero con fallos críticos de assets, incoherencias documentales severas y desacoplamiento de datos entre frontend y API.

---

## 1. Verificación de Código, Versiones y Dependencias Reales

| Componente | Documentado en AGENTS/PROJECT | Realidad en Código / Package | Diagnóstico |
|---|---|---|---|
| **React** | "React 19" | `react: ^18.3.1`, `react-dom: ^18.3.1` en `frontend/package.json` | ❌ Incoherencia documental. El proyecto corre en React 18.3.1. No forzar React 19 sin prueba previa de compatibilidad con librerías (ej. Framer Motion 11, Recharts 2). |
| **Vite** | "Vite 6" | `vite: ^8.0.10` en `frontend/package.json` | ⚠️ Diferencia de versión menor. |
| **Laravel** | "Laravel 12" | `laravel/framework: ^12.0` en `backend/composer.json` | ✅ Confirmado Laravel 12. |
| **PHP** | "PHP 8.2+" | `php: ^8.2` y Dockerfile `php:8.2-cli` | ✅ Confirmado. |
| **Sanctum** | "Sanctum 4.3" | `laravel/sanctum: ^4.3` | ✅ Confirmado. |
| **Base de Datos** | "PostgreSQL / SQLite" | `pgsql` configurado en `backend/.env` y `render.yaml` | ✅ Confirmado. |

---

## 2. Diagnóstico del Requisito Crítico: Descarga de CV

### Hallazgo:
1. En `frontend/src/data/portfolioData.js` línea 26 se declara:
   ```javascript
   cvUrl: '/cv/rene-mejillon-cv.pdf'
   ```
2. Botones de descarga activos encontrados en:
   - `Hero.jsx` (línea 244)
   - `About.jsx` (línea 111)
   - `Navbar.jsx` (líneas 145 y 230 - desktop y menú móvil)
   - `Footer.jsx` (línea 188)
3. **Estado Físico:** En `frontend/public/` **NO existe el directorio `cv/` ni ningún archivo `.pdf` en todo el repositorio**.
4. **Comportamiento en Producción/Local:**
   - La regla de reescritura en `vercel.json` (`"source": "/(.*)", "destination": "/index.html"`) intercepta `/cv/rene-mejillon-cv.pdf` al no existir el archivo físico y devuelve el código HTML de la SPA en vez de un PDF binario.
   - Resultado: Al pulsar "Descargar CV", el usuario descarga un archivo corrupto o el navegador muestra la página principal dentro del visor de PDF. **Severidad: ALTA (Impacto directo en reclutadores).**

---

## 3. Desacoplamiento y Duplicación de Datos

### Hallazgo:
- **Páginas Públicas (`Hero`, `About`, `Skills`, `Projects`, `Services`, `Experience`, `Testimonials`):**  
  Todas importan de forma estática `src/data/portfolioData.js`. **No consumen los endpoints de la API de Laravel**.
- **Formulario de Contacto:**  
  Es el único componente público que consume la API (`POST /api/contact` vía `publicApi.sendContact`).
- **Backend API (`/api/projects`, `/api/skills`, `/api/services`):**  
  Existe una estructura CRUD completa en `backend/app/Http/Controllers/API/`, pero **solo la usa el panel de administración privado (`/admin/*`)**.
- **Incoherencia entre Seeders y Frontend:**  
  - En `backend/database/seeders/ProjectSeeder.php`, la Academia Luz al Mundo dice `"Vue.js, Redis, 2023"`.
  - En `frontend/src/data/portfolioData.js`, dice `"Laravel 12, React 19, Inertia 2, MySQL"`.
  - En `ProjectSeeder.php`, Fundación Clínica del Alma dice `"Stripe, citas en línea, área de pacientes con historial"`, lo cual es falso y contradice las evidencias del proyecto.

---

## 4. Auditoría de Documentación Heredada (`AGENTS.md`)

### Hallazgo:
- `AGENTS.md` inicia con:  
  `# AGENTS.md — Equipo de Desarrollo: Academia Luz al Mundo`
- Lista 29 controladores que pertenecen a la Academia (`DanceClassCrudController`, `AttendanceCrudController`, `PaymentCrudController`, etc.) y 19 modelos de baile/escuela.
- **Riesgo:** Cualquier agente autónomo (Codex, Antigravity, Cursor) que lea `AGENTS.md` asume que está trabajando sobre una academia de danza y no sobre el portafolio profesional de René Mejillón, generando alucinaciones o modificaciones erróneas.
- **Acción requerida:** Sanitizar y actualizar `AGENTS.md` para reflejar exclusivamente el portafolio y los roles reales del equipo de trabajo.

---

## 5. Auditoría de Proyectos Presentados en el Portafolio

Actualmente `portfolioData.js` solo muestra **4 proyectos** (Academia Luz al Mundo, Fundación Clínica del Alma, Alpha Publicidad y Soporte, y Portfolio).  
Faltan los proyectos de software distribuible, automatización e infraestructura:
1. `Alpha Studio TTS Latino` (PySide6 + Edge TTS + FFmpeg) — ¡Prioridad visual alta por ser software de escritorio distribuible!
2. `Alpha Studio — Producción Audiovisual con IA` (Python + n8n + Ollama + Qwen + OCR + Kokoro).
3. `AlphaServer` (Infraestructura Linux propia, Tailscale, Docker, Nginx, automatizaciones).
4. `Aniversario` (Experiencia web interactiva secundaria).
5. Corregir el nombre y alcance de `Alpha Ecuador` (sustituyendo descripciones genéricas de ecommerce no verificado).

---

## 6. Métricas y Afirmaciones sin Evidencia (Sobreventa)

En `portfolioData.js` y componentes existen métricas que deben reemplazarse por experiencia demostrada:
- Porcentajes arbitrarios de habilidades: `React.js: 95%`, `Vite: 100%`, `Laravel: 96%`, `Tailwind: 96%`, `Git: 96%`.
- Estadísticas del Hero: `satisfaction: 100%`, `clients: 25` (no verificables públicamente).
- Servicios con precios genéricos (`Desde $800`, `Desde $600`) sin aprobación explícita.
- Años de experiencia: La presentación actual dice "Más de 5 años como Full Stack", cuando la trayectoria es integral: soporte e infraestructura desde 2015, y desarrollo de software con titulación en 2025.
