<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Support\PortfolioCatalog;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        PortfolioCatalog::seed(Project::class, 'projects', 'title');
    }
}
