# MASTER-PLAN.md — Plan Maestro de Modernización del Portafolio

## Plan vigente — 15 de noviembre de 2026

Este plan sustituye el orden de ejecución del plan histórico conservado más abajo. La implementación local está documentada en IMPLEMENTATION-REPORT.md. Se aplicaron cambios de aplicación y validaciones aisladas; GitHub, Vercel, Render y la base de producción permanecen sin modificar.

**Prioridad editorial añadida por el usuario:** toda mejora debe coordinar con LinkedIn. La [matriz vigente de contenido](./CONTENT-VERIFICATION.md#matriz-vigente--alineación-con-linkedin-15112026) distingue la lectura directa del perfil, los datos aportados y lo pendiente de corroboración. Primero conciliar contenido y CV; después ampliar funcionalidades. Se mantienen las validaciones mínimas para publicar cualquier entrega.

### Punto de partida de la revisión inicial (histórico)

- `main` local y remoto coinciden en `a1c1071`; GitHub registra el estado Vercel como `success` para ese commit. Esto no demuestra el funcionamiento de la API ni de la interfaz.
- El usuario confirma que subir a la rama de producción activa el despliegue automático de Vercel. Hay que verificar en el dashboard cuál es esa rama y la configuración de Preview antes de usar ramas remotas.
- `npm run build` pasa con advertencias; `npm run lint` falla por ausencia de configuración ESLint.
- La sintaxis pasa en 37 archivos PHP. PHPUnit no consigue abrir su bootstrap, aunque el archivo existe y Artisan puede cargarlo: diagnosticar el entorno antes de atribuirlo a dependencias ausentes.
- El CV existe en `public` y `dist`, con 12.477 bytes y cabecera `%PDF-`. Falta verificar descarga HTTP y apertura visual en esta revisión.
- Los GET de listados administrativos no están declarados; frontend y API usan contratos distintos en estadísticas.
- El sitio público consume contenido estático. Los seeders conservan tres proyectos antiguos y no coinciden con los ocho del frontend.
- Persisten barras porcentuales en Skills, datos de demostración en el dashboard y documentación contradictoria.
- El único archivo sin seguimiento al iniciar el plan era `frontend/public/images/test_edge.png`; conservarlo hasta determinar su uso.

### Flujo de trabajo propuesto

`rama codex/* → validaciones locales → PR y Preview → revisión → autorización del propietario → merge a main → despliegue automático → comprobación pública`

- Usar una rama breve por entrega, creada desde `main` actualizado. No hace falta añadir `develop` para este tamaño de proyecto.
- Mantener los commits convencionales y revisar el diff antes de cada publicación.
- Configurar GitHub para exigir PR y comprobaciones correctas antes de integrar a `main`; comprobar qué reglas están disponibles y quién puede omitirlas. No exigir un segundo revisor inexistente en un proyecto individual.
- Confirmar las variables de Production y Preview por separado. El frontend solo recibe configuración pública; cualquier `VITE_*` queda expuesta en el bundle.
- Las pruebas con escrituras deben usar API y base de datos de desarrollo o pruebas. No conectar un Preview administrativo a producción para probar CRUD.
- Confirmar en Render la rama, el despliegue automático, las migraciones, CORS y el servicio realmente conectado. `render.yaml` describe la intención del repositorio; no confirma la configuración activa.
- Cada cambio de contrato debe ser compatible con la versión anterior durante el despliegue: backend primero, frontend después, cuando corresponda.
- La aprobación para este plan no autoriza push a `main`, merge, cambios de infraestructura ni escrituras en producción.

### Entregas y criterios de aceptación

| Orden | Entrega | Trabajo concreto | Condición para cerrarla |
|---|---|---|---|
| 0 | Coherencia con LinkedIn | Corregir posicionamiento, correos y cronología RM Solutions Tec/Alpha; separar TI desde 2008 y Laravel/React desde 2023; precisar formación; destacar Academia seguida de Fundación; clasificar habilidades prácticas/académicas/aprendizaje; revisar CV, servicios, metadatos y privacidad | Cada cambio tiene fuente en la matriz; ningún año o nivel se infiere por antigüedad total; CV candidato revisado; sin métricas ni testimonios sin respaldo; contenido local revisable antes de publicar |
| 1 | Base de validación y publicación | Configurar ESLint e ignorar generados; corregir errores reales; diagnosticar PHPUnit; preparar GitHub Actions para frontend y backend; documentar Preview y reglas de `main` | Lint, build y pruebas existentes ejecutables; CI reproduce las comprobaciones y falla ante errores; CV comprobado en el artefacto; configuración remota pendiente hasta verificarla |
| 2 | Panel y API funcionales | Añadir GET administrativos protegidos; ajustar respuesta de estadísticas y consumo de `monthly`/`byCategory`; retirar cifras de demostración; mostrar errores y estados vacíos; revisar ruta `skills.show` sin método; exigir contraseña administrativa configurada | Login, expiración/logout, listados, CRUD y contactos probados en entorno aislado; un visitante recibe 401 en rutas privadas; fallos de API no se presentan como datos reales |
| 3 | Contenido y fuente de datos coherentes | Alinear los ocho proyectos y servicios; definir claves estables y contrato de imágenes/detalles; seeders repetibles; carga estática inmediata y actualización desde API con fallback; retirar porcentajes arbitrarios; comprobar testimonios y afirmaciones | Editar un proyecto en admin se refleja públicamente; una API caída conserva el contenido inicial; respuesta vacía y error se distinguen; ejecutar seeders dos veces no duplica registros ni elimina contactos o sobrescribe ediciones sin una política explícita |
| 4 | Experiencia profesional y accesible | Mejorar Skills y presentación de proyectos, con Academia como principal y Fundación como segundo proyecto; conservar TTS como complemento según evidencia; revisar Hero/About; etiquetas de formularios, teclado y foco de modales; reducción de movimiento y responsive | Navegación y formularios utilizables con teclado; modales gestionan foco y Escape; sin desbordes en 360, 768 y 1440 px; preferencia de movimiento reducido respetada; CV descargable desde sus accesos |
| 5 | Rendimiento, SEO y documentación | Cargar admin/gráficas por rutas; optimizar imágenes; resolver advertencias de herramientas de forma compatible; comprobar metadatos, canonical, sitemap y robots; actualizar README/PROJECT y estados del backlog | Medición antes/después con el mismo procedimiento; sin regresiones funcionales; enlaces y metadatos coherentes; documentación describe código y despliegue reales |
| 6 | Publicación controlada | Revisar checklist y diff de cada entrega; verificar Preview, API y CV; registrar commit, despliegues y recuperación | Autorización explícita antes de integrar a producción; comprobar home, assets, CV, admin y conectividad tras publicar; registrar resultado y cualquier incidencia |

La entrega 6 se aplica a cada publicación, no solo al cierre del proyecto. Las entregas 0 y 1 constituyen el primer bloque: contenido fiel y validación mínima para su publicación. Se puede completar una primera entrega de contenido estático sin esperar la ampliación del panel. Las entregas 2 y 3 preceden a cualquier promesa de administración pública dinámica.

### Decisiones de implementación propuestas

1. Mantener React 18 + Laravel 12 y el diseño general; actualizar dependencias solo cuando el cambio tenga una justificación y verificación concretas.
2. Conservar la carga inmediata del contenido estático y añadir actualización mediante API cuando su contrato esté alineado. Documentar qué contenido administra la API y qué contenido permanece en código.
3. Planificar respaldo y sincronización de datos existentes antes de migraciones o seeders en producción. Preparar y probar primero la operación en una base aislada.
4. Revisar la autenticación y el almacenamiento del token según los dominios reales de frontend/API. Cambiar `localStorage` por `sessionStorage` no soluciona por sí solo la exposición ante XSS; una migración a cookies requiere revisar CORS, CSRF y restricciones del navegador.
5. Confirmar el estado actual de controles existentes antes de cambiarlos: rate limiting, CSP, HSTS y expiración ya tienen implementación en el repositorio.
6. En una recuperación, revertir el frontend no revierte el backend ni los datos. Registrar por separado la versión del API y el efecto de cualquier migración.

### Evidencias y fuentes

- Revisión local y consulta de estado del commit en GitHub del 15/11/2026.
- [Vercel: integración con Git](https://vercel.com/docs/git).
- [Vercel: entornos de Production y Preview](https://vercel.com/docs/deployments/environments).
- [Vercel: variables de entorno](https://vercel.com/docs/environment-variables).
- [GitHub: protección de ramas y comprobaciones requeridas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches).

## Plan histórico — conservar como antecedente

Los estados y requisitos de esta sección corresponden a la planificación anterior. No deben interpretarse como evidencia vigente de validación ni como orden de ejecución actual.

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
