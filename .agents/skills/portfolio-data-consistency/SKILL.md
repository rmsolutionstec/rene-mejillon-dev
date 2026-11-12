---
name: portfolio-data-consistency
description: >-
  Verifica y mantiene la coherencia total entre los datos estáticos del frontend
  (portfolioData.js), los Seeders de Laravel y las respuestas de la API REST, evitando
  discrepancias o duplicaciones.
---

# Skill: portfolio-data-consistency

## Cuándo usar esta skill
- Cuando se actualicen los proyectos, habilidades o servicios en `frontend/src/data/portfolioData.js`.
- Al modificar migraciones o seeders en `backend/database/seeders/`.
- Para certificar que tanto el portal público como el panel de administración presenten la misma información fidedigna.

## Cuándo NO usar esta skill
- Para tareas puramente de diseño visual o estilos CSS.

---

## Procedimiento de Verificación

1. **Comparación de Proyectos:**
   Verificar que los 8 proyectos definidos en `CONTENT-VERIFICATION.md` y `portfolioData.js` coincidan exactamente con `ProjectSeeder.php` en títulos, descripciones, stacks tecnológicos y URLs.
2. **Comparación de Habilidades:**
   Verificar que las categorías y tecnologías en `SkillSeeder.php` coincidan con `portfolioData.js` (sin porcentajes arbitrarios).
3. **Validación de Ejecución de Seeders:**
   Verificar que `php artisan db:seed` se ejecute sin excepciones de clave foránea ni errores sintácticos.
4. **Verificación de Fallback:**
   Confirmar que ante ausencia de respuesta del backend, el frontend renderiza sin errores a partir de `portfolioData.js`.
