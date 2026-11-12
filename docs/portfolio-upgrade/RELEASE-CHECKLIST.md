# RELEASE-CHECKLIST.md — Verificación Pre-Despliegue y Procedimiento de Release

**Regla Mandatoria:** Ningún despliegue a producción se realiza sin la autorización expresa del propietario del portafolio.

---

## 1. Verificaciones Pre-Release en Rama Local

- [ ] Todos los cambios están organizados en commits convencionales (`feat:`, `fix:`, `docs:`).
- [ ] La rama de trabajo no contiene archivos `.env` sin ignorar ni credenciales privadas.
- [ ] El archivo PDF del CV está presente en `frontend/public/cv/rene-mejillon-cv.pdf`.
- [ ] La compilación local de producción se ejecuta con éxito:
  ```bash
  cd frontend && npm run build
  ```
- [ ] No hay errores de consola en la vista previa del build:
  ```bash
  cd frontend && npm run preview
  ```
- [ ] Se probó la descarga física del PDF desde la vista previa local.

---

## 2. Protocolo de Aprobación

1. **Presentación de Evidencias:** El Tech Lead presenta al usuario el reporte de tareas completadas y la evidencia de funcionamiento.
2. **Autorización del Usuario:** El usuario autoriza expresamente el envío a la rama remota (`git push origin main`).
3. **Monitoreo de Despliegue en Vercel:**
   - Verificar en el dashboard de Vercel que el build finalice en estado *Ready*.
   - Comprobar que no existan errores de rutas o reescritura.

---

## 3. Smoke Tests Post-Despliegue en Producción (https://rene-mejillon-dev.vercel.app)

- [ ] Carga inicial del sitio en HTTPS sin errores SSL ni recursos bloqueados.
- [ ] **Prueba de fuego del CV:**
  - Clic en "Descargar CV" en Hero: Descarga un PDF válido de tamaño > 10KB.
  - Clic en "Descargar CV" en Navbar móvil: Descarga el PDF válido.
  - Verificar que el archivo no contenga HTML ni esté corrupto.
- [ ] Comprobación del formulario de contacto en vivo.
- [ ] Inspección de meta tags OpenGraph mediante herramienta de vista previa social.
- [ ] Verificación de `https://rene-mejillon-dev.vercel.app/robots.txt` y `sitemap.xml`.

---

## 4. Plan de Contingencia y Rollback

Si se detecta un error crítico tras el despliegue:
1. Revertir inmediatamente desde el dashboard de Vercel al deployment previo funcional con un clic (Instant Rollback).
2. En Git local, generar un commit de reversión:
   ```bash
   git revert HEAD --no-edit
   git push origin main
   ```
3. Registrar la causa raíz en `AUDIT.md` para diagnóstico.
