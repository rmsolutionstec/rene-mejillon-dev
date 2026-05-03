/* ============================================================
   PORTFOLIO DATA — Static fallback & default content
   ============================================================ */

import { FaBootstrap } from "react-icons/fa"

export const personalInfo = {
  name: 'René Mejillón',
  firstName: 'René',
  lastName: 'Mejillón',
  title: 'Full Stack Developer',
  subtitle: 'Tech Solutions | Laravel · React · MySQL · PostgreSQL',
  bio: `Desarrollador Full Stack con más de 5 años de experiencia construyendo
soluciones digitales robustas y escalables. Me especializo en crear aplicaciones
web modernas con Laravel y React, enfocándome en rendimiento, seguridad y
experiencias de usuario excepcionales.`,
  bioLong: `Apasionado por la tecnología y la innovación, he trabajado con startups,
fundaciones y empresas en proyectos que van desde plataformas educativas hasta
sistemas de gestión clínica. Mi enfoque combina código limpio, arquitectura
escalable y diseño centrado en el usuario para crear productos digitales que
generan valor real.`,
  location: 'Ecuador',
  email: 'rm.solutions.tec@gmail.com',
  phone: '+593 981817493',
  website: 'https://rene-mejillon-dev.vercel.app/',
  cvUrl: '/cv/rene-mejillon-cv.pdf',
  available: true,
  yearsExp: 5,
  projects: 4,
  clients: 25,
  satisfaction: 100,
}

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/rmsolutionstec', icon: 'FaGithub' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/renemejillon', icon: 'FaLinkedin' },
  { name: 'WhatsApp', url: 'https://wa.me/593981817493', icon: 'FaWhatsapp' },
]

/* ============================================================
   SKILLS
   ============================================================ */
export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js', level: 95, icon: 'SiReact' },
      { name: 'Next.js', level: 85, icon: 'SiNextdotjs' },
      { name: 'TypeScript', level: 82, icon: 'SiTypescript' },
      { name: 'Tailwind CSS', level: 96, icon: 'SiTailwindcss' },
      { name: 'Framer Motion', level: 80, icon: 'SiFramer' },
      { name: 'Vite', level: 100, icon: 'SiVite' },],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Laravel', level: 96, icon: 'SiLaravel' },
      { name: 'PHP', level: 92, icon: 'SiPhp' },
      { name: 'Node.js', level: 84, icon: 'SiNodedotjs' },
      { name: 'REST APIs', level: 95, icon: 'SiPostman' },
      { name: 'GraphQL', level: 68, icon: 'SiGraphql' },
    ],
  },
  {
    id: 'database',
    label: 'Bases de datos',
    skills: [
      { name: 'MySQL', level: 93, icon: 'SiMysql' },
      { name: 'PostgreSQL', level: 82, icon: 'SiPostgresql' },
      { name: 'Redis', level: 70, icon: 'SiRedis' },
      { name: 'SQLite', level: 85, icon: 'SiSqlite' },
      { name: 'Supabase', level: 85, icon: 'SiSupabase' },

    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'Git / GitHub', level: 96, icon: 'SiGit' },
      { name: 'Docker', level: 70, icon: 'SiDocker' },
      { name: 'Vercel', level: 92, icon: 'SiVercel' },
      { name: 'Railway', level: 80, icon: 'SiRailway' },
      { name: 'Render', level: 88, icon: 'SiRender' },
    ],
  },
]

/* ============================================================
   PROJECTS
   ============================================================ */
export const projects = [
  {
    id: 1,
    title: 'Academia Luz al Mundo',
    description: 'Plataforma de gestión académica completa para academia de danza. Incluye gestión de alumnos, clases, inscripciones, pagos, asistencias, calificaciones, tareas, reportes y certificados PDF. Sistema multi-rol con 5 perfiles: admin, profesor, alumno, representante y secretaria.',
    shortDesc: 'Plataforma académica multi-rol con gestión de pagos, asistencias y reportes PDF',
    image: '/images/academialuzalmundo.jpg',
    category: 'Web App',
    status: 'Casi terminado',
    featured: true,
    tech: ['Laravel 12', 'React 19', 'Inertia 2', 'MySQL', 'Tailwind CSS', 'Spatie'],
    links: {
      live: 'https://academialuzalmundo.com',
      github: null,
    },
    achievements: [
      '5 roles de usuario (admin, teacher, student, rep., secretary)',
      'Gestión completa de pagos y descuentos',
      'Reportes y certificados PDF automáticos',
      'Panel admin con 29 controladores',
    ],
    year: 2025,
  },
  {
    id: 2,
    title: 'Fundación Clínica del Alma',
    description: 'Sistema integral de gestión para fundación de salud mental. Cubre transmisiones en vivo, producción audiovisual, gestión de contenido digital y material de eventos. Desarrollado para apoyar la operación administrativa y comunicacional de la fundación.',
    shortDesc: 'Sistema de gestión integral para fundación de salud mental',
    image: '/images/fundacionclinicadelalma.jpg',
    category: 'Web App',
    status: 'Casi terminado',
    featured: true,
    tech: ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
    links: {
      live: 'https://fundacionclinicadelalma.org',
      github: null,
    },
    achievements: [
      'Gestión de contenido digital y multimedia',
      'Módulo de transmisiones en vivo',
      'Diseño de material para eventos',
      'Panel de administración completo',
    ],
    year: 2025,
  },
  {
    id: 3,
    title: 'Alpha Publicidad y Soporte — Ecommerce',
    description: 'Plataforma de comercio electrónico para empresa de publicidad, soporte técnico y producción multimedia. Catálogo de productos y servicios, gestión de pedidos, pasarelas de pago, panel admin y módulo de presupuestos para clientes.',
    shortDesc: 'Ecommerce y catálogo de servicios para empresa de publicidad y soporte',
    image: '/images/placeholder.jpg',
    category: 'Ecommerce',
    status: 'En desarrollo',
    featured: true,
    tech: ['Laravel', 'React', 'MySQL', 'Stripe', 'Tailwind CSS'],
    links: {
      live: null,
      github: null,
    },
    achievements: [
      'Catálogo de productos y servicios',
      'Pasarela de pago integrada',
      'Módulo de presupuestos online',
      'Panel admin de pedidos',
    ],
    year: 2026,
  },
  {
    id: 4,
    title: 'Portfolio René Mejillón',
    description: 'CV digital y portfolio profesional desarrollado con React + Vite en el frontend y Laravel como API REST en el backend. Incluye secciones de proyectos, habilidades, servicios, experiencia y contacto. Diseño dark con efectos de terminal, animaciones y componentes accesibles.',
    shortDesc: 'CV digital y portfolio profesional full stack con React + Laravel API',
    image: '/images/portafolio.jpg',
    category: 'Portfolio',
    status: 'En desarrollo',
    featured: true,
    tech: ['React 19', 'Vite', 'Laravel 12', 'Tailwind CSS', 'Framer Motion'],
    links: {
      live: 'https://rene-mejillon-dev.vercel.app',
      github: 'https://github.com/rmsolutionstec/rene-mejillon-dev',
    },
    achievements: [
      'Diseño dark con efecto terminal interactivo',
      'Animaciones con Framer Motion',
      'Frontend en Vercel + Backend API en Render',
      'Totalmente responsive (mobile-first)',
    ],
    year: 2026,
  },
]

/* ============================================================
   SERVICES
   ============================================================ */
export const services = [
  {
    id: 1,
    icon: 'FaCode',
    title: 'Desarrollo Web Full Stack',
    description: 'Construyo aplicaciones web completas desde el frontend hasta el backend, usando las tecnologías más modernas y siguiendo las mejores prácticas de la industria.',
    features: [
      'React / Next.js ',
      'Laravel / Node.js APIs',
      'Base de datos optimizadas',
      'Responsive & Mobile-first',
      'SEO técnico incluido',
    ],
    price: 'Desde $800',
    popular: false,
  },
  {
    id: 2,
    icon: 'FaRocket',
    title: 'API REST & Microservicios',
    description: 'Diseño y desarrollo APIs robustas, escalables y bien documentadas para conectar tu frontend con cualquier sistema o servicio externo.',
    features: [
      'API REST con Laravel',
      'Autenticación JWT / Sanctum',
      'Documentación Swagger',
      'Testing automatizado',
      'Rate limiting & seguridad',
    ],
    price: 'Desde $600',
    popular: true,
  },
  {
    id: 3,
    icon: 'FaShoppingCart',
    title: 'Ecommerce & Tiendas',
    description: 'Desarrollo tiendas online de alta conversión con gestión de inventario, pasarelas de pago seguras, analytics y herramientas de marketing integradas.',
    features: [
      'Carrito inteligente',
      'Stripe / PayPal / Payphone',
      'Gestión de inventario',
      'Analytics & reporting',
      'Multi-currency support',
    ],
    price: 'Desde $1,200',
    popular: false,
  },
  {
    id: 4,
    icon: 'FaDatabase',
    title: 'Diseño de Base de Datos',
    description: 'Diseño y optimización de bases de datos MySQL y PostgreSQL para garantizar rendimiento, integridad y escalabilidad en tus aplicaciones.',
    features: [
      'Diseño relacional óptimo',
      'Optimización de queries',
      'Migraciones con rollback',
      'Backups automatizados',
      'Auditoría de datos',
    ],
    price: 'Desde $300',
    popular: false,
  },
  {
    id: 5,
    icon: 'FaCloud',
    title: 'Deploy & DevOps',
    description: 'Configuro y gestiono la infraestructura de tus proyectos en la nube, garantizando alta disponibilidad, seguridad y entrega continua.',
    features: [
      'Deploy en Vercel / Railway / Render',
      'Configuración de CI/CD',
      'SSL & dominio personalizado',
      'Monitoreo y alertas',
      'Optimización de costos',
    ],
    price: 'Desde $400',
    popular: false,
  },
]

/* ============================================================
   EXPERIENCE
   ============================================================ */
export const experience = [

  {
    id: 1,
    company: 'Fundación Clínica del Alma',
    role: 'Técnico Multimedia y Producción Audiovisual',
    period: '2024 — Presente',
    startYear: 2024,
    endYear: null,
    location: 'Guayaquil, Ecuador',
    type: 'Medio tiempo',
    current: true,
    description: 'Gestión de transmisiones en vivo y producción de contenido digital para fundación de ayuda social.',
    tech: ['Vmix', 'OBS Studio', 'Adobe Premiere', 'Photoshop', 'Cubase'],
    achievements: [
      'Transmisiones en vivo con maquetación de escenas y diseño de logotipos para eventos',
      'Producción de escenarios de iluminación, fotografía y grabaciones',
      'Creación de contenido digital para redes sociales y plataformas multimedia',
    ],
  },
  {
    id: 2,
    company: 'Freelance & Proyectos Propios',
    role: 'Full Stack Developer',
    period: '2023 — Presente',
    startYear: 2023,
    endYear: null,
    location: 'Ecuador',
    type: 'Freelance',
    current: true,
    description: 'Desarrollo de soluciones web complejas para clientes en Ecuador y Latinoamérica. Plataformas educativas, sistemas de gestión y aplicaciones de comercio electrónico.',
    tech: ['Laravel', 'React', 'MySQL', 'Docker', 'Vercel', 'Render'],
    achievements: [
      'Entregué 4+ proyectos con 100% satisfacción',
      'Construí plataforma educativa multi-rol con 80+ usuarios',
      'Reduje costos de infraestructura en 40%',
    ],
  },
  {
    id: 3,
    company: 'ALPHA Publicidad y Soporte',
    role: 'Full Stack Developer & Técnico Multimedia',
    period: '2015 — Presente',
    startYear: 2015,
    endYear: null,
    location: 'Guayaquil, Ecuador',
    type: 'Empresa propia / Freelance',
    current: true,
    description: 'Empresa propia de servicios tecnológicos y producción multimedia. Desarrollo web, soporte técnico, redes, diseño gráfico y contenido digital. Atención de proyectos freelance de forma ocasional según demanda.',
    tech: ['PHP', 'MySQL', 'HTML5', 'Photoshop', 'Vmix', 'Bootstrap'],
    achievements: [
      'Desarrollo web, diseño gráfico y material publicitario (flyers, tarjetas, logos)',
      'Configuración de redes LAN/WiFi, cámaras IP y equipos audiovisuales',
      'Community Manager con supervisión de proyectos y calidad profesional',
    ],
  },
  {
    id: 4,
    company: 'Iglesia Cuadrangular Central',
    role: 'Diseñador Multimedia y Productor Musical',
    period: '2016 — 2018',
    startYear: 2016,
    endYear: 2018,
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo completo',
    current: false,
    description: 'Creación de contenido digital y producción audiovisual para presentaciones teatrales y eventos en vivo.',
    tech: ['Vmix', 'OBS Studio', 'Adobe Audition', 'Photoshop', 'Sony Vegas Pro 15', 'Cubase 5'],
    achievements: [
      'Transmisiones en vivo en YouTube y Facebook con Vmix y OBS Studio',
      'Diseño de material multimedia para redes sociales y eventos',
      'Manejo de consolas de video, cámaras, luces y sonido para eventos con canto en vivo',
    ],
  },
  {
    id: 5,
    company: 'Consejo Nacional Electoral (CNE)',
    role: 'Asistente de Procesamiento de Votación',
    period: '2016',
    startYear: 2016,
    endYear: 2016,
    location: 'Guayaquil, Ecuador',
    type: 'Contrato',
    current: false,
    description: 'Recepción, verificación y digitalización de información electoral para registro en la base de datos del CNE.',
    tech: ['Excel', 'Sistemas de escaneo', 'Bases de datos'],
    achievements: [
      'Escaneo y digitalización de papeletas garantizando exactitud en los datos',
      'Garantía de confidencialidad y precisión en documentación electoral',
    ],
  },
  {
    id: 6,
    company: 'Guimun',
    role: 'Asesor Comercial Multifuncional',
    period: '2014 — 2015',
    startYear: 2014,
    endYear: 2015,
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo completo',
    current: false,
    description: 'Ventas de productos tecnológicos, soporte técnico y capacitación a clientes empresariales.',
    tech: ['CRM', 'Software de gestión', 'Herramientas online'],
    achievements: [
      'Ventas de programas y servicios de acceso web con seguimiento de clientes',
      'Soporte técnico e instalación de programas y sistemas',
    ],
  },
  {
    id: 7,
    company: 'COVERSA',
    role: 'Asesor Comercial de Seguros de Auto',
    period: '2012 — 2013',
    startYear: 2012,
    endYear: 2013,
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo completo',
    current: false,
    description: 'Asesoría y venta de seguros de vehículos con atención personalizada y gestión comercial.',
    tech: ['CRM', 'Excel', 'Word'],
    achievements: [
      'Atención personalizada y cierre efectivo de ventas de pólizas de seguro',
      'Elaboración de cotizaciones y análisis de riesgos para clientes',
    ],
  },
  {
    id: 8,
    company: 'Comercial Andrés',
    role: 'Técnico Multifuncional',
    period: '2009 — 2011',
    startYear: 2009,
    endYear: 2011,
    location: 'Guayaquil, Ecuador',
    type: 'Tiempo completo',
    current: false,
    description: 'Ventas de tecnología, soporte técnico y asesoramiento personalizado a clientes.',
    tech: ['Hardware', 'Redes LAN/WiFi', 'Videovigilancia', 'Windows', 'Linux'],
    achievements: [
      'Soporte técnico e instalación de equipos, redes y sistemas de videovigilancia',
      'Gestión de inventario y planificación de pedidos tecnológicos',
    ],
  },
]

/* ============================================================
   TESTIMONIALS
   ============================================================ */
export const testimonials = [
  {
    id: 1,
    name: 'Ing. Luisa Mosquera',
    role: 'Directora',
    company: 'Academia Luz al Mundo',
    avatar: '/images/testimonial-1.jpg',
    rating: 5,
    text: 'René transformó nuestra visión en una plataforma educativa excepcional. Su código es limpio, el sistema es rápido y la experiencia para nuestros estudiantes es increíble. ¡Totalmente recomendado!',
  },
  {
    id: 2,
    name: 'Lcda. Grace Rupertty',
    role: 'Fundadora',
    company: 'Fundación Clínica del Alma',
    avatar: '/images/testimonial-2.jpg',
    rating: 5,
    text: 'El sistema de gestión para nuestra fundación de ayuda social que René desarrolló superó todo lo que esperábamos. El panel administrativo es muy intuitivo y nos permitió optimizar la atención y el seguimiento de los beneficiarios. Un profesional de primer nivel.',
  },

]
