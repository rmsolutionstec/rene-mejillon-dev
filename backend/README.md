# API del portafolio — Laravel 12

API REST con Sanctum, PostgreSQL previsto en Render y SQLite en pruebas. PHP 8.3 para desarrollo y PHPUnit; el Docker de ejecución utiliza PHP 8.2.

Las dependencias y el código ya están incluidos en el repositorio: instalar con `composer install`; no crear un nuevo proyecto Laravel dentro de esta carpeta.

La configuración se documenta en `.env.example`, sin credenciales reales. Configurar una base local, APP_KEY, ADMIN_EMAIL y ADMIN_PASSWORD antes de ejecutar migraciones y seeders. Nunca ejecutar seeders en una base de producción sin respaldo y autorización.

```text
php artisan migrate
php artisan db:seed
php artisan serve
php artisan test
```

La suite usa una base SQLite en memoria y no usa las credenciales de la base habitual. El script `../scripts/start-demo.ps1` ofrece una demostración aislada sin editar archivos .env.

El catálogo de `resources/portfolio.json` se comparte con el frontend. Los seeders conservan registros existentes. `php artisan portfolio:sync` muestra los cambios posibles; `--apply` inserta faltantes y `--overwrite --apply` permite reemplazar expresamente los registros del catálogo. Las publicaciones existentes deben revisarse al adoptar la nueva migración.

Listados públicos de proyectos, habilidades y servicios solo incluyen is_published=true. El panel tiene listados y CRUD protegidos, estadísticas reales y gestión de contactos. Login: 5 peticiones/minuto; contacto: 3/hora. Tokens: 24 horas.

El contrato completo, los pasos de despliegue y las limitaciones están en [PROJECT.md](../PROJECT.md).
