<?php

namespace Database\Seeders;

use App\Models\Skill;
use App\Support\PortfolioCatalog;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        PortfolioCatalog::seed(Skill::class, 'skills', 'name');
    }
}
