$ErrorActionPreference = 'Stop'
$taskRoot = Split-Path -Parent $PSScriptRoot
$taskDb = Join-Path $taskRoot 'output\portfolio-demo.sqlite'
New-Item -ItemType Directory -Path (Join-Path $taskRoot 'output') -Force | Out-Null
if (-not (Test-Path -LiteralPath $taskDb)) { New-Item -ItemType File -Path $taskDb | Out-Null }
# Process-only configuration for a local, synthetic demo. Never changes a real .env.
$env:APP_ENV = 'local'
$env:APP_DEBUG = 'false'
$env:APP_KEY = 'base64:' + [Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
$env:DB_CONNECTION = 'sqlite'
$env:DB_DATABASE = $taskDb
$env:DB_URL = ''
$env:CACHE_STORE = 'database'
$env:SESSION_DRIVER = 'array'
$env:ADMIN_EMAIL = 'demo@example.test'
$env:ADMIN_PASSWORD = 'Local-demo-only-2026!'
$env:CORS_ALLOWED_ORIGINS = 'http://127.0.0.1:4174,http://127.0.0.1:3000'
Push-Location (Join-Path $taskRoot 'backend')
try {
    php artisan migrate --force
    if ($LASTEXITCODE -ne 0) { throw 'La migración de la demostración falló.' }
    php artisan db:seed --force
    if ($LASTEXITCODE -ne 0) { throw 'La carga del catálogo de demostración falló.' }
    php artisan serve --host=127.0.0.1 --port=8010
} finally { Pop-Location }
