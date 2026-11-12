# TASKS.md — Backlog de Tareas de Modernización

**Estados permitidos:** `PENDIENTE` | `EN PROGRESO` | `BLOQUEADO` | `EN REVISIÓN` | `COMPLETADO`  
**Regla de Oro:** Ninguna tarea se marca como `COMPLETADO` sin evidencia y validación técnica real.

---

## Matriz de Tareas por Fase

| ID | Fase | Tarea | Responsable | Prioridad | Dependencias | Archivos Afectados | Estado | Validación |
|---|---|---|---|---|---|---|---|---|
| **T0.1** | Fase 0 | Auditoría técnica y verificación de código vs documentación | Tech Lead / Coordinador | Alta | Ninguna | `PROJECT.md`, `AUDIT.md` | `COMPLETADO` | Informe en `AUDIT.md` verificado con `package.json` y `composer.json` |
| **T0.2** | Fase 0 | Comprobar ausencia física del archivo PDF de CV | QA / Seguridad | Crítica | Ninguna | `frontend/public/cv/` | `COMPLETADO` | `Get-ChildItem -Recurse -Filter *.pdf` retorna 0 archivos |
| **T0.3** | Fase 0 | Estructurar carpeta documental `docs/portfolio-upgrade/` | Tech Lead / Coordinador | Alta | Ninguna | `docs/portfolio-upgrade/*` | `COMPLETADO` | 10 archivos documentales creados |
| **T1.1** | Fase 1 | Sanitizar `AGENTS.md` eliminando controladores y roles heredados de la Academia | Arquitectura y Full Stack | Alta | T0.1 | `AGENTS.md` | `COMPLETADO` | `AGENTS.md` refleja únicamente el portafolio y los agentes requeridos |
| **T1.2** | Fase 1 | Crear skill `portfolio-content-verification` | Contenido Profesional | Media | T0.1 | `.agents/skills/portfolio-content-verification/SKILL.md` | `COMPLETADO` | Archivo SKILL.md creado con frontmatter y procedimiento |
| **T1.3** | Fase 1 | Crear skill `resume-ats-pdf` | CV / Documentos | Alta | T0.2 | `.agents/skills/resume-ats-pdf/SKILL.md` | `COMPLETADO` | Archivo SKILL.md con especificación de compilación y verificación de PDF |
| **T1.4** | Fase 1 | Crear skills `portfolio-ui-qa`, `portfolio-data-consistency`, `portfolio-release-check` | QA / DevOps | Media | T0.1 | `.agents/skills/*/SKILL.md` | `COMPLETADO` | Catálogo de skills disponible en `.agents/skills/` |
| **T2.1** | Fase 2 | Redactar perfil profesional y experiencia en `CONTENT-VERIFICATION.md` | Contenido Profesional | Alta | T1.2 | `docs/portfolio-upgrade/CONTENT-VERIFICATION.md` | `PENDIENTE` | Perfil validado con trayectoria desde 2015 y titulación 2025 |
| **T2.2** | Fase 2 | Estructurar matriz de los 8 proyectos reales con estados y tech stacks verificados | Contenido Profesional | Alta | T2.1 | `docs/portfolio-upgrade/CONTENT-VERIFICATION.md` | `PENDIENTE` | 8 proyectos clasificados (implementado / en desarrollo / planificado) |
| **T2.3** | Fase 2 | Actualizar `src/data/portfolioData.js` con proyectos, experiencia real y sin porcentajes | Frontend / UX | Alta | T2.2 | `frontend/src/data/portfolioData.js` | `PENDIENTE` | `portfolioData.js` no contiene barras porcentuales arbitrarias |
| **T3.1** | Fase 3 | Redactar documento base del currículum profesional ATS-friendly | CV / Documentos | Crítica | T2.1 | `docs/portfolio-upgrade/CV-IMPLEMENTATION.md` | `PENDIENTE` | Texto de CV validado y formateado para lectura automatizada |
| **T3.2** | Fase 3 | Generar/incorporar archivo PDF oficial `rene-mejillon-cv.pdf` | CV / Documentos | Crítica | T3.1 | `frontend/public/cv/rene-mejillon-cv.pdf` | `PENDIENTE` | Archivo existe físicamente, pesa > 10KB y contiene texto seleccionable |
| **T3.3** | Fase 3 | Validar y cablear botones de descarga en Hero, About, Navbar y Footer | Frontend / UX | Crítica | T3.2 | `Hero.jsx`, `About.jsx`, `Navbar.jsx`, `Footer.jsx` | `PENDIENTE` | Click en botón descarga PDF válido de inmediato |
| **T4.1** | Fase 4 | Actualizar Hero con nuevo título, propuesta de valor y botones equilibrados | Frontend / UX | Alta | T2.3 | `frontend/src/components/sections/Hero.jsx` | `PENDIENTE` | Título exacto y render responsivo sin saturación |
| **T4.2** | Fase 4 | Actualizar About con narrativa de evolución profesional real | Frontend / UX | Media | T2.3 | `frontend/src/components/sections/About.jsx` | `PENDIENTE` | Texto claro y verificado sin contradicciones |
| **T4.3** | Fase 4 | Rediseñar sección Skills: cambiar porcentajes por categorías y tags de herramientas | Frontend / UX | Alta | T2.3 | `frontend/src/components/sections/Skills.jsx` | `PENDIENTE` | Eliminadas barras de 95%/100%, renderizado limpio |
| **T4.4** | Fase 4 | Reorganizar Projects: filtros por categoría, badges de estado, prioridad a Alpha Studio TTS | Frontend / UX | Alta | T2.3 | `frontend/src/components/sections/Projects.jsx` | `PENDIENTE` | 8 proyectos desplegados con modales y links validados |
| **T4.5** | Fase 4 | Ajustar Services y eliminar precios no aprobados o afirmaciones sobrevendidas | Frontend / UX | Media | T2.3 | `frontend/src/components/sections/Services.jsx` | `PENDIENTE` | Servicios enfocados en capacidades reales demostrables |
| **T5.1** | Fase 5 | Sincronizar Seeders de Laravel (`ProjectSeeder`, `SkillSeeder`, `ServiceSeeder`) | Backend / Datos | Media | T2.3 | `backend/database/seeders/*` | `PENDIENTE` | `php artisan db:seed` inserta datos coherentes con `portfolioData.js` |
| **T6.1** | Fase 6 | Ejecutar suite de pruebas funcionales y responsive en navegadores de escritorio y móvil | QA / Seguridad | Alta | T4.4, T3.3 | `docs/portfolio-upgrade/QA-CHECKLIST.md` | `PENDIENTE` | Lista de chequeo ejecutada con evidencia registrada |
| **T6.2** | Fase 6 | Verificar accesibilidad (WCAG AA), foco, contraste y semántica | QA / Seguridad | Media | T6.1 | Componentes frontend | `PENDIENTE` | Sin errores de accesibilidad bloqueantes |
| **T6.3** | Fase 6 | Verificar compilación de producción y Core Web Vitals | DevOps | Alta | T6.1 | `frontend/dist` | `PENDIENTE` | `npm run build` sin errores ni warnings críticos |
| **T7.1** | Fase 7 | Consolidar Changelog y preparar reporte pre-release para autorización del propietario | Tech Lead / Coordinador | Alta | T6.3 | `docs/portfolio-upgrade/RELEASE-CHECKLIST.md` | `PENDIENTE` | Documento de release listo para revisión del usuario |
