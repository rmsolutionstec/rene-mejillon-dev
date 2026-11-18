# Portafolio de René Mejillón

Página personal estática en React 18, Vite 8, Tailwind CSS y Framer Motion, alojada en Vercel. Contacto por correo y WhatsApp. No utiliza API, panel administrativo, autenticación ni base de datos.

- Perfil: experiencia práctica con Laravel/React desde 2023 y trayectoria TI desde 2008.
- Contacto profesional: renemejillon@alphaecuador.com.
- Servicios Alpha: contacto@alphaecuador.com.
- WhatsApp: +593 98 181 7493.
- LinkedIn: https://www.linkedin.com/in/renemejillon/
- Web: https://rene-mejillon-dev.vercel.app/

## Trabajar y publicar

Requisito: Node.js 24.

```text
cd frontend
npm ci
npm run dev
npm run lint
npm run build
cd ..
node scripts/check-content.mjs --dist
```

Editar frontend/src/data/catalog.json para actualizar perfil, proyectos, servicios, habilidades y experiencia. Es la única fuente de contenido. El adaptador portfolioData.js prepara las vistas sin peticiones de red.

La publicación conserva la configuración de Vercel: raíz frontend, comando npm run build y salida dist. No requiere variables VITE_API_URL ni archivos .env. Las variables antiguas de Vercel no afectan al código actual, pero pueden retirarse al revisar la configuración remota.

Antes de integrar a main: revisar el contenido contra LinkedIn, ejecutar validaciones y obtener autorización expresa, porque el push activa el despliegue.

## Contacto y CV

El botón de correo abre el programa del visitante con asunto inicial. Si no tiene una aplicación configurada, puede copiar la dirección visible y escribir desde su proveedor de correo. WhatsApp abre una conversación con texto editable; no envía mensajes automáticamente.

Se han validado las URL, no la entrega real del correo ni que la cuenta WhatsApp esté operativa. Esa prueba requiere recepción por el propietario.

El PDF canónico está en frontend/public/cv/rene-mejillon-cv.pdf. Su alias Rene_Mejillon_CV_2026.pdf mantiene los mismos bytes. scripts/generate_cv.py genera un candidato desde el catálogo; renderizar y revisar antes de reemplazar los archivos públicos. Dependencias del generador: scripts/requirements-pdf.txt.

## Retiro del backend

Laravel, scripts de demostración, cliente Axios, administrador, configuración de Render y CI PHP se retiran del código versionado. Son recuperables desde el commit dabf09b. Los archivos locales privados/ignorados del antiguo backend se conservan y la carpeta queda excluida de Git.

No se han apagado servicios de Render ni eliminado bases remotas. Antes de hacerlo hay que confirmar qué servicios existen y exportar cualquier mensaje guardado.

Detalles de validación y pendientes: docs/portfolio-upgrade/STATIC-PORTFOLIO.md.
