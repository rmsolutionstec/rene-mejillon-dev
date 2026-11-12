---
name: resume-ats-pdf
description: >-
  Mantiene la versión profesional del currículum de René Mejillón, valida su formato
  compatible con sistemas ATS (Applicant Tracking Systems), asegura la presencia física
  del archivo PDF en frontend/public/cv/ y valida que las descargas en la web funcionen
  sin errores 404 ni corrupción de datos.
---

# Skill: resume-ats-pdf

## Cuándo usar esta skill
- Cuando se deba generar o actualizar el currículum profesional de René Mejillón.
- Cuando se detecte que los botones de "Descargar CV" dan error 404 o descargan HTML en lugar de PDF.
- Antes de un release a producción para verificar la integridad del archivo y su legibilidad por ATS.

## Cuándo NO usar esta skill
- Para editar textos de la web no relacionados con el currículum.
- Para crear endpoints de backend innecesarios para servir archivos estáticos.

---

## Procedimiento de Ejecución

### 1. Validación del Contenido ATS
El contenido debe cumplir:
- Tipografía estándar sin tablas complejas ni columnas anidadas invisibles.
- Encabezado con datos de contacto profesionales (Email, Teléfono/WhatsApp, LinkedIn, GitHub, Portfolio).
- Sección explícita de Perfil Profesional, Competencias Técnicas, Experiencia Laboral cronológica inversa, Proyectos Destacados y Educación.
- Términos clave verificables: Laravel, React, Python, Automatización, Linux, Nginx, Docker, Bases de Datos, Soporte TI.

### 2. Generación y Ubicación del PDF
1. Ubicar el archivo en la ruta pública canónica:
   ```text
   frontend/public/cv/rene-mejillon-cv.pdf
   ```
2. Asegurar que el nombre de descarga sugerido sea `Rene_Mejillon_CV_2026.pdf`.

### 3. Protocolo de Pruebas
1. Verificar existencia física:
   ```powershell
   Test-Path "frontend/public/cv/rene-mejillon-cv.pdf"
   ```
2. Verificar peso y cabecera binaria del PDF (debe empezar con `%PDF-`):
   ```powershell
   $bytes = Get-Content "frontend/public/cv/rene-mejillon-cv.pdf" -Encoding Byte -TotalCount 5
   [System.Text.Encoding]::ASCII.GetString($bytes) -eq "%PDF-"
   ```
3. Verificar enlaces en componentes frontend (`Hero.jsx`, `About.jsx`, `Navbar.jsx`, `Footer.jsx`).
4. Probar que tras `npm run build`, el archivo exista en `dist/cv/rene-mejillon-cv.pdf`.
