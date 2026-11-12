# CV-IMPLEMENTATION.md — Plan de Implementación y Descarga del Currículum

**Severidad del Problema Actual:** CRÍTICA (Error 404 en producción en todos los botones de descarga del portafolio).

---

## 1. Diagnóstico del Fallo Actual

1. **Ubicaciones del botón en el código:**
   - `Hero.jsx` (línea 244)
   - `About.jsx` (línea 111)
   - `Navbar.jsx` (línea 145 en desktop y 230 en móvil)
   - `Footer.jsx` (línea 188)
2. **Propiedad enlazada:** `personalInfo.cvUrl` = `'/cv/rene-mejillon-cv.pdf'`.
3. **Causa raíz:** En `frontend/public/` no existe la carpeta `cv/` ni el archivo `rene-mejillon-cv.pdf`.
4. **Comportamiento defectuoso:** Debido a las rewrites de Vercel para SPAs, cualquier ruta no física responde con `index.html` (HTTP 200 con contenido HTML de la aplicación React), por lo que el usuario descarga un archivo corrupto que no puede ser abierto por visores de PDF.

---

## 2. Solución Paso a Paso

### Paso 1: Redacción del Contenido Oficial (Compatible con ATS)
El CV debe estructurarse en secciones estándar que los sistemas ATS (Applicant Tracking Systems) puedan parsear sin errores:
- **Encabezado:** Nombre completo (René Mejillón), Título profesional (*Desarrollador Full Stack | Automatización e Infraestructura TI*), Ubicación (Ecuador), Email profesional (`rm.solutions.tec@gmail.com`), Teléfono/WhatsApp, LinkedIn, GitHub y Portfolio web.
- **Perfil Profesional:** Síntesis concisa destacando desarrollo de software, modelado de bases de datos, automatizaciones con Python e IA local, y gestión de infraestructura.
- **Competencias Técnicas:** Clasificadas en Desarrollo Web (Laravel, React, PHP, JS, Tailwind, REST APIs), Automatización & IA (Python, PySide6, n8n, Ollama, Edge TTS, FFmpeg), Infraestructura & DevOps (Linux, Nginx, Docker, Git, Tailscale, Redes) y Bases de Datos (MySQL, PostgreSQL).
- **Experiencia Laboral:**
  - *Fundación Clínica del Alma* (2024–Presente) — Técnico Multimedia y Desarrollo Digital.
  - *ALPHA Publicidad y Soporte / REMETECS* (2015–Presente) — Full Stack Developer & Especialista TI.
  - *Iglesia Cuadrangular Central* (2016–2018) — Diseñador Multimedia y Producción Técnica.
- **Proyectos Clave:**
  - *Alpha Studio TTS Latino* (Software de escritorio en Python/PySide6 con procesamiento de audio y subtítulos).
  - *Academia Luz al Mundo* (Plataforma educativa con 5 roles, control de pagos y reportes PDF).
  - *Fundación Clínica del Alma* (Portal institucional y gestión multimedia).
- **Educación:**
  - *Tecnólogo Superior en Desarrollo de Software* (Graduado en 2025).

### Paso 2: Generación del Archivo Físico
1. Compilar el documento en formato PDF estándar A4.
2. Nombre canónico del archivo de distribución: `Rene_Mejillon_CV_2026.pdf`.
3. Ubicación física en el repositorio:
   ```text
   frontend/public/cv/rene-mejillon-cv.pdf
   frontend/public/cv/Rene_Mejillon_CV_2026.pdf
   ```
   (Se colocará con el nombre actual `rene-mejillon-cv.pdf` para no romper enlaces y adicionalmente con el nombre canónico para el atributo `download`).

### Paso 3: Configuración en Componentes Frontend
Asegurar que los enlaces utilicen los atributos correctos para descarga directa:
```jsx
<a
  href={personalInfo.cvUrl}
  download="Rene_Mejillon_CV_2026.pdf"
  className="..."
  aria-label="Descargar Currículum Vitae en formato PDF"
>
  Descargar CV
</a>
```

### Paso 4: Pruebas de Verificación Obligatorias
1. **Comprobación de existencia física:** `Test-Path "frontend/public/cv/rene-mejillon-cv.pdf"` = `True`.
2. **Prueba de tipo MIME:** Petición HTTP devuelve `Content-Type: application/pdf`.
3. **Selección de texto:** El documento generado debe permitir copiar y seleccionar texto (no debe ser una imagen rasterizada).
4. **Verificación tras build:** Ejecutar `npm run build` y comprobar que `dist/cv/rene-mejillon-cv.pdf` existe en la salida final.
