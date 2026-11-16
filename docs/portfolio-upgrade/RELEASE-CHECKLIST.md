# Release preparado localmente — 15/11/2026

**Regla:** no integrar a main, subir cambios que activen producción ni modificar la base de producción sin autorización expresa del propietario.

## Listo localmente

- [x] Rama codex/linkedin-portfolio, separada de main.
- [x] Datos alineados con LinkedIn y fuentes diferenciadas.
- [x] Código de aplicación y documentación actualizados.
- [x] Instalación npm ci, lint y build.
- [x] Validación de catálogo y CV en dist.
- [x] Pruebas Laravel y formato PHP.
- [x] Auditorías de dependencias sin alertas reportadas.
- [x] Responsive y recorridos funcionales contra API/SQLite de demostración.
- [x] PDF actualizado y protegido de conversiones de texto por Git.
- [x] Archivos .env reales sin cambios; artefactos locales fuera de Git.

## Pendiente de revisión y autorización

- [ ] Revisar diff, contenido y CV.
- [ ] Autorizar publicación de la rama y comprobar CI/Preview.
- [ ] Confirmar VITE_API_URL, CORS y separación de datos por entorno.
- [ ] Confirmar reglas de main y checks obligatorios.
- [ ] Confirmar despliegue/configuración real de Render.
- [ ] Respaldar BD y aprobar migraciones/sincronización.
- [ ] Revisar vista previa del plan portfolio:sync; decidir qué registros publicar.
- [ ] Autorizar merge a main / despliegue.
- [ ] Ejecutar comprobaciones del dominio de producción, API, headers y CV.

## Recuperación

Registrar el commit y deployment de frontend y API por separado. Revertir un deployment de Vercel no revierte el backend ni los datos. Las migraciones nuevas son aditivas, pero su reversión elimina columnas de catálogo/publicación y tablas de caché: preservar respaldo y coordinar la versión del código antes de un rollback de base de datos.

No ejecutar migrate:fresh ni seeders indiscriminados en producción.
