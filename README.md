# René Mejillón — portafolio profesional

Portafolio de René David Mejillón Torres, desarrollador full stack en Guayaquil, Ecuador. Experiencia práctica con Laravel y React desde 2023; trayectoria TI desde 2008. Datos contrastados con el perfil de LinkedIn y la información aportada por el propietario.

- Web: https://rene-mejillon-dev.vercel.app/
- LinkedIn: https://www.linkedin.com/in/renemejillon/
- GitHub: https://github.com/rmsolutionstec
- Contacto profesional: renemejillon@alphaecuador.com
- Servicios de Alpha: contacto@alphaecuador.com

## Arquitectura

React 18 + Vite 8 + Tailwind CSS y React Router 7 en `frontend/`. Laravel 12 + Sanctum en `backend/`. PostgreSQL previsto en Render; SQLite para pruebas locales. La API se implementa en este repositorio; la configuración y disponibilidad de producción se comprueban antes del despliegue.

El catálogo inicial vive en `backend/resources/portfolio.json`: los seeders leen ese archivo y el frontend importa una copia generada, versionada en frontend/src/data/catalog.json. Tras editar la fuente, ejecutar node scripts/sync-catalog.mjs; CI comprueba que no haya divergencias. Así el build de Vercel funciona íntegramente desde frontend sin acceder a su directorio hermano. La web muestra ese contenido inmediatamente y actualiza proyectos, habilidades y servicios desde la API compatible (contrato 2). Ante un error conserva el contenido inicial. Una colección vacía válida se muestra vacía.

Academia Luz al Mundo y Fundación Clínica del Alma encabezan los ocho proyectos. Las habilidades distinguen experiencia práctica, académica y aprendizaje aplicado. Los testimonios quedan sin publicar hasta disponer de evidencia y autorización.

## Desarrollo

Requisitos: Node.js 24, Composer 2 y PHP 8.3 con SQLite para la suite de desarrollo. El contenedor de producción mantiene PHP 8.2 con dependencias de ejecución compatibles.

```powershell
cd frontend
npm ci
npm run dev
```

Configurar `VITE_API_URL` en el entorno de desarrollo o de Vercel; la plantilla `.env.example` contiene únicamente configuración pública. Si se omite, el cliente usa `/api` y el servidor Vite de desarrollo tiene un proxy hacia el backend local. Las variables `VITE_*` quedan expuestas en el JavaScript del navegador.

Para una demostración aislada en Windows:

```powershell
./scripts/start-demo.ps1
```

El script crea exclusivamente `output/portfolio-demo.sqlite`, carga el catálogo e inicia la API en `http://127.0.0.1:8010`. Usa configuración de proceso y credenciales sintéticas (demo@example.test / Local-demo-only-2026!). No modifica archivos `.env` reales. En otra consola, construir el frontend con `VITE_API_URL=http://127.0.0.1:8010/api` y ejecutar `npm run preview -- --host 127.0.0.1 --port 4174`. Estas credenciales nunca se usan en producción.

## Validación

```powershell
cd frontend
npm run lint
npm run build
cd ..
node scripts/check-content.mjs --dist
cd backend
php artisan test
php vendor/bin/pint --test app routes database config/portfolio.php tests
```

PHPUnit utiliza SQLite en memoria. En el entorno restringido de Windows, PHP puede informar que los archivos no son legibles aun existiendo: ejecutar la suite con los permisos normales del usuario, sin modificar vendor para evadir ese diagnóstico.

GitHub Actions prepara lint, build, comprobación de catálogo/CV y pruebas PHP en SQLite y PostgreSQL. La ejecución remota y los checks obligatorios se verifican tras publicar la rama autorizada.

## CV y privacidad

El CV canónico está en `frontend/public/cv/rene-mejillon-cv.pdf`. Se mantiene el alias `Rene_Mejillon_CV_2026.pdf` con los mismos bytes. El generador reproducible es `scripts/generate_cv.py` (dependencias en `scripts/requirements-pdf.txt`); primero genera un candidato en `output/pdf/`. Revisar visualmente sus dos páginas antes de copiarlo a las rutas públicas.

Los PDF están marcados como binarios en `.gitattributes`. No contienen cédula ni identificadores personales de certificados. Las antiguas capturas dejaron de distribuirse; la tarjeta social tiene contenido profesional y no incluye métricas de demostración. Para nuevas capturas usar una copia con datos sintéticos completos.

## Publicación

Trabajar en ramas `codex/*`, validar localmente, revisar PR/Preview y obtener autorización antes de integrar a `main`, dado que esa integración activa Vercel. No se ejecutan seeders ni migraciones de producción de forma automática desde este trabajo.

Ver [PROJECT.md](PROJECT.md) y [reporte de implementación](docs/portfolio-upgrade/IMPLEMENTATION-REPORT.md) para el contrato, la migración y los controles pendientes de publicación.
