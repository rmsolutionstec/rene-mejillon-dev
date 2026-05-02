/* ============================================================
   PORTFOLIO DATA — Static fallback & default content
   ============================================================ */

export const personalInfo = {
  name:       'René Mejillón',
  firstName:  'René',
  lastName:   'Mejillón',
  title:      'Full Stack Developer',
  subtitle:   'Tech Solutions | Laravel · React · MySQL',
  bio: `Desarrollador Full Stack con más de 5 años de experiencia construyendo
soluciones digitales robustas y escalables. Me especializo en crear aplicaciones
web modernas con Laravel y React, enfocándome en rendimiento, seguridad y
experiencias de usuario excepcionales.`,
  bioLong: `Apasionado por la tecnología y la innovación, he trabajado con startups,
fundaciones y empresas en proyectos que van desde plataformas educativas hasta
sistemas de gestión clínica. Mi enfoque combina código limpio, arquitectura
escalable y diseño centrado en el usuario para crear productos digitales que
generan valor real.`,
  location:   'Ecuador',
  email:      'rm.solutions.tec@gmail.com',
  phone:      '+593 981817493',
  website:    'https://rene-mejillon-dev.vercel.app/',
  cvUrl:      '/cv/rene-mejillon-cv.pdf',
  available:  true,
  yearsExp:   5,
  projects:   30,
  clients:    25,
  satisfaction: 100,
}

export const socialLinks = [
  { name: 'GitHub',   url: 'https://github.com/renemejillon',   icon: 'FaGithub'   },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/renemejillon', icon: 'FaLinkedin' },
  { name: 'Twitter',  url: 'https://twitter.com/renemejillon',  icon: 'FaTwitter'  },
  { name: 'WhatsApp', url: 'https://wa.me/593981817493',        icon: 'FaWhatsapp' },
]

/* ============================================================
   SKILLS
   ============================================================ */
export const skillCategories = [
  {
    id:    'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React.js',      level: 95, icon: 'SiReact'      },
      { name: 'Next.js',       level: 85, icon: 'SiNextdotjs'  },
      { name: 'TypeScript',    level: 82, icon: 'SiTypescript' },
      { name: 'Tailwind CSS',  level: 96, icon: 'SiTailwindcss'},
      { name: 'Framer Motion', level: 80, icon: 'SiFramer'     },
      { name: 'Vue.js',        level: 75, icon: 'SiVuedotjs'   },
    ],
  },
  {
    id:    'backend',
    label: 'Backend',
    skills: [
      { name: 'Laravel',    level: 96, icon: 'SiLaravel'    },
      { name: 'PHP',        level: 92, icon: 'SiPhp'        },
      { name: 'Node.js',    level: 84, icon: 'SiNodedotjs'  },
      { name: 'Express.js', level: 80, icon: 'SiExpress'    },
      { name: 'REST APIs',  level: 95, icon: 'SiPostman'    },
      { name: 'GraphQL',    level: 68, icon: 'SiGraphql'    },
    ],
  },
  {
    id:    'database',
    label: 'Bases de datos',
    skills: [
      { name: 'MySQL',      level: 93, icon: 'SiMysql'     },
      { name: 'PostgreSQL', level: 82, icon: 'SiPostgresql'},
      { name: 'MongoDB',    level: 74, icon: 'SiMongodb'   },
      { name: 'Redis',      level: 70, icon: 'SiRedis'     },
      { name: 'SQLite',     level: 85, icon: 'SiSqlite'    },
    ],
  },
  {
    id:    'devops',
    label: 'DevOps & Tools',
    skills: [
      { name: 'Git / GitHub', level: 96, icon: 'SiGit'     },
      { name: 'Docker',       level: 78, icon: 'SiDocker'  },
      { name: 'Linux',        level: 85, icon: 'SiLinux'   },
      { name: 'Vercel',       level: 92, icon: 'SiVercel'  },
      { name: 'Railway',      level: 88, icon: 'SiRailway' },
      { name: 'AWS',          level: 70, icon: 'SiAmazonaws'},
    ],
  },
]

/* ============================================================
   PROJECTS
   ============================================================ */
export const projects = [
  {
    id:          1,
    title:       'Academia Luz al Mundo',
    description: 'Plataforma educativa completa con gestión de cursos, estudiantes, pagos y certificados digitales. Sistema de aprendizaje en línea con video streaming, quizzes interactivos y seguimiento de progreso.',
    shortDesc:   'Plataforma educativa con gestión de cursos y certificados digitales',
    image:       '/images/project-academia.jpg',
    category:    'Web App',
    status:      'Completado',
    featured:    true,
    tech:        ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Stripe', 'AWS S3'],
    links: {
      live:   'https://academialuzalmundo.com',
      github: null,
    },
    achievements: [
      '500+ estudiantes activos',
      'Sistema de pagos integrado',
      'Certificados PDF automáticos',
      'Panel admin completo',
    ],
    year: 2024,
  },
  {
    id:          2,
    title:       'Fundación Clínica del Alma',
    description: 'Sistema integral de gestión clínica para fundación de salud mental. Incluye historial médico digital, agendamiento de citas, telemedicina, reportes y estadísticas de atención.',
    shortDesc:   'Sistema de gestión clínica con telemedicina y expedientes médicos',
    image:       '/images/project-clinica.jpg',
    category:    'Web App',
    status:      'Completado',
    featured:    true,
    tech:        ['Laravel', 'Vue.js', 'MySQL', 'WebRTC', 'Bootstrap', 'Chart.js'],
    links: {
      live:   'https://clinicadelalma.org',
      github: null,
    },
    achievements: [
      '200+ pacientes gestionados',
      'Telemedicina en tiempo real',
      'Historial médico digital',
      'Reportes estadísticos',
    ],
    year: 2023,
  },
  {
    id:          3,
    title:       'Próximo Ecommerce Premium',
    description: 'Plataforma de comercio electrónico de alta conversión con carrito inteligente, múltiples pasarelas de pago, gestión avanzada de inventario, analytics y panel admin completo.',
    shortDesc:   'Ecommerce de alta conversión con múltiples pasarelas de pago',
    image:       '/images/project-ecommerce.jpg',
    category:    'Ecommerce',
    status:      'En desarrollo',
    featured:    true,
    tech:        ['Laravel', 'React', 'MySQL', 'Stripe', 'PayPal', 'Redis', 'Tailwind'],
    links: {
      live:   null,
      github: null,
    },
    achievements: [
      'Multi-currency support',
      'Gestión de inventario',
      'Analytics avanzado',
      'Panel admin moderno',
    ],
    year: 2025,
  },
]

/* ============================================================
   SERVICES
   ============================================================ */
export const services = [
  {
    id:    1,
    icon:  'FaCode',
    title: 'Desarrollo Web Full Stack',
    description: 'Construyo aplicaciones web completas desde el frontend hasta el backend, usando las tecnologías más modernas y siguiendo las mejores prácticas de la industria.',
    features: [
      'React / Next.js / Vue.js',
      'Laravel / Node.js APIs',
      'Base de datos optimizadas',
      'Responsive & Mobile-first',
      'SEO técnico incluido',
    ],
    price: 'Desde $800',
    popular: false,
  },
  {
    id:    2,
    icon:  'FaRocket',
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
    id:    3,
    icon:  'FaMobile',
    title: 'Aplicaciones PWA',
    description: 'Transformo tu aplicación web en una experiencia nativa con Progressive Web Apps, ofreciendo instalación, notificaciones push y funcionamiento offline.',
    features: [
      'Service Workers',
      'Notificaciones Push',
      'Offline functionality',
      'Instalable en móvil',
      'Performance optimizado',
    ],
    price: 'Desde $500',
    popular: false,
  },
  {
    id:    4,
    icon:  'FaShoppingCart',
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
    id:    5,
    icon:  'FaDatabase',
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
    id:    6,
    icon:  'FaCloud',
    title: 'Deploy & DevOps',
    description: 'Configuro y gestiono la infraestructura de tus proyectos en la nube, garantizando alta disponibilidad, seguridad y entrega continua.',
    features: [
      'Deploy en Vercel / Railway',
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
    id:       1,
    company:  'Freelance & Proyectos Propios',
    role:     'Senior Full Stack Developer',
    period:   '2022 — Presente',
    duration: '3 años',
    location: 'Ecuador (Remoto)',
    type:     'Freelance',
    current:  true,
    description: 'Desarrollo de soluciones web complejas para clientes en Ecuador y Latinoamérica. Especialización en plataformas educativas, sistemas de gestión y aplicaciones de comercio electrónico.',
    tech: ['Laravel', 'React', 'MySQL', 'Docker', 'Vercel', 'Railway'],
    achievements: [
      'Entregué 15+ proyectos con 100% satisfacción',
      'Construí plataforma educativa con 500+ usuarios',
      'Reduje costos de infraestructura en 40%',
    ],
  },
  {
    id:       2,
    company:  'Agencia Digital',
    role:     'Full Stack Developer',
    period:   '2020 — 2022',
    duration: '2 años',
    location: 'Ecuador',
    type:     'Tiempo completo',
    current:  false,
    description: 'Desarrollo de aplicaciones web para clientes del sector salud, educación y retail. Lideré el equipo técnico en la migración de sistemas legados a tecnologías modernas.',
    tech: ['Laravel', 'Vue.js', 'MySQL', 'jQuery', 'Bootstrap'],
    achievements: [
      'Migré 5 sistemas legados a Laravel',
      'Implementé CI/CD reduciendo deploys 60%',
      'Lideré equipo de 3 desarrolladores',
    ],
  },
  {
    id:       3,
    company:  'Startup Tech',
    role:     'Junior Backend Developer',
    period:   '2019 — 2020',
    duration: '1 año',
    location: 'Ecuador',
    type:     'Tiempo completo',
    current:  false,
    description: 'Desarrollo de APIs REST y lógica de negocio para aplicación de logística. Aprendizaje intensivo de patrones de diseño, arquitectura limpia y testing.',
    tech: ['PHP', 'Laravel', 'MySQL', 'Redis', 'Git'],
    achievements: [
      'Desarrollé 20+ endpoints REST',
      'Implementé sistema de cache con Redis',
      'Mejoré rendimiento de queries en 70%',
    ],
  },
]

/* ============================================================
   TESTIMONIALS
   ============================================================ */
export const testimonials = [
  {
    id:       1,
    name:     'María José Torres',
    role:     'Directora',
    company:  'Academia Luz al Mundo',
    avatar:   '/images/testimonial-1.jpg',
    rating:   5,
    text: 'René transformó nuestra visión en una plataforma educativa excepcional. Su código es limpio, el sistema es rápido y la experiencia para nuestros estudiantes es increíble. ¡Totalmente recomendado!',
  },
  {
    id:       2,
    name:     'Dr. Carlos Mendoza',
    role:     'Fundador',
    company:  'Fundación Clínica del Alma',
    avatar:   '/images/testimonial-2.jpg',
    rating:   5,
    text: 'El sistema de gestión clínica que René desarrolló supera todo lo que esperábamos. La telemedicina funciona perfectamente y el panel admin es muy intuitivo. Un profesional de primer nivel.',
  },
  {
    id:       3,
    name:     'Ana Lucía Vera',
    role:     'CEO',
    company:  'TechStartup EC',
    avatar:   '/images/testimonial-3.jpg',
    rating:   5,
    text: 'Contratamos a René para una API crítica de producción y el resultado fue impecable. Documentación excelente, código de calidad y entrega antes del plazo. Definitivamente trabajaremos de nuevo.',
  },
]
