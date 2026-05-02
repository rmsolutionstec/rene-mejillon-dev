<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Frontend
            ['name' => 'React.js',     'level' => 92, 'category' => 'frontend', 'icon' => 'SiReact'],
            ['name' => 'Vue.js',       'level' => 85, 'category' => 'frontend', 'icon' => 'SiVuedotjs'],
            ['name' => 'Next.js',      'level' => 80, 'category' => 'frontend', 'icon' => 'SiNextdotjs'],
            ['name' => 'Tailwind CSS', 'level' => 95, 'category' => 'frontend', 'icon' => 'SiTailwindcss'],
            ['name' => 'TypeScript',   'level' => 78, 'category' => 'frontend', 'icon' => 'SiTypescript'],
            // Backend
            ['name' => 'Laravel',      'level' => 95, 'category' => 'backend', 'icon' => 'SiLaravel'],
            ['name' => 'PHP',          'level' => 93, 'category' => 'backend', 'icon' => 'SiPhp'],
            ['name' => 'Node.js',      'level' => 72, 'category' => 'backend', 'icon' => 'SiNodedotjs'],
            ['name' => 'REST APIs',    'level' => 95, 'category' => 'backend', 'icon' => 'FaCode'],
            ['name' => 'GraphQL',      'level' => 60, 'category' => 'backend', 'icon' => 'SiGraphql'],
            // Database
            ['name' => 'MySQL',        'level' => 90, 'category' => 'database', 'icon' => 'SiMysql'],
            ['name' => 'PostgreSQL',   'level' => 75, 'category' => 'database', 'icon' => 'SiPostgresql'],
            ['name' => 'Redis',        'level' => 70, 'category' => 'database', 'icon' => 'SiRedis'],
            ['name' => 'MongoDB',      'level' => 55, 'category' => 'database', 'icon' => 'SiMongodb'],
            // DevOps
            ['name' => 'Git / GitHub', 'level' => 90, 'category' => 'devops', 'icon' => 'SiGit'],
            ['name' => 'Docker',       'level' => 68, 'category' => 'devops', 'icon' => 'SiDocker'],
            ['name' => 'Vercel',       'level' => 88, 'category' => 'devops', 'icon' => 'SiVercel'],
            ['name' => 'Railway',      'level' => 80, 'category' => 'devops', 'icon' => 'FaCloud'],
            ['name' => 'Linux/Ubuntu', 'level' => 72, 'category' => 'devops', 'icon' => 'SiLinux'],
        ];

        foreach ($skills as $s) {
            Skill::create($s);
        }
    }
}
