---
name: portfolio-release-check
description: >-
  Ejecuta la suite obligatoria de validaciones pre-despliegue para el portafolio de
  René Mejillón: compilación limpia, chequeo de lint, presencia y no-corrupción del
  CV en PDF, seguridad de headers y preparación del reporte pre-release.
---

# Skill: portfolio-release-check

## Cuándo usar esta skill
- Inmediatamente antes de solicitar al usuario autorización para subir cambios a la rama principal (`git push origin main`) o desplegar a producción.

## Cuándo NO usar esta skill
- Durante el desarrollo inicial o fases exploratorias.

---

## Procedimiento Obligatorio

1. **Chequeo de Compilación:**
   ```bash
   cd frontend
   npm run build
   ```
   Debe retornar código de salida 0.
2. **Chequeo de Archivos Clave en Dist:**
   - `dist/index.html` existe.
   - `dist/cv/rene-mejillon-cv.pdf` existe físicamente y no está vacío.
3. **Chequeo de Sintaxis Backend:**
   ```bash
   php -l backend/routes/api.php
   php -l backend/app/Http/Controllers/API/ContactController.php
   ```
4. **Verificación de Seguridad:**
   - Ningún `.env` con credenciales reales presente en git staging (`git status`).
5. **Generar Reporte:** Resumir el estado en `RELEASE-CHECKLIST.md` y presentar al usuario para su autorización.
