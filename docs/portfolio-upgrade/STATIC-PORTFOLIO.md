# Simplificación del portafolio — 18/11/2026

## Alcance

El propietario eligió actualizar el contenido mediante Git y recibir contactos por correo/WhatsApp. Se retiran API Laravel, administrador, autenticación y base de datos de la aplicación versionada.

El catálogo único es frontend/src/data/catalog.json. Se eliminan la duplicación en backend, la sincronización, los seeders y la configuración de Render. Los scripts de CV, tarjeta social y validación usan el catálogo estático. El CV se actualiza para describir la implementación actual.

Los botones abren correo o WhatsApp con texto/asunto codificado; no envían automáticamente ni guardan mensajes. Correos y número visibles se conservan según los datos del propietario.

## Preservación

Código Laravel anterior recuperable desde dabf09b. Solo se eliminan fuentes versionadas, no archivos .env privados, vendor, datos locales ni almacenamiento remoto. Los residuos locales de backend se ignoran en Git.

El archivo ajeno test_edge.png se conserva sin seguimiento. El push a main fue autorizado el 18/11/2026; no se apagan servicios de Render.

## Validación

Lint, build y chequeo de catálogo/CV ejecutados localmente. La compilación ya no genera módulos administrativos ni gráficos. Chromium revisado a 360/768/1440 px: ocho proyectos, sin desbordamiento ni errores JavaScript. Enlaces mailto/WhatsApp y sus parámetros comprobados, cero peticiones fetch/XHR, sin formulario ni login. Modal/Escape y descarga del CV comprobados. PDF de dos páginas renderizado y revisado; canónico, alias y descarga idénticos. Evidencias locales en output/playwright y output/pdf (ignoradas por Git).

Auditoría de ejecución (npm audit --omit=dev): sin vulnerabilidades reportadas. La auditoría completa detecta picomatch en las herramientas de compilación: 12 paquetes marcados en la cadena, con un aviso raíz sin parche publicado. No se fuerza la bajada incompatible de Vite ni se desactiva la auditoría de CI.

Fuente: https://github.com/advisories/GHSA-fc5q-39xc-vjpf (sin parche, consultada el 18/11/2026). No aceptar patrones glob de visitantes ni publicar el servidor Vite de desarrollo en Internet.

## Pendientes externos

- El propietario debe probar recepción real del correo y disponibilidad de WhatsApp. No se envían mensajes de prueba sin instrucciones explícitas.
- Revisar Render y exportar mensajes existentes antes de autorizar la baja de servicios.
- Publicación autorizada el 18/11/2026; comprobar Vercel, contacto y CV tras el push.
- GitHub Actions estuvo bloqueado por facturación; verificar la cuenta antes de depender de los checks.
- Resolver la alerta de tooling cuando exista un parche compatible. No se afirma auditoría completa sin alertas.

Revisión previa al push: corregido el texto heredado de especialista del footer. CI ejecuta lint/build/catálogo antes de auditar dependencias; la alerta alta sigue bloqueando el job y no se oculta. El chequeo valida además el alias PDF, ausencia de dependencias administrativas y redirección de rutas retiradas.
