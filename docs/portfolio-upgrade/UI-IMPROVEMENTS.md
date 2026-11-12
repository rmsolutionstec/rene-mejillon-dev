# UI-IMPROVEMENTS.md — Propuesta de Mejoras Visuales, UX y Accesibilidad

---

## 1. Identidad Visual y Principios de Diseño

- **Fondo y Estilo:** Mantener el tema oscuro tecnológico de alto impacto (`#0a0a0a` / `#121212`) con acentos rojo/carmesí (`#ff1e1e`), evitando saturación excesiva.
- **Tipografía:** Jerarquía tipográfica basada en `Inter` (cuerpo de texto, legibilidad) y `Poppins` (títulos y encabezados).
- **Animaciones:** Transiciones suaves con Framer Motion, respetando siempre `prefers-reduced-motion` para usuarios sensibles al movimiento.

---

## 2. Mejoras Sección por Sección

### 2.1 Hero
- **Problema actual:** Título genérico y roles en la animación de texto que no sintetizan el perfil principal.
- **Solución:**
  - Encabezado principal: **René Mejillón**.
  - Subtítulo de impacto: *Desarrollador Full Stack | Automatización e Infraestructura TI*.
  - Tech badges clave: Laravel · React · Python · Automatización · IA Aplicada.
  - Frase de valor: *"Desarrollo aplicaciones web y soluciones tecnológicas que integran software, automatización e infraestructura para resolver necesidades reales."*
  - CTAs principales balanceados:
    1. Ver Proyectos (botón principal destacado).
    2. Contactarme (botón secundario).
    3. Descargar CV (botón de descarga con icono claro).

### 2.2 Sobre mí (About)
- **Problema actual:** Texto enfocado solo en desarrollo web web tradicional.
- **Solución:**
  - Narrativa de trayectoria: Comenzó en 2015 en soporte técnico, hardware y redes, evolucionando hacia la administración de sistemas, desarrollo de software y orquestación con Python e inteligencia artificial local.
  - Destacar titulación de Tecnólogo Superior en Desarrollo de Software (2025).

### 2.3 Habilidades (Skills)
- **Problema actual:** Barras de porcentaje ficticias (`React: 95%`, `Vite: 100%`) que restan credibilidad profesional.
- **Solución:**
  - Eliminar barras de porcentaje.
  - Reorganizar en tarjetas por categoría profesional:
    1. *Desarrollo Frontend* (React, JavaScript, Tailwind, Bootstrap, HTML5/CSS3).
    2. *Desarrollo Backend* (Laravel, PHP, REST APIs, Sanctum, Node.js).
    3. *Bases de Datos* (MySQL, MariaDB, PostgreSQL, SQLite).
    4. *Infraestructura & DevOps* (Linux, Docker, Nginx, Git/GitHub, Tailscale, Redes).
    5. *Automatización & IA* (Python, PySide6, n8n, Ollama, Edge TTS, FFmpeg).
    6. *Soporte & Multimedia* (Diagnóstico PC, CCTV, OBS Studio, vMix, Edición).

### 2.4 Proyectos (Projects)
- **Problema actual:** Solo 4 proyectos mostrados, faltando proyectos de software de escritorio e infraestructura.
- **Solución:**
  - Mostrar los **8 proyectos** reales con filtros rápidos por categoría:
    `Todos` | `Aplicaciones Web` | `Software Desktop` | `Automatización & IA` | `Infraestructura`.
  - Prioridad visual destacada a **Alpha Studio TTS Latino** (demuestra desarrollo de software de escritorio en Python).
  - Badges de estado claros: `En Producción`, `Casi Terminado`, `En Desarrollo`.
  - Enlaces a GitHub exclusivamente para repositorios públicos (`alpha-ecuador-tts`, `rene-mejillon-dev`).
  - Modal enriquecido con logros técnicos y problemas resueltos.

### 2.5 Servicios (Services)
- **Problema actual:** Precios genéricos comerciales que no han sido aprobados y servicios redactados como agencia publicitaria.
- **Solución:**
  - Reformular como capacidades y soluciones tecnológicas concretas:
    1. Desarrollo de Aplicaciones Web y Sistemas Administrativos.
    2. Automatización de Procesos y Flujos de Datos.
    3. Desarrollo de Software a Medida (Desktop & CLI).
    4. Infraestructura de Servidores y Redes Privadas.
    5. Mantenimiento y Soporte Informático Especializado.
  - Ocultar o condicionar precios hasta aprobación expresa.

---

## 3. Accesibilidad y Rendimiento (a11y & Web Vitals)
- **Contraste:** Garantizar ratio WCAG AA (4.5:1) en todos los textos sobre fondos oscuros.
- **Foco visible:** Asegurar contorno de foco accesible en enlaces y botones interactivos para navegación por teclado.
- **Atributos ARIA:** `aria-label` en iconos y botones sin texto explícito.
- **Imágenes:** Formatos optimizados con dimensiones explícitas para evitar Cumulative Layout Shift (CLS).
