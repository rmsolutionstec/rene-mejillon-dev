# AGENTS-AND-SKILLS.md — Organización del Equipo Multiagente y Catálogo de Skills

Este documento describe la estructura organizativa, responsabilidades, reglas de coordinación y catálogo de skills para agentes de Inteligencia Artificial (Antigravity, OpenAI Codex, Cursor, GitHub Copilot) que colaboren en el portafolio.

---

## 1. Equipo Lógico y Matriz de Responsabilidades

| Rol Lógico | Especialista Asignado | Responsabilidades Principales | Archivos Permitidos |
|---|---|---|---|
| **Coordinador General** | Tech Lead / Coordinador | Priorización, resolución de dependencias, control de calidad final y fusiones de código. | `docs/*`, `PROJECT.md`, `README.md` |
| **Arquitectura & Backend** | Arquitectura y Full Stack / Backend | APIs REST Laravel, modelos, migraciones, seeders, autenticación Sanctum y CORS. | `backend/*` |
| **Frontend & UI/UX** | Frontend / UX | Componentes React, hooks, estilos Tailwind, animaciones y accesibilidad. | `frontend/src/*`, `frontend/index.html` |
| **Contenido & Verificación** | Contenido Profesional | Coherencia de trayectoria, matriz de proyectos y eliminación de sobreventa. | `frontend/src/data/*`, `docs/*` |
| **Especialista en CV** | CV / Documentos | Preparación de texto ATS, compilación y verificación de PDF de descarga. | `frontend/public/cv/*`, `docs/portfolio-upgrade/CV*` |
| **QA, Seguridad & DevOps** | QA / Seguridad / DevOps | Tests funcionales, auditoría de vulnerabilidades, build de producción y headers. | `frontend/vercel.json`, `render.yaml`, `.agents/skills/*` |

---

## 2. Catálogo de Skills

### 2.1 Skills Existentes
- `.agents/skills/fullstack-security-audit/SKILL.md`
  - **Función:** Auditoría completa de seguridad, secretos en Git, headers HTTP y CSP.
  - **Uso:** En revisiones periódicas y antes de preparar releases.

### 2.2 Skills Nuevas a Implementar
- **`portfolio-content-verification`**
  - **Uso:** Valida que cada cambio en textos, proyectos o habilidades cumpla con evidencias reales registradas en `CONTENT-VERIFICATION.md`.
- **`resume-ats-pdf`**
  - **Uso:** Genera, formatea y valida el PDF del CV profesional asegurando legibilidad por ATS y enlace público sin 404.
- **`portfolio-ui-qa`**
  - **Uso:** Procedimiento repetible de pruebas en responsive (mobile, tablet, desktop), navegación y accesibilidad.
- **`portfolio-data-consistency`**
  - **Uso:** Sincroniza y verifica que `portfolioData.js` y los Seeders de Laravel mantengan exactamente los mismos datos.
- **`portfolio-release-check`**
  - **Uso:** Checklist estricto pre-despliegue (build sin errores, assets presentes, tests ejecutados).

---

## 3. Protocolos de Coordinación y Prevención de Colisiones

1. **Un solo agente por archivo a la vez:** Ninguna tarea paralela puede escribir en el mismo archivo simultáneamente.
2. **Inspeccionar antes de modificar:** Ningún agente asume que una variable o archivo existe sin haberlo leído previamente.
3. **No ejecutar commits destructivos:** Los cambios se realizan en pasos pequeños, verificables y con mensajes en formato Conventional Commits.
4. **Respeto a los despliegues:** Queda terminantemente prohibido hacer `git push` a `origin/main` o disparar deploys sin la aprobación expresa del usuario.
5. **Aislamiento de tareas:** Cada tarea debe documentar su estado en `TASKS.md` antes y después de su ejecución.
