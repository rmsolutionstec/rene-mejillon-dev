# Especificación técnica vigente — 15/11/2026

## Fuentes de contenido

La matriz vigente es `docs/portfolio-upgrade/CONTENT-VERIFICATION.md`. Los datos del propietario y la lectura documentada de LinkedIn prevalecen frente al contenido histórico. La fuente canónica es `backend/resources/portfolio.json`. `node scripts/sync-catalog.mjs` genera `frontend/src/data/catalog.json`; la comprobación de contenido exige igualdad. Vercel construye exclusivamente desde frontend y Docker desde backend, sin accesos cruzados durante sus builds.

Perfil, formación y experiencia laboral permanecen versionados en el catálogo. El panel administra proyectos, habilidades, servicios y contactos. Una edición administrativa se refleja al volver a cargar la página pública; no se promete sincronización en tiempo real entre pestañas.

No mezclar TI desde 2008 con Laravel/React desde 2023. Estudios: diciembre 2022–junio 2025; registro: junio 2026. Academia es el proyecto principal (enero 2025–actualidad); Fundación es portal institucional (julio–diciembre 2025). La colaboración multimedia heredada de Fundación se conserva por separado de esas fechas de proyecto.

## Contrato público

- GET `/api/projects`, `/api/projects/{id}`, `/api/skills`, `/api/services`, `/api/services/{id}`.
- Las colecciones devuelven `{data: [...], meta: {catalog_version: 2}}`.
- Solo se publican registros con `is_published=true`. Los detalles públicos tampoco muestran borradores.
- Campos de proyecto: title, short_desc, description, category, status, tech[], live_url, github_url, year, period, participation, achievements[], featured, display_order e is_published.
- Campos de habilidad: name, category (frontend/backend/database/devops), experience (practice/academic/learning), icon e is_published. La columna heredada level no se muestra ni se usa para editar.
- Los servicios tienen title, description, icon, features[], popular, price opcional e is_published. El catálogo confirmado no establece precios.
- Las URL aceptadas son HTTP/HTTPS. La UI inserta texto como texto React, sin HTML interpretado.

Las peticiones del sitio no envían el token administrativo. El fallback se conserva por sección ante fallo HTTP, contrato antiguo o respuesta inválida. Una respuesta compatible con data=[] retira esa sección, respetando la decisión del administrador.

## Autenticación y rutas administrativas

POST `/api/admin/login` (5 peticiones/minuto por IP), POST logout y GET me. Sanctum valida los Bearer tokens, con expiración de 1440 minutos y revocación en logout. El frontend comprueba la sesión antes de renderizar el panel y presenta un estado de error si la API no responde.

GET/POST/PUT/PATCH/DELETE bajo `/api/admin/projects`, skills y services; GET stats; GET contacts, PATCH contacts/{id}/read y DELETE contacts/{id}. No hay registro público de usuarios ni roles adicionales.

El token permanece en localStorage; moverlo a sessionStorage no remedia XSS. Una migración a cookies httpOnly requiere diseñar dominios, CORS y CSRF conjuntamente, y queda fuera de esta entrega.

Contacto: POST `/api/contact`, 3 peticiones/hora por IP. Form Request sanitiza antes de validar, limita tamaños y no devuelve el mensaje ni otros datos personales en la respuesta pública. El formulario distingue validación y límite de envío.

## Persistencia y sincronización

La nueva migración añade claves de catálogo, orden, período, participación, aportes y clasificación de experiencia. También añade publicación explícita, inicialmente falsa para registros preexistentes. Se incorporan además las tablas de caché que Laravel requiere para el rate limiting persistente. Ninguna migración elimina contactos ni contenido heredado.

Los seeders adoptan claves estables y usan firstOrCreate: insertan elementos faltantes y conservan las ediciones existentes. No borran datos ni reinician contraseñas. DatabaseSeeder exige ADMIN_EMAIL válido y ADMIN_PASSWORD de al menos 12 caracteres; no existe contraseña de respaldo.

Para una BD existente, primero respaldar y revisar:

```text
php artisan portfolio:sync
php artisan portfolio:sync --overwrite
```

Ambos comandos anteriores solo muestran el plan. `--apply` inserta faltantes; combinado con `--overwrite` reemplaza explícitamente los datos de los registros del catálogo. Ese reemplazo puede sobrescribir ediciones administrativas, por lo que debe revisarse contra el respaldo antes de ejecutarlo. Los registros ajenos al catálogo se conservan y pueden permanecer sin publicar.

Después de migrar una BD antigua, revisar y publicar el catálogo antes de habilitar el nuevo frontend. Desplegar API y migración compatibles primero, sincronizar con autorización y luego desplegar frontend. El contrato 2 permite al frontend conservar su catálogo ante una API anterior.

## Entornos y despliegue

Frontend: Vercel, directorio frontend, Node 24, npm ci y npm run build, salida dist. VITE_API_URL debe apuntar a la API HTTPS correcta en cada entorno.

Backend: Render/Docker/PHP 8.2 para ejecución; PHP 8.3 para las herramientas de desarrollo. PostgreSQL previsto en producción. Revisar configuración activa antes de publicar: render.yaml no prueba que exista un servicio operativo con esos valores.

APP_KEY debe ser una clave Laravel válida configurada en el entorno de Render. APP_DEBUG=false, DB_SSLMODE=require y CORS_ALLOWED_ORIGINS debe incluir solo los orígenes usados. No reutilizar secretos de producción en Previews; las pruebas con escrituras necesitan una API/BD aislada.

Los headers CSP/HSTS y rewrites se mantienen en frontend/vercel.json. No habilitar orígenes comodín para que un Preview pueda escribir en producción. Una URL de API con otro dominio exige ajustar connect-src deliberadamente.

El contenedor mantiene el servidor PHP integrado existente; no se afirma que sea una infraestructura de alta disponibilidad. Para tráfico o requisitos mayores, evaluar un servidor de aplicaciones apropiado en una entrega separada.

## Comprobaciones y límites

Pruebas locales: consultar IMPLEMENTATION-REPORT. La suite funcional cubre acceso, publicación, CRUD, sanitización, throttle, estadísticas por mes, expiración/logout y sincronización.

CI prepara PostgreSQL 16 además de SQLite, pero esa ejecución remota queda pendiente hasta publicar la rama. Los metadatos de seguridad configurados no son prueba de seguridad absoluta; no se certifica WCAG completa ni Core Web Vitals sin una medición específica.

Una reversión del frontend no revierte la API ni la base de datos. Registrar versiones de ambos servicios y preservar respaldos antes de cambios de esquema o sincronización.
