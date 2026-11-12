# QA-CHECKLIST.md — Protocolo de Aseguramiento de Calidad y Pruebas

Este checklist debe ejecutarse y documentarse antes de considerar cualquier versión lista para release.

---

## 1. Verificación de Enlaces y Descargas

- [ ] **Descarga de CV en Hero:** Al hacer clic, descarga un PDF binario válido con nombre `Rene_Mejillon_CV_2026.pdf`.
- [ ] **Descarga de CV en About:** Descarga el archivo correctamente.
- [ ] **Descarga de CV en Navbar (Desktop y Móvil):** Descarga el archivo correctamente.
- [ ] **Descarga de CV en Footer:** Descarga el archivo correctamente.
- [ ] **Integridad del PDF:** El archivo descargado puede abrirse en Adobe Reader, Chrome y visores móviles sin errores de corrupción.
- [ ] **Selección de texto:** El texto dentro del PDF puede seleccionarse y copiarse.
- [ ] **Enlaces externos:** GitHub, LinkedIn y WhatsApp abren en nueva pestaña con `rel="noopener noreferrer"`.
- [ ] **Rutas del sitio:** Enrutamiento SPA no lanza errores en consola al navegar a `/admin/login` o recargar cualquier ruta.

---

## 2. Pruebas de Interfaz y Responsive

- [ ] **Móvil (360px - 480px):**
  - El menú hamburguesa abre y cierra correctamente.
  - El texto del Hero no se corta ni desborda horizontalmente.
  - Los modales de proyectos se ajustan al ancho de pantalla.
- [ ] **Tablet (768px - 1024px):**
  - La cuadrícula de proyectos y habilidades muestra 2 columnas ordenadas.
  - Los espaciados son proporcionales.
- [ ] **Escritorio (1280px - 1920px):**
  - Cuadrícula de 3 columnas para proyectos.
  - Navbar fijo con cambio de fondo al hacer scroll.
- [ ] **Animaciones:** Se deshabilitan o suavizan cuando el sistema activa `prefers-reduced-motion`.

---

## 3. Pruebas de Formulario y API

- [ ] **Formulario de Contacto:**
  - Validación de campos requeridos (nombre, email, mensaje).
  - Al enviar un mensaje con datos correctos, muestra toast de éxito.
  - Rate limiting: Al enviar más de 3 mensajes en una hora, la API responde con HTTP 429 Too Many Requests y un mensaje claro.
- [ ] **Panel Admin (`/admin/login`):**
  - Rate limiting: Al fallar 5 intentos seguidos en un minuto, la API bloquea temporalmente.
  - Acceso con credenciales correctas emite token y permite navegación a dashboard.

---

## 4. Pruebas de Construcción y Rendimiento

- [ ] **Build limpio:** `npm run build` en `frontend/` finaliza con código de salida 0.
- [ ] **Sin warnings críticos de empaquetado:** `dist/` contiene assets con hash y carpeta `cv/` con el PDF.
- [ ] **Linter PHP:** `php -l` en todos los archivos de backend pasa sin errores sintácticos.
- [ ] **Linter JS:** `npm run lint` en `frontend/` no muestra errores bloqueantes.
