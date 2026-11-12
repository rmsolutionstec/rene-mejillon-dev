---
name: portfolio-ui-qa
description: >-
  Realiza pruebas repetibles de interfaz, adaptación responsive (móvil, tablet, desktop),
  accesibilidad (WCAG AA), navegación y rendimiento en el portafolio de René Mejillón.
---

# Skill: portfolio-ui-qa

## Cuándo usar esta skill
- Tras modificar cualquier componente en `frontend/src/components/sections/` o `pages/`.
- Al realizar cambios en Tailwind CSS, animaciones o elementos interactivos.
- Para verificar que los modales de proyectos, menús y formularios funcionen en todas las resoluciones.

## Cuándo NO usar esta skill
- Para cambios exclusivamente en endpoints o bases de datos de backend.

---

## Procedimiento de Verificación

1. **Prueba de Compilación y Servidor:**
   ```bash
   cd frontend
   npm run build
   ```
2. **Inspección de Puntos de Quiebre (Breakpoints):**
   - Móvil (`sm` / < 640px): Menú hamburguesa accesible, texto legible sin desbordamiento horizontal.
   - Tablet (`md` / 768px): Cuadrículas de proyectos y habilidades en 2 columnas proporcionadas.
   - Escritorio (`lg`, `xl` / > 1024px): Navegación fija, espaciados equilibrados y modales centrados.
3. **Verificación de Accesibilidad:**
   - Todo botón o icono interactivo debe tener `aria-label` descriptivo.
   - Contraste de texto conforme a WCAG AA (mínimo 4.5:1).
   - Comportamiento accesible al teclado (navegación con `Tab` y activación con `Enter`/`Space`).
   - Respeto a la preferencia de usuario `prefers-reduced-motion` en animaciones Framer Motion.
