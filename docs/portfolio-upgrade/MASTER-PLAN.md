# MASTER-PLAN.md — Plan Maestro de Modernización del Portafolio

**Objetivo General:**  
Transformar el portafolio profesional de René Mejillón en una plataforma moderna, rápida, accesible y técnicamente verificable, que represente fielmente su trayectoria en Desarrollo Full Stack, Automatización, IA Aplicada, Infraestructura TI y Soporte Técnico; garantizando la operatividad de la descarga del CV profesional y una arquitectura multiagente coordinada.

---

## 1. Alcance y Límites

### Incluido:
- Auditoría exhaustiva y saneamiento documental.
- Corrección del error 404 en la descarga de currículum (CV ATS en PDF).
- Actualización fidedigna de trayectoria, habilidades (eliminando porcentajes arbitrarios) y servicios.
- Incorporación de los 8 proyectos reales con estados explícitos (Implementado, En Desarrollo, Planificado).
- Reorganización de UI: Hero, About, Skills, Projects con filtros, Experience y Services.
- Sincronización entre datos estáticos (`portfolioData.js`) y API de backend.
- Preparación del entorno multiagente con catálogo de skills operativas.
- Protocolos de testing, accesibilidad (WCAG AA), SEO y pre-release.

### Excluido en esta etapa:
- Refactorización masiva de frameworks (no migrar a React 19 de golpe).
- Creación de un nuevo CMS o sustitución de la base tecnológica existente.
- Despliegues automáticos a producción sin autorización expresa.
- Publicación de repositorios privados o datos sensibles de clientes.

---

## 2. Mapa de Fases y Dependencias

```
┌────────────────────────────────────────────────────────┐
│ Fase 0: Auditoría Inicial & Documentación Base         │  <-- [COMPLETADA]
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 1: Organización de Agentes & Catálogo de Skills   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 2: Verificación de Contenido & Matriz de Proyectos│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 3: Implementación del CV ATS (PDF & Descarga)     │  <-- Prioridad Crítica
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 4: Actualización de UI, Secciones & Accesibilidad │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 5: Consistencia de Datos (Frontend & Backend API) │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 6: QA Integral, Pruebas de Carga & SEO            │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│ Fase 7: Preparación de Release & Aprobación Final      │
└────────────────────────────────────────────────────────┘
```

---

## 3. Detalle por Fase

### Fase 0 — Auditoría Inicial & Setup Documental (Completada)
- Inspección de dependencias reales vs declaradas.
- Detección del 404 en descarga de CV.
- Identificación de contenido heredado en `AGENTS.md`.
- Generación de la suite documental en `docs/portfolio-upgrade/`.

### Fase 1 — Organización de Agentes y Catálogo de Skills
- Depurar `AGENTS.md` eliminando referencias a "Academia Luz al Mundo".
- Crear skills necesarias en `.agents/skills/`:
  - `portfolio-content-verification`
  - `resume-ats-pdf`
  - `portfolio-ui-qa`
  - `portfolio-data-consistency`
  - `portfolio-release-check`
- Definir protocolo de sincronización y prevención de bloqueos entre agentes.

### Fase 2 — Verificación de Contenido y Datos del Portafolio
- Estructurar el perfil profesional: *Desarrollador Full Stack | Automatización e Infraestructura TI*.
- Reclasificar la trayectoria: 2015 en adelante (soporte, multimedia, TI) y graduación formal de software en 2025.
- Documentar los 8 proyectos según evidencias reales de repositorio.
- Eliminar porcentajes arbitrarios en habilidades; agrupar por competencias técnicas y herramientas.

### Fase 3 — Implementación y Validación del CV Profesional (Prioridad)
- Redactar el contenido profesional en texto plano estructurado compatible con ATS.
- Diseñar y compilar el documento PDF profesional (`Rene_Mejillon_CV_2026.pdf`).
- Ubicar físicamente el archivo en `frontend/public/cv/rene-mejillon-cv.pdf` (y enlace simbólico o copia canónica).
- Validar botones de descarga en Hero, About, Navbar y Footer.
- Ejecutar pruebas automatizadas de presencia de archivo, headers binarios y selección de texto.

### Fase 4 — Actualización de Interfaz de Usuario y Experiencia (UI/UX)
- **Hero:** Título actualizado, subtítulo con tecnologías clave, botones de acción claros (Proyectos, Contacto, CV).
- **About:** Narrativa de evolución desde soporte e infraestructura hacia Full Stack y Automatización.
- **Skills:** Eliminación de barras de progreso ficticias; presentación en tarjetas categorizadas con badges.
- **Projects:** Mostrar los proyectos con badges de estado (Implementado, En Desarrollo, Planificado), enlaces a GitHub solo si es público, modal interactivo y filtros funcionales.
- **Services:** Reformulación técnica basada en servicios reales (Desarrollo Web, Automatización, Infraestructura, Soporte).
- **Accesibilidad:** Revisar ratio de contraste, foco de teclado, y atributos ARIA.

### Fase 5 — Consistencia de Datos y Backend API
- Actualizar `ProjectSeeder.php`, `SkillSeeder.php` y `ServiceSeeder.php` en Laravel para coincidir con `portfolioData.js`.
- Opcional y no disruptivo: Configurar un hook de lectura en frontend que consulte la API si está disponible, conservando `portfolioData.js` como fallback estático instantáneo.

### Fase 6 — Aseguramiento de Calidad (QA) y Pruebas
- Build local reproducible (`npm run build`).
- Linter (`npm run lint`, `php -l`).
- Verificación de renderizado en Chrome, Edge, móvil y desktop.
- Verificación estricta de descarga del CV.
- Lighthouse / Core Web Vitals y verificación de meta tags SEO.

### Fase 7 — Preparación de Release y Despliegue
- Consolidación del Changelog.
- Checklist pre-despliegue (`RELEASE-CHECKLIST.md`).
- Presentación al propietario para autorización de push a producción.

---

## 4. Criterios de Aceptación Globales
1. Ningún botón de CV produce error 404 ni descarga HTML.
2. La documentación no contiene rastros de la Academia Luz al Mundo en roles ni controladores del portafolio.
3. Se presentan los 8 proyectos con información respaldada por código y evidencias.
4. No existen porcentajes arbitrarios en habilidades.
5. El build de producción se ejecuta con código 0 y sin warnings críticos.
6. El despliegue a producción se realiza exclusivamente tras visto bueno del usuario.
