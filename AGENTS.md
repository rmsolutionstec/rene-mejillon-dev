# AGENTS.md — Equipo de Especialistas IA: Portafolio Profesional de René Mejillón

> **Propósito:** Este archivo define las directivas, contexto técnico, mapa de archivos y responsabilidades de los agentes de Inteligencia Artificial (Antigravity, OpenAI Codex, Cursor, GitHub Copilot) asignados a este proyecto.  
> **Última actualización:** Noviembre 2026 | Nivel Enterprise | 100% Alineado al Portafolio Profesional.

---

## 1. CONTEXTO GLOBAL DEL PROYECTO

| Dimensión | Detalle Verificado en Código |
|---|---|
| **Nombre** | Portafolio Profesional de René Mejillón |
| **Dominio Producción** | https://rene-mejillon-dev.vercel.app |
| **Repositorio** | `rmsolutionstec/rene-mejillon-dev` |
| **Frontend** | React 18.3.1, Vite 8, Tailwind CSS 3.4, Framer Motion, Axios, React Helmet Async |
| **Backend** | Laravel 12 API REST, PHP 8.2+ (Docker php:8.2-cli en Render) |
| **Autenticación** | Laravel Sanctum (Tokens Bearer con expiración 24h para panel `/admin/*`) |
| **Base de Datos** | PostgreSQL (Render en producción) / SQLite o PostgreSQL (desarrollo local) |
| **Arquitectura** | SPA desacoplada (sin Inertia ni SSR en este repo). Carga instantánea vía `portfolioData.js` con API REST para contacto y panel admin. |
| **Rol Único** | `admin` (gestión de proyectos, habilidades, servicios y contactos). |

### Los 8 Proyectos Reales a Representar (con evidencias de repositorios)
1. **Academia Luz al Mundo** (`rmsolutionstec/academialuzalmundo` - privado): Plataforma de gestión educativa multi-rol con pagos y reportes PDF. Laravel 12 + React 19 + Inertia 2 + MySQL.
2. **Fundación Clínica del Alma** (`rmsolutionstec/fundacionclinicadelalma` - privado): Portal institucional y gestión multimedia/audiovisual. Laravel + React + MySQL.
3. **Alpha Ecuador** (`rmsolutionstec/alphaecuador_app` - privado): Plataforma corporativa y catálogo modular de servicios tecnológicos.
4. **Alpha Studio TTS Latino** (`rmsolutionstec/alpha-ecuador-tts` - PÚBLICO): Aplicación de escritorio en Python/PySide6 con Edge TTS y procesamiento de audio/subtítulos con FFmpeg. **Prioridad visual alta**.
5. **Alpha Studio — Producción con IA**: Automatización de generación de contenidos audiovisuales con Python, n8n, Ollama, Qwen, OCR y Kokoro.
6. **AlphaServer**: Infraestructura Linux local/remota para servicios privados, Docker, Tailscale, Nginx y automatizaciones.
7. **Portafolio René Mejillón** (`rmsolutionstec/rene-mejillon-dev` - PÚBLICO): Este proyecto. SPA React 18 + API REST Laravel 12.
8. **Aniversario** (`rmsolutionstec/aniversario` - privado): Experiencia interactiva multimedia en frontend.

---

## 2. REGLAS MANDATORIAS PARA TODOS LOS AGENTES

### Actualización de contenido del propietario — 15/11/2026

Para las siguientes mejoras, aplicar la matriz vigente de `docs/portfolio-upgrade/CONTENT-VERIFICATION.md`, contrastada con el documento aportado y las secciones visibles de LinkedIn. Esta actualización sustituye los datos incompatibles anteriores de este archivo y las skills:

- Trayectoria TI desde mayo de 2008: RM Solutions Tec hasta julio de 2023; Alpha Publicidad, Soporte y Desarrollo desde agosto de 2023. REMETECS es un seudónimo profesional.
- Experiencia práctica con Laravel/React desde 2023; no convertir toda la trayectoria TI en antigüedad full stack.
- Posicionamiento principal: desarrollo full stack con PHP, Laravel, JavaScript, React, MySQL e Inertia.js; soporte e infraestructura como trayectoria previa.
- Academia Luz al Mundo es el proyecto principal: desarrollo individual, en uso y evolución continua, enero de 2025–actualidad según información aportada. Fundación es el segundo caso: portal institucional, desarrollo individual, julio–diciembre de 2025 según información aportada. No confundir fechas de proyectos y vínculos laborales.
- Mantener los ocho proyectos en inventario y revalidar sus fichas; la prioridad previa de TTS pasa a ser complementaria frente a Academia.
- Python/Django: experiencia académica; Linux/Docker: aprendizaje aplicado. Diferenciar proyectos personales comprobados de servicios comerciales consolidados.
- Contacto profesional: `renemejillon@alphaecuador.com`; servicios Alpha: `contacto@alphaecuador.com`.
- Estudios: diciembre 2022–junio 2025; registro del título: 17/06/2026. Omitir cédula e identificadores personales de certificados.
- No publicar capturas con datos reales; usar copia aislada, datos sintéticos completos y rótulo de demostración.
- Mantener coherencia entre web, CV aprobado, datos/API/seeders y metadatos. No alterar producción sin autorización expresa.

1. **Inspeccionar antes de modificar:** Nunca asumir la existencia de archivos o rutas; verificarlos con herramientas de lectura o consola.
2. **Cero Secretos en Git:** NUNCA crear, editar ni commitear archivos `.env` reales con claves privadas. Usar siempre `.env.example` con placeholders.
3. **No romper la descarga del CV:** El archivo `frontend/public/cv/rene-mejillon-cv.pdf` debe mantenerse accesible y con cabecera binaria `%PDF-` válida.
4. **Sin Sobreventa ni Métricas Inventadas:** Prohibido usar barras de porcentaje arbitrarias (95%, 100%) en habilidades o inventar testimonios/clientes.
5. **Convenciones de Commits:** Utilizar siempre formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
6. **Aislamiento y no-colisión:** No editar múltiples agentes el mismo archivo de forma concurrente.
7. **Prohibido desplegar sin autorización:** No ejecutar `git push origin main` ni alterar producción sin visto bueno del usuario.

---

## 3. EQUIPO DE ESPECIALISTAS Y MATRIZ DE RESPONSABILIDADES

### AGENTE 1: `tech-lead-coordinator`
- **Misión:** Coordinador general, control de dependencias, auditoría de coherencia entre frontend/backend y validación final de releases.
- **Archivos:** `docs/*`, `PROJECT.md`, `README.md`, `AGENTS.md`.

### AGENTE 2: `fullstack-architect` (Laravel & Backend)
- **Misión:** Especialista en Laravel 12 API REST, controladores, modelos Eloquent, migraciones, seeders, Docker, Sanctum y CORS.
- **Archivos:** `backend/app/*`, `backend/routes/api.php`, `backend/config/*`, `backend/database/*`, `render.yaml`.
- **Estándares:** PSR-12, Form Requests para validación, sanitización con `strip_tags()`, rate limiting con middleware `throttle`.

### AGENTE 3: `frontend-ux-expert` (React, Vite & Tailwind)
- **Misión:** Especialista en interfaz, componentes reutilizables, experiencia de usuario, diseño responsive, Tailwind CSS y Framer Motion.
- **Archivos:** `frontend/src/*`, `frontend/index.html`, `frontend/tailwind.config.js`.
- **Estándares:** React 18 funcional, hooks idiomáticos, accesibilidad WCAG AA, soporte para `prefers-reduced-motion`.

### AGENTE 4: `content-verification-expert`
- **Misión:** Custodio de la veracidad profesional de René Mejillón. Verifica que la trayectoria desde 2015, los 8 proyectos y las habilidades reflejen evidencias reales de repositorios y experiencia comprobada.
- **Archivos:** `frontend/src/data/portfolioData.js`, `docs/portfolio-upgrade/CONTENT-VERIFICATION.md`.

### AGENTE 5: `resume-pdf-expert`
- **Misión:** Especialista en currículum profesional compatible con ATS (Applicant Tracking Systems). Generación, validación de integridad física y garantía de descarga sin 404 en el portal.
- **Archivos:** `frontend/public/cv/*`, `docs/portfolio-upgrade/CV-IMPLEMENTATION.md`.

### AGENTE 6: `qa-security-devops`
- **Misión:** Aseguramiento de calidad técnica, validación de compilación (`npm run build`), pruebas de endpoints, headers HTTP de seguridad (CSP, HSTS) y checklist pre-release.
- **Archivos:** `frontend/vercel.json`, `.agents/skills/*`, `docs/portfolio-upgrade/QA-CHECKLIST.md`.

---

## 4. CATÁLOGO DE SKILLS OPERATIVAS

Ubicadas en `.agents/skills/`:
- **`fullstack-security-audit`**: Auditoría de secretos en Git, headers HTTP y rate limiting.
- **`portfolio-content-verification`**: Control de veracidad técnica y matriz de proyectos comprobados.
- **`resume-ats-pdf`**: Mantenimiento, formato ATS y prueba de descarga física del CV.
- **`portfolio-ui-qa`**: Verificación de responsive en móvil/tablet/desktop, teclado y accesibilidad.
- **`portfolio-data-consistency`**: Sincronización entre `portfolioData.js` y seeders de Laravel.
- **`portfolio-release-check`**: Validaciones obligatorias previas a cualquier despliegue.

---

## 5. MAPA DE ARCHIVOS CLAVE DEL SISTEMA

```
rene-mejillon-dev/
├── .agents/
│   ├── rules/security-and-dev.md      <- Reglas automáticas para editores IA
│   └── skills/                         <- 6 skills operativas
├── docs/portfolio-upgrade/             <- Suite de documentación maestra de 10 archivos
├── PROJECT.md                          <- Especificación técnica del proyecto
├── AGENTS.md                           <- Este archivo de coordinación
├── render.yaml                         <- Configuración de Docker/PostgreSQL en Render
│
├── backend/                            <- Laravel 12 API REST
│   ├── app/Http/Controllers/API/       <- Auth, Contact, Project, Skill, Service, Stats
│   ├── config/cors.php & sanctum.php   <- Seguridad de orígenes y tokens con expiración
│   ├── database/seeders/               <- Datos de base de datos
│   └── routes/api.php                  <- Rutas protegidas con throttle y Sanctum
│
└── frontend/                           <- React 18 + Vite SPA
    ├── public/
    │   ├── cv/rene-mejillon-cv.pdf     <- Ubicación del CV físico oficial
    │   ├── robots.txt & sitemap.xml    <- SEO e indexación
    │   └── images/                     <- Assets de proyectos
    ├── src/
    │   ├── data/portfolioData.js       <- Datos estáticos fidedignos del portafolio
    │   ├── components/sections/        <- Hero, About, Skills, Projects, Services, Experience, Contact
    │   └── services/api.js             <- Cliente Axios + interceptores
    └── vercel.json                     <- CSP, HSTS, rewrites SPA y headers de seguridad
```

---

## 6. COMANDOS DE VALIDACIÓN RÁPIDA

```bash
# Validar compilación frontend
cd frontend && npm run build

# Validar sintaxis PHP
php -l backend/routes/api.php
php -l backend/app/Http/Controllers/API/ContactController.php

# Comprobar presencia del CV
Test-Path "frontend/public/cv/rene-mejillon-cv.pdf"
```
