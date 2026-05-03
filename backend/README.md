# Backend — René Mejillón Dev API

API REST desarrollada con **Laravel 10** y **MySQL**. Autenticación con Laravel Sanctum.

## Requisitos

- PHP ≥ 8.1
- Composer ≥ 2
- MySQL ≥ 8.0 (o Railway MySQL plugin)

## Instalación local

```bash
# 1. Instalar Laravel en la carpeta backend (si aún no existe)
composer create-project laravel/backend

# 2. Copiar y configurar el entorno
cp .env.example .env
php artisan key:generate

# 3. Editar .env con tus credenciales de base de datos
#    DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD

# 4. Ejecutar migraciones y seeders
php artisan migrate --seed

# 5. Instalar Sanctum (ya incluido en Laravel 10)
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 6. Iniciar servidor de desarrollo
php artisan serve
```

La API quedará disponible en `http://localhost:8000/api`.

## Estructura de archivos a copiar

Después de crear el proyecto Laravel, copia los siguientes archivos de este repositorio:

```
routes/api.php
app/Models/Project.php
app/Models/Skill.php
app/Models/Service.php
app/Models/Contact.php
app/Http/Controllers/API/AuthController.php
app/Http/Controllers/API/ProjectController.php
app/Http/Controllers/API/SkillController.php
app/Http/Controllers/API/ServiceController.php
app/Http/Controllers/API/ContactController.php
app/Http/Controllers/API/StatsController.php
database/migrations/
database/seeders/
```

## Configurar CORS

En `config/cors.php`, asegúrate de que `allowed_origins` incluya la URL del frontend:

```php
'allowed_origins' => [env('CORS_ALLOWED_ORIGINS', 'http://localhost:3000')],
```

O usa el comodín para desarrollo:
```php
'allowed_origins' => ['*'],
```

## Endpoints públicos

| Método | Ruta                 | Descripción              |
|--------|----------------------|--------------------------|
| GET    | /api/projects        | Lista de proyectos        |
| GET    | /api/projects/{id}   | Proyecto individual       |
| GET    | /api/skills          | Lista de habilidades      |
| GET    | /api/services        | Lista de servicios        |
| POST   | /api/contact         | Enviar mensaje de contacto|

## Endpoints admin (requieren Bearer token)

| Método | Ruta                        | Descripción               |
|--------|-----------------------------|---------------------------|
| POST   | /api/admin/login            | Iniciar sesión             |
| POST   | /api/admin/logout           | Cerrar sesión              |
| GET    | /api/admin/me               | Usuario autenticado        |
| GET    | /api/admin/stats            | Estadísticas del panel     |
| CRUD   | /api/admin/projects         | Gestión de proyectos       |
| CRUD   | /api/admin/skills           | Gestión de habilidades     |
| CRUD   | /api/admin/services         | Gestión de servicios       |
| GET    | /api/admin/contacts         | Lista de contactos         |
| PATCH  | /api/admin/contacts/{id}/read | Marcar como leído        |
| DELETE | /api/admin/contacts/{id}    | Eliminar contacto          |

## Despliegue en Railway

1. Crea un nuevo proyecto en [railway.app](https://railway.app)
2. Agrega un servicio **MySQL** desde el panel
3. Conecta tu repositorio de GitHub
4. Configura las variables de entorno:
   - `APP_KEY` (genera con `php artisan key:generate --show`)
   - `DB_*` (Railway proporciona las credenciales automáticamente)
   - `ADMIN_EMAIL` y `ADMIN_PASSWORD`
   - `CORS_ALLOWED_ORIGINS` con la URL de tu frontend en Vercel

El `railway.json` ya configura el comando de inicio con migraciones automáticas.
