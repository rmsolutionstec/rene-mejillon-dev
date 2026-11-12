/* ============================================================
   PORTFOLIO DATA — Datos fidedignos y verificados de René Mejillón
   Alineado 100% a CONTENT-VERIFICATION.md (Noviembre 2026)
   ============================================================ */

export const personalInfo = {
  name: 'René Mejillón',
  firstName: 'René',
  lastName: 'Mejillón',
  title: 'Desarrollador Full Stack',
  subtitle: 'Automatización e Infraestructura TI | Integración de IA',
  bio: `Desarrollador Full Stack y Tecnólogo en Desarrollo de Software (graduado en 2025) con sólida trayectoria desde 2015 en soporte informático, infraestructura de servidores y automatización. Especializado en crear aplicaciones web robustas con Laravel y React, herramientas de escritorio con Python y soluciones de IA aplicada.`,
  bioLong: `Mi trayectoria en el sector tecnológico comenzó en 2015, gestionando soporte informático, redes e infraestructura de servidores. Con el tiempo evolucioné hacia el desarrollo de software profesional, arquitectura web con Laravel y React, y orquestación de procesos con Python e inteligencia artificial local. Mi filosofía combina código limpio, arquitectura escalable y soluciones pragmáticas que resuelven necesidades reales de negocio.`,
  location: 'Guayaquil, Ecuador',
  email: 'rm.solutions.tec@gmail.com',
  phone: '+593 981817493',
  website: 'https://rene-mejillon-dev.vercel.app/',
  cvUrl: '/cv/rene-mejillon-cv.pdf',
  available: true,
  yearsExp: 10,       // Trayectoria profesional en TI desde 2015
  projects: 8,        // 8 proyectos reales desarrollados/en curso
  clients: 15,
  satisfaction: 99,
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rmsolutionstec', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/renemejillon', icon: 'FaLinkedin' },
  { name: 'WhatsApp', url: 'https://wa.me/593981817493', icon: 'FaWhatsapp' },
]

/* ============================================================
   SKILLS (Agrupadas por categorías de especialización comprobada)
   ============================================================ */
export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 90, icon: 'SiReact' },
      { name: 'JavaScript (ES6+)', level: 90, icon: 'SiJavascript' },
      { name: 'Tailwind CSS', level: 92, icon: 'SiTailwindcss' },
      { name: 'Vite', level: 90, icon: 'SiVite' },
      { name: 'HTML5 & CSS3', level: 95, icon: 'SiHtml5' },
      { name: 'Bootstrap', level: 88, icon: 'SiBootstrap' },
      { name: 'Framer Motion', level: 82, icon: 'SiFramer' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    skills: [
      { name: 'Laravel 12', level: 92, icon: 'SiLaravel' },
      { name: 'PHP 8.2+', level: 90, icon: 'SiPhp' },
      { name: 'REST APIs', level: 92, icon: 'SiPostman' },
      { name: 'Laravel Sanctum (Auth)', level: 88, icon: 'SiSanctum' },
      { name: 'Node.js', level: 80, icon: 'SiNodedotjs' },
    ],
  },
  {
    id: 'database',
    label: 'Bases de datos',
    skills: [
      { name: 'MySQL / MariaDB', level: 90, icon: 'SiMysql' },
      { name: 'PostgreSQL', level: 85, icon: 'SiPostgresql' },
      { name: 'SQLite', level: 88, icon: 'SiSqlite' },
      { name: 'Modelado Relacional', level: 90, icon: 'SiDatabase' },
    ],
  },
  {
    id: 'automation_ai',
    label: 'Automatización & IA',
    skills: [
      { name: 'Python', level: 88, icon: 'SiPython' },
      { name: 'PySide6 (GUI Desktop)', level: 85, icon: 'SiQt' },
      { name: 'Edge TTS & Kokoro', level: 88, icon: 'SiAudio' },
      { name: 'FFmpeg (Procesamiento Audio/Video)', level: 86, icon: 'SiFfmpeg' },
      { name: 'Ollama & Qwen (IA Local)', level: 84, icon: 'SiRobot' },
      { name: 'n8n (Flujos Automatizados)', level: 82, icon: 'SiN8n' },
      { name: 'Tesseract OCR', level: 80, icon: 'SiScan' },
    ],
  },
  {
    id: 'devops',
    label: 'Infraestructura & DevOps',
    skills: [
      { name: 'Linux (Ubuntu/Debian)', level: 88, icon: 'SiLinux' },
      { name: 'Git & GitHub', level: 92, icon: 'SiGit' },
      { name: 'Docker', level: 80, icon: 'SiDocker' },
      { name: 'Nginx', level: 82, icon: 'SiNginx' },
      { name: 'Tailscale & SSH', level: 86, icon: 'SiTailscale' },
      { name: 'Vercel & Render', level: 90, icon: 'SiVercel' },
    ],
  },
  {
    id: 'support_multimedia',
    label: 'Soporte & Multimedia',
    skills: [
      { name: 'Mantenimiento & Diagnóstico PC', level: 95, icon: 'SiHardware' },
      { name: 'Redes LAN / Wi-Fi', level: 90, icon: 'SiNetwork' },
      { name: 'Videovigilancia CCTV', level: 88, icon: 'SiCctv' },
      { name: 'OBS Studio & vMix (Streaming)', level: 92, icon: 'SiObs' },
      { name: 'Edición Audiovisual', level: 88, icon: 'SiAdobe' },
    ],
  },
]

/* ============================================================
   PROJECTS (Los 8 Proyectos Reales con Evidencias Comprobadas)
   ============================================================ */
export const projects = [
  {
    id: 1,
    title: 'Alpha Studio TTS Latino',
    description: 'Aplicación de escritorio distribuible desarrollada en Python con interfaz gráfica nativa (PySide6) y modo CLI. Permite la conversión de texto a voz realista utilizando Edge TTS y proveedores locales, ajuste de parámetros de voz (tono, velocidad, volumen), exportación en formato MP3, generación automática de subtítulos sincronizados (SRT) y procesamiento de audio con FFmpeg.',
    shortDesc: 'Software de escritorio en Python/PySide6 para síntesis de voz, exportación MP3 y subtítulos SRT',
    image: '/images/placeholder.jpg',
    category: 'Software Desktop',
    status: 'Beta 0.2.0',
    featured: true,
    tech: ['Python', 'PySide6', 'Edge TTS', 'FFmpeg', 'Audio Processing', 'CLI'],
    links: {
      live: null,
      github: 'https://github.com/rmsolutionstec/alpha-ecuador-tts',
    },
    achievements: [
      'Interfaz gráfica moderna en PySide6 y CLI para automatizaciones',
      'Generación de subtítulos sincronizados (.srt) automáticos',
      'Procesamiento avanzado de audio mediante pipeline FFmpeg',
      'Repositorio público con arquitectura modular y suite de tests',
    ],
    year: 2026,
  },
  {
    id: 2,
    title: 'Academia Luz al Mundo',
    description: 'Plataforma web de gestión académica y administrativa para academia de danza. Incluye sistema multi-rol con 5 niveles de acceso independientes (administrador, docente, estudiante, representante y secretaría). Módulo financiero completo con gestión de mensualidades, becas, descuentos, control de asistencias, calificaciones y emisión automatizada de recibos y certificados en PDF.',
    shortDesc: 'Plataforma educativa multi-rol con gestión de pagos, asistencias y reportes PDF',
    image: '/images/academialuzalmundo.jpg',
    category: 'Web App',
    status: 'Casi terminado',
    featured: true,
    tech: ['Laravel 12', 'React 19', 'Inertia 2', 'MySQL', 'Tailwind CSS', 'Spatie Permission'],
    links: {
      live: 'https://academialuzalmundo.com',
      github: null, // Repositorio privado
    },
    achievements: [
      '5 perfiles de usuario con permisos granulares (Spatie)',
      'Lógica transaccional completa de cobros, becas y saldos',
      'Generación de certificados y reportes PDF automatizados',
      'Panel administrativo integral con más de 25 controladores',
    ],
    year: 2025,
  },
  {
    id: 3,
    title: 'Fundación Clínica del Alma',
    description: 'Portal web institucional para fundación de ayuda social y salud mental. Cuenta con sistema de publicación y gestión de contenidos multimedia, soporte para eventos institucionales, optimización de activos audiovisuales en formatos modernos y módulos de difusión para actividades comunitarias.',
    shortDesc: 'Portal institucional y gestión multimedia para fundación social',
    image: '/images/fundacionclinicadelalma.jpg',
    category: 'Web App',
    status: 'Casi terminado',
    featured: true,
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Multimedia'],
    links: {
      live: 'https://fundacionclinicadelalma.org',
      github: null, // Repositorio privado
    },
    achievements: [
      'Gestión de contenidos digitales y difusión comunitaria',
      'Optimización de imágenes WebP y carga diferida (lazy loading)',
      'Diseño institucional responsive enfocado en accesibilidad',
      'Integración técnica para cobertura de transmisiones y eventos',
    ],
    year: 2025,
  },
  {
    id: 4,
    title: 'Alpha Ecuador',
    description: 'Plataforma web corporativa con arquitectura modular para empresa de tecnología, soporte e infraestructura. Diseñada con catálogo modular de servicios, presentación corporativa y evolución planificada hacia cotizaciones online y gestión de clientes.',
    shortDesc: 'Plataforma corporativa y catálogo modular de servicios tecnológicos',
    image: '/images/placeholder.jpg',
    category: 'Web App',
    status: 'En desarrollo',
    featured: true,
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    links: {
      live: 'https://alphaecuador.com',
      github: null, // Repositorio privado
    },
    achievements: [
      'Arquitectura modular para escalabilidad de catálogo',
      'Diseño corporativo con Tailwind CSS y componentes limpios',
      'Formularios de contacto y requerimientos técnicos',
    ],
    year: 2026,
  },
  {
    id: 5,
    title: 'Alpha Studio — Producción con IA',
    description: 'Arquitectura de automatización de contenidos audiovisuales en fase de integración. Combina scripts en Python, orquestación de flujos en n8n, modelos de lenguaje locales con Ollama (Qwen), extracción de texto mediante OCR (Tesseract), síntesis de voz neuronal (Kokoro/Edge TTS) y renderizado automatizado con FFmpeg.',
    shortDesc: 'Automatización de guiones, locución e integración audiovisual con IA local',
    image: '/images/placeholder.jpg',
    category: 'Automatización & IA',
    status: 'En desarrollo',
    featured: true,
    tech: ['Python', 'n8n', 'Ollama', 'Qwen', 'Tesseract OCR', 'Kokoro', 'FFmpeg'],
    links: {
      live: null,
      github: null,
    },
    achievements: [
      'Pipeline de generación de narraciones con modelos de lenguaje locales',
      'Flujos n8n para orquestación entre APIs y procesos de sistema',
      'Procesamiento automatizado de medios sin dependencia de servicios de nube costosos',
    ],
    year: 2026,
  },
  {
    id: 6,
    title: 'AlphaServer — Infraestructura TI',
    description: 'Infraestructura de servidor Linux propio configurada para la ejecución continua de servicios privados, herramientas de IA local (Ollama), flujos n8n, almacenamiento centralizado, red privada mallada (Tailscale VPN) y proxy inverso con Nginx.',
    shortDesc: 'Infraestructura Linux propia, Docker, Tailscale y servicios de IA local',
    image: '/images/placeholder.jpg',
    category: 'Infraestructura',
    status: 'Operativo',
    featured: false,
    tech: ['Linux', 'Ubuntu Server', 'Nginx', 'Docker', 'Tailscale', 'Python', 'SSH'],
    links: {
      live: null,
      github: null,
    },
    achievements: [
      'Red privada mallada segura mediante Tailscale para acceso remoto seguro',
      'Alojamiento local de modelos de IA y procesamiento desacoplado',
      'Automatización de respaldos y mantenimiento preventivo del servidor',
    ],
    year: 2025,
  },
  {
    id: 7,
    title: 'Portafolio René Mejillón',
    description: 'Aplicación web full stack que combina una SPA moderna en React 18 + Vite en el frontend con una API REST en Laravel 12 en el backend. Implementa carga instantánea con fallback estático, panel administrativo protegido con Laravel Sanctum, headers HTTP de seguridad (CSP, HSTS) y rate limiting.',
    shortDesc: 'SPA moderna en React + API REST en Laravel 12 bajo Docker',
    image: '/images/portafolio.jpg',
    category: 'Web App',
    status: 'Operativo',
    featured: false,
    tech: ['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Laravel 12', 'Sanctum', 'Docker'],
    links: {
      live: 'https://rene-mejillon-dev.vercel.app',
      github: 'https://github.com/rmsolutionstec/rene-mejillon-dev',
    },
    achievements: [
      'Arquitectura desacoplada: Frontend en Vercel + Backend Docker en Render',
      'Ciberseguridad reforzada: CSP, HSTS, rate limiting anti-fuerza bruta y anti-spam',
      'Currículum profesional compatible con ATS integrado sin errores 404',
      'Panel de control administrativo para gestión de contenidos',
    ],
    year: 2026,
  },
  {
    id: 8,
    title: 'Aniversario',
    description: 'Experiencia web interactiva multimedia con animaciones fluidas en frontend, diseño responsivo y recursos audiovisuales coordinados para conmemoración especial.',
    shortDesc: 'Experiencia web interactiva con animaciones frontend y multimedia',
    image: '/images/placeholder.jpg',
    category: 'Web App',
    status: 'Completado',
    featured: false,
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Multimedia', 'Framer Motion'],
    links: {
      live: null,
      github: null,
    },
    achievements: [
      'Diseño visual centrado en experiencia de usuario emotiva',
      'Animaciones fluidas y soporte responsive móvil y desktop',
    ],
    year: 2024,
  },
]

/* ============================================================
   SERVICES (Soluciones y Capacidades Profesionales Reales)
   ============================================================ */
export const services = [
  {
    id: 1,
    icon: 'FaCode',
    title: 'Desarrollo de Aplicaciones Web',
    description: 'Construcción de sistemas web modernos, paneles de administración y plataformas a medida utilizando Laravel y React con código limpio y seguro.',
    features: [
      'Arquitecturas limpias (Laravel + React)',
      'Sistemas multi-rol con permisos granulares',
      'Diseño responsive adaptado a móviles y escritorio',
      'Optimización de rendimiento y SEO técnico',
      'Generación de reportes y documentos PDF',
    ],
    popular: true,
  },
  {
    id: 2,
    icon: 'FaRocket',
    title: 'APIs REST & Integración',
    description: 'Diseño e implementación de interfaces de programación (APIs) seguras, estructuradas y documentadas para conectar aplicaciones y servicios externos.',
    features: [
      'Desarrollo de APIs RESTful con Laravel',
      'Autenticación robusta con Laravel Sanctum',
      'Rate limiting y sanitización estricta de datos',
      'Integración con servicios de terceros',
      'Manejo eficiente de errores y respuestas JSON',
    ],
    popular: false,
  },
  {
    id: 3,
    icon: 'FaDesktop',
    title: 'Software de Escritorio & Herramientas',
    description: 'Desarrollo de software de escritorio con interfaces nativas en Python y PySide6 para procesamiento local de datos, utilidades y automatización.',
    features: [
      'Interfaces gráficas nativas con PySide6 (Qt)',
      'Herramientas de línea de comandos (CLI)',
      'Procesamiento de audio y video con FFmpeg',
      'Síntesis y conversión de texto a voz (TTS)',
      'Empaquetado autónomo para distribución local',
    ],
    popular: false,
  },
  {
    id: 4,
    icon: 'FaCogs',
    title: 'Automatización & Flujos con IA',
    description: 'Automatización de flujos de trabajo repetitivos combinando scripts en Python, orquestación con n8n e integración de modelos de lenguaje locales.',
    features: [
      'Orquestación de flujos de trabajo con n8n',
      'Integración de modelos IA locales (Ollama/Qwen)',
      'Extracción de texto automatizada con OCR',
      'Procesamiento y transformación por lotes',
      'Reducción de costos de servicios de nube',
    ],
    popular: false,
  },
  {
    id: 5,
    icon: 'FaServer',
    title: 'Infraestructura TI, Redes & Soporte',
    description: 'Servicios integrales de soporte técnico informático, configuración de servidores Linux, redes privadas malladas y videovigilancia.',
    features: [
      'Administración de servidores Linux (Ubuntu/Debian)',
      'Redes privadas malladas con Tailscale VPN',
      'Contenedores Docker y proxies con Nginx',
      'Diagnóstico y mantenimiento correctivo de PC',
      'Instalación y soporte de redes LAN/Wi-Fi y CCTV',
    ],
    popular: false,
  },
]

/* ============================================================
   EXPERIENCE (Trayectoria Real Verificada)
   ============================================================ */
export const experience = [
  {
    id: 1,
    company: 'Fundación Clínica del Alma',
    role: 'Técnico Multimedia y Desarrollo Digital',
    period: '2024 — Presente',
    startYear: 2024,
    endYear: null,
    location: 'Guayaquil, Ecuador',
    type: 'Medio tiempo',
    current: true,
    description: 'Mantenimiento del portal institucional, optimización de contenidos y producción técnica de transmisiones en vivo.',
    tech: ['Laravel', 'React', 'Vmix', 'OBS Studio', 'Adobe Premiere', 'Photoshop'],
    achievements: [
      'Optimización de activos web y actualización continua del sitio institucional',
      'Producción técnica de transmisiones en vivo con vMix y OBS Studio',
      'Automatización de flujos de procesamiento digital multimedia',
    ],
  },
  {
    id: 2,
    company: 'ALPHA Publicidad y Soporte / REMETECS',
    role: 'Desarrollador Full Stack & Especialista TI',
    period: '2015 — Presente',
    startYear: 2015,
    endYear: null,
    location: 'Guayaquil, Ecuador',
    type: 'Empresa propia / Servicios TI',
    current: true,
    description: 'Servicios integrales de desarrollo de software, automatización, soporte informático, infraestructura de servidores y redes para clientes.',
    tech: ['Laravel', 'React', 'Python', 'PHP', 'MySQL', 'Linux', 'Docker', 'Redes LAN/WiFi'],
    achievements: [
      'Desarrollo de aplicaciones web y software a medida para clientes comerciales',
      'Configuración de infraestructura de servidores Linux locales y redes privadas (Tailscale)',
      'Soporte técnico integral, mantenimiento de hardware y sistemas de videovigilancia CCTV',
    ],
  },
  {
    id: 3,
    company: 'Iglesia Cuadrangular Central',
    role: 'Diseñador Multimedia y Productor Técnico',
    period: '2016 — 2018',
    startYear: 2016,
    endYear: 2018,
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo completo',
    current: false,
    description: 'Producción técnica audiovisual, streaming digital y soporte informático en eventos institucionales.',
    tech: ['Vmix', 'OBS Studio', 'Adobe Audition', 'Photoshop', 'Hardware'],
    achievements: [
      'Operación de transmisiones en vivo en plataformas digitales',
      'Diseño de material multimedia y soporte en consolas de video, sonido y computación',
    ],
  },
]

/* ============================================================
   TESTIMONIALS (Comprobados)
   ============================================================ */
export const testimonials = [
  {
    id: 1,
    name: 'Ing. Luisa Mosquera',
    role: 'Directora',
    company: 'Academia Luz al Mundo',
    avatar: '/images/placeholder.jpg',
    rating: 5,
    text: 'René transformó nuestra gestión institucional en una plataforma educativa moderna y completa. El control de pagos, asistencias y reportes automáticos optimizó nuestros tiempos. Un trabajo sumamente profesional y confiable.',
  },
  {
    id: 2,
    name: 'Lcda. Grace Rupertty',
    role: 'Fundadora',
    company: 'Fundación Clínica del Alma',
    avatar: '/images/placeholder.jpg',
    rating: 5,
    text: 'La colaboración técnica y el soporte de René en nuestro portal institucional y transmisiones en vivo nos ha permitido llegar a muchas más personas con calidad y estabilidad técnica. Muy recomendado.',
  },
]
