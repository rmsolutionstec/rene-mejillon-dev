# AGENTS.md — Equipo de Desarrollo: Academia Luz al Mundo

> **Guia de uso:** Este archivo define el comportamiento de cada especialista de IA para este proyecto.  
> Se carga automaticamente por VS Code Copilot. Es portable via `git` — sin instalacion extra.  
> Ultima actualizacion: 22/04/2026 — Nivel Enterprise (22 agentes + Auditoria de Seguridad incluida).
>
> **Reutilizacion:** Para usar este archivo en un nuevo proyecto, copiar al root del repositorio,
> actualizar la seccion CONTEXTO GLOBAL con el stack real, y ajustar los mapas de archivos de cada agente.
> Las convenciones, patrones y checklists son universales para cualquier proyecto Laravel + React.

### MODO PLANTILLA CLONABLE (obligatorio al copiar a otro repo)

Antes de usar este archivo en otro proyecto, reemplazar estos placeholders globales:

```
PROJECT_NAME=Portfolio René Mejillón
PROJECT_DOMAIN=https://rene-mejillon-dev.vercel.app
PROJECT_STACK=Laravel 12 API REST + React 19 + Vite (sin Inertia — SPA desacoplada)
PROJECT_ROLES=admin (único rol — panel de gestión del portfolio)
PRIMARY_DB=mysql
LOCAL_DB=sqlite
```

Checklist de portabilidad rapida:

```
[ ] Actualizar CONTEXTO GLOBAL con versiones reales del nuevo proyecto
[ ] Revisar mapas de archivos por agente (controllers/models/pages)
[ ] Ajustar nombres de rutas segun convencion del nuevo repo
[ ] Ajustar dominios en SEO, robots.txt, sitemap y canonical URLs
[ ] Ajustar pipeline CI/CD y rutas de deploy
[ ] Verificar si los roles siguen siendo los mismos
[ ] Actualizar fecha y version de agentes en encabezado
```

### MODO OPERACION DIARIA (recomendado)

Secuencia corta para evitar ruido y acelerar resultados:

```
Paso 1: discovery rapido (1er pase)
- Detectar stack activo y alcance del cambio
- Identificar riesgo: bajo, medio, alto, critico

Paso 2: activar agentes por relevancia (no todos)
- Base minima: architecture-expert + security-expert + code-reviewer
- Sumar especialistas segun tecnologia tocada

Paso 3: ejecutar y cerrar con evidencia
- Cambios aplicados
- Validacion (tests/lint/build/syntax)
- Riesgos residuales y siguientes pasos
```

### MATRIZ DE ACTIVACION RAPIDA

```
Si toca login/logout/419 -> auth-access-expert + inertia-integration-expert + observability-expert
Si toca rutas/controladores Laravel -> laravel-expert + security-expert
Si toca vistas React/Inertia -> react-expert + ux-ui-expert
Si toca performance -> performance-expert + database-expert
Si toca despliegue -> devops-expert + security-expert
Si es auditoria general -> fullstack-auditor + code-reviewer
Si toca Jobs/Listeners/queue -> queue-jobs-expert + laravel-expert
Si toca Notifications/Mail -> notifications-mail-expert + laravel-expert
Si toca reportes o PDFs -> reports-pdf-expert + security-expert
Si toca imagenes/branding/landing visual -> graphic-design-web-expert + ux-ui-expert
Si toca subida/procesamiento de imagenes -> image-optimization-expert + security-expert
Si toca responsive/breakpoints/multi-resolucion/4K/movil -> responsive-design-expert + ux-ui-expert
```

### PROMPT DE ARRANQUE RAPIDO

Al iniciar una sesion nueva, usa el archivo maestro de prompts:

`docs/prompts/copilot-prompts-master.md`

---

## CONTEXTO GLOBAL DEL PROYECTO

**Portfolio René Mejillón** es un CV digital y portfolio profesional para René Mejillón, Full Stack Developer.

| Dimensión | Detalle |
|-----------|---------|
| Frontend  | React 19, Vite 6, Tailwind CSS 3, Framer Motion, React Type Animation |
| Backend   | Laravel 12 API REST, PHP 8.2+ |
| Auth      | Laravel Sanctum (panel admin) |
| DB        | MySQL (producción) / SQLite (dev) |
| Deploy FE | Vercel |
| Deploy BE | Render (Dockerfile incluido) |
| Rutas FE  | React Router DOM (SPA desacoplada — sin Inertia) |

**Arquitectura:** SPA desacoplada. El frontend React consume la API REST de Laravel via `VITE_API_URL`.
No usa Inertia ni SSR. Cada sección del portfolio puede usar datos estáticos (`src/data/portfolioData.js`)
o dinámicos desde la API según disponibilidad.

**Único rol del sistema:** `admin` — gestiona proyectos, habilidades, servicios y contactos desde el panel `/admin`.

**4 proyectos del portfolio (orden de visualización):**
1. `Academia Luz al Mundo` — plataforma académica multi-rol (casi terminado) · Laravel 12 + React 19 + Inertia 2
2. `Fundación Clínica del Alma` — sistema de gestión para fundación de salud mental (casi terminado) · Laravel + React
3. `Alpha Publicidad y Soporte` — ecommerce de empresa propia (en desarrollo) · Laravel + React + Stripe
4. `Portfolio René Mejillón` — este proyecto (en desarrollo) · React 19 + Vite + Laravel 12 API

---

## ESTANDARES GLOBALES (todos los agentes los siguen)

### Convenciones de Codigo PHP

- PSR-12 estricto + Laravel Pint para formateo automatico
- Nombres de clases: PascalCase — `PaymentCrudController`
- Nombres de metodos: camelCase — `createPayment()`, `syncBalance()`
- Nombres de variables: camelCase — `$studentId`, `$danceClass`
- Constantes: SCREAMING_SNAKE — `MAX_STUDENTS_PER_CLASS = 25`
- Strings en ingles para codigo, espanol para mensajes UI

### Convenciones de Codigo JavaScript/React

- Componentes: PascalCase — `StatCard`, `ConfirmDeleteModal`
- Hooks custom: useVerb — `usePaymentForm`, `useAttendanceFilter`
- Variables/funciones: camelCase — `handleSubmit`, `isLoading`
- Constantes de modulo: UPPER_SNAKE — `MAX_FILE_SIZE`
- Props: camelCase, booleanos con `is`/`has` — `isLoading`, `hasError`

### Git Workflow del Equipo

```
main          → produccion (protegida, solo via PR)
develop       → integracion continua
feature/*     → nueva funcionalidad (feature/payments-export)
fix/*         → correccion de bug (fix/attendance-null-date)
hotfix/*      → critico en produccion (hotfix/payment-double-charge)
```

**Commits (Conventional Commits obligatorio):**
```
feat(payments): add PDF export for monthly reports
fix(enrollment): prevent duplicate enrollment on fast click
refactor(billing): extract discount calculation to BillingService
test(payments): add feature test for payment creation
docs(api): add OpenAPI spec for payments endpoint
chore(deps): update spatie/laravel-permission to 6.20
```

---

## AGENT: laravel-expert

**Descripcion:** Especialista senior en backend Laravel 12. Domina la arquitectura completa del
proyecto: controladores, modelos, servicios, eventos, jobs, excepciones y API. Escribe codigo
de nivel produccion — no solo funcional, sino robusto, testeable y mantenible.

**Activa automaticamente cuando editas:**
- `app/Http/Controllers/**/*.php`
- `app/Http/Requests/**/*.php`
- `app/Models/**/*.php`
- `app/Services/**/*.php`
- `app/Policies/**/*.php`
- `app/Events/**/*.php`
- `app/Listeners/**/*.php`
- `app/Jobs/**/*.php`
- `app/Exceptions/**/*.php`
- `routes/web.php` y `routes/api.php`
- `database/migrations/**/*.php`
- `database/seeders/**/*.php`
- `config/**/*.php`

### INSTRUCCIONES ESPECIALIZADAS

#### Mapa Real de Controladores:

```
app/Http/Controllers/
├── Controller.php                          (base)
├── ProfileController.php
├── PublicPageController.php                (home, quienes-somos, inscripcion, ritmos, galas, galeria, contactanos)
|
├── Admin/                                  (29 controllers)
│   ├── AdminDashboardController.php        <- inyecta DashboardStatsService
│   ├── AdminAssignmentController.php       <- tareas/asignaciones (admin)
│   ├── AdminGradeController.php            <- calificaciones (admin)
│   ├── UserCrudController.php
│   ├── DanceClassCrudController.php        <- enroll/unenroll student actions
│   ├── DanceGenreCrudController.php
│   ├── DanceLevelCrudController.php
│   ├── ClassroomCrudController.php
│   ├── EnrollmentCrudController.php
│   ├── AttendanceCrudController.php        <- bulk attendance disponible
│   ├── PaymentCrudController.php           <- inyecta BillingService / PaymentSyncService
│   ├── EventCrudController.php
│   ├── AcademicPeriodCrudController.php
│   ├── ChargeCrudController.php
│   ├── ChargeConceptCrudController.php     <- conceptos de cobro (reemplaza strings hardcodeados)
│   ├── DiscountCrudController.php
│   ├── DiscountTypeCrudController.php
│   ├── StudentDiscountCrudController.php
│   ├── ScholarshipCrudController.php
│   ├── RepresentativeCrudController.php
│   ├── StudentController.php
│   ├── TeacherController.php
│   ├── SecretaryController.php
│   ├── RolePermissionController.php
│   ├── ActivityLogController.php
│   ├── ReportController.php
│   ├── SettingsController.php
│   ├── BackupController.php
│   └── StudentLevelProgressionController.php
|
├── Teacher/
│   ├── TeacherDashboardController.php
│   └── TeacherAssignmentController.php
|
├── Student/
│   ├── StudentDashboardController.php
│   └── StudentAssignmentController.php
|
├── Representative/
│   └── RepresentativeDashboardController.php
|
├── Secretary/
│   └── SecretaryDashboardController.php
|
└── Api/                                    (pendiente de implementar)
```

#### 19 Modelos Eloquent Reales:

```
app/Models/
AcademicPeriod  Assignment  Attendance  Charge  ChargeConcept  Classroom
DanceClass  DanceClassEnrollment  DanceGenre  DanceLevel
Discount  DiscountType  Event  Grade
Payment  Scholarship  StudentDiscount
StudentLevelProgression  User
```

#### Servicios Existentes:

```
app/Services/
├── BillingService.php           // calculo de cobros, aplicacion de descuentos y becas
├── DashboardStatsService.php    // stats con Cache::remember 10 min
├── EnrollmentService.php        // logica de inscripcion/desinscripcion
├── GradingService.php           // calculo de calificaciones y promedios
├── PaymentSyncService.php       // sincronizacion de estados de pago
├── ReportService.php            // generacion de reportes y estadisticas
├── SqidsService.php             // codificacion/decodificacion de IDs con Sqids
└── UserCredentialService.php    // gestion de credenciales de usuario
```

#### 49 Form Requests (26 Store + 23 Update):

```
Store:  AcademicPeriod, Attendance, BulkAttendance, Charge, ChargeConcept,
        Classroom, DanceClass, DanceGenre, DanceLevel, Discount, DiscountType,
        Enrollment, EnrollmentWithStudent, Event, Grade(Update only),
        LevelProgression, Payment, QuickEnroll, Representative,
        Scholarship, Secretary, Student, StudentDiscount, Teacher, User

Update: AcademicPeriod, Attendance, BackupSettings, Charge, ChargeConcept,
        Classroom, DanceClass, DanceGenre, DanceLevel, Discount, DiscountType,
        Enrollment, Event, Grades, Payment, Representative,
        Scholarship, Secretary, Student, StudentDiscount, Teacher, User
```

#### 20 Policies:

```
AcademicPeriodPolicy  AssignmentPolicy    AttendancePolicy
ChargePolicy          ChargeConceptPolicy ClassroomPolicy
DanceClassPolicy      DanceGenrePolicy    DanceLevelPolicy
DiscountPolicy        DiscountTypePolicy  EnrollmentPolicy
EventPolicy           GradePolicy         PaymentPolicy
RepresentativePolicy  ScholarshipPolicy   StudentDiscountPolicy
StudentLevelProgressionPolicy             UserPolicy
```

#### Patron Controlador (nivel enterprise):

```php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;
use App\Services\BillingService;
use App\Services\PaymentSyncService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PaymentCrudController extends Controller
{
    public function __construct(
        private readonly BillingService $billing,
        private readonly PaymentSyncService $paymentSync,
    ) {
        $this->middleware(['auth', 'role:admin']);
    }

    public function index(): Response
    {
        $this->authorize('viewAny', Payment::class);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => Payment::with(['student:id,name', 'charges'])
                ->orderByDesc('created_at')
                ->paginate(15),
        ]);
    }

    public function store(StorePaymentRequest $request): RedirectResponse
    {
        $payment = $this->billing->createPayment($request->validated());
        $this->paymentSync->syncStudentBalance($payment->student_user_id);

        return redirect()->route('admin.payments.show', $payment)
            ->with('success', 'Pago registrado exitosamente.');
    }
}
```

#### Patron Modelo (nivel enterprise):

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;

class DanceClass extends Model
{
    use SoftDeletes, LogsActivity;

    protected $fillable = [
        'name', 'dance_genre_id', 'dance_level_id',
        'classroom_id', 'teacher_user_id',
        'capacity', 'base_price', 'is_active',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'base_price' => 'decimal:2',
        'capacity'   => 'integer',
    ];

    // ActivityLog
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logFillable()->logOnlyDirty();
    }

    // Relaciones (tipadas siempre)
    public function genre(): BelongsTo    { return $this->belongsTo(DanceGenre::class, 'dance_genre_id'); }
    public function level(): BelongsTo    { return $this->belongsTo(DanceLevel::class, 'dance_level_id'); }
    public function classroom(): BelongsTo { return $this->belongsTo(Classroom::class); }
    public function enrollments(): HasMany { return $this->hasMany(DanceClassEnrollment::class); }

    // Scopes reutilizables
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeByGenre(Builder $query, int $genreId): Builder
    {
        return $query->where('dance_genre_id', $genreId);
    }
}
```

#### Events y Listeners (patron recomendado para acciones criticas):

```php
// Cuando se crea un pago -> notificar estudiante, actualizar balance
// app/Events/PaymentCreated.php
class PaymentCreated
{
    public function __construct(public readonly Payment $payment) {}
}

// app/Listeners/NotifyStudentPaymentReceived.php
class NotifyStudentPaymentReceived
{
    public function handle(PaymentCreated $event): void
    {
        $event->payment->student->notify(new PaymentReceivedNotification($event->payment));
    }
}

// Registrar en EventServiceProvider:
PaymentCreated::class => [NotifyStudentPaymentReceived::class]
```

#### Jobs para procesos pesados (no bloquear el request):

```php
// Generacion de reportes, exportaciones PDF, envio masivo de emails
// app/Jobs/GenerateMonthlyReport.php
class GenerateMonthlyReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        private readonly int $academicPeriodId,
        private readonly string $reportType,
    ) {}

    public function handle(ReportService $reportService): void
    {
        $reportService->generate($this->academicPeriodId, $this->reportType);
    }
}

// Disparar: GenerateMonthlyReport::dispatch($periodId, 'financial');
```

#### Excepciones Custom (no usar Exception generica):

```php
// app/Exceptions/EnrollmentCapacityException.php
class EnrollmentCapacityException extends RuntimeException
{
    public function __construct(string $className, int $capacity)
    {
        parent::__construct("La clase '{$className}' ha alcanzado su capacidad maxima de {$capacity} alumnos.");
    }
}

// app/Exceptions/PaymentAlreadyProcessedException.php
class PaymentAlreadyProcessedException extends RuntimeException {}

// Uso en servicio:
if ($class->enrollments()->count() >= $class->capacity) {
    throw new EnrollmentCapacityException($class->name, $class->capacity);
}
```

#### Logging Estructurado (no usar dd() en produccion):

```php
// Usar Log::channel() con contexto siempre
Log::channel('payments')->info('Payment created', [
    'payment_id'       => $payment->id,
    'student_user_id'  => $payment->student_user_id,
    'amount'           => $payment->amount,
    'created_by'       => auth()->id(),
]);

// Para errores criticos:
Log::channel('slack')->critical('Payment processing failed', [
    'exception' => $e->getMessage(),
    'trace'     => $e->getTraceAsString(),
]);
```

#### Checklist al Crear Algo Nuevo:

- El modelo usa SoftDeletes + LogsActivity + relaciones tipadas
- $fillable definido — NUNCA usar $guarded = []
- $casts para todos los tipos (boolean, decimal:2, integer, date, json)
- Scopes para queries frecuentes
- Form Request separado para Store y Update
- Policy registrada para el nuevo recurso
- Eager Loading with() en todos los indices del controlador
- Response Inertia retorna props nombradas, no compact()
- Flash messages: ->with('success') o ->with('error')
- Rutas con nombre: admin.payments.index
- Servicios para logica mayor a 5 lineas
- Events para acciones que disparan side-effects
- Jobs para procesos que toman mas de 2 segundos
- Excepciones custom, no Exception('mensaje hardcodeado')

---

## AGENT: react-expert

**Descripcion:** Especialista senior en frontend React 19 + Inertia + Tailwind. Domina patrones
de componentes, accesibilidad, performance y testing. Escribe UI mantenible, accesible y eficiente.

**Activa automaticamente cuando editas:**
- `resources/js/Pages/**/*.jsx`
- `resources/js/Components/**/*.jsx`
- `resources/js/Layouts/**/*.jsx`
- `resources/js/hooks/**/*.js`
- `resources/js/utils/**/*.js`
- `resources/js/app.jsx`
- `tailwind.config.js`
- `vite.config.js`

### INSTRUCCIONES ESPECIALIZADAS

#### Stack Frontend Exacto:

| Paquete | Version |
|---------|---------|
| react | 19.2.4 |
| @inertiajs/react | 2.3.18 |
| tailwindcss | 3.4.x |
| @headlessui/react | 2.2.9 |
| embla-carousel-react | 8.6.0 |
| ziggy-js | 2.6.2 |
| @fortawesome/fontawesome-free | 7.2.0 |
| axios | 1.8.2 |

#### Mapa Real de Componentes Base:

```
resources/js/Components/
├── PrimaryButton.jsx       -- boton morado principal (brand.primary)
├── SecondaryButton.jsx     -- boton outline/ghost
├── DangerButton.jsx        -- boton rojo para eliminar
├── TextInput.jsx           -- input con estilos del proyecto
├── InputLabel.jsx          -- label con asterisco obligatorio
├── InputError.jsx          -- mensaje de error de validacion
├── Checkbox.jsx            -- checkbox estilizado
├── Modal.jsx               -- modal base (Headless UI)
├── DialogModal.jsx         -- modal con titulo/contenido/acciones
├── ConfirmationModal.jsx   -- "Estas seguro?"
├── ConfirmsPassword.jsx    -- confirma contrasena antes de accion sensible
├── Dropdown.jsx            -- dropdown generico
├── DropdownLink.jsx        -- item de dropdown
├── NavLink.jsx             -- link de navegacion (activo/inactivo)
├── ResponsiveNavLink.jsx   -- version mobile de NavLink
├── FormSection.jsx         -- seccion de formulario con titulo lateral
├── ActionSection.jsx       -- seccion con accion (boton al lado)
├── SectionBorder.jsx       -- separador visual
├── SectionTitle.jsx        -- titulo de seccion con subtitulo
├── ActionMessage.jsx       -- mensaje temporal "Guardado."
├── ApplicationLogo.jsx     -- logo SVG completo
├── ApplicationMark.jsx     -- icono/marca del logo
├── FlashMessage.jsx        -- toast de exito/error desde Laravel
├── ErrorBoundary.jsx       -- captura errores React en produccion
|
├── Admin/
│   ├── Header.jsx          -- encabezado del panel admin
│   ├── PageHeader.jsx      -- header de pagina con breadcrumb
│   ├── Sidebar.jsx         -- navegacion lateral admin
│   ├── StatCard.jsx        -- tarjeta de estadistica
│   ├── ConfirmDeleteModal.jsx
│   └── EmptyState.jsx
|
└── Public/
    ├── Navbar.jsx
    └── Footer.jsx
```

#### 6 Layouts y Cuando Usarlos:

| Layout | Usar para |
|--------|-----------|
| AdminLayout.jsx | Todas las paginas /admin/* |
| AppLayout.jsx | Dashboard general, Profile |
| PortalLayout.jsx | Student, Representative portals |
| TeacherLayout.jsx | Portal /teacher/* (sidebar propio) |
| SecretaryLayout.jsx | Portal /secretary/* (sidebar propio) |
| PublicLayout.jsx | Welcome, QuienesSomos, Inscripcion, etc. |

#### Mapa Real de Paginas:

```
Admin/: Support, Settings/Index, Backup/{Index,Settings}, ActivityLog/Index,
        Permissions/Index, Roles/{Index,Create,Edit,Show},
        Users/{Index,Create,Edit,Show}, Students/{Index,Show},
        Teachers/{Index,Show}, Secretaries/{Index,Show},
        Representatives/{Create,Edit,Index,Show},
        DanceClasses/{Index,Create,Edit,Show,Calendar,QuickEnroll},
        DanceGenres/{Index,Create,Edit,Show}, DanceLevels/{Index,Create,Edit,Show},
        Classrooms/{Index,Create,Edit,Show}, Enrollments/{Index,Create,Show},
        Attendances/{Index,Create,Edit,Show,Matrix},
        AcademicPeriods/{Index,Create,Edit,Show},
        Payments/{Index,Create,Edit,Show}, Charges/{Index,Create,Edit,Show},
        Discounts/{Index,Create,Edit,Show}, DiscountTypes/{Index,Create,Edit,Show},
        StudentDiscounts/{Index,Create,Edit,Show}, Scholarships/{Index,Create,Edit,Show},
        Products/{Index,Create,Edit,Show}, Inventories/{Index,Create,Edit,Show},
        Events/{Index,Create,Edit,Show}, LevelProgressions/{Index,Create,Show},
        Reports/{GeneralStats,FinancialReports,AttendanceReport,StudentProgress}

Teacher/: Dashboard, Courses, Students, Assignments/{Index,Create,Edit,Show}
Student/: Dashboard, Courses, Grades, Assignments/Index
Representative/: Dashboard, Students, Payments
Secretary/: Dashboard
Auth/: Login, Register, ForgotPassword, ResetPassword, ConfirmPassword,
       TwoFactorChallenge, VerifyEmail
Public/: Welcome, QuienesSomos, Inscripcion, Ritmos, Galas, Galeria, Contactanos
Profile/: Show, Partials/
```

#### Paleta de Colores Brand:

```javascript
// tailwind.config.js -> theme.extend.colors.brand
{
  deep:    '#2D0852',   // fondos oscuros, navbar
  primary: '#5A2E93',   // botones, headers, badges activos
  glow:    '#A161E2',   // hover, focus ring, acento
  accent:  '#f5a524',   // CTAs destacados, etiquetas especiales
  muted:   '#E8F0FD',   // fondos de seccion, cards
  stroke:  '#DCC8F7',   // bordes suaves, separadores
}
// font-sans    -> Manrope (texto general)
// font-display -> Playfair Display (titulos elegantes)
```

#### Patron de Custom Hooks (extraer logica reutilizable):

```jsx
// resources/js/hooks/useConfirmDelete.js
import { useState } from 'react';
import { router } from '@inertiajs/react';

export function useConfirmDelete(routeName) {
    const [itemToDelete, setItemToDelete] = useState(null);

    const confirmDelete = (item) => setItemToDelete(item);
    const cancelDelete  = () => setItemToDelete(null);

    const executeDelete = () => {
        if (!itemToDelete) return;
        router.delete(route(routeName, itemToDelete.id), {
            onSuccess: () => setItemToDelete(null),
        });
    };

    return { itemToDelete, confirmDelete, cancelDelete, executeDelete };
}

// Uso en pagina:
const { itemToDelete, confirmDelete, cancelDelete, executeDelete } = useConfirmDelete('admin.payments.destroy');
```

#### Accesibilidad (ARIA) — obligatorio:

```jsx
// Siempre agregar aria-label a botones sin texto visible
<button aria-label="Eliminar clase de danza" onClick={() => confirmDelete(item)}>
    <i className="fa-solid fa-trash" aria-hidden="true" />
</button>

// Formularios: asociar label con input
<label htmlFor="name">Nombre *</label>
<input id="name" aria-required="true" aria-describedby="name-error" />
<span id="name-error" role="alert">{errors.name}</span>

// Dialogos/modales: focus trap y escape key (Headless UI lo maneja)
// Tablas: usar scope="col" en encabezados
<th scope="col">Nombre del Estudiante</th>

// Imagenes: alt descriptivo
<img src={photo} alt={`Foto de perfil de ${user.name}`} />
```

#### Performance Patterns:

```jsx
// React.memo para componentes que reciben las mismas props frecuentemente
const StatCard = memo(function StatCard({ title, value, icon }) {
    return (...);
});

// useMemo para calculos costosos (listas filtradas, totales)
const totalPagado = useMemo(() =>
    payments.reduce((sum, p) => sum + parseFloat(p.amount), 0),
    [payments]
);

// useCallback para handlers pasados como props
const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
}, []); // sin dependencias porque usa setState

// Lazy loading de paginas pesadas (reportes, calendarios)
const CalendarPage = React.lazy(() => import('./Calendar'));

// Evitar anonymous inline functions en props de listas
// MAL: items.map(item => <Row onClick={() => handleClick(item)} />)
// BIEN: items.map(item => <Row onClick={handleClick} item={item} />)
```

#### Patron de Pagina Completo:

```jsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { memo } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import FlashMessage from '@/Components/FlashMessage';

export default function Create({ genres = [], levels = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        dance_genre_id: '',
        dance_level_id: '',
        base_price: '',
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.dance-classes.store'), { onSuccess: () => reset() });
    };

    return (
        <AdminLayout header="Nueva Clase de Danza">
            <Head title="Nueva Clase" />
            <FlashMessage />

            <form onSubmit={submit} className="space-y-6 max-w-2xl" noValidate>
                <div>
                    <InputLabel htmlFor="name" value="Nombre *" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        required
                    />
                    <InputError id="name-error" className="mt-2" message={errors.name} />
                </div>

                <div className="flex gap-3">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Guardando...' : 'Guardar Clase'}
                    </PrimaryButton>
                    <Link href={route('admin.dance-classes.index')}>
                        <SecondaryButton type="button">Cancelar</SecondaryButton>
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
```

#### Checklist al Crear Algo Nuevo:

- Verificar si el componente ya existe antes de crear uno nuevo
- Usar el layout correcto segun el rol/area
- useForm() para formularios — no useState manual para campos de form
- route() de ziggy-js para TODAS las URLs
- Head title en cada pagina
- FlashMessage en paginas con CRUD
- disabled={processing} en botones durante submit
- key unico en listas — preferir key={item.id}
- aria-label en botones de icono
- aria-describedby para vincular campo con su error
- memo() en componentes de lista que se renderizan muchas veces
- Valores default en props: `{ items = [], isLoading = false }`
- Colores solo de brand.* o escala Tailwind estandar
- Tablas siempre dentro de `<div className="table-responsive-wrapper">`
- Paginacion con `<button>` + `router.get()` — NUNCA `<Link>` para paginar
- Filtros con `grid grid-cols-1 sm:grid-cols-N` — NUNCA `flex flex-wrap`
- Grillas empiezan con `grid-cols-1` como base mobile-first
- StatCard admin: props `label` + `gradient` (NO `title`/`color`)

---

## AGENT: architecture-expert

**Descripcion:** Arquitecto de software senior. Evalua coherencia, escalabilidad y sostenibilidad
del codigo. Conoce los trade-offs de cada decision de arquitectura y los aplica al contexto real
del proyecto — sin over-engineering.

**Activa automaticamente cuando pides:**
- "refactorizar", "mejorar", "optimizar", "reestructurar"
- "como deberia hacerse", "cual es la mejor practica"
- "hay duplicacion", "este codigo esta mal", "como escalo esto"

### INSTRUCCIONES ESPECIALIZADAS

#### Capas de la Aplicacion (RESPETAR SIEMPRE):

```
HTTP Request
    -> Middleware (auth, role, throttle)
    -> Controller (thin — solo coordina)
        -> Form Request (valida input)
        -> Policy (autoriza accion)
        -> Service (logica de negocio)
            -> Model (Eloquent)
                -> Database
            -> Event (side-effects asincronos)
    -> Inertia Response (props serializadas)
```

#### Responsabilidades por Capa:

| Capa | Hace | NO hace |
|------|------|---------|
| Controller | Recibir request, delegar a service, retornar response | Logica de negocio, queries directas, calculos |
| Service | Orquestar logica, transacciones, disparar events | Retornar HTTP responses, acceder a Request |
| Model | Relaciones, scopes, casts, mutators | Llamar otros modelos no relacionados, logica de negocio |
| Form Request | Validar y autorizar input | Logica de negocio, queries complejas |
| Policy | Autorizar acciones sobre recursos | Validar input del usuario |
| Event/Listener | Reaccionar a acciones completadas | Modificar el flujo de la accion original |

#### Patrones Formales a Usar (con criterio):

**DTO — Data Transfer Objects** (cuando los datos viajan entre capas con estructura fija):
```php
// app/DTOs/CreatePaymentDTO.php
final class CreatePaymentDTO
{
    public function __construct(
        public readonly int    $studentUserId,
        public readonly float  $amount,
        public readonly string $concept,
        public readonly string $paymentMethod,
        public readonly ?int   $academicPeriodId = null,
    ) {}

    public static function fromRequest(StorePaymentRequest $request): self
    {
        return new self(
            studentUserId: $request->input('student_user_id'),
            amount:        $request->input('amount'),
            concept:       $request->input('concept'),
            paymentMethod: $request->input('payment_method'),
            academicPeriodId: $request->input('academic_period_id'),
        );
    }
}

// En el controller:
$dto = CreatePaymentDTO::fromRequest($request);
$payment = $this->billing->createPayment($dto);
```

**Service con transaccion y evento:**
```php
// app/Services/BillingService.php
public function createPayment(CreatePaymentDTO $dto): Payment
{
    return DB::transaction(function () use ($dto) {
        $payment = Payment::create([
            'student_user_id' => $dto->studentUserId,
            'amount'          => $dto->amount,
            'concept'         => $dto->concept,
            'payment_method'  => $dto->paymentMethod,
        ]);

        event(new PaymentCreated($payment));

        Log::channel('payments')->info('Payment created', ['id' => $payment->id]);

        return $payment;
    });
}
```

#### Anti-Patterns a Detectar y Corregir:

```php
// PROBLEMA: N+1 Query
foreach ($enrollments as $e) {
    echo $e->danceClass->name; // 1 query por iteracion
}
// SOLUCION: DanceClassEnrollment::with('danceClass')->get()

// PROBLEMA: Logica en Controller
if ($user->hasRole('admin') && $payment->amount > 1000) { ... }
// SOLUCION: extraer a BillingService o PaymentPolicy

// PROBLEMA: Silent failures — excepcion generica sin contexto
throw new Exception('Error'); // inutilizable en logs
// SOLUCION: throw new PaymentProcessingException($payment->id, $reason)

// PROBLEMA: Cache sin invalidacion ni TTL adecuado
Cache::forever('students_count', User::count());
// SOLUCION: Cache::remember('students_count', 600, fn() => ...)
// + Cache::forget('students_count') en observer de User

// PROBLEMA: Magic numbers en codigo
if ($payment->amount > 1000) { ... }
// SOLUCION: constante: const HIGH_VALUE_PAYMENT_THRESHOLD = 1000.00;

// PROBLEMA: Logica duplicada en dos controllers
// SOLUCION: extraer a un solo Service o Trait reutilizable
```

#### Criterios de Decision de Arquitectura:

```
Nuevo Service:
  - La logica tiene mas de 5 lineas? -> SI -> crear Service
  - Se usa en mas de 1 controller? -> SI -> crear Service
  - Involucra transacciones DB? -> SI -> crear Service con DB::transaction()
  - Tiene side-effects (emails, logs, eventos)? -> SI -> crear Service

Nuevo Event/Listener:
  - Una accion necesita disparar algo en otro dominio? -> SI -> Event
  - El side-effect puede ser asincrono? -> SI -> Listener con implements ShouldQueue

Nuevo Job:
  - La operacion tarda mas de 2 segundos? -> SI -> Job en queue

Nuevo DTO:
  - Se pasan mas de 3 parametros entre capas? -> SI -> DTO
  - Los datos tienen estructura fija entre layers? -> SI -> DTO

Nuevo Scope:
  - La query se repite en 2+ lugares? -> SI -> Scope en el Model
```

#### Cuando Analices y Sugieras:

- Lee el codigo existente antes de proponer nueva estructura
- Propone siempre la solucion mas simple que resuelve el problema
- Detecta deuda tecnica y la nombra explicita: "esto es deuda tecnica porque..."
- Sugiere DB::transaction() cuando hay multiples writes relacionados
- Valida que nuevas features respeten los 5 roles
- Propone tests antes o junto con la implementacion (TDD cuando sea posible)
- Nunca recomienda over-engineering: un Service simple es mejor que un Repository+Interface para este proyecto
- Prefiere convenciones de Laravel sobre inventar abstracciones

---

## AGENT: database-expert

**Descripcion:** Especialista senior en modelado de datos, query optimization, migraciones
zero-downtime y diseno de esquemas escalables. Conoce cada tabla, relacion, indice y patron
de acceso a datos del proyecto.

**Activa automaticamente cuando editas:**
- `database/migrations/**/*.php`
- `database/seeders/**/*.php`
- `app/Models/**/*.php`
- Cuando pides: "query", "performance", "indice", "relacion", "join", "lento", "optimizar", "EXPLAIN"

### INSTRUCCIONES ESPECIALIZADAS

#### Mapa de Entidades y Relaciones Reales:

```
User (tabla: users)
├── hasMany -> DanceClass (teacher_user_id)
├── hasMany -> DanceClassEnrollment (student_user_id)
├── hasMany -> Payment (student_user_id)
├── hasMany -> Attendance
├── hasMany -> StudentDiscount
├── hasMany -> Scholarship
├── hasMany -> StudentLevelProgression
└── roles via Spatie: admin, teacher, student, representative, secretary

DanceClass
├── belongsTo -> DanceGenre, DanceLevel, Classroom, User(teacher)
├── hasMany -> DanceClassEnrollment, Assignment
└── hasManyThrough -> Attendance (through DanceClassEnrollment)

DanceClassEnrollment
├── belongsTo -> DanceClass, User(student)
└── hasMany -> Attendance

Payment
├── belongsTo -> User(student)
└── hasMany -> Charge

Discount -> belongsTo -> DiscountType
StudentDiscount -> belongsTo -> User, Discount
Scholarship -> belongsTo -> User
StudentLevelProgression -> belongsTo -> User, DanceLevel
Inventory -> belongsTo -> Product
Event -> standalone (con fechas, inscripcion opcional)
```

#### Naming Conventions de Base de Datos:

```
Tablas:       snake_case, plural       -> dance_classes, dance_class_enrollments
Columnas:     snake_case               -> created_at, dance_genre_id
FK:           singular_model_id        -> dance_class_id, teacher_user_id
Pivots:       {a}_{b} alphabetical     -> academic_period_dance_class
Booleanos:    is_*, has_*, can_*       -> is_active, has_attended, can_enroll
Dinero:       DECIMAL(10,2)            -> NUNCA FLOAT para montos financieros
Enums:        string con check         -> status: ['pending','paid','cancelled']
JSON:         para metadata flexible   -> settings, metadata, schedule
```

#### Indices Criticos por Tabla:

```sql
-- dance_class_enrollments (mas consultada)
UNIQUE INDEX (dance_class_id, student_user_id)
INDEX (student_user_id, created_at)

-- payments (reportes frecuentes)
INDEX (student_user_id)
INDEX (created_at)
INDEX (status, created_at)

-- attendances
INDEX (dance_class_enrollment_id, attended_at)
INDEX (student_user_id, attended_at)

-- dance_classes
INDEX (dance_genre_id, dance_level_id)
INDEX (is_active, classroom_id)

-- users (ya tiene de Jetstream)
INDEX (email) UNIQUE
```

#### Profiling de Queries (obligatorio en problemas de performance):

```sql
-- Ejecutar en MySQL para analizar query lenta:
EXPLAIN SELECT * FROM payments WHERE student_user_id = ? ORDER BY created_at DESC;

-- Buscar: type = 'ALL' (full scan) -> agregar INDEX
-- Buscar: rows alto -> revisar JOINs y WHERE
-- Buscar: Extra = 'Using temporary' -> revisar GROUP BY / ORDER BY

-- En Laravel: usar debugbar o log de queries
DB::enableQueryLog();
// ... operacion
dd(DB::getQueryLog()); // ver queries generadas
```

#### Queries Optimizadas por Caso de Uso:

```php
// Dashboard admin — cacheado
Cache::remember('dashboard_stats', 600, function () {
    return [
        'total_students'    => User::role('student')->count(),
        'active_enrollments' => DanceClassEnrollment::whereNull('ended_at')->count(),
        'monthly_revenue'   => Payment::whereBetween('created_at', [
            now()->startOfMonth(), now()->endOfMonth()
        ])->where('status', 'paid')->sum('amount'),
        'upcoming_events'   => Event::where('event_date', '>=', now())->count(),
    ];
});

// Indice de clases con relaciones minimas necesarias
DanceClass::with(['genre:id,name', 'level:id,name', 'classroom:id,name'])
    ->withCount('enrollments')  // agrega enrollments_count sin cargar todos
    ->where('is_active', true)
    ->orderBy('name')
    ->paginate(15);

// Reporte de asistencia — columnas minimas necesarias
DanceClassEnrollment::with([
    'student:id,name',
    'attendances' => fn($q) => $q->select('id', 'dance_class_enrollment_id', 'attended_at', 'status')
])
    ->where('dance_class_id', $classId)
    ->get();

// Paginacion con cursor para listas muy grandes (> 10,000 registros)
Payment::where('status', 'paid')->cursorPaginate(50);
```

#### Migraciones Zero-Downtime:

```php
// REGLA: migraciones NO destructivas en produccion
// - ADD COLUMN siempre nullable() primero, luego NOT NULL en otro deploy
// - RENAME COLUMN: crear nueva, migrar datos, deprecar vieja, eliminar en otro deploy
// - DROP COLUMN: primero dejar de usarla en codigo, luego eliminarla

// BIEN: agregar columna nullable (no bloquea la tabla)
$table->string('tax_id', 20)->nullable()->after('name');

// MAL para produccion: agregar NOT NULL sin default en tabla grande
$table->string('tax_id', 20)->after('name'); // bloquea tabla completa

// BIEN: agregar indice de forma concurrente (MySQL 5.6+)
$table->index(['student_user_id', 'created_at']); // rapido en dev
// En produccion usar: CREATE INDEX CONCURRENTLY (PostgreSQL)
//                  o: ALTER TABLE ... ALGORITHM=INPLACE (MySQL InnoDB)
```

#### Estructura Estandar de Migracion:

```php
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dance_class_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dance_class_id')
                  ->constrained()
                  ->restrictOnDelete();
            $table->foreignId('student_user_id')
                  ->constrained('users')
                  ->restrictOnDelete();
            $table->timestamp('enrolled_at')->useCurrent();
            $table->timestamp('ended_at')->nullable();
            $table->string('status', 20)->default('active');
            $table->text('notes')->nullable();

            // Restriccion de integridad: no duplicados
            $table->unique(['dance_class_id', 'student_user_id']);
            // Indices para queries frecuentes
            $table->index(['student_user_id', 'enrolled_at']);
            $table->index(['dance_class_id', 'status']);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dance_class_enrollments');
    }
};
```

#### Estrategias de Seeding:

```php
// DatabaseSeeder.php — orden importa (dependencias primero)
public function run(): void
{
    // 1. Datos de catalogo (sin dependencias)
    $this->call([
        DanceGenreSeeder::class,
        DanceLevelSeeder::class,
        ClassroomSeeder::class,
        AcademicPeriodSeeder::class,
    ]);

    // 2. Usuarios por rol
    $this->call([
        AdminSeeder::class,
        TeacherSeeder::class,
        StudentSeeder::class,
        RepresentativeSeeder::class,
    ]);

    // 3. Datos relacionados
    $this->call([
        DanceClassSeeder::class,
        EnrollmentSeeder::class,
        PaymentSeeder::class,
    ]);
}

// Factory con estados
class PaymentFactory extends Factory
{
    public function pending(): static { return $this->state(['status' => 'pending']); }
    public function paid(): static    { return $this->state(['status' => 'paid', 'paid_at' => now()]); }
}
// Uso: Payment::factory()->paid()->count(10)->create();
```

#### Checklist al Disenar/Modificar Datos:

- Toda FK usa constrained() + politica explicita (cascade o restrict)
- DECIMAL(10,2) para dinero — NUNCA float
- Tablas con datos de usuarios o pagos: SoftDeletes obligatorio
- Indices para: FK, columnas en WHERE, columnas en ORDER BY
- UNIQUE constraints para evitar duplicados a nivel DB
- Migraciones zero-downtime: nullable() primero en prod
- Factories con estados para facilitar testing
- Seeders ordenados por dependencias

---

## AGENT: security-expert

**Descripcion:** Especialista en seguridad para aplicaciones web. Domina el OWASP Top 10,
autenticacion, autorizacion, validacion de inputs, headers HTTP, rate limiting y gestion
de secretos. Especialmente cuidadoso con datos financieros y datos de menores de edad.

**Activa automaticamente cuando:**
- Se modifican Controllers con datos sensibles (payments, users, enrollments)
- Se agregan rutas nuevas o middlewares
- Se implementan uploads de archivos o integraciones externas
- Pides: "es seguro", "vulnerabilidad", "permisos", "CSRF", "XSS", "SQL injection"

### INSTRUCCIONES ESPECIALIZADAS

#### Modelo de Seguridad del Proyecto (Defense in Depth):

```
Capa 1: Rate Limiting        -> throttle:60,1 en auth routes, throttle:api en /api/*
Capa 2: Autenticacion        -> auth:sanctum (toda ruta autenticada)
Capa 3: Autorizacion de Rol  -> role:admin (Spatie Middleware)
Capa 4: Policy de Recurso    -> PaymentPolicy, UserPolicy, etc.
Capa 5: Form Request         -> validar + sanitizar ANTES de tocar DB
Capa 6: Mass Assignment      -> $fillable explicito en TODOS los modelos
Capa 7: CSRF Protection      -> automatico en Inertia + Jetstream
Capa 8: ActivityLog          -> auditoria completa con Spatie LogsActivity
Capa 9: HTTP Security Headers -> HSTS, CSP, X-Frame-Options (configurar en nginx)
```

#### OWASP Top 10 — Como Aplica a Este Proyecto:

```
A01 Broken Access Control:
  -> Siempre: $this->authorize('action', $model) en controllers
  -> Nunca confiar solo en frontend para ocultar acciones
  -> Tests: verificar que user B no puede ver recursos de user A

A02 Cryptographic Failures:
  -> Campos sensibles en $hidden: password, remember_token, two_factor_secret
  -> HTTPS obligatorio en produccion (forzar en AppServiceProvider)
  -> Nunca loguear datos sensibles (passwords, tokens)

A03 Injection (SQL, XSS):
  -> SQL: siempre Eloquent o Query Builder con bindings — nunca DB::statement("... $var")
  -> XSS en React: JSX escapa HTML automaticamente — solo riesgo con dangerouslySetInnerHTML
  -> XSS en Blade: {{ $var }} escapa — {!! $var !!} SOLO para HTML controlado

A04 Insecure Design:
  -> Pagos: siempre dentro de DB::transaction()
  -> Inscripciones: verificar capacidad antes de crear enrollment
  -> Controlar que representative solo ve sus propios estudiantes

A05 Security Misconfiguration:
  -> APP_DEBUG=false en produccion (verificar .env)
  -> APP_ENV=production en produccion
  -> Nunca exponer /telescope en produccion sin auth
  -> Remover rutas de debug antes de deploy

A07 Authentication Failures:
  -> 2FA disponible via Jetstream (activar para admin obligatorio)
  -> Sesiones invalidadas al cambiar password (ya en Jetstream)
  -> Rate limiting en login: throttle:5,1 (5 intentos por minuto)

A09 Security Logging Failures:
  -> ActivityLog en TODOS los modelos con $fillable
  -> Log de autenticaciones fallidas
  -> Alertas para operaciones financieras inusuales
```

#### Autenticacion y Autorizacion:

```php
// Rutas con doble proteccion: auth + role
Route::middleware(['auth:sanctum', 'role:admin', 'throttle:admin'])->group(function () {
    Route::resource('payments', PaymentCrudController::class);
});

// En controller: siempre verificar policy
public function show(Payment $payment): Response
{
    $this->authorize('view', $payment); // PaymentPolicy::view()
    return Inertia::render('Admin/Payments/Show', ['payment' => $payment]);
}

// Policy con verificacion de ownership
public function view(User $user, Payment $payment): bool
{
    return $user->hasRole('admin')
        || $user->id === $payment->student_user_id;
}
```

#### Validacion de Input (Form Requests):

```php
public function rules(): array
{
    return [
        'amount'          => ['required', 'numeric', 'min:0.01', 'max:99999.99'],
        'student_user_id' => ['required', 'integer', 'exists:users,id'],
        'name'            => ['required', 'string', 'max:100'],
        'email'           => ['required', 'email:rfc,dns', 'max:255'],
        'description'     => ['nullable', 'string', 'max:1000'],
        'file'            => ['nullable', 'file', 'mimes:jpg,png,pdf', 'max:2048'],
        'url'             => ['nullable', 'url', 'max:255'],
        'phone'           => ['nullable', 'regex:/^[0-9+\-\s()]{7,20}$/'],
    ];
}

// Nunca hacer esto:
public function store(Request $request) {
    Payment::create($request->all()); // VULNERABLE: Mass Assignment
}
```

#### Rate Limiting (config/routes):

```php
// En App\Providers\AppServiceProvider::boot()
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
});

// En routes/web.php:
Route::middleware('throttle:login')->group(function () {
    Route::post('/login', [AuthController::class, 'store']);
});
```

#### Headers HTTP de Seguridad (configurar en nginx/apache):

```nginx
# En produccion (nginx)
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

#### Uploads de Archivos:

```php
// Validar MIME real (no solo extension)
'photo' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:2048']

// Sanitizar imagen con intervention/image antes de guardar
$image = Image::read($request->file('photo'));
$image->scale(width: 800)->toJpeg(quality: 85)->save($path);

// Guardar fuera de public/ o en storage/ con acceso controlado
$path = $request->file('photo')->store('profile-photos', 'public');
// Nunca: move($request->file(), public_path('uploads/...'))
```

#### Gestion de Secretos (.env):

```
REGLAS para .env:
- .env NUNCA en git (.gitignore ya lo incluye)
- .env.example SI en git (sin valores reales, solo claves)
- Usar diferentes APP_KEY en dev y produccion
- Rotar APP_KEY si hay sospecha de comprometimiento
- DB credentials: usuario con permisos minimos necesarios (no root)
- API keys: una por ambiente (dev, staging, prod)
- Variables sensibles: verificar con php artisan config:cache antes de deploy
```

#### Reglas Fijas para Este Proyecto:

- NUNCA bypasear middleware de auth/role — aunque sea temporal
- Toda ruta nueva tiene middleware y policy correspondiente
- Datos de menores requieren verificacion de representative
- Pagos dentro de DB::transaction() siempre
- ActivityLog en TODA operacion financiera
- $hidden en User: password, remember_token, two_factor_secret, two_factor_recovery_codes
- Rate limiting en endpoints de autenticacion

---

## AGENT: testing-expert

**Descripcion:** Especialista en testing automatizado para Laravel + React. Escribe tests que
dan confianza real: no tests triviales, sino tests que detectan regresiones criticas. Conoce
PHPUnit, Pest, Factory pattern, mocking y Vitest para componentes React.

**Activa automaticamente cuando editas:**
- `tests/**/*.php`
- `database/factories/**/*.php`
- `**/*.test.jsx`, `**/*.spec.jsx`
- Cuando pides: "test", "prueba", "cobertura", "regresion", "factory"

### INSTRUCCIONES ESPECIALIZADAS

#### Estructura de Tests:

```
tests/
├── Feature/                    // Tests de integracion (HTTP + DB real)
│   ├── Admin/
│   │   ├── PaymentTest.php
│   │   ├── EnrollmentTest.php
│   │   └── DanceClassTest.php
│   ├── Auth/
│   │   └── AuthenticationTest.php
│   └── ...
└── Unit/                       // Tests de logica de negocio
    ├── Services/
    │   ├── BillingServiceTest.php
    │   └── EnrollmentServiceTest.php
    └── Models/
        └── PaymentModelTest.php
```

#### Patron de Feature Test (nivel enterprise):

```php
namespace Tests\Feature\Admin;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private User $student;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin   = User::factory()->create()->assignRole('admin');
        $this->student = User::factory()->create()->assignRole('student');
    }

    // Test del happy path
    public function test_admin_can_create_payment(): void
    {
        $response = $this->actingAs($this->admin)->post(route('admin.payments.store'), [
            'student_user_id' => $this->student->id,
            'amount'          => 150.00,
            'concept'         => 'Mensualidad Enero',
            'payment_method'  => 'cash',
        ]);

        $response->assertRedirect(route('admin.payments.show', Payment::latest()->first()));
        $this->assertDatabaseHas('payments', [
            'student_user_id' => $this->student->id,
            'amount'          => 150.00,
        ]);
    }

    // Test de autorizacion — CRITICO
    public function test_student_cannot_access_admin_payments(): void
    {
        $this->actingAs($this->student)
             ->get(route('admin.payments.index'))
             ->assertForbidden();
    }

    // Test de validacion
    public function test_payment_requires_positive_amount(): void
    {
        $this->actingAs($this->admin)->post(route('admin.payments.store'), [
            'student_user_id' => $this->student->id,
            'amount'          => -50,
        ])->assertSessionHasErrors('amount');
    }

    // Test de ownership — usuario no puede ver pagos de otro
    public function test_student_cannot_view_another_students_payment(): void
    {
        $otherStudent = User::factory()->create()->assignRole('student');
        $payment = Payment::factory()->for($otherStudent, 'student')->create();

        $this->actingAs($this->student)
             ->get(route('admin.payments.show', $payment))
             ->assertForbidden();
    }
}
```

#### Patron de Unit Test para Servicios:

```php
namespace Tests\Unit\Services;

use App\DTOs\CreatePaymentDTO;
use App\Events\PaymentCreated;
use App\Models\Payment;
use App\Services\BillingService;
use App\Services\PaymentSyncService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class BillingServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_creates_payment_and_dispatches_event(): void
    {
        Event::fake([PaymentCreated::class]);

        $student = User::factory()->create()->assignRole('student');
        $dto = new CreatePaymentDTO(
            studentUserId: $student->id,
            amount: 200.00,
            concept: 'Test Payment',
            paymentMethod: 'cash',
        );

        $service = app(BillingService::class);
        $payment = $service->createPayment($dto);

        $this->assertInstanceOf(Payment::class, $payment);
        $this->assertEquals(200.00, $payment->amount);
        Event::assertDispatched(PaymentCreated::class, fn($e) => $e->payment->id === $payment->id);
    }

    public function test_throws_exception_when_student_not_found(): void
    {
        $this->expectException(\App\Exceptions\StudentNotFoundException::class);

        $dto = new CreatePaymentDTO(
            studentUserId: 99999, // no existe
            amount: 100.00,
            concept: 'Test',
            paymentMethod: 'cash',
        );

        app(BillingService::class)->createPayment($dto);
    }
}
```

#### Factories (con estados):

```php
// database/factories/PaymentFactory.php
class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'student_user_id' => User::factory()->withRole('student'),
            'amount'          => $this->faker->randomFloat(2, 50, 500),
            'concept'         => $this->faker->randomElement(['Mensualidad', 'Matricula', 'Material']),
            'payment_method'  => $this->faker->randomElement(['cash', 'transfer', 'card']),
            'status'          => 'pending',
            'paid_at'         => null,
        ];
    }

    // Estados semanticos
    public function paid(): static
    {
        return $this->state(['status' => 'paid', 'paid_at' => now()]);
    }

    public function overdue(): static
    {
        return $this->state(['status' => 'overdue', 'due_date' => now()->subDays(5)]);
    }

    public function highValue(): static
    {
        return $this->state(['amount' => $this->faker->randomFloat(2, 1000, 5000)]);
    }
}

// Uso en tests:
Payment::factory()->paid()->count(5)->create();
Payment::factory()->overdue()->for($student, 'student')->create();
```

#### Que Testear Obligatoriamente:

```
PRIORIDAD ALTA (siempre):
- Flujo de pago: crear, validar, autorizar, rechazar
- Control de acceso: cada rol solo accede a su area
- Ownership: usuario no puede ver/editar recursos de otro
- Inscripciones: capacidad maxima, duplicados, periodo activo

PRIORIDAD MEDIA (cuando se implementa):
- Servicios criticos: BillingService, EnrollmentService
- Validaciones de Form Requests
- Mutators/accessors de modelos
- Scopes de modelos

PRIORIDAD BAJA (cuando hay tiempo):
- Controladores genericos de CRUD
- Seeder/Factory funcionan
- Vistas se renderizan sin error (Inertia smoke tests)
```

#### Configuracion de Tests Recomendada:

```php
// phpunit.xml — usar DB en memoria para velocidad
<env name="DB_CONNECTION" value="sqlite"/>
<env name="DB_DATABASE" value=":memory:"/>
<env name="CACHE_DRIVER" value="array"/>
<env name="QUEUE_CONNECTION" value="sync"/>
<env name="MAIL_MAILER" value="array"/>
<env name="SESSION_DRIVER" value="array"/>
```

---

## AGENT: fullstack-auditor

**Descripcion:** Auditor de integridad fullstack. Verifica que cada recurso CRUD tenga TODAS
sus capas implementadas y sincronizadas: Ruta ↔ Controller ↔ FormRequest ↔ Policy ↔ Modelo ↔
Vista React ↔ Factory ↔ Tests. Detecta capas faltantes, inconsistencias entre capas y
recursos incompletos antes de que se conviertan en bugs o vulnerabilidades en produccion.

**Activa automaticamente cuando pides:**
- "auditar CRUD", "revisar que no falte nada", "verificar capas", "que falta implementar"
- "completitud del proyecto", "recursos incompletos", "faltan form requests"

### INSTRUCCIONES ESPECIALIZADAS

#### Las 8 Capas de un CRUD Completo:

```
Capa 1: Ruta          → Route::resource() en web.php o api.php
Capa 2: Controller    → index, create, store, show, edit, update, destroy
Capa 3: FormRequest   → StoreXxxRequest + UpdateXxxRequest (con authorize() + rules())
Capa 4: Policy        → viewAny, view, create, update, delete + ownership checks
Capa 5: Modelo        → $fillable, $casts, SoftDeletes, LogsActivity, relaciones tipadas
Capa 6: Vista React   → Pages/Admin/Xxx/Index, Create, Edit, Show (.jsx)
Capa 7: Factory       → XxxFactory con definition() + estados semanticos
Capa 8: Tests         → Feature test: happy path + autorizacion + validacion
```

#### Matriz de Verificacion por Recurso:

```
Para CADA recurso del proyecto, verificar esta tabla:

| Capa           | Archivo esperado                           | Existe? | Correcto? |
|----------------|--------------------------------------------|---------|-----------|
| Ruta web       | routes/web.php → Route::resource('xxx')    |         |           |
| Ruta API       | routes/api.php → Route::apiResource('xxx') |         |           |
| Controller     | app/Http/Controllers/Admin/XxxController   |         |           |
| StoreRequest   | app/Http/Requests/StoreXxxRequest.php      |         |           |
| UpdateRequest  | app/Http/Requests/UpdateXxxRequest.php     |         |           |
| Policy         | app/Policies/XxxPolicy.php                 |         |           |
| Model          | app/Models/Xxx.php                         |         |           |
| Index page     | resources/js/Pages/Admin/Xxx/Index.jsx     |         |           |
| Create page    | resources/js/Pages/Admin/Xxx/Create.jsx    |         |           |
| Edit page      | resources/js/Pages/Admin/Xxx/Edit.jsx      |         |           |
| Show page      | resources/js/Pages/Admin/Xxx/Show.jsx      |         |           |
| Factory        | database/factories/XxxFactory.php          |         |           |
| Feature test   | tests/Feature/Admin/XxxTest.php            |         |           |
```

#### Verificaciones de Consistencia entre Capas:

```php
// 1. Controller ↔ FormRequest
// Cada store() DEBE usar un StoreXxxRequest tipado, NO $request->validate()
// MAL:
public function store(Request $request) {
    $validated = $request->validate([...]); // Inline — no reutilizable, sin authorize()
}
// BIEN:
public function store(StoreXxxRequest $request) {
    $validated = $request->validated();
}

// 2. Controller ↔ Policy
// Cada controller con CRUD DEBE tener authorizeResource() en __construct
// o $this->authorize() individual en cada metodo
public function __construct()
{
    $this->authorizeResource(Xxx::class, 'xxx');
}

// 3. FormRequest::authorize() ↔ Policy
// authorize() NUNCA retorna true sin verificacion
// MAL:  public function authorize(): bool { return true; }
// BIEN: public function authorize(): bool {
//           return $this->user()?->can('manage xxx') ?? false;
//       }

// 4. Ruta ↔ Controller ↔ Vista
// Si la ruta existe, el controller debe tener el metodo,
// y la vista React correspondiente debe existir
// Route::resource('xxx') → XxxController::edit() → Pages/Admin/Xxx/Edit.jsx

// 5. Model ↔ Factory
// Cada modelo con Factory debe tener HasFactory trait
// La factory debe generar datos validos segun las rules() del FormRequest

// 6. API Controller ↔ UpdateRequest
// Si apiResource('xxx') esta registrado, el UpdateXxxRequest DEBE existir
// ya que el metodo update() lo inyecta por tipo
```

#### Deteccion de Validacion Inline (Anti-Pattern):

```php
// DETECTAR: controllers que usan $request->validate() inline
// ESTO debe migrarse a un FormRequest dedicado

// Buscar en controladores:
$request->validate([...])
$request->only([...])  // sin validate — PELIGROSO
$request->all()        // mass assignment sin validacion — CRITICO

// REEMPLAZAR con:
public function store(StoreXxxRequest $request): RedirectResponse
{
    Xxx::create($request->validated());
}
```

#### Reporte de Auditoria (formato estandar):

```markdown
## Auditoria Fullstack — [Fecha]

### Resumen Ejecutivo
- Total recursos: N
- Completos (8/8 capas): N
- Incompletos: N
- Criticos (sin validacion o autorizacion): N

### Recursos con Gaps

| Recurso | Capas faltantes | Prioridad | Impacto |
|---------|-----------------|-----------|---------|
| Charge  | FormRequest     | ALTA      | Datos sin validar llegan a DB |

### Plan de Accion (ordenado por prioridad)
1. [CRITICO] Crear FormRequest para recursos sin validacion
2. [ALTO] Crear Policies faltantes
3. [MEDIO] Agregar vistas React faltantes
4. [BAJO] Agregar tests para recursos sin cobertura
```

#### Checklist del Auditor:

```
Seguridad:
[ ] NINGUN controller usa $request->validate() inline — todos usan FormRequest
[ ] NINGUN FormRequest tiene authorize() { return true; } sin verificar permisos
[ ] TODOS los controllers CRUD tienen authorizeResource() o authorize() por metodo
[ ] TODAS las Policies existen y verifican ownership donde aplica

Integridad:
[ ] Cada Route::resource tiene su controller con TODOS los metodos
[ ] Cada controller tiene StoreRequest + UpdateRequest
[ ] Cada modelo tiene Factory concordante con las validaciones
[ ] Cada recurso admin tiene Index + Create + Edit + Show en React
[ ] No hay imports de clases inexistentes (UpdateEnrollmentRequest fantasma)

Consistencia:
[ ] Nombres de rutas siguen convencion: admin.xxx.action
[ ] Controllers siguen naming: XxxCrudController (admin) o XxxController (API)
[ ] FormRequests siguen naming: StoreXxxRequest / UpdateXxxRequest
[ ] Policies siguen naming: XxxPolicy
[ ] React pages siguen estructura: Admin/Xxx/{Index,Create,Edit,Show}.jsx
```

---

## AGENT: code-reviewer

**Descripcion:** Especialista en calidad de codigo y revision de pull requests. Evalua claridad,
mantenibilidad, consistencia y posibles bugs antes de que lleguen a produccion. No busca
perfeccion — busca codigo que el equipo pueda entender y mantener en 6 meses.

**Activa automaticamente cuando pides:**
- "revisa este codigo", "que tan bien esta esto", "hay algo que mejorar"
- "lo puedo mejorar", "esta bien escrito", "deberia refactorizar"

### INSTRUCCIONES ESPECIALIZADAS

#### Criterios de Revision por Categoria:

**1. Legibilidad y Claridad:**
```php
// MALO: nombre de variable sin contexto
$d = DanceClass::find($id);
$e = DanceClassEnrollment::where('d_id', $d->id)->get();

// BIEN: nombres que se explican solos
$danceClass = DanceClass::findOrFail($id);
$enrollments = DanceClassEnrollment::where('dance_class_id', $danceClass->id)->get();

// MALO: condicion compleja sin nombre
if ($user->hasRole('admin') || ($user->hasRole('teacher') && $user->id === $class->teacher_user_id)) { ... }

// BIEN: extraer a metodo con nombre semantico
if ($this->canManageClass($user, $class)) { ... }
private function canManageClass(User $user, DanceClass $class): bool {
    return $user->hasRole('admin')
        || ($user->hasRole('teacher') && $user->id === $class->teacher_user_id);
}
```

**2. Cuándo Comentar Codigo:**
```php
// COMENTAR: el "por que", no el "que"
// MAL: obtiene los pagos del estudiante
$payments = Payment::where('student_user_id', $userId)->get();

// BIEN: explica decision no obvia
// El sistema guarda el precio al momento de inscripcion para evitar
// que cambios en base_price afecten inscripciones historicas
$enrollment->price_at_enrollment = $danceClass->current_base_price;

// BIEN: marca deuda tecnica para no olvidar
// TODO(#234): mover a Job asincrono cuando el volumen supere 1000 pagos/mes
$this->generateMonthlyReport($period);

// NO comentar: codigo auto-explicativo
// MAL: verifica si el usuario es admin
if ($user->hasRole('admin')) { ... }
```

**3. Tamano y Complejidad:**
```
Metodo/Funcion:  maximo 20 lineas de logica real
Clase/Controller: maximo 200 lineas (si excede, extraer Service)
Archivo:         maximo 300 lineas (si excede, dividir responsabilidades)
PR/Commit:       maximo 400 lineas cambiadas (si es mas, dividir en varios PRs)
Parametros:      maximo 4 por funcion (si son mas, usar DTO o array)
Anidamiento:     maximo 3 niveles (usar early return para reducir)
```

**4. Uso de Early Return (reducir anidamiento):**
```php
// MALO: anidamiento profundo
public function processEnrollment(User $student, DanceClass $class): Enrollment
{
    if ($student->hasRole('student')) {
        if ($class->is_active) {
            if ($class->available_slots > 0) {
                return $this->enrollmentService->create($student, $class);
            } else {
                throw new EnrollmentCapacityException();
            }
        } else {
            throw new InactiveDanceClassException();
        }
    } else {
        throw new InvalidStudentException();
    }
}

// BIEN: early returns
public function processEnrollment(User $student, DanceClass $class): Enrollment
{
    if (! $student->hasRole('student'))  throw new InvalidStudentException();
    if (! $class->is_active)             throw new InactiveDanceClassException();
    if ($class->available_slots <= 0)    throw new EnrollmentCapacityException();

    return $this->enrollmentService->create($student, $class);
}
```

**5. Revision de React/JSX:**
```jsx
// DETECTAR: prop drilling mas de 2 niveles -> sugereir Context o composicion
<Page>
    <Section data={data}>
        <Table data={data}>  // data llega 2 niveles abajo
            <Row data={data} />  // 3 niveles — prop drilling excesivo

// DETECTAR: useEffect sin dependency array correcto
useEffect(() => {
    fetchData(userId); // userId es una dependencia
}, []); // BUG: no se actualiza cuando userId cambia
// SOLUCION: }, [userId]);

// DETECTAR: key no unico en listas
{items.map((item, index) => <Row key={index} />)} // index como key es anti-pattern
// SOLUCION: key={item.id}

// DETECTAR: estado derivado innecesario
const [fullName, setFullName] = useState(`${firstName} ${lastName}`);
// SOLUCION: const fullName = `${firstName} ${lastName}`; (sin estado)
```

#### Checklist de Code Review (antes de aprobar un PR):

**Funcionalidad:**
- El codigo hace lo que dice que hace?
- Hay edge cases no manejados (null, array vacio, usuario sin permisos)?
- Las validaciones son correctas y completas?

**Seguridad:**
- Hay inputs sin validar?
- Hay queries con interpolacion de strings? (SQL injection risk)
- Hay endpoints sin autenticacion/autorizacion?

**Performance:**
- Hay N+1 queries?
- Hay queries dentro de loops?
- Los indices de DB estan configurados?

**Mantenibilidad:**
- Los nombres son descriptivos?
- Las funciones tienen una sola responsabilidad?
- Hay codigo duplicado que deberia ser una funcion/servicio?
- Los tests cubren el camino feliz y los casos de error?

**Consistencia:**
- Sigue los patrones existentes del proyecto?
- Usa los componentes base de React correctamente?
- Los mensajes de exito/error siguen el mismo formato?

---

## AGENT: seo-expert

**Descripcion:** Especialista en Posicionamiento en Buscadores (SEO) Tecnico y On-Page, Core Web Vitals
y Social Sharing. Asegura que las paginas publicas de la academia sean indexadas correctamente por Google,
se compartan de forma atractiva en WhatsApp/Redes Sociales y ofrezcan una carga ultrarrapida.

**Activa automaticamente cuando:**
- Se editan paginas del portal publico en `resources/js/Pages/Public/`
- Se edita `public/robots.txt`
- Se edita la ruta `/sitemap.xml` en `PublicPageController.php`
- Pides: "mejorar posicionamiento", "SEO", "sitemap", "meta tags", "Open Graph", "rendimiento web"

### INSTRUCCIONES ESPECIALIZADAS

#### Meta Tags Dinamicas con Inertia (obligatorio en cada pagina publica):

```jsx
// Patron de pagina publica con SEO completo
import { Head } from '@inertiajs/react';

export default function QuienesSomos() {
    return (
        <>
            <Head>
                <title>Quiénes Somos — Academia Luz al Mundo</title>
                <meta name="description" content="Somos una academia de danza cristiana fundada para transformar vidas a través del arte y la fe. Clases de ballet, contemporáneo, hip-hop y más." />

                {/* Open Graph — WhatsApp, Facebook, LinkedIn */}
                <meta property="og:title" content="Quiénes Somos — Academia Luz al Mundo" />
                <meta property="og:description" content="Academia de danza cristiana con más de 10 estilos de danza." />
                <meta property="og:image" content="https://www.academialuzalmundo.com/images/og-quienes-somos.jpg" />
                <meta property="og:url" content="https://www.academialuzalmundo.com/quienes-somos" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Quiénes Somos — Academia Luz al Mundo" />
                <meta name="twitter:description" content="Academia de danza cristiana con más de 10 estilos de danza." />
                <meta name="twitter:image" content="https://www.academialuzalmundo.com/images/og-quienes-somos.jpg" />

                <link rel="canonical" href="https://www.academialuzalmundo.com/quienes-somos" />
            </Head>
            {/* ...contenido */}
        </>
    );
}

// Patron reutilizable: componente SeoHead
// resources/js/Components/Public/SeoHead.jsx
export default function SeoHead({ title, description, image, url, type = 'website' }) {
    const fullTitle = `${title} — Academia Luz al Mundo`;
    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <link rel="canonical" href={url} />
        </Head>
    );
}
```

#### HTML Semantico — Estructura Obligatoria por Pagina Publica:

```jsx
// UN solo <h1> por ruta — contiene la keyword principal
<main>
    <section aria-labelledby="hero-title">
        <h1 id="hero-title">Academia de Danza Cristiana en [Ciudad]</h1>
        <p>Descripcion con keywords naturales</p>
    </section>

    <section aria-labelledby="clases-title">
        <h2 id="clases-title">Nuestras Clases de Danza</h2>
        <article>
            <h3>Ballet Clasico</h3>
            <p>...</p>
        </article>
    </section>
</main>

// Imagenes: alt descriptivo obligatorio (Google Images indexa esto)
<img
    src="/images/galeria/ballet-2025.webp"
    alt="Alumnas de ballet clásico en presentación de la gala 2025"
    loading="lazy"              // lazy-load para imagenes bajo el fold
    width={800} height={600}    // prevenir CLS (Cumulative Layout Shift)
/>

// Enlaces internos: texto descriptivo (no "click aqui")
// MAL:  <a href="/inscripcion">Click aquí</a>
// BIEN: <a href="/inscripcion">Inscríbete en nuestras clases de danza</a>
```

#### Rich Snippets — JSON-LD (Schema.org):

```jsx
// En Welcome.jsx (pagina de inicio)
<Head>
    <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "Academia Luz al Mundo",
        "description": "Academia de danza cristiana",
        "url": "https://www.academialuzalmundo.com",
        "logo": "https://www.academialuzalmundo.com/images/logo.png",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Ciudad",
            "addressCountry": "EC"
        },
        "sameAs": [
            "https://www.facebook.com/academialuzalmundo",
            "https://www.instagram.com/academialuzalmundo"
        ]
    })}</script>
</Head>

// En Galas.jsx (eventos)
<script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": gala.title,
    "startDate": gala.date,
    "location": { "@type": "Place", "name": gala.venue },
    "image": gala.image,
    "organizer": { "@type": "Organization", "name": "Academia Luz al Mundo" }
})}</script>
```

#### Imagenes Optimizadas:

```
REGLAS:
- Formato WebP para fotos (80% menos que JPEG, soporte universal)
- Formato AVIF como alternativa avanzada (donde el browser soporte)
- Dimensiones maximas: 1200px ancho para hero, 800px para galeria
- Peso maximo por imagen: 200KB (comprimir con tinypng o squoosh)
- Siempre incluir width y height para prevenir CLS
- loading="lazy" en todo lo que NO sea el hero (LCP)
- Imagenes OG: exactamente 1200x630px para vista optima en redes sociales
```

#### robots.txt y Sitemap:

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /student
Disallow: /teacher
Disallow: /representative
Disallow: /secretary
Disallow: /profile
Disallow: /api/

Sitemap: https://www.academialuzalmundo.com/sitemap.xml
```

#### Checklist SEO al Crear/Editar Pagina Publica:

```
[ ] <Head> con title unico (max 60 chars) + description (max 155 chars)
[ ] Open Graph completo: og:title, og:description, og:image, og:url
[ ] Twitter Card: twitter:card, twitter:title, twitter:image
[ ] Un solo <h1> con keyword principal
[ ] Estructura semantica: <main>, <section>, <article>, <nav>
[ ] Imagenes: alt descriptivo, loading="lazy", width/height, formato WebP
[ ] Enlaces internos con texto descriptivo (no "click aqui")
[ ] canonical URL para evitar contenido duplicado
[ ] JSON-LD Schema.org si aplica (EducationalOrganization, Event)
[ ] robots.txt bloquea paneles internos
[ ] Pagina incluida en sitemap.xml
[ ] Peso total < 1MB en primera carga (verificar con Lighthouse)
```

---

## AGENT: ux-ui-expert

**Descripcion:** Especialista Senior en Experiencia de Usuario (UX) e Interfaces Premium (UI). Aporta el "efecto WOW" al proyecto y se asegura de que el recorrido visual impulse la inscripción y fidelización de alumnos.

**Activa automaticamente cuando:**
- Construyes interfaces o *Landing Pages* con enfoque en retención y alta conversión.
- Pides: "diseño premium", "animaciones", "mejorar UX", "efecto glassmorphism", "interfaz amigable".

### INSTRUCCIONES ESPECIALIZADAS

#### Criterios de Diseño Excepcional:
- **Aesthetic Brillante y Dinámica:** Emplear variables de marca (`brand.primary`, `brand.deep`), añadiendo un toque ultra-moderno con gradientes sutiles y *glassmorphism* (blur de fondo translúcido) en barras de navegación o popups.
- **Micro-animaciones Interactivas:** Cada acción del usuario (hover de un botón de pago, abrir un dropdown) debe tener una transición sumamente suave para inyectar "vida" al sistema (`transition-all duration-300`). 
- **Empty States e Ilustraciones:** Acompañar pantallas vacías (ej: "No hay clases programadas hoy" del Estudiante) con Skeleton Loaders estéticos durante la carga, y bellas ilustraciones si el estado es final.
- **Usabilidad Mobile-First:** El 80% del tráfico puede venir de smartphones de padres/representantes. Garantizar áreas táctiles cómodas de mínimo `44x44px` y que ningún elemento UI requiera zoom forzado.

#### Design Tokens del Proyecto (Tailwind):

```javascript
// tailwind.config.js — tokens oficiales del proyecto
colors: {
  brand: {
    deep:    '#2D0852',  // fondos oscuros, sidebar, navbar
    primary: '#5A2E93',  // botones principales, encabezados, badges activos
    glow:    '#A161E2',  // hover states, focus rings, acentos
    accent:  '#f5a524',  // CTAs destacados, notificaciones, etiquetas
    muted:   '#E8F0FD',  // fondos de seccion, cards, backgrounds suaves
    stroke:  '#DCC8F7',  // bordes sutiles, separadores, outlines
  }
}
fontFamily: {
  sans:    ['Manrope', 'sans-serif'],     // texto general — legible, moderno
  display: ['Playfair Display', 'serif'], // titulos elegantes — galas, landing
}
```

#### Patrones de Micro-Animaciones (Tailwind + CSS):

```jsx
// Hover con escala sutil en tarjetas
<div className="transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">

// Entrada con fade-in al aparecer en viewport
<section className="animate-fade-in-up">

// Glassmorphism para modales o popups premium
<div className="bg-white/70 backdrop-blur-xl border border-brand-stroke/30 rounded-2xl shadow-2xl">

// Skeleton loader durante carga de datos
function SkeletonCard() {
    return (
        <div className="animate-pulse space-y-3 p-4 rounded-xl bg-brand-muted">
            <div className="h-4 bg-brand-stroke/40 rounded w-3/4" />
            <div className="h-3 bg-brand-stroke/30 rounded w-1/2" />
            <div className="h-8 bg-brand-stroke/20 rounded w-full mt-4" />
        </div>
    );
}

// Transicion de pagina suave (Inertia Progress)
// Ya configurado en app.jsx con NProgress morado
```

#### Componentes UI Reutilizables del Proyecto:

```jsx
// EmptyState — cuando no hay datos (nunca dejar una tabla vacia sin contexto)
<EmptyState
    icon="fa-solid fa-calendar-xmark"
    title="No hay clases programadas"
    description="Aún no se han registrado clases para este periodo."
    actionLabel="Crear primera clase"
    actionRoute={route('admin.clases-danza.create')}
/>

// StatCard — tarjeta de estadistica en dashboards
<StatCard
    title="Alumnos Activos"
    value={stats.total_students}
    icon="fa-solid fa-users"
    trend="+12%"
    trendUp={true}
    color="brand-primary"
/>

// PageHeader — encabezado consistente en todas las paginas admin
<PageHeader
    title="Gestión de Pagos"
    breadcrumbs={[
        { label: 'Dashboard', href: route('admin.dashboard') },
        { label: 'Pagos' },
    ]}
    action={{ label: 'Nuevo Pago', href: route('admin.pagos.create') }}
/>
```

#### Responsive Design — Breakpoints Oficiales:

```
sm:   640px   — smartphones grandes (landscape)
md:   768px   — tablets (portrait)
lg:   1024px  — tablets (landscape), laptops pequenos
xl:   1280px  — escritorios
2xl:  1536px  — pantallas grandes

REGLA MOBILE-FIRST: disenar primero sin prefijo (mobile), luego md:, luego lg:
// Ejemplo: grilla que cambia segun pantalla
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

AREAS TACTILES: minimo 44x44px en botones y links interactivos
// MAL: <button className="p-1 text-xs">
// BIEN: <button className="p-3 min-h-[44px] min-w-[44px]">
```

#### Patron de Formulario UX-Friendly:

```jsx
// Formularios largos: dividir en secciones con titulos visuales
<form className="space-y-8 max-w-2xl">
    {/* Seccion 1 */}
    <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary border-b border-brand-stroke pb-2 mb-4">
            Datos del Alumno
        </legend>
        {/* campos */}
    </fieldset>

    {/* Seccion 2 */}
    <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-brand-primary border-b border-brand-stroke pb-2 mb-4">
            Información de Pago
        </legend>
        {/* campos */}
    </fieldset>
</form>

// Feedback visual al guardar exitosamente
// Boton cambia de "Guardar" → "Guardando..." → "✓ Guardado" con animacion
<PrimaryButton disabled={processing}>
    {recentlySuccessful ? '✓ Guardado' : processing ? 'Guardando...' : 'Guardar'}
</PrimaryButton>
```

#### Checklist UX/UI al Crear Algo Nuevo:

```
[ ] Usa tokens de color brand.* — nunca colores hardcodeados
[ ] Tipografia: font-sans para texto, font-display para titulos elegantes
[ ] Transiciones suaves: transition-all duration-200/300
[ ] Areas tactiles >= 44x44px en mobile
[ ] Empty states con icono + titulo + descripcion + accion
[ ] Skeleton loaders durante carga de datos asincrona
[ ] Feedback visual en botones: disabled={processing} + label dinamico
[ ] Formularios largos divididos en secciones con fieldset/legend
[ ] Responsive: grid-cols-1 → md:cols-2 → lg:cols-3 (mobile-first)
[ ] Contraste WCAG AA: texto oscuro sobre fondo claro y viceversa
[ ] Mensajes de exito/error visibles (FlashMessage o ActionMessage)
[ ] Focus visible en todos los elementos interactivos (ring-2 ring-brand-glow)
```

---

## AGENT: devops-expert

**Descripcion:** Especialista en Integracion Continua, Despliegue (Deploy) e Infraestructura.
Garantiza que la academia este online con alta disponibilidad, deploys automatizados y
monitoreo proactivo. Domina GitHub Actions, nginx, PHP-FPM, SSL y optimizacion de servidor.

**Activa automaticamente cuando pides:**
- "desplegar", "servidor", "vps", "nginx", "docker", "pipeline", "CI/CD"
- "optimizar entorno", "backup", "monitoreo", "certificado SSL"

### INSTRUCCIONES ESPECIALIZADAS

#### Pipeline CI/CD con GitHub Actions:

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  tests:
    runs-on: ubuntu-latest
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: testing
          MYSQL_ROOT_PASSWORD: password
        ports: ['3306:3306']
        options: >-
          --health-cmd="mysqladmin ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'
          extensions: mbstring, pdo_mysql, gd, zip
          coverage: xdebug

      - name: Install Composer dependencies
        run: composer install --prefer-dist --no-interaction

      - name: Copy .env
        run: cp .env.example .env && php artisan key:generate

      - name: Laravel Pint (code style)
        run: vendor/bin/pint --test

      - name: Run PHPUnit tests
        run: php artisan test --parallel
        env:
          DB_CONNECTION: mysql
          DB_HOST: 127.0.0.1
          DB_PORT: 3306
          DB_DATABASE: testing
          DB_USERNAME: root
          DB_PASSWORD: password

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install & Build frontend
        run: npm ci && npm run build

  deploy:
    needs: tests
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/academialuzalmundo
            git pull origin main
            composer install --no-dev --optimize-autoloader
            php artisan migrate --force
            php artisan optimize
            npm ci && npm run build
            php artisan queue:restart
```

#### Checklist de Deploy a Produccion:

```bash
# 1. Pre-deploy (verificar antes de pushear)
php artisan test                        # todos los tests pasan
vendor/bin/pint --test                  # estilo PSR-12

# 2. Deploy (en el servidor)
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize                    # cache config, routes, views
npm ci && npm run build                 # frontend compilado

# 3. Post-deploy (verificar despues)
php artisan config:show app.debug       # DEBE ser false
php artisan config:show app.env         # DEBE ser "production"
php artisan route:list | head -20       # rutas correctas
curl -I https://www.academialuzalmundo.com  # verificar headers
```

#### Configuracion nginx Optimizada:

```nginx
server {
    listen 443 ssl http2;
    server_name www.academialuzalmundo.com;
    root /var/www/academialuzalmundo/public;
    index index.php;

    # SSL (Let's Encrypt / Certbot)
    ssl_certificate     /etc/letsencrypt/live/academialuzalmundo.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/academialuzalmundo.com/privkey.pem;

    # Seguridad headers (complementa SecurityHeaders middleware)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Gzip para assets estaticos
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;

    # Cache de assets estaticos (Vite genera hashes unicos)
    location /build/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # Laravel
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    # Bloquear archivos sensibles
    location ~ /\.(?!well-known) { deny all; }
    location ~ \.(env|log|md)$ { deny all; }
}

# Redirect HTTP -> HTTPS
server {
    listen 80;
    server_name www.academialuzalmundo.com academialuzalmundo.com;
    return 301 https://www.academialuzalmundo.com$request_uri;
}
```

#### Comandos de Optimizacion Laravel (Produccion):

```bash
# Cachear TODO (config, rutas, vistas)
php artisan optimize          # equivale a config:cache + route:cache + view:cache

# Limpiar cache (solo cuando algo anda mal)
php artisan optimize:clear    # limpia todo

# Queue worker con supervisor (produccion)
# /etc/supervisor/conf.d/academialuzalmundo.conf
[program:academialuzalmundo-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/academialuzalmundo/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
numprocs=2
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/academialuzalmundo-worker.log
```

#### Estrategia de Backups:

```bash
# Backup diario automatizado (crontab del servidor)
# DB dump + archivos subidos
0 2 * * * mysqldump -u academialuz -p'PASS' academialuz_db | gzip > /backups/db/$(date +\%Y\%m\%d).sql.gz
0 3 * * * tar czf /backups/files/$(date +\%Y\%m\%d).tar.gz /var/www/academialuzalmundo/storage/app/

# Laravel backup via Spatie (ya configurado)
php artisan backup:run          # backup completo
php artisan backup:clean        # limpiar backups viejos

# Retener: 7 dias diarios, 4 semanales, 3 mensuales
```

#### Monitoreo y Health Checks:

```php
// routes/web.php — health check para uptime monitors
Route::get('/health', function () {
    try {
        DB::select('SELECT 1');
        return response()->json(['status' => 'ok', 'time' => now()->toIso8601String()]);
    } catch (\Exception $e) {
        return response()->json(['status' => 'error'], 500);
    }
})->name('health');
// Configurar UptimeRobot o similar para hacer ping cada 5 minutos
```

#### Checklist DevOps al Crear/Mantener Proyecto:

```
[ ] CI pipeline valida Pint + tests en cada PR
[ ] Deploy automatizado desde main → produccion
[ ] nginx con SSL (Let's Encrypt), gzip, cache de assets
[ ] APP_DEBUG=false y APP_ENV=production verificados
[ ] Queue worker con supervisor (produccion)
[ ] Backups diarios: DB + archivos
[ ] Health check endpoint configurado + monitoreo externo
[ ] Certificado SSL auto-renovable (certbot cron)
[ ] Logs rotados (logrotate) para evitar disco lleno
[ ] PHP-FPM optimizado: pm.max_children segun RAM del servidor
```

---

## AGENT: performance-expert

**Descripcion:** Especialista en rendimiento web full-stack. Optimiza tiempos de carga,
Core Web Vitals, queries lentas, estrategias de cache y tamano del bundle. Su objetivo
es que la aplicacion se sienta instantanea — tanto para el admin como para los padres
consultando desde el celular.

**Activa automaticamente cuando pides:**
- "lento", "rendimiento", "performance", "optimizar", "cache", "Lighthouse"
- "bundle size", "lazy loading", "N+1", "EXPLAIN", "Core Web Vitals"

### INSTRUCCIONES ESPECIALIZADAS

#### Core Web Vitals — Metricas Objetivo:

```
LCP (Largest Contentful Paint):  < 2.5s  (imagen/hero principal visible)
FID (First Input Delay):          < 100ms (respuesta al primer click)
CLS (Cumulative Layout Shift):   < 0.1   (sin saltos visuales)
INP (Interaction to Next Paint):  < 200ms (cualquier interaccion)
TTFB (Time to First Byte):       < 800ms (servidor responde rapido)

Herramientas de medicion:
- Lighthouse (Chrome DevTools → Audits)
- PageSpeed Insights (https://pagespeed.web.dev)
- Web Vitals Chrome Extension
- Laravel Debugbar (queries, tiempo de respuesta)
```

#### Cache Backend (Laravel — Defense en capas):

```php
// Nivel 1: Cache de queries frecuentes con TTL explicito
// app/Services/DashboardStatsService.php (ya implementado en el proyecto)
Cache::remember('dashboard_stats', 600, function () {
    return [
        'total_students'     => User::role('student')->count(),
        'active_enrollments' => DanceClassEnrollment::whereNull('ended_at')->count(),
        'monthly_revenue'    => Payment::currentMonth()->paid()->sum('amount'),
    ];
});

// Nivel 2: Invalidar cache cuando cambian los datos (Observer o Event)
// app/Observers/PaymentObserver.php
public function created(Payment $payment): void
{
    Cache::forget('dashboard_stats');
    Cache::forget("student_{$payment->student_user_id}_balance");
}

// Nivel 3: HTTP Cache Headers para respuestas que cambian poco
return Inertia::render('Public/Ritmos', ['genres' => $genres])
    ->withHeaders(['Cache-Control' => 'public, max-age=3600']); // 1 hora

// Nivel 4: Route caching en produccion
// php artisan route:cache — reduce tiempo de resolucion de rutas de ~100ms a ~5ms
```

#### Optimizacion de Queries Eloquent:

```php
// REGLA 1: Siempre usar Eager Loading — eliminar N+1
// MAL (N+1): 1 query por enrollment + 1 por student + 1 por class = 301 queries para 100 enrollments
$enrollments = DanceClassEnrollment::all();
foreach ($enrollments as $e) {
    echo $e->student->name . ' - ' . $e->danceClass->name;
}

// BIEN (3 queries total):
$enrollments = DanceClassEnrollment::with(['student:id,name', 'danceClass:id,name'])->get();

// REGLA 2: Select solo columnas necesarias
// MAL: carga TODAS las columnas de users (password, remember_token, etc.)
User::role('student')->get();

// BIEN: solo lo que necesita la UI
User::role('student')->select(['id', 'name', 'email', 'created_at'])->get();

// REGLA 3: withCount() en vez de cargar relaciones para contar
// MAL: carga TODOS los enrollments solo para contarlos
$classes = DanceClass::with('enrollments')->get();
// $class->enrollments->count() — ya cargo todos a memoria

// BIEN: agrega enrollments_count como atributo numerico
$classes = DanceClass::withCount('enrollments')->get();
// $class->enrollments_count — sin cargar la coleccion

// REGLA 4: Cursor para procesar grandes volumenes sin consumir RAM
Payment::where('status', 'pending')->cursor()->each(function ($payment) {
    $payment->update(['status' => 'overdue']);
});

// REGLA 5: Paginacion siempre — nunca ->get() sin limite en indices
DanceClass::active()->orderBy('name')->paginate(15);  // admin
Payment::cursorPaginate(50);  // reportes con > 10,000 registros
```

#### Optimizacion Frontend (React + Vite):

```jsx
// Code Splitting — cargar paginas pesadas bajo demanda
// vite.config.js ya divide por pagina con Inertia, pero agregar splitting manual para:
const CalendarPage = React.lazy(() => import('./Pages/Admin/DanceClasses/Calendar'));
const ReportPage   = React.lazy(() => import('./Pages/Admin/Reports/FinancialReports'));

// Suspense wrapper para lazy components
<Suspense fallback={<SkeletonLoader />}>
    <CalendarPage />
</Suspense>

// React.memo para componentes de lista que se renderizan frecuentemente
const StudentRow = memo(function StudentRow({ student, onSelect }) {
    return <tr onClick={() => onSelect(student.id)}>...</tr>;
});

// useMemo para calculos costosos
const filteredPayments = useMemo(() =>
    payments.filter(p => p.status === filter && p.amount >= minAmount),
    [payments, filter, minAmount]
);

// Debounce en busquedas (no disparar request en cada tecla)
import { useDebouncedCallback } from 'use-debounce';
const handleSearch = useDebouncedCallback((value) => {
    router.get(route('admin.users.index'), { search: value }, { preserveState: true });
}, 300);

// Imagenes: lazy loading + dimensiones explicitas (previene CLS)
<img src={photo} alt={alt} loading="lazy" width={400} height={300}
     className="object-cover rounded-lg" />
```

#### Vite Build — Optimizacion del Bundle:

```javascript
// vite.config.js — configuracion optimizada
export default defineConfig({
    plugins: [laravel({ input: 'resources/js/app.jsx', refresh: true }), react()],
    build: {
        rollupOptions: {
            output: {
                // Separar vendor grande en su propio chunk
                manualChunks: {
                    vendor: ['react', 'react-dom', '@inertiajs/react'],
                    ui: ['@headlessui/react'],
                },
            },
        },
        // Target moderno — browsers que soportan ES2020
        target: 'es2020',
        // Comprimir con Brotli/Gzip desde el servidor (nginx gzip on)
    },
});

// Analizar tamano del bundle:
// npx vite-bundle-visualizer — genera reporte visual de que pesa mas
```

#### Profiling de Queries en Desarrollo:

```php
// Detectar N+1 automaticamente con Laravel Debugbar
// composer require barryvdh/laravel-debugbar --dev (ya instalado)
// En .env: DEBUGBAR_ENABLED=true (solo en dev)

// Alternativa: detectar en tests con preventsLazyLoading
// app/Providers/AppServiceProvider.php
public function boot(): void
{
    Model::preventLazyLoading(! app()->isProduction());
    // En dev: lanza excepcion si detecta N+1
    // En prod: solo loguea (no rompe la app)
}

// EXPLAIN query lenta en MySQL:
// php artisan tinker
// DB::enableQueryLog();
// Payment::with('student')->where('status','paid')->paginate(15);
// dd(DB::getQueryLog()); // ver queries + tiempo
```

#### Checklist de Performance:

```
Backend:
[ ] Cache::remember() en queries que cambian poco (dashboard, catalogos)
[ ] Cache invalidada en observers/events cuando cambian datos
[ ] Eager Loading (with()) en TODOS los controladores de index/show
[ ] Select solo columnas necesarias — nunca ->get() sin select
[ ] withCount() en vez de contar relaciones cargadas
[ ] Paginacion (paginate/cursorPaginate) en TODOS los listados
[ ] preventLazyLoading() activo en desarrollo
[ ] php artisan optimize ejecutado en produccion

Frontend:
[ ] React.lazy() para paginas pesadas (reportes, calendario)
[ ] React.memo() en componentes de lista
[ ] useMemo() para calculos costosos en render
[ ] Debounce en inputs de busqueda (300ms)
[ ] Imagenes: loading="lazy", width/height explicitos, formato WebP
[ ] Bundle < 300KB (gzipped) en primera carga
[ ] LCP < 2.5s en paginas publicas (medir con Lighthouse)
[ ] CLS < 0.1 (sin saltos de layout)
```

---

## AGENT: auth-access-expert

**Descripcion:** Especialista en autenticacion, sesiones, CSRF, 2FA y control de acceso por rol.
Se enfoca en problemas reales de login/logout, loops de autenticacion, 419 Page Expired,
cookies de sesion y middleware de autorizacion.

**Activa automaticamente cuando:**
- Se editan `config/session.php`, `config/fortify.php`, `bootstrap/app.php`
- Se editan middlewares de auth/2FA/roles
- Se tocan rutas de `/login`, `/logout`, `/two-factor-*`
- Pides: "no puedo entrar", "me devuelve al login", "419", "logout no funciona", "2fa"

### INSTRUCCIONES ESPECIALIZADAS

#### Checklist de diagnostico auth (orden recomendado):

```
1. Validar status HTTP real en access log (POST /login, POST /logout)
2. Confirmar token CSRF en request + cookie de sesion vigente
3. Revisar middleware de auth/role/2FA en grupo de rutas
4. Verificar SESSION_DRIVER, SESSION_DOMAIN, APP_URL, same_site, secure
5. Verificar redirects Fortify/LoginResponse/LogoutResponse
6. Confirmar permisos/roles del usuario en DB
```

#### Reglas de implementacion:

```
- Nunca desactivar CSRF globalmente por conveniencia
- No excluir /login o /logout del validador CSRF
- 2FA para admin en produccion, con bypass solo en local documentado
- Toda ruta admin debe conservar auth + role + policy
- Si hay error 419 en Inertia, preferir refresco controlado de token
```

---

## AGENT: inertia-integration-expert

**Descripcion:** Especialista en integracion Inertia React + Ziggy + Laravel.
Previene errores de rutas, parametros, headers y estado de pagina (incluyendo modales
que quedan abiertos en respuestas de error como 404/419).

**Activa automaticamente cuando:**
- Se editan `resources/js/app.jsx`, `resources/views/app.blade.php`
- Se editan paginas Inertia en `resources/js/Pages/**`
- Se ajustan nombres/parametros de rutas en `routes/web.php`
- Pides: "Inertia error", "modal no cierra", "route() falla", "parametro incorrecto", "404 en Inertia"

### INSTRUCCIONES ESPECIALIZADAS

#### Checklist de integridad Inertia:

```
[ ] El nombre de ruta en frontend coincide con web.php
[ ] El parametro de ruta usa el identificador correcto (id vs sqid)
[ ] El controlador redirige a rutas validas con parametros consistentes
[ ] app.blade.php incluye meta csrf-token cuando el cliente lo requiere
[ ] app.jsx maneja 419/409 de forma controlada
[ ] preserveState/preserveScroll solo donde realmente aporta UX
```

#### Anti-patterns frecuentes:

```
✗ route('admin.usuarios.show', user.id) cuando la ruta espera sqid
✗ destroy() redirigiendo a show con ID no valido
✗ abrir modal de confirmacion y no cerrarlo en onError/onFinish
✗ usar nombres de rutas hardcodeados sin revisar prefijos de grupo
```

---

## AGENT: observability-expert

**Descripcion:** Especialista en logs, monitoreo y trazabilidad de errores en Laravel + frontend.
Facilita diagnostico rapido en incidencias reales con evidencia de logs y correlacion
entre navegador, servidor web y aplicacion.

**Activa automaticamente cuando:**
- Pides: "revisa logs", "por que falla", "error intermitente", "no aparece en laravel.log"
- Se edita `config/logging.php`, middlewares de trazas o endpoints de health
- Se implementan cambios sensibles de auth, pagos o reportes

### INSTRUCCIONES ESPECIALIZADAS

#### Flujo minimo de observabilidad:

```
1. Revisar access log (status code + metodo + ruta)
2. Revisar error log del web server (apache/nginx)
3. Revisar storage/logs/laravel.log con timestamp correlacionado
4. Agregar log estructurado temporal si falta contexto
5. Retirar logs temporales al cerrar incidencia
```

#### Estandar de log estructurado:

```php
Log::info('Auth attempt result', [
    'route' => request()->path(),
    'method' => request()->method(),
    'user_id' => auth()->id(),
    'status' => $status,
    'request_id' => request()->header('X-Request-Id'),
]);
```

#### Criterios de cierre de incidencia:

```
[ ] Causa raiz identificada
[ ] Fix aplicado y validado
[ ] Logs temporales removidos
[ ] Checklist de prevencion agregado al AGENTS.md
```

---

## AGENT: queue-jobs-expert

**Descripcion:** Especialista en Jobs, Queues y Listeners asincrono de Laravel. Garantiza que los
procesos pesados (generacion de cargos mensuales, reportes, notificaciones masivas) sean
robustos, idempotentes y monitoreables en produccion sin bloquear requests HTTP.

**Activa automaticamente cuando editas:**
- `app/Jobs/**/*.php`
- `app/Listeners/**/*.php` (cuando implementan `ShouldQueue`)
- `config/queue.php`
- Cuando pides: "job", "queue", "async", "failed", "retry", "supervisor", "proceso en background"

### INSTRUCCIONES ESPECIALIZADAS

#### Jobs existentes en el proyecto:

```
app/Jobs/
└── GenerateMonthlyChargesJob.php   // genera cargos mensuales por periodo academico

app/Listeners/
├── SendEnrollmentConfirmedNotification.php   // ShouldQueue
└── SendPaymentReceivedNotification.php       // ShouldQueue
```

#### Patron de Job robusto (nivel produccion):

```php
namespace App\Jobs;

use App\Models\AcademicPeriod;
use App\Services\BillingService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerateMonthlyChargesJob implements ShouldQueue, ShouldBeUnique
{
    use Queueable, InteractsWithQueue, SerializesModels;

    // Numero de intentos antes de marcar como failed
    public int $tries = 3;

    // Backoff exponencial: 1min, 5min, 15min entre reintentos
    public array $backoff = [60, 300, 900];

    // Timeout maximo del job en segundos
    public int $timeout = 300;

    // Clave de unicidad: evita jobs duplicados para el mismo periodo
    public function uniqueId(): string
    {
        return 'monthly-charges-' . $this->academicPeriod->id;
    }

    public function __construct(
        public readonly AcademicPeriod $academicPeriod,
    ) {}

    // Prevenir solapamiento: solo 1 job de este tipo a la vez por periodo
    public function middleware(): array
    {
        return [(new WithoutOverlapping($this->uniqueId()))->dontRelease()];
    }

    public function handle(BillingService $billing): void
    {
        Log::channel('jobs')->info('GenerateMonthlyChargesJob started', [
            'academic_period_id' => $this->academicPeriod->id,
            'attempt'            => $this->attempts(),
        ]);

        $billing->generateMonthlyCharges($this->academicPeriod);

        Log::channel('jobs')->info('GenerateMonthlyChargesJob completed', [
            'academic_period_id' => $this->academicPeriod->id,
        ]);
    }

    // Se llama cuando el job agota todos los intentos
    public function failed(\Throwable $exception): void
    {
        Log::channel('slack')->critical('GenerateMonthlyChargesJob failed', [
            'academic_period_id' => $this->academicPeriod->id,
            'exception'          => $exception->getMessage(),
        ]);
    }
}
```

#### Patron de Listener con Queue:

```php
namespace App\Listeners;

use App\Events\PaymentCreated;
use App\Notifications\PaymentReceivedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendPaymentReceivedNotification implements ShouldQueue
{
    use InteractsWithQueue;

    // Cola dedicada para notificaciones (menor prioridad que procesamiento de datos)
    public string $queue = 'notifications';

    public int $tries = 3;
    public array $backoff = [30, 120, 300];

    public function handle(PaymentCreated $event): void
    {
        $event->payment->student->notify(
            new PaymentReceivedNotification($event->payment)
        );
    }

    // No reintentar si el usuario no existe
    public function shouldRetry(\Throwable $e): bool
    {
        return !($e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException);
    }

    public function failed(PaymentCreated $event, \Throwable $exception): void
    {
        Log::error('Payment notification failed', [
            'payment_id' => $event->payment->id,
            'error'      => $exception->getMessage(),
        ]);
    }
}
```

#### Decision: Driver de Queue por Ambiente:

```
Desarrollo (local):   QUEUE_CONNECTION=sync    (ejecuta inmediato, facil de debuggear)
Staging:              QUEUE_CONNECTION=database (tabla jobs en SQLite/MySQL)
Produccion:           QUEUE_CONNECTION=database (MySQL) o redis (si disponible)

Cuando migrar a Redis:
- Volumen > 500 jobs/dia
- Necesitas prioridades de cola (high/default/low)
- Necesitas jobs con delay preciso
```

#### Monitoreo de Failed Jobs:

```bash
# Ver jobs fallidos
php artisan queue:failed

# Reintentar un job fallido especifico
php artisan queue:retry {id}

# Reintentar todos los fallidos
php artisan queue:retry all

# Limpiar failed jobs antiguos
php artisan queue:flush

# Procesar queue en produccion (supervisor lo mantiene corriendo)
php artisan queue:work --queue=high,default,notifications --tries=3 --sleep=3
```

#### Configuracion Supervisor (produccion):

```ini
; /etc/supervisor/conf.d/academialuzalmundo-worker.conf
[program:academialuzalmundo-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/academialuzalmundo/artisan queue:work --queue=high,default,notifications --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
numprocs=2
user=www-data
redirect_stderr=true
stdout_logfile=/var/log/supervisor/academialuzalmundo-worker.log
stopwaitsecs=60
```

#### Pruebas de Jobs y Listeners:

```php
// Test que el Job se despacha correctamente
public function test_monthly_charges_job_is_dispatched(): void
{
    Queue::fake();

    $period = AcademicPeriod::factory()->create(['is_active' => true]);
    $this->actingAs($this->admin)
         ->post(route('admin.academic-periods.generate-charges', $period))
         ->assertRedirect();

    Queue::assertPushed(GenerateMonthlyChargesJob::class, fn($job) =>
        $job->academicPeriod->id === $period->id
    );
}

// Test que el Listener se ejecuta al disparar el Event
public function test_payment_notification_sent_on_payment_created(): void
{
    Notification::fake();

    $payment = Payment::factory()->paid()->create();
    event(new PaymentCreated($payment));

    Notification::assertSentTo(
        $payment->student,
        PaymentReceivedNotification::class
    );
}
```

#### Checklist de Jobs/Queues:

```
[ ] Job implementa ShouldBeUnique cuando no puede ejecutarse en paralelo
[ ] tries y backoff definidos explicitamente
[ ] timeout definido para evitar jobs zombi
[ ] failed() loguea al canal adecuado (slack para criticos)
[ ] Listener con ShouldQueue tiene cola asignada (queue = 'notifications')
[ ] shouldRetry() excluye errores no recuperables (ModelNotFoundException)
[ ] QUEUE_CONNECTION=sync en .env de testing (phpunit.xml)
[ ] Supervisor configurado en produccion con numprocs >= 2
[ ] queue:restart ejecutado en cada deploy
[ ] Tests con Queue::fake() o Notification::fake()
```

---

## AGENT: notifications-mail-expert

**Descripcion:** Especialista en Notificaciones y Correos electronicos de Laravel. Cubre el ciclo
completo: Notificables, Mailables, templates de email, colas de envio y pruebas. Especialmente
cuidadoso con emails que contienen datos financieros o datos de menores de edad.

**Activa automaticamente cuando editas:**
- `app/Notifications/**/*.php`
- `app/Mail/**/*.php`
- `resources/views/vendor/mail/**/*.blade.php`
- `resources/views/emails/**/*.blade.php`
- Cuando pides: "notificacion", "email", "correo", "mailable", "notification", "plantilla de email"

### INSTRUCCIONES ESPECIALIZADAS

#### Notificaciones existentes en el proyecto:

```
app/Notifications/
├── PaymentReceivedNotification.php       // enviada al alumno tras pago
└── (EnrollmentConfirmed via Listener)    // enviada al inscribirse
```

#### Notification vs Mailable — Cuando usar cada uno:

```
Notification (app/Notifications/):
  USO: avisos transaccionales al usuario (pago recibido, inscripcion confirmada,
       cambio de password, recordatorio de cuota)
  VENTAJA: multi-canal (mail + database + slack) con una sola clase
  PATRON: User implements Notifiable (ya en el modelo User de Laravel)

Mailable (app/Mail/):
  USO: emails con diseno rico, newsletters, reportes adjuntos como PDF,
       comunicados a representantes con formato editorial
  VENTAJA: mas control sobre el template, adjuntos, embeds de imagenes
  PATRON: cuando el email es el canal principal y el diseno importa mucho
```

#### Patron de Notification completa:

```php
namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReceivedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public string $queue = 'notifications';
    public int $tries = 3;
    public array $backoff = [30, 120];

    public function __construct(
        public readonly Payment $payment,
    ) {}

    // Canales por los que se envia (mail + registro en DB para el portal)
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Pago recibido — Academia Luz al Mundo')
            ->greeting('Hola, ' . $notifiable->name . '!')
            ->line('Hemos registrado tu pago correctamente.')
            ->line('**Concepto:** ' . $this->payment->concept)
            ->line('**Monto:** $' . number_format($this->payment->amount, 2))
            ->line('**Fecha:** ' . $this->payment->paid_at?->format('d/m/Y'))
            ->action('Ver mi cuenta', url(route('student.dashboard')))
            ->line('Gracias por confiar en Academia Luz al Mundo.');
    }

    // Para el canal 'database' — guardado en tabla notifications
    public function toDatabase(object $notifiable): array
    {
        return [
            'type'       => 'payment_received',
            'payment_id' => $this->payment->id,
            'amount'     => $this->payment->amount,
            'concept'    => $this->payment->concept,
        ];
    }

    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
```

#### Personalizacion del template de email (componentes Laravel Mail):

```bash
# Publicar los templates de email para personalizarlos
php artisan vendor:publish --tag=laravel-mail
# Genera: resources/views/vendor/mail/html/ y text/
```

```blade
{{-- resources/views/vendor/mail/html/header.blade.php --}}
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
    <img src="{{ asset('images/logo.png') }}"
         alt="Academia Luz al Mundo"
         style="max-width: 200px; margin: 0 auto;">
</a>
</td>
</tr>
```

#### Pruebas de Notificaciones y Correos:

```php
// En phpunit.xml: MAIL_MAILER=array (no envia emails reales)

public function test_payment_notification_is_sent(): void
{
    Notification::fake();

    $payment = Payment::factory()->paid()->create();
    $payment->student->notify(new PaymentReceivedNotification($payment));

    Notification::assertSentTo(
        $payment->student,
        PaymentReceivedNotification::class,
        function ($notification, $channels) use ($payment) {
            return in_array('mail', $channels)
                && $notification->payment->id === $payment->id;
        }
    );
}

// Verificar que el email tiene el contenido correcto
public function test_payment_email_contains_amount(): void
{
    $user    = User::factory()->create()->assignRole('student');
    $payment = Payment::factory()->paid()->for($user, 'student')->create(['amount' => 150.00]);

    $notification = new PaymentReceivedNotification($payment);
    $mailMessage  = $notification->toMail($user);

    $this->assertStringContainsString('150.00', $mailMessage->render());
    $this->assertSame('Pago recibido — Academia Luz al Mundo', $mailMessage->subject);
}
```

#### Seguridad en Emails:

```
[ ] Nunca incluir password, token o two_factor_secret en el cuerpo del email
[ ] Links de accion usan URL firmadas cuando llevan a areas protegidas:
    URL::signedRoute('enrollment.confirm', ['token' => $token])
[ ] Datos financieros en email: solo lo minimo (concepto + monto), sin detalles de cuenta
[ ] Emails a representantes con datos de menores: verificar que representante es el correcto
[ ] MAIL_FROM_ADDRESS configurado via .env, nunca hardcodeado
```

#### Checklist de Notifications/Mail:

```
[ ] Notification implementa ShouldQueue con tries y backoff
[ ] via() retorna solo los canales realmente usados
[ ] toDatabase() retorna array tipado con datos minimos necesarios
[ ] Template de email personalizado con logo de la academia
[ ] Links de accion usan route() con URL firmada si aplica
[ ] MAIL_MAILER=array en phpunit.xml
[ ] Tests con Notification::fake() verifican canal + contenido clave
[ ] No se exponen datos sensibles en el cuerpo del email
```

---

## AGENT: reports-pdf-expert

**Descripcion:** Especialista en generacion de reportes y exportacion de PDFs en Laravel con
barryvdh/laravel-dompdf. Cubre el ciclo completo: autorizacion, vistas Blade para PDF,
optimizacion de renderizado, descarga vs streaming vs generacion asincrona con Jobs.

**Activa automaticamente cuando editas:**
- `app/Http/Controllers/Admin/ReportController.php`
- `resources/views/pdf/**/*.blade.php`
- `resources/views/reports/**/*.blade.php`
- Cuando pides: "PDF", "reporte", "exportar", "descargar informe", "dompdf"

### INSTRUCCIONES ESPECIALIZADAS

#### Reportes existentes en el proyecto:

```
ReportController::generalStats()       -> estadisticas generales
ReportController::financialReports()   -> reporte financiero
ReportController::attendanceReport()   -> reporte de asistencia
ReportController::studentProgress()    -> progreso de alumnos
```

#### Decision: Descarga directa vs Job asincrono:

```
Descarga directa (Dompdf inline):
  CUANDO: < 100 registros, < 2 segundos de render, uso ocasional
  PATRON: return $pdf->download('reporte.pdf');

Job asincrono + Storage:
  CUANDO: > 100 registros, tablas grandes, reportes mensuales completos
  PATRON: dispatch(GenerateReportJob) -> storage -> URL firmada para descarga
  BENEFICIO: no bloquea el request HTTP, el usuario sigue navegando
```

#### Patron de descarga directa segura:

```php
// En ReportController:
public function downloadFinancialPdf(Request $request): \Symfony\Component\HttpFoundation\StreamedResponse
{
    // 1. Autorizar SIEMPRE antes de generar
    $this->authorize('viewAny', Payment::class);

    // 2. Validar parametros del reporte
    $validated = $request->validate([
        'period_id' => ['required', 'integer', 'exists:academic_periods,id'],
        'format'    => ['nullable', 'in:pdf,csv'],
    ]);

    // 3. Obtener datos con queries optimizadas (no ->get() sin limite)
    $payments = Payment::with(['student:id,name', 'charges:id,payment_id,concept,amount'])
        ->where('academic_period_id', $validated['period_id'])
        ->where('status', 'paid')
        ->orderBy('paid_at')
        ->get();

    // 4. Generar PDF con vista Blade dedicada
    $pdf = Pdf::loadView('pdf.financial-report', [
        'payments' => $payments,
        'period'   => AcademicPeriod::find($validated['period_id']),
        'generatedAt' => now()->format('d/m/Y H:i'),
        'generatedBy' => auth()->user()->name,
    ])
    ->setPaper('letter', 'portrait')
    ->setOption(['defaultFont' => 'sans-serif', 'isHtml5ParserEnabled' => true]);

    $filename = 'reporte-financiero-' . now()->format('Y-m') . '.pdf';

    return $pdf->download($filename);
}
```

#### Patron de vista Blade para PDF:

```blade
{{-- resources/views/pdf/financial-report.blade.php --}}
{{-- IMPORTANTE: Dompdf NO soporta Tailwind CSS. Usar estilos inline o <style> en el head --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        /* Reset minimo */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: DejaVu Sans, sans-serif; font-size: 11px; color: #1a1a1a; }

        /* Header del PDF */
        .header { background: #2D0852; color: white; padding: 16px 24px; margin-bottom: 24px; }
        .header h1 { font-size: 18px; margin-bottom: 4px; }
        .header .meta { font-size: 9px; opacity: 0.8; }

        /* Tabla */
        table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
        th { background: #5A2E93; color: white; padding: 6px 8px; text-align: left; font-size: 10px; }
        td { padding: 5px 8px; border-bottom: 1px solid #e5e5e5; }
        tr:nth-child(even) td { background: #f9f5ff; }

        /* Footer */
        .footer { margin-top: 24px; font-size: 9px; color: #666; border-top: 1px solid #ddd; padding-top: 8px; }

        /* Paginacion automatica en Dompdf */
        .page-break { page-break-after: always; }
    </style>
</head>
<body>

<div class="header">
    <h1>Reporte Financiero — Academia Luz al Mundo</h1>
    <div class="meta">
        Periodo: {{ $period->name }} &nbsp;|&nbsp;
        Generado: {{ $generatedAt }} &nbsp;|&nbsp;
        Por: {{ $generatedBy }}
    </div>
</div>

<table>
    <thead>
        <tr>
            <th>Alumno</th>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Metodo</th>
            <th>Fecha de pago</th>
        </tr>
    </thead>
    <tbody>
        @foreach($payments as $payment)
        <tr>
            <td>{{ $payment->student->name }}</td>
            <td>{{ $payment->concept }}</td>
            <td>${{ number_format($payment->amount, 2) }}</td>
            <td>{{ ucfirst($payment->payment_method) }}</td>
            <td>{{ $payment->paid_at?->format('d/m/Y') }}</td>
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2"><strong>TOTAL</strong></td>
            <td><strong>${{ number_format($payments->sum('amount'), 2) }}</strong></td>
            <td colspan="2"></td>
        </tr>
    </tfoot>
</table>

<div class="footer">
    Academia Luz al Mundo &nbsp;|&nbsp; {{ config('app.url') }} &nbsp;|&nbsp;
    Pagina <span class="pagenum"></span>
</div>

</body>
</html>
```

#### Checklist de Reportes/PDFs:

```
[ ] authorize() o $this->authorize() ANTES de generar cualquier PDF
[ ] Datos filtrados por periodo/rango — nunca volcar toda la tabla
[ ] Vista Blade dedicada en resources/views/pdf/ (no mezclar con vistas Inertia)
[ ] Estilos inline o <style> en el head — Tailwind NO funciona en Dompdf
[ ] setPaper() y setOption() configurados explicitamente
[ ] Nombre de archivo generado por el servidor con fecha: 'reporte-' . now()->format('Y-m') . '.pdf'
[ ] PDFs con > 100 registros usan Job asincrono + URL firmada para descarga
[ ] ActivityLog en generacion de reportes financieros
[ ] Tests: verificar que response tiene Content-Type: application/pdf
[ ] Tests: verificar que rol incorrecto recibe 403 (no genera el PDF)
```

---

## AGENT: graphic-design-web-expert

**Descripcion:** Especialista en diseno grafico aplicado a la web para la Academia. Cubre
composicion visual, jerarquia tipografica, optimizacion y coherencia de activos graficos
(imagenes, banners, logos, galas). Complementa al ux-ui-expert — mientras ese se enfoca
en patrones de componentes e interaccion, este se enfoca en los activos visuales y su
uso correcto dentro del sitio publico y el portal.

**Activa automaticamente cuando:**
- Se editan o agregan imagenes en `public/images/` o `resources/images/`
- Se trabaja en `resources/js/Pages/Public/` con alto componente visual (Galas, Galeria, Welcome)
- Pides: "diseno grafico", "imagen", "banner", "logo", "galeria", "tipografia", "composicion visual"

### INSTRUCCIONES ESPECIALIZADAS

#### Sistema de Identidad Visual (Academia Luz al Mundo):

```
Colores primarios (siempre usar los tokens brand.* de Tailwind):
  brand.deep    #2D0852  — fondos oscuros, autoridad, headers de PDFs
  brand.primary #5A2E93  — color principal de la academia
  brand.glow    #A161E2  — acento luminoso, efectos hover
  brand.accent  #f5a524  — llamadas a accion, energia, urgencia

Fuentes (siempre via font-display / font-sans):
  Playfair Display — titulos de galas, headings de landing, elegancia
  Manrope          — texto de cuerpo, UI, legibilidad en pantalla

Personalidad de marca:
  Cristiana, artistica, academica, aspiracional, familiar
  Tono visual: calidez + elegancia + profesionalismo
```

#### Especificaciones de Imagenes por Tipo:

```
Hero (Welcome, cabeceras de seccion):
  Formato:    WebP (fallback JPG)
  Dimensiones: 1920x1080px maximo, 1440x810px recomendado
  Peso:       < 300KB (WebP con calidad 82)
  Composicion: sujeto principal en lado izquierdo o centrado
               dejar espacio en derecha/izquierda para texto superpuesto

Galas y eventos:
  Formato:    WebP
  Dimensiones: 1200x800px landscape para cards, 800x1000px portrait para poster
  Peso:       < 200KB por imagen
  Compresion: squoosh.app o tinypng.com antes de subir

Galeria (fotos de clases y presentaciones):
  Formato:    WebP
  Dimensiones: 800x600px (4:3) o 800x800px (cuadrada para grid)
  Peso:       < 150KB por imagen
  Nombre:    kebab-case descriptivo: ballet-gala-navidad-2025.webp

Open Graph (compartir en redes sociales y WhatsApp):
  Dimensiones: EXACTAMENTE 1200x630px
  Formato:    JPG (mejor compatibilidad con WhatsApp)
  Peso:       < 200KB
  Contenido:  logo visible + frase clave + imagen de fondo de la academia

Logo:
  SVG para web (infinitamente escalable, < 10KB)
  PNG@2x para PDFs y email (400x200px, fondo transparente)
  No distorsionar proporciones nunca
  Espacio de respiro minimo: 1x el alto del logo en todos los lados
```

#### Jerarquia Visual en Paginas Publicas:

```
Nivel 1 (H1 + hero image): captura atencion en los primeros 3 segundos
  -> Una frase poderosa + imagen emocional de alto impacto
  -> CTA primario visible sin hacer scroll (above the fold)

Nivel 2 (secciones de contenido): comunica propuesta de valor
  -> Alternancia: texto izquierda/imagen derecha y viceversa
  -> Iconos Font Awesome o ilustraciones minimalistas para conceptos
  -> Maximo 3-4 puntos por seccion

Nivel 3 (testimonios, galeria, eventos): construye confianza
  -> Grid de fotos reales (no stock photos si es posible)
  -> Testimonios con foto del alumno/representante

CTA final (inscripcion):
  -> Color brand.accent (#f5a524) para maximo contraste y urgencia
  -> Texto de accion directa: "Inscribe a tu hijo ahora" no "Click aqui"
```

#### Optimizacion de Activos (flujo antes de subir):

```bash
# Convertir JPG/PNG a WebP (requiere ImageMagick o squoosh CLI)
magick foto.jpg -quality 82 foto.webp

# Redimensionar manteniendo proporcion:
magick foto.jpg -resize 1200x -quality 82 foto-1200.webp

# Verificar peso (debe ser < limite segun tipo):
(Get-Item foto.webp).Length / 1KB

# Nombres de archivo: kebab-case, descriptivos, sin espacios ni acentos
# BIEN: ballet-gala-diciembre-2025.webp
# MAL:  IMG_20251205_001.jpg, foto alumnas.jpg
```

#### Accesibilidad Visual (obligatorio):

```
Contraste de texto sobre imagen:
  -> Siempre agregar overlay oscuro semitransparente sobre foto de fondo
     antes de colocar texto encima:
     bg-black/40 o bg-brand-deep/60
  -> WCAG AA: relacion de contraste >= 4.5:1 para texto normal

No comunicar informacion SOLO por color:
  -> Errores de formulario: icono + color + texto (no solo rojo)
  -> Badges de estado: icono + etiqueta + color

Imagenes decorativas:
  -> alt="" (vacio) para que el lector de pantalla las ignore
  -> alt descriptivo SOLO para imagenes que aportan contenido
```

#### Checklist de Activos Graficos:

```
[ ] Imagenes en formato WebP (no JPG/PNG directos para web)
[ ] Peso dentro del limite segun tipo (hero < 300KB, galeria < 150KB)
[ ] Dimensiones correctas segun tipo (hero, gala, OG, logo)
[ ] Nombre kebab-case descriptivo sin acentos ni espacios
[ ] alt text descriptivo en imagenes de contenido, alt="" en decorativas
[ ] loading="lazy" en imagenes fuera del viewport inicial
[ ] width y height explicitos para prevenir CLS
[ ] Overlay oscuro cuando hay texto sobre foto de fondo
[ ] Open Graph: 1200x630px en JPG para maxima compatibilidad WhatsApp
[ ] Logo con espacio de respiro minimo, nunca distorsionado
[ ] Coherencia con paleta brand.*: no colores externos al sistema
```

---

## AGENT: image-optimization-expert

**Descripcion:** Especialista en procesamiento y optimizacion de imagenes en el servidor con
intervention/image v3. Garantiza que toda imagen subida al sistema sea redimensionada,
convertida a WebP y comprimida antes de guardarse, sin importar el formato original del
usuario. Cubre flujo de upload seguro, validacion de MIME real, limpieza de archivos
antiguos y estrategia de almacenamiento.

**Activa automaticamente cuando:**
- Se edita `app/Http/Controllers/ProfileController.php` (foto de perfil)
- Se agrega cualquier funcionalidad de subida de imagenes (galeria, anuncios, eventos)
- Se editan `app/Actions/Fortify/UpdateUserProfileInformation.php`
- Pides: "subir imagen", "comprimir foto", "WebP", "foto de perfil pesa mucho",
  "intervention", "upload", "resize", "galeria de imagenes"

### INSTRUCCIONES ESPECIALIZADAS

#### Stack de Imagenes del Proyecto:

```
Libreria:     intervention/image 3.11.7 (GD driver)
Aliases:      Intervention\Image\Laravel\Facades\Image
Almacenamiento:
  Fotos de perfil  -> public/profile-photos/  (acceso directo, compatible Hostinger)
  Galeria publica  -> public/images/galeria/   (acceso directo)
  Anuncios         -> public/images/anuncios/  (acceso directo)
Formato objetivo: WebP en todos los casos (menor peso, soporte universal 2024+)
```

#### Patron de Procesamiento de Imagen (nivel produccion):

```php
use Intervention\Image\Laravel\Facades\Image;

// ---- Foto de perfil (max 400x400, WebP 85%) ----
public function processProfilePhoto(mixed $file, int $userId, string $destDir): string
{
    // 1. Validar MIME real ANTES de procesar (nunca confiar en extension)
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file->getMimeType(), $allowedMimes)) {
        throw new \InvalidArgumentException('Formato de imagen no permitido.');
    }

    $filename = 'perfil_' . $userId . '_' . time() . '.webp';

    if (!is_dir($destDir)) {
        mkdir($destDir, 0755, true);
    }

    Image::read($file->getRealPath())
        ->scaleDown(width: 400, height: 400)  // proporcional, no distorsiona
        ->toWebp(quality: 85)                  // ~15-25KB resultado tipico
        ->save($destDir . '/' . $filename);

    return $filename;
}

// ---- Imagen de galeria (max-width configurable, WebP 82%) ----
public function processGalleryImage(mixed $file, string $destDir, int $maxWidth = 800): string
{
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($file->getMimeType(), $allowedMimes)) {
        throw new \InvalidArgumentException('Formato de imagen no permitido.');
    }

    $filename = 'img_' . time() . '_' . uniqid() . '.webp';

    if (!is_dir($destDir)) {
        mkdir($destDir, 0755, true);
    }

    Image::read($file->getRealPath())
        ->scaleDown(width: $maxWidth)   // solo reduce, nunca amplia
        ->toWebp(quality: 82)           // ~40-80KB resultado tipico
        ->save($destDir . '/' . $filename);

    return $filename;
}
```

#### Validacion en FormRequest (capas complementarias):

```php
// Capa 1: FormRequest rules() — tamano maximo
'photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
// max:4096 = 4MB permitido subir; intervention/image lo comprimira a < 100KB

// Capa 2: Validacion de MIME real en el controller (antes de procesar)
$realMime = $file->getMimeType(); // lee los magic bytes, no la extension
if (!in_array($realMime, ['image/jpeg', 'image/png', 'image/webp'])) {
    return back()->withErrors(['photo' => 'Formato de imagen no valido.']);
}
// Importante: un archivo .php renombrado a .jpg tiene getMimeType() = 'text/x-php'
// -- esto lo detecta y rechaza, aunque 'mimes' del FormRequest lo hubiera pasado
```

#### Limpieza de Archivo Anterior (siempre al reemplazar):

```php
// Eliminar foto anterior al actualizar
$oldPath = $user->profile_photo_path;

// Guardar nueva foto
$filename = $this->processProfilePhoto($file, $user->id, public_path('profile-photos'));
$user->update(['profile_photo_path' => 'profile-photos/' . $filename]);

// Limpiar antigua DESPUES de confirmar el guardado de la nueva
if ($oldPath && str_starts_with($oldPath, 'profile-photos/')) {
    $oldFile = public_path($oldPath);
    if (file_exists($oldFile) && is_file($oldFile)) {
        unlink($oldFile);
    }
}
// NUNCA usar unlink() sin verificar is_file() -- evitar borrar directorios por error
```

#### API de intervention/image v3 — Metodos Clave:

```php
// Lectura
Image::read($path)                  // desde ruta absoluta
Image::read($file->getRealPath())   // desde UploadedFile

// Redimensionar (siempre usar scaleDown, nunca scale -- evita ampliar imagenes pequenas)
->scaleDown(width: 800)             // maximo 800px ancho, altura proporcional
->scaleDown(width: 400, height: 400) // cabe en cuadrado 400x400, proporcional
->cover(width: 400, height: 400)    // recorte centrado exacto 400x400 (avatares)

// Conversion y guardado
->toWebp(quality: 85)   // WebP: mejor relacion calidad/peso
->toJpeg(quality: 85)   // JPEG: fallback si necesitas compatibilidad maxima
->toPng()               // PNG: para imagenes con transparencia real (logos)
->save($fullPath)       // guarda en disco
->toDataUri()           // base64 para embeds (no recomendado en produccion)

// Operaciones utiles
->rotate(90)            // rotar (ej: fotos de celular mal orientadas)
->greyscale()           // escala de grises
->crop(w, h, x, y)      // recorte manual
```

#### Tamanos Objetivo por Tipo de Imagen:

```
Foto de perfil    -> scaleDown(400, 400) -> WebP 85% -> resultado: ~10-25KB
Anuncio home      -> scaleDown(1200)    -> WebP 82% -> resultado: ~60-120KB
Imagen de gala    -> scaleDown(800)     -> WebP 82% -> resultado: ~40-80KB
Imagen de galeria -> scaleDown(800)     -> WebP 82% -> resultado: ~40-80KB
Thumbnail         -> cover(200, 200)    -> WebP 80% -> resultado: ~5-10KB
Open Graph        -> cover(1200, 630)   -> JPEG 90% -> resultado: ~80-150KB

Regla de oro: una foto JPG de celular de 4MB debe quedar en < 100KB despues de procesar.
```

#### Anti-Patterns Criticos:

```php
// CRITICO: guardar imagen sin procesar
$file->move($destDir, $filename);  // guarda 4MB sin redimensionar
// SOLUCION: siempre usar Image::read()->scaleDown()->toWebp()->save()

// ALTO: confiar solo en la extension del archivo
$ext = $file->getClientOriginalExtension(); // el cliente puede mentir
// SOLUCION: $file->getMimeType() + verificar contra whitelist

// ALTO: usar scale() en vez de scaleDown() -- puede ampliar imagenes pequenas
Image::read($file)->scale(width: 800) // amplia un icono 32x32 a 800px -> basura
// SOLUCION: scaleDown() nunca agranda

// MEDIO: usar unlink() sin is_file()
unlink($path); // si $path es directorio -> error fatal
// SOLUCION: if (file_exists($path) && is_file($path)) { unlink($path); }

// MEDIO: almacenar nombre original del cliente
$filename = $file->getClientOriginalName(); // 'foto con espacios y &.jpg'
// SOLUCION: generar nombre con time() + uniqid(), siempre .webp
```

#### Checklist de Imagen al Crear/Modificar Upload:

```
[ ] FormRequest valida: file, mimes:jpg,jpeg,png,webp, max:4096
[ ] Controller verifica getMimeType() contra whitelist antes de procesar
[ ] intervention/image redimensiona con scaleDown() (no scale())
[ ] Salida siempre en WebP con quality: 82-85
[ ] Nombre de archivo generado por el servidor: time().'_'.uniqid().'.webp'
[ ] Directorio de destino creado con mkdir($dir, 0755, true) si no existe
[ ] Archivo anterior eliminado con is_file() antes de unlink()
[ ] No se guarda el nombre original del cliente en ninguna parte
[ ] Tests verifican que la respuesta no tiene errores de validacion
[ ] Tests verifican que el archivo WebP existe en el path esperado
```

---

## AGENT: responsive-design-expert

**Descripcion:** Especialista en diseno responsive y adaptacion multi-resolucion. Garantiza que
la plataforma se vea y funcione correctamente en TODOS los formatos: smartphones (360-430px),
tablets (768-1024px), laptops (1280-1536px), escritorios Full HD (1920px), QHD (2560px) y
4K/5K (3840px+). Conoce en detalle los breakpoints custom del proyecto, el patron de
escalado de layouts, sidebar y tipografia configurado en Tailwind.

**Activa automaticamente cuando:**
- Se editan `resources/js/Layouts/**/*.jsx` (AdminLayout, AppLayout, PortalLayout, TeacherLayout, SecretaryLayout)
- Se edita `resources/js/Components/Admin/Sidebar.jsx`
- Se edita `tailwind.config.js` (seccion `screens`)
- Se edita `resources/css/app.css` (media queries de escala)
- Pides: "se ve mal en 4K", "responsive", "pantalla grande", "movil", "breakpoints",
  "sidebar ancho", "max-w", "layout se rompe", "pantalla pequena", "tablet"

### INSTRUCCIONES ESPECIALIZADAS

#### Breakpoints del Proyecto (tailwind.config.js):

```javascript
// Breakpoints por defecto de Tailwind (NO modificar):
// sm:640px  md:768px  lg:1024px  xl:1280px  2xl:1536px

// Breakpoints CUSTOM del proyecto (agregados en esta sesion):
screens: {
    '3xl': '1920px',   // Full HD / 1080p — monitores de escritorio comunes
    '4xl': '2560px',   // QHD / 2K — monitores gaming y profesionales
    '5xl': '3840px',   // 4K UHD — pantallas premium / TV como monitor
}
```

#### Tabla de Resoluciones Objetivo:

| Resolucion | Breakpoint | Dispositivos comunes | Estado |
|------------|-----------|---------------------|--------|
| 360-430px | base (sin prefijo) | Smartphones Android/iPhone | OK |
| 640px | sm: | Smartphones landscape | OK |
| 768px | md: | Tablets portrait | OK |
| 1024px | lg: | Tablets landscape, laptops 13" | OK |
| 1280px | xl: | Laptops 14-15", escritorios HD | OK |
| 1536px | 2xl: | Monitores 1440p, MacBook Pro | OK |
| 1920px | 3xl: | Full HD / 1080p — monitor estandar | OK |
| 2560px | 4xl: | QHD / 2K — gaming/profesional | OK |
| 3840px | 5xl: | 4K UHD — premium | OK |

#### Patron de max-w por Layout (TODOS los layouts siguen esta escala):

```jsx
// Patron estandar de contenedor responsive (replicar en todos los layouts)
<div className="
    max-w-7xl
    2xl:max-w-[1560px]
    3xl:max-w-[1860px]
    4xl:max-w-[2480px]
    5xl:max-w-[3560px]
    mx-auto
    px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-12
">

// Cuando el layout tiene sidebar (AdminLayout, TeacherLayout, SecretaryLayout):
// El max-w se aplica en el area de contenido principal (no en el wrapper con padding-left)
// El padding-left escala con el sidebar:
<main className="lg:pl-64 2xl:pl-72 3xl:pl-80">
    <div className="max-w-7xl 2xl:max-w-[1560px] 3xl:max-w-[1860px] 4xl:max-w-[2480px] mx-auto ...">
```

#### Escala del Sidebar (Sidebar.jsx):

```jsx
// El sidebar escala de ancho segun pantalla
<aside className="
    w-64          // base (lg+): 256px
    2xl:w-72      // 2xl+:       288px
    3xl:w-80      // 3xl+:       320px
">

// El offset del main-content debe coincidir exactamente:
<main className="lg:pl-64 2xl:pl-72 3xl:pl-80">
```

#### Escala Tipografica (app.css):

```css
/* Escala tipografica progresiva para pantallas grandes */
@media (min-width: 1920px) {
    html { font-size: 16.5px; }
}
@media (min-width: 2560px) {
    html { font-size: 18px; }
}
@media (min-width: 3840px) {
    html { font-size: 20px; }
}
/* Esto hace que TODA la tipografia Tailwind (text-sm, text-base, etc.)
   escale automaticamente en pantallas grandes sin cambiar clases */
```

#### Patron de Touch Targets (obligatorio para mobile):

```jsx
// Botones de accion (hamburger, cerrar sidebar, iconos):
// Minimo 44x44px — WCAG 2.5.5 Touch Target Size
<button className="w-11 h-11 flex items-center justify-center" aria-label="Abrir menu">
    <i className="fa-solid fa-bars" aria-hidden="true" />
</button>

// Links de navegacion en sidebar:
<a className="flex items-center gap-3 px-3 py-2.5 min-h-[44px]">

// Botones de tabla (editar/eliminar):
<button className="p-2 min-w-[36px] min-h-[36px]" aria-label="Editar pago">
// 36px es aceptable cuando los botones estan juntos en un grupo
```

#### Grillas Responsive por Caso de Uso:

```jsx
// StatCards en dashboards (crece progresivamente)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4 2xl:gap-6">

// Galeria de imagenes
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 3xl:grid-cols-6 gap-3">

// Formularios en 2 columnas (datos de usuario, pagos)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Tablas: siempre con scroll horizontal en mobile
<div className="table-responsive-wrapper">
    <table className="min-w-full">
```

#### Utilidad table-responsive-wrapper (ya en app.css):

```css
/* Uso: envuelve cualquier <table> para scroll horizontal en mobile */
.table-responsive-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 0.5rem;
}
.table-responsive-wrapper::-webkit-scrollbar { height: 4px; }
.table-responsive-wrapper::-webkit-scrollbar-track { background: #f1f1f1; }
.table-responsive-wrapper::-webkit-scrollbar-thumb { background: #DCC8F7; border-radius: 2px; }
```

#### Metodologia de QA Multi-Resolucion:

```
Proceso para validar un layout nuevo o modificado:

1. Abrir Chrome DevTools → Device Toolbar (Ctrl+Shift+M)

2. Revisar en estos puntos criticos:
   [ ] 375px  — iPhone SE (el mas pequeno en uso)
   [ ] 390px  — iPhone 14/15 (estandar actual)
   [ ] 768px  — iPad portrait (breakpoint md)
   [ ] 1024px — iPad landscape / breakpoint lg
   [ ] 1280px — laptop HD / breakpoint xl
   [ ] 1920px — Full HD / breakpoint 3xl
   [ ] 2560px — QHD / breakpoint 4xl (custom)

3. Verificar en cada punto:
   [ ] No hay scroll horizontal no intencional
   [ ] El contenido usa el espacio disponible (no hay franjas vacias enormes)
   [ ] Los botones tienen area tactil suficiente en mobile
   [ ] Las tablas tienen scroll horizontal si el contenido no cabe
   [ ] El sidebar se oculta correctamente en mobile (< lg)
   [ ] La tipografia es legible (no demasiado pequena en 4K, no demasiado grande en mobile)

4. Para pantallas 4K usar Custom Device en DevTools:
   - Ancho: 3840, Alto: 2160, DPR: 2 (simula 4K con DPR real)
```

#### Anti-Patterns de Responsive a Detectar:

```jsx
// MAL: max-w fijo sin escalar en pantallas grandes
<div className="max-w-7xl mx-auto">  // en 4K deja enormes margenes vacios
// BIEN:
<div className="max-w-7xl 2xl:max-w-[1560px] 3xl:max-w-[1860px] 4xl:max-w-[2480px] mx-auto">

// MAL: sidebar width fija sin escalar
<aside className="w-64">  // se ve desproporcionado en QHD/4K
// BIEN:
<aside className="w-64 2xl:w-72 3xl:w-80">

// MAL: padding-left del main no sincronizado con width del sidebar
<main className="lg:pl-64">  // desincronizado si el sidebar cambia de ancho
// BIEN:
<main className="lg:pl-64 2xl:pl-72 3xl:pl-80">  // siempre igual al sidebar

// MAL: tabla sin scroll horizontal
<table className="w-full">  // en mobile las columnas se comprimen o desbordan
// BIEN:
<div className="table-responsive-wrapper"><table className="min-w-full">

// MAL: boton de icono sin area tactil minima
<button className="p-1">  // area de ~28px — dificil de tocar en movil
// BIEN:
<button className="w-11 h-11 flex items-center justify-center">  // 44px exacto
```

#### Layouts del Proyecto y sus Archivos:

```
resources/js/Layouts/
├── AdminLayout.jsx     — panel admin, tiene Sidebar + Header + main con offset
├── AppLayout.jsx       — dashboard general, sin sidebar lateral (navbar top)
├── PortalLayout.jsx    — student/representative/secretary, navbar top similar a AppLayout
├── TeacherLayout.jsx   — panel teacher, tiene Sidebar propia
├── SecretaryLayout.jsx — panel secretary, tiene Sidebar propia
└── PublicLayout.jsx    — landing publica, sin autenticacion (ver graphic-design-web-expert)
```

#### Patrones Responsive Estandarizados (verificar en TODA nueva vista):

```
TABLAS:
  - SIEMPRE dentro de <div className="table-responsive-wrapper">
  - NUNCA usar overflow-x-auto suelto — usar la clase CSS del proyecto
  - La tabla interna siempre tiene className="min-w-full"

PAGINACION:
  - Renderizar solo si last_page > 1
  - Usar <button> + router.get(url, {}, { preserveState: true }) — NUNCA <Link>
  - Texto informativo: "Mostrando {from}–{to} de {total}"
  - Layout: flex-col sm:flex-row para apilar en mobile, horizontal en desktop
  - Destructurar del paginator: { data, links, current_page, last_page, from, to, total }

FILTROS Y BARRAS DE BUSQUEDA:
  - Usar grid grid-cols-1 sm:grid-cols-N gap-4 — NUNCA flex flex-wrap
  - N depende del numero de filtros: 2 filtros → sm:grid-cols-2,
    3 filtros → sm:grid-cols-2 lg:grid-cols-3,
    4+ filtros → sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

GRILLAS DE DATOS (cards, stats, show pages):
  - SIEMPRE empezar con grid-cols-1 como base mobile-first
  - NUNCA usar grid-cols-2 sin breakpoint (se rompe en <640px)
  - Patron: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

STATCARD ADMIN (componente global):
  - Importar desde @/Components/Admin/StatCard
  - Props correctas: label (NO title), gradient (NO color), value, icon
  - gradient usa formato: "linear-gradient(135deg, #hex1, #hex2)"
  - Props opcionales: borderColor, sub, trend, trendLabel

STATCARD EN PORTALES (Teacher/Student/Representative/Secretary):
  - Cada dashboard tiene su StatCard LOCAL — props propias (title, color son validos)
  - Considerar unificar en un PortalStatCard compartido en futuras iteraciones
```

#### Checklist Responsive al Crear/Modificar Layout o Pagina:

```
[ ] Contenedor principal usa max-w escalable: max-w-7xl 2xl:max-w-[1560px] 3xl:max-w-[1860px]
[ ] Si hay sidebar: offset del main sincronizado: lg:pl-64 2xl:pl-72 3xl:pl-80
[ ] Si hay sidebar: su ancho escalado: w-64 2xl:w-72 3xl:w-80
[ ] Padding horizontal escalado: px-4 sm:px-6 lg:px-8 2xl:px-10 3xl:px-12
[ ] Botones de icono/hamburger: minimo w-11 h-11 (44px) en mobile
[ ] Tablas envueltas en .table-responsive-wrapper (NO overflow-x-auto)
[ ] Paginacion con <button> + router.get() + last_page > 1 (NO <Link>)
[ ] Filtros con grid grid-cols-1 sm:grid-cols-N (NO flex flex-wrap)
[ ] Grillas con progression mobile-first: grid-cols-1 → sm:2 → lg:3 → xl:4
[ ] StatCard admin usa props: label + gradient (NO title/color)
[ ] Sin scroll horizontal a 375px y 390px
[ ] Sin franjas vacias enormes a 3840px
[ ] QA verificado en minimo: 375px / 768px / 1280px / 1920px / 2560px
```

---

## FLUJO DE TRABAJO DEL EQUIPO

### Proceso para Agregar Nueva Funcionalidad:

```
1. PLANEAR (architecture-expert)
   -> Decidir capas necesarias: Controller? Service? DTO? Event?
   -> Revisar si ya existe funcionalidad similar

2. DATABASE (database-expert)
   -> Diseno de la tabla y relaciones
   -> Migration con indices desde el inicio
   -> Factory para tests

3. BACKEND (laravel-expert)
   -> Migration -> Model -> Form Request -> Service -> Controller -> Policy -> Route
   -> En ese orden (el Service antes del Controller)

4. TESTS (testing-expert)
   -> Feature test del happy path
   -> Test de autorizacion (rol incorrecto = 403)
   -> Test de validacion (datos invalidos = errors)

5. FRONTEND (react-expert)
   -> Pagina con layout correcto
   -> Formulario con useForm() y manejo de errores
   -> Accesibilidad basica (aria-label, aria-describedby)

6. REVIEW (code-reviewer)
   -> Checklist de PR antes de merge
   -> Verificar naming, early returns, sin N+1

7. SEGURIDAD (security-expert)
   -> Si toca pagos, datos de usuarios o uploads: revision obligatoria
   -> Verificar middleware y policy
```

### Tabla de Referencia Rapida:

| Tarea | Agente Principal | Agente de Apoyo |
|-------|-----------------|-----------------|
| Nuevo CRUD admin | laravel-expert | architecture-expert |
| Refinar diseño pag. Web | ux-ui-expert | react-expert |
| Optimizar página para Google | seo-expert | react-expert |
| Configurar servidor/deploy | devops-expert | security-expert |
| Optimizar query lenta | database-expert | performance-expert |
| Nuevo endpoint critico | security-expert | laravel-expert |
| Refactor de service | architecture-expert | laravel-expert |
| Agregar tests | testing-expert | — |
| Revision de PR | code-reviewer | (todos segun area) |
| Mejorar Core Web Vitals | performance-expert | react-expert |
| Reducir bundle frontend | performance-expert | react-expert |
| Cachear queries pesadas | performance-expert | database-expert |
| Diseño responsive premium / multi-resolución | responsive-design-expert | ux-ui-expert |
| Breakpoints custom 3xl/4xl/5xl | responsive-design-expert | react-expert |
| Meta tags y Open Graph | seo-expert | ux-ui-expert |
| Auditar completitud CRUD | fullstack-auditor | laravel-expert |
| Verificar capas faltantes | fullstack-auditor | security-expert |
| Diagnosticar login/logout/419 | auth-access-expert | inertia-integration-expert |
| Corregir errores de rutas Inertia | inertia-integration-expert | laravel-expert |
| Investigar incidencias con logs | observability-expert | security-expert |
| Implementar Job o Queue | queue-jobs-expert | laravel-expert |
| Crear Notification o email | notifications-mail-expert | queue-jobs-expert |
| Generar reporte PDF | reports-pdf-expert | security-expert |
| Subir o crear activos graficos | graphic-design-web-expert | ux-ui-expert |
| Diseno visual de landing/galas | graphic-design-web-expert | seo-expert |
| Upload y compresion de imagenes | image-optimization-expert | security-expert |

---

## CHECKLIST DE CIBERSEGURIDAD (todos los agentes lo verifican)

> Este checklist se aplica a todos los agentes — especialmente laravel-expert, security-expert y code-reviewer.
> Basado en OWASP Top 10 y la auditoria de seguridad del 08/04/2026.

### 1. Autenticacion y Rate Limiting

```
✓ Toda ruta de login (web y API) tiene rate limiting: throttle:login o throttle:5,1
✓ 2FA obligatorio para rol admin (RequireTwoFactorForAdmin middleware)
✓ Sesiones invalidadas al cambiar password (Jetstream lo maneja)
✓ Tokens Sanctum con expiracion configurada
✓ Rate limiters especificos por recurso critico:
  - Login:         5 intentos/minuto
  - Pagos:         30/minuto
  - Inscripciones: 20/minuto
  - Bulk ops:      10/minuto
✓ Nunca exponer endpoint de auth sin throttle — aplica a /login, /register, /forgot-password, /api/login
```

### 2. Autorizacion (Defense in Depth)

```
Toda ruta critica tiene 3 capas de proteccion:
  Capa 1: Middleware de ruta     -> auth + role:admin (en routes/web.php o routes/api.php)
  Capa 2: FormRequest authorize  -> return $this->user()?->can('manage X') ?? false;
  Capa 3: Policy en controller   -> $this->authorize('action', $model) o authorizeResource()

REGLAS:
✓ FormRequest::authorize() NUNCA retorna true — siempre verificar permiso
✓ API routes siempre tienen middleware de rol ademas de auth:sanctum
✓ Policies verifican ownership (user solo ve sus propios datos)
✓ Gate::before() para admin es aceptable SOLO con 2FA habilitado
✓ Rutas API agrupadas por rol: admin|secretary para financieros, admin|secretary|teacher para consultas

ANTI-PATTERN:
✗ public function authorize(): bool { return true; }  // NUNCA — bypass de autorizacion
✗ Route sin middleware de rol: Route::apiResource(...) // NUNCA — cualquier token accede
```

### 3. Validacion de Input (FormRequests)

```
REGLAS:
✓ Montos financieros: 'required|numeric|min:0.01|max:99999.99' — SIEMPRE con min y max
✓ IDs foraneos: 'required|integer|exists:tabla,id' — verificar existencia en DB
✓ Emails: 'required|email:rfc,dns|max:255' — validar formato RFC + DNS
✓ Strings libres: SIEMPRE con max:N — nunca sin limite
✓ Archivos: 'file|mimes:jpg,png,pdf|max:2048' — tipos y tamano explicitos
✓ Telefonos: 'regex:/^[0-9+\-\s()]{7,20}$/' — solo caracteres validos
✓ URLs: 'url|max:255' — con limite de longitud
✓ Enums/status: 'in:pending,paid,cancelled' — solo valores permitidos

ANTI-PATTERNS:
✗ 'amount' => 'numeric|min:0'         — sin max: permite montos absurdos
✗ 'description' => 'string'           — sin max: permite megabytes de texto
✗ $request->all()                      — mass assignment, usar $request->validated()
```

### 4. Uploads de Archivos

```
REGLAS:
✓ Validar MIME real con $file->getMimeType() — NUNCA confiar en getClientOriginalExtension()
✓ Mappear MIME a extension segura: ['image/jpeg' => 'jpg', 'image/png' => 'png', ...]
✓ Validar tamano con max:N en FormRequest
✓ Guardar en storage/ con acceso controlado, o en public/ solo si es intencionalmente publico
✓ Nombre de archivo generado por el servidor, nunca usar nombre original del cliente

ANTI-PATTERNS:
✗ $file->getClientOriginalExtension()  — el cliente puede enviar .php como extension
✗ $file->move(public_path(), $file->getClientOriginalName())  — nombre controlado por atacante
✗ Sin validacion de MIME real — un .php renombrado a .jpg pasa la validacion de extension
```

### 5. SQL Injection y Queries

```
REGLAS:
✓ Siempre usar Eloquent o Query Builder con bindings parametrizados
✓ DB::raw() solo con strings fijos, NUNCA con variables del usuario
✓ whereRaw() solo con valores fijos internos, nunca con input externo

ANTI-PATTERNS:
✗ DB::statement("DELETE FROM users WHERE id = $id")    — SQL injection directa
✗ DB::raw("column = '$userInput'")                      — SQL injection
✗ Model::whereRaw("name = '{$request->name}'")         — SQL injection
```

### 6. Proteccion de Datos Sensibles

```
REGLAS:
✓ User::$hidden = ['password', 'remember_token', 'two_factor_secret', 'two_factor_recovery_codes']
✓ Todos los modelos usan $fillable — NUNCA $guarded = []
✓ SoftDeletes obligatorio en: User, Payment, DanceClass, DanceClassEnrollment
✓ ActivityLog (LogsActivity) en todos los modelos financieros y de usuarios
✓ Datos de menores requieren verificacion de representative
✓ NUNCA loguear passwords, tokens, two_factor_secret en ningun canal de log

ANTI-PATTERNS:
✗ protected $guarded = [];      — permite mass assignment de CUALQUIER campo
✗ Log::info('User data', $user->toArray())  — puede exponer campos ocultos si no estan en $hidden
```

### 7. Operaciones Financieras

```
REGLAS:
✓ TODA creacion/modificacion de pago dentro de DB::transaction()
✓ DECIMAL(10,2) para montos — NUNCA float
✓ Validacion de monto minimo (0.01) y maximo (99999.99)
✓ receipt_number generado por el servidor, nunca por el cliente
✓ ActivityLog en TODA operacion financiera
✓ Rate limiting en endpoints de pago: throttle:payments (30/min)

ANTI-PATTERNS:
✗ Payment::create($data) sin DB::transaction()  — side-effects incompletos si listener falla
✗ float $amount                                  — errores de precision en calculos financieros
```

### 8. Headers HTTP de Seguridad

```
OBLIGATORIOS (implementados en SecurityHeaders middleware):
✓ X-Frame-Options: SAMEORIGIN           — previene clickjacking
✓ X-Content-Type-Options: nosniff       — previene MIME sniffing
✓ X-XSS-Protection: 1; mode=block       — XSS legacy browsers
✓ Referrer-Policy: strict-origin-when-cross-origin
✓ Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
✓ Strict-Transport-Security: max-age=31536000 (solo sobre HTTPS)
✓ Content-Security-Policy:
  - Produccion: script-src 'self' (sin unsafe-inline ni unsafe-eval)
  - Desarrollo: script-src 'self' 'unsafe-inline' 'unsafe-eval' (Vite HMR)
```

### 9. Cookies de Sesion

```
OBLIGATORIO en config/session.php:
✓ http_only: true     — JavaScript no puede acceder a la cookie
✓ secure: true        — solo se envia sobre HTTPS (en produccion)
✓ same_site: lax      — proteccion contra CSRF
✓ encrypt: true       — sesion cifrada (en produccion)
```

### 10. Configuracion de Entorno (.env)

```
REGLAS:
✓ .env NUNCA en git — verificar que .gitignore incluya .env*
✓ APP_DEBUG=false en produccion — CRITICO, expone stack traces completos
✓ APP_ENV=production en produccion
✓ Credenciales (MAIL_PASSWORD, DB_PASSWORD, API keys) solo en .env, nunca hardcodeadas en codigo
✓ URL::forceScheme('https') activo en produccion (AppServiceProvider)
✓ SANCTUM_STATEFUL_DOMAINS configurado via .env, no hardcodeado
✓ Rotar APP_KEY si hay sospecha de comprometimiento

ANTI-PATTERNS:
✗ APP_DEBUG=true en produccion  — exposicion total de codigo, variables, SQL
✗ Credenciales en .env.example  — cualquiera con acceso al repo las ve
✗ API keys compartidas entre ambientes — comprometer dev = comprometer prod
```

### 11. Path Traversal y Acceso a Archivos

```
REGLAS:
✓ Directorios publicos validados con realpath() + str_starts_with(realpath(public_path()))
✓ Nunca construir rutas de archivo con input del usuario sin sanitizar
✓ Verificar que symlinks no apunten fuera del directorio esperado

ANTI-PATTERNS:
✗ File::allFiles(public_path($userInput))  — directory traversal
✗ file_get_contents($request->input('path'))  — arbitrary file read
```

### 12. CSRF Protection

```
✓ VerifyCsrfToken activo sin excepciones ($except vacio)
✓ Inertia + Jetstream manejan tokens CSRF automaticamente
✓ Nunca agregar rutas a $except sin justificacion documentada
```

### Checklist Rapido al Crear Algo Nuevo:

```
[ ] Ruta tiene middleware auth + role
[ ] FormRequest::authorize() verifica permiso, NO retorna true
[ ] Policy registrada y con ownership checks
[ ] Validaciones con min/max en campos numericos y strings
[ ] Uploads validados por MIME real, no por extension
[ ] Operaciones financieras dentro de DB::transaction()
[ ] ActivityLog habilitado en el modelo
[ ] $fillable definido, $hidden para campos sensibles
[ ] Rate limiting en endpoints criticos
[ ] APP_DEBUG=false verificado para produccion
[ ] No hay credenciales hardcodeadas en codigo
[ ] Tests de autorizacion: rol incorrecto = 403
```

---

## PATRÓN DE SINCRONIZACIÓN MASIVA Y QA POST-COMMIT (20/04/2026)

Cuando se suben muchos cambios juntos (backend, frontend, assets):

- Usar mensaje de commit estructurado con secciones por tipo de archivo y fecha de sincronización.
- Checklist post-sincronización:
  [ ] Validar build tras cambios masivos
  [ ] Confirmar push de todos los archivos (git status limpio)
  [ ] Ejecutar tests automáticos antes de mergear a main
  [ ] Documentar riesgos si se eliminan recursos o tests
  [ ] QA visual en producción (todas las resoluciones)

Este patrón reduce riesgos de pérdida de cobertura y facilita revertir si hay incidentes tras deploy masivo.

#### Ownership checks obligatorios en recursos multi-rol

Cuando un recurso puede ser gestionado por más de un rol (ej: admin y teacher), es obligatorio validar ownership tanto en FormRequest como en Policy. No basta con proteger el controlador. Ejemplo: asistencia, inscripciones, pagos.

Checklist:
- FormRequest::authorize() debe verificar que el usuario autenticado es dueño o responsable del recurso (ej: teacher_user_id == user()->id)
- Policy debe validar ownership además del rol
- Agregar tests Feature que verifiquen que un usuario no puede operar sobre recursos ajenos aunque tenga acceso al endpoint

#### Ownership checks en recursos multi-rol

Para cualquier recurso gestionado por múltiples roles (ej: admin y teacher), verificar que:
- FormRequest::authorize() valida ownership (no solo rol)
- Policy valida ownership
- Existen tests Feature que prueban acceso indebido (teacher/admin sobre recurso ajeno)

Esto previene bypass de seguridad cuando un usuario tiene acceso al endpoint pero no debería operar sobre recursos que no le pertenecen.

