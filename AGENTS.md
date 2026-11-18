# AGENTS.md — Portafolio de René Mejillón

## Arquitectura vigente (18/11/2026)

Por decisión expresa del propietario, este proyecto es un portafolio estático React 18 + Vite 8 + Tailwind CSS + Framer Motion en Vercel. Contacto mediante correo y WhatsApp; edición mediante Git. Se retiraron Laravel, API, administrador, autenticación, base de datos y Render del código versionado. No reintroducirlos sin un nuevo requisito.

Fuente única: frontend/src/data/catalog.json; adaptador: frontend/src/data/portfolioData.js. Los scripts de CV, tarjeta social y validación leen el mismo catálogo. No hay seeders ni sincronización de datos remotos.

## Perfil y evidencias

Aplicar docs/portfolio-upgrade/CONTENT-VERIFICATION.md y su actualización vigente. Las referencias técnicas antiguas a este portafolio con API son históricas.

- TI desde mayo 2008: RM Solutions Tec hasta julio 2023; Alpha Publicidad, Soporte y Desarrollo desde agosto 2023. REMETECS es seudónimo.
- Laravel/React desde 2023; no convertir toda la trayectoria TI en años de programación.
- Academia Luz al Mundo es el proyecto principal, en uso y evolución, enero 2025–actualidad. Fundación Clínica del Alma es el segundo, portal institucional, julio–diciembre 2025.
- Mantener los ocho proyectos en inventario; no atribuir a Fundación un sistema clínico ni heredar el stack de Academia.
- Python/Django académicos; Linux/Docker como aprendizaje aplicado. No prometer servicios comerciales sin respaldo.
- Estudios diciembre 2022–junio 2025; registro del título 17/06/2026.
- Contacto profesional renemejillon@alphaecuador.com; servicios contacto@alphaecuador.com; WhatsApp +593 98 181 7493.

## Reglas

1. Inspeccionar antes de modificar y respetar cambios ajenos.
2. No crear, editar, publicar ni commitear .env reales con secretos. La aplicación estática no necesita variables de API.
3. Mantener frontend/public/cv/rene-mejillon-cv.pdf accesible con cabecera %PDF-. Conservar el alias y validar igualdad.
4. Sin porcentajes arbitrarios, testimonios inventados, métricas o niveles profesionales sin evidencia.
5. No publicar datos reales de usuarios en capturas ni identificadores personales de certificados.
6. Commits convencionales y ramas codex/*. No push a main ni despliegue sin autorización expresa.
7. No borrar archivos privados del backend residual ni bases locales/remotas. Antes de retirar servicios externos, revisar y respaldar cualquier mensaje almacenado.
8. React funcional, accesibilidad, foco y movimiento reducido. No mostrar falsos estados de mensaje enviado.
9. Las skills anteriores de consistencia/seguridad que asuman Laravel o seeders deben adaptarse a esta arquitectura por instrucción del propietario.

## Validaciones

- frontend: npm run lint y npm run build.
- raíz: node scripts/check-content.mjs --dist.
- Interfaz: 360/768/1440 px, teclado, modales, enlaces de correo/WhatsApp y descarga del CV.
- La comprobación de un enlace no demuestra entrega de correo ni actividad de una cuenta WhatsApp.
