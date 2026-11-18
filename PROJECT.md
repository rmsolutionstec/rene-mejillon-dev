# Arquitectura vigente — 18/11/2026

Portafolio estático: React 18 + Vite 8 + Tailwind CSS + Framer Motion. Solo requiere hosting de archivos estáticos en Vercel. No hay servidor Laravel, API, autenticación, panel, sesiones, formularios de envío ni base de datos en la aplicación actual.

## Datos y edición

Fuente única: frontend/src/data/catalog.json. portfolioData.js exporta los datos y enlaces de contacto. Projects, Skills y Services consumen las exportaciones directamente. Hero, About y Experience conservan la cronología y evidencia acordadas en CONTENT-VERIFICATION.md.

Editar código/catálogo, validar, revisar diff y publicar mediante Git con autorización. Ya no existen procesos de seed, sincronización de BD ni migraciones.

Las tecnologías Laravel/MySQL mencionadas en habilidades y otros proyectos son parte del perfil profesional; no son dependencias del funcionamiento de este portafolio.

## Contacto

Correo profesional: renemejillon@alphaecuador.com. Servicios: contacto@alphaecuador.com. WhatsApp: 593981817493. Los enlaces codifican asunto/texto y no transmiten un mensaje sin intervención del visitante.

No se almacenan datos de visitantes ni se muestran confirmaciones de entrega ficticias. La recepción de correo y disponibilidad real del número se validan manualmente con el propietario.

## Despliegue y seguridad

Vercel construye desde frontend con npm ci y npm run build. No necesita VITE_API_URL. Se conserva CSP/HSTS; connect-src se restringe a none porque la aplicación no usa fetch/XHR. Las rutas antiguas /admin redirigen permanentemente al inicio en Vercel; las URL desconocidas no tienen reescritura a una SPA administrativa.

CI incluye instalación, auditoría, lint, build y comprobación del catálogo/CV, sin PHP ni PostgreSQL. La auditoría completa mantiene su condición de fallo ante alertas altas: no se oculta la alerta actual de picomatch. El bloqueo de facturación de Actions observado anteriormente requiere revisión de cuenta; este cambio no lo resuelve.

El backend anterior es recuperable desde dabf09b. No borrar archivos .env privados ni bases locales; el directorio backend residual queda ignorado. No apagar ni eliminar servicios remotos sin comprobarlos y obtener autorización específica.

## CV

scripts/generate_cv.py lee el catálogo del frontend y genera dos páginas A4 con texto seleccionable. El CV describe ahora este proyecto como React/Vite, Git y contacto directo. Se mantiene la trayectoria TI y formación previamente aprobadas, sin identificadores del certificado.

Ver STATIC-PORTFOLIO.md para la evidencia local y los pendientes.
