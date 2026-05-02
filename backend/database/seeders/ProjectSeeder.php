<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title'      => 'Academia Luz al Mundo',
                'short_desc' => 'Plataforma educativa cristiana con cursos, certificaciones y sistema de estudiantes.',
                'description' => 'Sistema de gestión educativa completo para la Academia Luz al Mundo. Incluye módulos de inscripción, seguimiento de progreso, emisión de certificados digitales, foro de discusión y panel de administración para docentes.',
                'category'   => 'Web App',
                'status'     => 'Completado',
                'tech'       => ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS', 'Redis'],
                'live_url'   => 'https://academia-luzalmundo.com',
                'github_url' => null,
                'year'       => 2023,
                'featured'   => true,
            ],
            [
                'title'      => 'Fundación Clínica del Alma',
                'short_desc' => 'Web institucional con citas en línea, blog y gestión de servicios psicológicos.',
                'description' => 'Sitio web institucional para fundación de salud mental. Sistema de reserva de citas online, blog de contenido psicológico, catálogo de profesionales, formularios de evaluación inicial y área de pacientes con historial.',
                'category'   => 'Web App',
                'status'     => 'Completado',
                'tech'       => ['Laravel', 'React', 'MySQL', 'Tailwind CSS', 'Stripe'],
                'live_url'   => 'https://clinicadelalma.org',
                'github_url' => null,
                'year'       => 2024,
                'featured'   => true,
            ],
            [
                'title'      => 'Plataforma Ecommerce',
                'short_desc' => 'E-commerce multi-vendedor con pasarela de pagos y panel logístico.',
                'description' => 'Plataforma de comercio electrónico multi-vendedor con integración de múltiples pasarelas de pago, gestión de inventario en tiempo real, sistema de envíos automatizado y analytics avanzado.',
                'category'   => 'Ecommerce',
                'status'     => 'En desarrollo',
                'tech'       => ['Laravel', 'Next.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS S3'],
                'live_url'   => null,
                'github_url' => null,
                'year'       => 2024,
                'featured'   => false,
            ],
        ];

        foreach ($projects as $p) {
            Project::create($p);
        }
    }
}
