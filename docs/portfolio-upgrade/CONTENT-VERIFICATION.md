# CONTENT-VERIFICATION.md — Matriz de Verificación de Contenido y Proyectos

**Actualización técnica 18/11/2026:** este portafolio pasa a ser estático en React/Vite con contacto por correo/WhatsApp. Fuente de datos: frontend/src/data/catalog.json. Las menciones de Laravel/API/Render para este portafolio corresponden a su implementación anterior; no alteran los stacks de otros proyectos.

Este documento registra el estado de verificación, fuente de evidencia y nivel de confiabilidad de cada afirmación profesional, habilidad y proyecto a mostrar en el portafolio de **René Mejillón**.

## Matriz vigente — alineación con LinkedIn, 15/11/2026

Esta sección sustituye las afirmaciones incompatibles de la matriz anterior conservada más abajo. La actualización del usuario prevalece sobre las reglas anteriores de trayectoria desde 2015 y prioridad principal de Alpha Studio TTS, presentes en AGENTS y skills.

### Fuentes y límites de la verificación

- **U:** documento `Texto pegado.txt` aportado por el usuario el 15/11/2026. Contiene sus datos confirmados, el titular y períodos que declara publicados en LinkedIn y un resumen de auditoría de Academia. No equivale a una auditoría de repositorios ejecutada en esta sesión.
- **L:** lectura directa, sin edición, de [LinkedIn](https://www.linkedin.com/in/renemejillon/) mediante la pestaña abierta del usuario el 15/11/2026. Se observaron titular, Acerca de, aptitudes principales, servicios, publicación destacada de Academia y las cinco entradas visibles de experiencia. El acceso web público directo devolvió 999; la lectura se pudo realizar en el navegador.
- **R:** código de este portafolio revisado localmente. Confirma React 18, backend Laravel 12 implementado, contenido público estático y uso de la API para contacto/admin; no demuestra disponibilidad de Render ni funcionamiento completo del administrador en producción.
- Formación detallada, certificados, idiomas y fichas con fechas de proyectos no quedaron corroborados en las secciones visibles de LinkedIn durante esta lectura. Se registran como confirmados por el usuario, con ese límite explícito.

### Perfil, contacto y cronología

| Dato | Base vigente | Evidencia | Acción sobre el portafolio |
|---|---|---|---|
| Identidad | René David Mejillón Torres; puede usarse René Mejillón como nombre visible | U; L muestra Rene David Mejillón Torres | Mantener nombre completo en CV y datos profesionales |
| Posicionamiento | Desarrollador Full Stack; PHP, Laravel, JavaScript, React, MySQL e Inertia.js; trayectoria previa en soporte e infraestructura TI | U + L | Sustituir la prioridad de IA/infraestructura como especialización principal; adaptar el titular sin cambiar su significado |
| Ubicación | Guayaquil, Ecuador | U + L | Coherencia en web, CV y metadatos |
| Correo profesional | renemejillon@alphaecuador.com | U + L, Acerca de | Sustituir el correo anterior en datos, textos y enlaces de contacto profesional |
| Servicios de Alpha | contacto@alphaecuador.com; https://alphaecuador.com/ | U + L para correo | Separar contacto personal profesional de contratación de servicios Alpha |
| RM Solutions Tec | Técnico de soporte informático y redes; independiente; mayo 2008–julio 2023 | U + L | Separar esta etapa de Alpha; no atribuir desarrollo full stack durante todo el período |
| Alpha Publicidad, Soporte y Desarrollo | Responsable de Soluciones TI y Desarrollo Web; independiente; agosto 2023–actualidad | U + L | Presentar continuidad de actividad, con nueva marca desde agosto 2023 |
| REMETECS | Seudónimo profesional | U + L | No presentarlo como otra empresa |
| Laravel y React | Experiencia práctica desde 2023 | U + L | No calcular experiencia en software desde 2008 ni 2015; preferir fechas explícitas |
| Formación | Tecnólogo Superior en Desarrollo de Software, Instituto Superior Tecnológico Guayaquil; diciembre 2022–junio 2025; título registrado el 17/06/2026 | U; L confirma título y registro en junio 2026, sin corroboración del período detallado | Separar fin de estudios y registro; omitir cédula y números personales del certificado |
| Idiomas | Español e inglés básico, sin nivel certificado | U | Evitar equivalencia A1/B1 o certificaciones no aportadas |
| Alcance TI | Más de 50 clientes; unas 20 instalaciones de cámaras y unas 10 de redes | U + L | Solo como estimaciones acumuladas de la trayectoria desde 2008; no cifras anuales ni exclusivas de Alpha |

### Experiencia adicional y formación complementaria

| Entrada | Período / alcance | Evidencia | Tratamiento |
|---|---|---|---|
| Guimun | Vendedor de servicios intangibles; octubre 2014–mayo 2015 | U + L | Conservar como antecedente comercial |
| COVERSA | Ventas de servicios intangibles; diciembre 2013–agosto 2014 | U + L | Conservar sin atribuir desarrollo |
| Comercial Andres | Técnico informático; septiembre 2012–diciembre 2013 | U + L | Soporte y asesoría técnica; no desarrollo frontend |
| Desarrollador Back-end, Capacítate para el empleo | Finalización 24/02/2025; 106 horas; 8,25; sin vencimiento acreditado | U | Formación complementaria; no presentar como título universitario ni credencial verificada en línea en esta sesión |
| Otros antecedentes del repositorio | Iglesia Cuadrangular Central y colaboración multimedia con Fundación | R | Conservar información previa y conciliar fechas, naturaleza del vínculo y funciones; el período de un proyecto no equivale al período laboral |
| Otros certificados | Paneles solares y administración de empresas | U | Menor protagonismo; no inventar fechas o entidades |

### Proyectos y jerarquía editorial

1. **Principal: Academia Luz al Mundo | Plataforma de gestión académica y financiera.** U confirma autoría individual, sistema en uso y evolución continua, enero 2025–actualidad. L confirma autoría individual en Acerca de y uso/evolución en la publicación destacada, pero no se corroboró la fecha de su ficha. Conservar enero 2025; la relación entre etapas iniciales y experiencia desde 2023 sigue pendiente.
   - Alcance: sitio institucional y portales de administración, secretaría, docentes, estudiantes y representantes; gestión académica, administrativa y financiera.
   - Stack informado por U: PHP 8.3, Laravel 12, JavaScript/JSX, React 19, Inertia.js 2, Tailwind 3.4 y MySQL. Monolito Laravel con React/Inertia y API complementaria. Node sirve como herramienta, no backend principal.
   - Aportes informados: modelado Eloquent/SQL; migraciones e integridad; formularios/componentes responsive; clases, inscripciones, asistencias y evaluación; cargos, pagos, abonos, saldos y caja; transacciones e idempotencia; Form Requests y Policies/roles; reportes PDF/CSV; tareas programadas, mantenimiento y despliegues Git/SSH en hosting compartido.
   - La auditoría resumida por U menciona colas en BD, Scheduler/cron, Jetstream/Fortify, Sanctum, Spatie Permission, doble factor, archivos autorizados, auditoría, Dompdf, Intervention Image y respaldos cifrados. Volver a comprobar el código antes de publicar detalles técnicos nuevos que no estén respaldados en el repositorio.
   - No atribuir TypeScript, Docker, Kubernetes, Redis, AWS, Livewire, Sail o microservicios. No confundir pagos registrados con pasarelas, recibos con facturación tributaria ni enlaces WhatsApp con Business API.
   - La existencia de PHPUnit, Playwright y Actions no implica controles actualmente aprobados, cobertura conocida o seguridad certificada. La revisión visual de 36 pantallas descrita por U no prueba escrituras, restauraciones, cierres ni permisos entre roles.
2. **Segundo: Fundación Clínica del Alma | Portal institucional.** U confirma autoría individual, julio–diciembre 2025 y alcance de programas, ministerios, galería, contacto y donaciones; desarrollo, contenido y soporte. L confirma autoría individual en Acerca de. No sistema clínico ni historias médicas. Verificar tecnologías en su propio código antes de detallarlas; no heredar el stack de Academia.
3. **Portafolio personal.** U indica publicación en LinkedIn desde 2026; R confirma SPA React/Vite y API Laravel existente. Describir por separado implementación en código, contenido público estático y operación remota pendiente de comprobar. No prometer aún edición pública dinámica.
4. **Proyectos complementarios existentes:** Alpha Ecuador, Alpha Studio TTS Latino, Alpha Studio IA, AlphaServer y Aniversario. Mantenerlos en inventario, sin borrarlos por no estar desarrollados en U. Revalidar alcance, fechas, stack y clasificación antes de actualizar fichas. TTS puede mostrar evidencia pública de un proyecto Python, pero no convierte Python/Django en servicios comerciales consolidados ni desplaza a Academia como principal.

### Habilidades y servicios

- **Experiencia práctica:** PHP, Laravel, JavaScript/JSX, React, MySQL, Git/GitHub, hosting, despliegues y mantenimiento; soporte informático, redes y CCTV. Aptitudes principales: Laravel, React.js, PHP, JavaScript y MySQL (U + L).
- **Experiencia académica:** Python y Django (U + L).
- **Aprendizaje aplicado:** APIs REST, webhooks, Linux y Docker (L); U añade flujos n8n de gestión/publicación con validaciones, estados y recuperación. Diferenciar la implementación de flujos n8n del nivel que todavía se aprende en cada herramienta.
- **Complementarios:** diseño gráfico, edición multimedia, producción audiovisual y streaming, con menor protagonismo que desarrollo y TI.
- Retirar porcentajes de dominio, satisfacción absoluta, precios y promesas técnicas sin evidencia. No usar senior, arquitecto, experto en ciberseguridad ni ingeniero DevOps.
- Los testimonios del archivo actual no se consideran validados por esta lectura de LinkedIn; comprobar fuente y autorización o dejarlos fuera de la entrega pública.

### Criterio de aceptación de coherencia

Una entrega de contenido debe cotejar Hero, About, Experience, proyectos, Skills, servicios, contacto, CV aprobado, seeders y metadatos contra esta matriz. La misma fecha, marca y nivel de experiencia deben conservar el mismo significado en cada superficie.

Conservar el CV existente mientras se revisa su contenido y aprobación; su integridad binaria no acredita coherencia con LinkedIn. Preparar cualquier reemplazo como candidato revisable, sin inventar información ni interrumpir la descarga vigente.

No publicar datos reales de alumnos, familias, docentes, contactos, calificaciones, cobros, deudas o credenciales en capturas. Las demostraciones requieren una copia aislada con datos sintéticos completos y rótulo «Demostración con datos ficticios»; no modificar producción ni cambiar solo los nombres.

## Matriz anterior — antecedente, pendiente de conciliación

Las etiquetas CONFIRMADO de esta sección son registros históricos y no una validación nueva. Aplicar la matriz vigente cuando existan discrepancias de fechas, stack, jerarquía o nivel profesional.

---

## 1. Perfil Profesional y Trayectoria

| Elemento | Declaración Verificada | Fuente de Evidencia | Estado |
|---|---|---|---|
| **Nombre profesional** | René David Mejillón Torres (René Mejillón) | Documentos y certificado oficial MINEDEC | `CONFIRMADO` |
| **Título principal** | Desarrollador Full Stack \| Automatización e Infraestructura TI | Formación y proyectos de código | `CONFIRMADO` |
| **Especialización** | Integración de Inteligencia Artificial y Soluciones Tecnológicas | Repositorio `alpha-ecuador-tts`, scripts de automatización | `CONFIRMADO` |
| **Formación Académica** | Tecnólogo Superior en Desarrollo de Software (registro del título el 17/06/2026, Instituto Superior Tecnológico Guayaquil; identificador omitido) | Certificado Oficial de Registro de Título MINEDEC Ecuador | `CONFIRMADO OFICIALMENTE` |
| **Trayectoria Integral** | Soporte técnico, infraestructura y soluciones tecnológicas desde 2015; desarrollo práctico de software posterior | Registro laboral (REMETECS / Alpha Publicidad y Soporte) | `CONFIRMADO` |
| **Años de Programación** | Trayectoria TI desde 2015; experiencia en desarrollo full stack comprobada en proyectos | Código fuente y repositorios | `CONFIRMADO (Sin sobreventa)` |

---

## 2. Matriz de los 8 Proyectos Reales

| # | Proyecto | Repositorio / Evidencia | Estado Real | Stack Tecnológico Verificado | Tratamiento en el Portafolio |
|---|---|---|---|---|---|
| **1** | **Academia Luz al Mundo** | `rmsolutionstec/academialuzalmundo` (privado) · https://academialuzalmundo.com | Casi terminado / En uso | Laravel 12, React 19, Inertia 2, MySQL, Tailwind CSS | Destacar arquitectura multi-rol (5 perfiles), lógica de pagos/becas y reportes PDF. **No exponer datos de alumnos**. |
| **2** | **Fundación Clínica del Alma** | `rmsolutionstec/fundacionclinicadelalma` (privado) · https://fundacionclinicadelalma.org | Casi terminado | Laravel, React, MySQL, Tailwind CSS | Portal institucional, gestión de contenido digital, multimedia y eventos. **No describir como sistema de historias clínicas**. |
| **3** | **Alpha Ecuador** | `rmsolutionstec/alphaecuador_app` (privado) · https://alphaecuador.com | En desarrollo | Laravel, React, MySQL, Tailwind CSS | Plataforma corporativa y catálogo modular. Clasificar pasarelas de pago y ecommerce como *en desarrollo/planificado*. |
| **4** | **Alpha Studio TTS Latino** | `rmsolutionstec/alpha-ecuador-tts` (PÚBLICO) · https://github.com/rmsolutionstec/alpha-ecuador-tts | Beta 0.2.0 | Python, PySide6, Edge TTS, FFmpeg | **Prioridad visual alta**. Destacar como software distribuible de escritorio, generación de subtítulos SRT y perfiles de voz. |
| **5** | **Alpha Studio — Producción con IA** | Flujos de automatización locales y scripts | En desarrollo / I+D | Python, n8n, Ollama, Qwen, Tesseract OCR, Kokoro, FFmpeg | Presentar como arquitectura de automatización de contenidos en fase de integración. |
| **6** | **AlphaServer** | Infraestructura Linux local y remota | Operativo (Uso propio) | Linux, Nginx, Docker, n8n, Python, Ollama, Tailscale, SSH | Caso de infraestructura y redes privadas: alojamiento interno de servicios, automatizaciones y servidores locales. |
| **7** | **Portafolio René Mejillón** | `rmsolutionstec/rene-mejillon-dev` (PÚBLICO) · https://rene-mejillon-dev.vercel.app | Operativo / En modernización | React 18, Vite, Tailwind CSS, Laravel 12 API, Docker, Sanctum | Demostración de arquitectura desacoplada SPA + REST API + panel admin protegido. |
| **8** | **Aniversario** | `rmsolutionstec/aniversario` (privado) | Completado | HTML, CSS, JavaScript, Multimedia | Proyecto interactivo complementario de frontend y experiencia de usuario. |

---

## 3. Matriz de Habilidades Técnicas (Sin Porcentajes Arbitrarios)

| Categoría | Tecnologías y Herramientas | Proyectos de Evidencia |
|---|---|---|
| **Frontend** | React, JavaScript, Vite, Tailwind CSS, Bootstrap, HTML5, CSS3, Framer Motion | Portafolio, Academia Luz al Mundo, Fundación Clínica del Alma |
| **Backend** | PHP, Laravel, APIs REST, Node.js, Autenticación (Sanctum/JWT) | Portafolio API, Academia Luz al Mundo, Alpha Ecuador |
| **Bases de Datos** | MySQL, MariaDB, PostgreSQL, SQLite | Todos los proyectos (migraciones, relaciones, índices) |
| **Infraestructura & DevOps** | Linux, Windows, Docker, Nginx, Git/GitHub, Vercel, Render, Tailscale, SSH | AlphaServer, despliegues de Portafolio y aplicaciones web |
| **Automatización & IA** | Python, PySide6, n8n, Ollama, Qwen, Tesseract OCR, Edge TTS, Kokoro, FFmpeg | Alpha Studio TTS Latino, Alpha Studio IA, AlphaServer |
| **Soporte & Multimedia** | Diagnóstico y mantenimiento PC, redes LAN/Wi-Fi, CCTV, OBS Studio, vMix, Premiere, Photoshop | Trayectoria profesional 2015-presente (REMETECS / Alpha Publicidad) |

---

## 4. Servicios Profesionales Realistas

1. **Desarrollo de Aplicaciones Web y Sistemas Administrativos** (Laravel + React, paneles de control, roles y permisos).
2. **Automatización de Procesos y Flujos de Trabajo** (Python, n8n, scripts de procesamiento masivo, integración de APIs).
3. **Desarrollo de Software de Escritorio y Herramientas a Medida** (Python, PySide6, utilidades multimedia).
4. **Infraestructura TI, Redes y Servidores** (Configuración Linux/Windows, Docker, Nginx, redes locales y VPNs privadas).
5. **Soporte Informático Integral** (Mantenimiento de hardware, diagnóstico preventivo/correctivo, videovigilancia).
