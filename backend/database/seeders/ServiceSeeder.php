<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title'       => 'Desarrollo Web Full Stack',
                'description' => 'Aplicaciones web completas con React/Vue en el frontend y Laravel en el backend. Escalables, seguras y optimizadas.',
                'icon'        => 'FaCode',
                'price'       => 'Desde $1,500 USD',
                'features'    => [
                    'React / Vue.js + Laravel',
                    'Base de datos MySQL / PostgreSQL',
                    'API REST documentada',
                    'Panel de administración',
                    'Diseño responsive',
                    'Despliegue incluido',
                ],
                'popular'     => true,
            ],
            [
                'title'       => 'API REST & Backend',
                'description' => 'Desarrollo de APIs robustas con Laravel, autenticación Sanctum/JWT, documentación con Swagger y tests automatizados.',
                'icon'        => 'FaRocket',
                'price'       => 'Desde $800 USD',
                'features'    => [
                    'Laravel 10/11',
                    'Autenticación segura',
                    'Documentación Swagger',
                    'Tests PHPUnit',
                    'Cache con Redis',
                    'Deploy en Railway',
                ],
                'popular'     => false,
            ],
            [
                'title'       => 'Tienda en Línea',
                'description' => 'Ecommerce profesional con catálogo, carrito, pagos online (Stripe / PayPal) y panel de gestión de pedidos.',
                'icon'        => 'FaShoppingCart',
                'price'       => 'Desde $2,000 USD',
                'features'    => [
                    'Catálogo de productos',
                    'Carrito y checkout',
                    'Integración Stripe / PayPal',
                    'Gestión de pedidos',
                    'Panel de inventario',
                    'SEO optimizado',
                ],
                'popular'     => false,
            ],
            [
                'title'       => 'Landing Page',
                'description' => 'Páginas de aterrizaje de alto impacto, optimizadas para conversión, velocidad y SEO. Ideal para campañas y productos.',
                'icon'        => 'FaDesktop',
                'price'       => 'Desde $400 USD',
                'features'    => [
                    'Diseño personalizado',
                    'Animaciones modernas',
                    'Formulario de contacto',
                    'Google Analytics',
                    'Optimización SEO',
                    'Entrega en 5 días',
                ],
                'popular'     => false,
            ],
            [
                'title'       => 'App Móvil (React Native)',
                'description' => 'Aplicaciones móviles multiplataforma (iOS y Android) con React Native conectadas a backend Laravel.',
                'icon'        => 'FaMobile',
                'price'       => 'Desde $3,000 USD',
                'features'    => [
                    'iOS + Android',
                    'React Native / Expo',
                    'Notificaciones push',
                    'Modo offline',
                    'Backend API incluido',
                    'Publicación en stores',
                ],
                'popular'     => false,
            ],
            [
                'title'       => 'Consultoría & Auditoría',
                'description' => 'Revisión de arquitectura, rendimiento y seguridad de proyectos existentes. Asesoría para equipos de desarrollo.',
                'icon'        => 'FaCogs',
                'price'       => 'Desde $150 USD/hora',
                'features'    => [
                    'Auditoría de código',
                    'Análisis de rendimiento',
                    'Revisión de seguridad',
                    'Recomendaciones documentadas',
                    'Mentoría técnica',
                    'Sesiones por videollamada',
                ],
                'popular'     => false,
            ],
        ];

        foreach ($services as $s) {
            Service::create($s);
        }
    }
}
