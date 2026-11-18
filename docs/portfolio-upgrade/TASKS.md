> Documento histórico de la etapa con backend (15/11/2026). La arquitectura vigente es estática; consultar STATIC-PORTFOLIO.md, README.md y PROJECT.md antes de seguir instrucciones de API, administrador, seeders o Render.

# TASKS.md — Backlog de Tareas de Modernización

**Estados permitidos:** `PENDIENTE` | `EN PROGRESO` | `BLOQUEADO` | `EN REVISIÓN` | `COMPLETADO`  
**Regla de Oro:** Ninguna tarea se marca como `COMPLETADO` sin evidencia y validación técnica real.

---

## Matriz de Tareas por Fase

### Backlog vigente — 15 de noviembre de 2026

Orden y criterios completos en [MASTER-PLAN.md](./MASTER-PLAN.md#plan-vigente--15-de-noviembre-de-2026). La planificación no cambia los servicios remotos ni autoriza publicaciones.

| ID | Entrega | Tarea | Dependencias | Estado | Evidencia requerida |
|---|---|---|---|---|---|
| N0.1 | 0 | Contrastar LinkedIn y prompt aportado con el contenido actual; registrar límites y discrepancias | Ninguna | COMPLETADO | Matriz vigente de CONTENT-VERIFICATION: titular, Acerca de y experiencia observados directamente; fuentes U/L/R diferenciadas |
| N0.2 | 0 | Alinear Hero/About, contacto y cronología; mantener otros antecedentes reales | N0.1 | COMPLETADO | TI desde 2008, Laravel/React desde 2023, RM Solutions Tec hasta julio 2023 y Alpha desde agosto 2023; correos Alpha correctos |
| N0.3 | 0 | Actualizar Academia/Fundación, orden de proyectos, habilidades y servicios | N0.1 | COMPLETADO | Academia principal en uso desde enero 2025; Fundación portal institucional julio–diciembre 2025; categorías práctica/académica/aprendizaje; demás proyectos conciliados |
| N0.4 | 0 | Revisar CV aprobado, estudios, certificado complementario e idiomas frente a LinkedIn | N0.1 | EN REVISIÓN | Estudios diciembre 2022–junio 2025 y registro junio 2026 separados; inglés básico; candidato sin identificadores personales; descarga vigente preservada |
| N0.5 | 0 | Alinear SEO/seeders y revisar métricas, testimonios y capturas | N0.2, N0.3 | COMPLETADO | Misma información en todas las superficies; testimonios respaldados; métricas acumuladas contextualizadas; capturas solo con datos sintéticos completos |
| N1.1 | 1 | Configurar ESLint, excluir generados y resolver incidencias | Ninguna | COMPLETADO | `npm run lint` retorna 0 |
| N1.2 | 1 | Diagnosticar bootstrap de PHPUnit y ejecutar suite | Ninguna | COMPLETADO | Pruebas ejecutadas, sin fallo de arranque |
| N1.3 | 1 | Preparar CI de frontend/backend y comprobación del CV | N1.1, N1.2 | EN REVISIÓN | Workflow comprobado en PR; artefacto contiene CV con cabecera PDF |
| N1.4 | 1 | Verificar Production/Preview, variables y despliegue de Render; preparar protección de main | N1.3 para checks obligatorios | PENDIENTE | Configuración real documentada; aplicación remota autorizada por separado |
| N2.1 | 2 | Reparar GET administrativos y revisar rutas sin implementación | N1.2 | COMPLETADO | Tests de listados autenticados y acceso anónimo denegado |
| N2.2 | 2 | Corregir estadísticas y retirar valores/gráficas ficticios | N2.1 | COMPLETADO | Dashboard muestra la respuesta real, estados vacíos y errores |
| N2.3 | 2 | Exigir ADMIN_PASSWORD y revisar ciclo de sesión | N1.2 | COMPLETADO | Seeder rechaza configuración incompleta; login/logout/expiración comprobados |
| N2.4 | 2 | Añadir pruebas funcionales de contacto, throttle y CRUD | N2.1, N2.3 | COMPLETADO | Suite cubre validación, acceso y persistencia en BD aislada |
| N3.1 | 3 | Definir contrato público y claves estables para los ocho proyectos y servicios | N2.1 | COMPLETADO | Matriz frontend/modelos/API y campos de imágenes/detalles documentados |
| N3.2 | 3 | Alinear seeders con datos comprobados y política de sincronización | N3.1 | COMPLETADO | Dos ejecuciones no duplican; se preservan contactos y ediciones según política |
| N3.3 | 3 | Añadir lectura API con contenido inicial estático y fallback | N3.1, N3.2 | COMPLETADO | Edición admin visible en web; pruebas con API caída y colección vacía |
| N3.4 | 3 | Eliminar porcentajes y verificar métricas/testimonios | N3.1 | COMPLETADO | Contenido respaldado y sin barras arbitrarias |
| N4.1 | 4 | Mejorar Skills y proyectos: Academia principal, Fundación segunda y otros casos complementarios | N3.4, N0.3 | COMPLETADO | Interfaz responsive, jerarquía coherente con LinkedIn y enlaces comprobados |
| N4.2 | 4 | Corregir formularios, foco de modales, teclado y movimiento reducido | N4.1 | COMPLETADO | QA a 360/768/1440 px y navegación por teclado |
| N4.3 | 4 | Verificar descarga HTTP y apertura del CV desde todos sus accesos | N1.3 | COMPLETADO | Descarga PDF, sin HTML/404; evidencia de apertura |
| N5.1 | 5 | Optimizar carga de admin, gráficas, imágenes y herramientas | N2.2, N4.1 | COMPLETADO | Comparación reproducible de carga y build; sin regresiones |
| N5.2 | 5 | Actualizar SEO, README, PROJECT y estados documentales | N3.3, N4.2 | COMPLETADO | Documentación y metadatos corresponden al resultado implementado |
| N6.1 | Cada publicación | Ejecutar validaciones, revisar Preview y preparar reporte | Entrega correspondiente | EN REVISIÓN | Resultado, diff y commit revisables antes de autorización |
| N6.2 | Cada publicación | Publicar tras autorización y comprobar frontend/API/CV | N6.1 y autorización expresa | PENDIENTE | Despliegues identificados, smoke checks y recuperación documentados |

### Alcance de los estados actuales

COMPLETADO corresponde a implementación y comprobación local según IMPLEMENTATION-REPORT.md. N0.4 conserva revisión editorial del CV; N1.3 conserva ejecución remota de CI; N1.4 conserva configuración y protección remotas; N6.1/N6.2 conservan revisión del release y autorización/publicación. La configuración de una matriz PostgreSQL en CI no prueba que se haya ejecutado en este equipo.

### Backlog histórico

La tabla siguiente conserva los registros anteriores. En particular, **T2.3 necesita corrección**: figura como completada aunque `portfolioData.js` conserva niveles porcentuales y `Skills.jsx` los muestra. Los estados históricos de CV acreditan trabajo previo, no una prueba HTTP o visual realizada en la revisión del 15/11/2026. Los IDs `N*` anteriores son el seguimiento vigente.

| ID | Fase | Tarea | Responsable | Prioridad | Dependencias | Archivos Afectados | Estado | Validación |
|---|---|---|---|---|---|---|---|---|
| **T0.1** | Fase 0 | Auditoría técnica y verificación de código vs documentación | Tech Lead / Coordinador | Alta | Ninguna | `PROJECT.md`, `AUDIT.md` | `COMPLETADO` | Informe en `AUDIT.md` verificado con `package.json` y `composer.json` |
| **T0.2** | Fase 0 | Comprobar ausencia física del archivo PDF de CV | QA / Seguridad | Crítica | Ninguna | `frontend/public/cv/` | `COMPLETADO` | `Get-ChildItem -Recurse -Filter *.pdf` retorna 0 archivos |
| **T0.3** | Fase 0 | Estructurar carpeta documental `docs/portfolio-upgrade/` | Tech Lead / Coordinador | Alta | Ninguna | `docs/portfolio-upgrade/*` | `COMPLETADO` | 10 archivos documentales creados |
| **T1.1** | Fase 1 | Sanitizar `AGENTS.md` eliminando controladores y roles heredados de la Academia | Arquitectura y Full Stack | Alta | T0.1 | `AGENTS.md` | `COMPLETADO` | `AGENTS.md` refleja únicamente el portafolio y los agentes requeridos |
| **T1.2** | Fase 1 | Crear skill `portfolio-content-verification` | Contenido Profesional | Media | T0.1 | `.agents/skills/portfolio-content-verification/SKILL.md` | `COMPLETADO` | Archivo SKILL.md creado con frontmatter y procedimiento |
| **T1.3** | Fase 1 | Crear skill `resume-ats-pdf` | CV / Documentos | Alta | T0.2 | `.agents/skills/resume-ats-pdf/SKILL.md` | `COMPLETADO` | Archivo SKILL.md con especificación de compilación y verificación de PDF |
| **T1.4** | Fase 1 | Crear skills `portfolio-ui-qa`, `portfolio-data-consistency`, `portfolio-release-check` | QA / DevOps | Media | T0.1 | `.agents/skills/*/SKILL.md` | `COMPLETADO` | Catálogo de skills disponible en `.agents/skills/` |
| **T2.1** | Fase 2 | Redactar perfil profesional y experiencia en `CONTENT-VERIFICATION.md` | Contenido Profesional | Alta | T1.2 | `docs/portfolio-upgrade/CONTENT-VERIFICATION.md` | `COMPLETADO` | Perfil validado con trayectoria desde 2015 y titulación 2025 |
| **T2.2** | Fase 2 | Estructurar matriz de los 8 proyectos reales con estados y tech stacks verificados | Contenido Profesional | Alta | T2.1 | `docs/portfolio-upgrade/CONTENT-VERIFICATION.md` | `COMPLETADO` | 8 proyectos clasificados (implementado / en desarrollo / planificado) |
| **T2.3** | Fase 2 | Actualizar `src/data/portfolioData.js` con proyectos, experiencia real y sin porcentajes | Frontend / UX | Alta | T2.2 | `frontend/src/data/portfolioData.js` | `COMPLETADO` | `portfolioData.js` no contiene barras porcentuales arbitrarias |
| **T3.1** | Fase 3 | Redactar documento base del currículum profesional ATS-friendly | CV / Documentos | Crítica | T2.1 | `docs/portfolio-upgrade/CV-IMPLEMENTATION.md` | `COMPLETADO` | Texto de CV validado y formateado para lectura automatizada |
| **T3.2** | Fase 3 | Generar/incorporar archivo PDF oficial `rene-mejillon-cv.pdf` | CV / Documentos | Crítica | T3.1 | `frontend/public/cv/rene-mejillon-cv.pdf` | `COMPLETADO` | Archivo existe físicamente, pesa > 10KB y contiene texto seleccionable |
| **T3.3** | Fase 3 | Validar y cablear botones de descarga en Hero, About, Navbar y Footer | Frontend / UX | Crítica | T3.2 | `Hero.jsx`, `About.jsx`, `Navbar.jsx`, `Footer.jsx` | `COMPLETADO` | Click en botón descarga PDF válido de inmediato |
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
