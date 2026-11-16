<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Support\PortfolioCatalog;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        PortfolioCatalog::seed(Service::class, 'services', 'title');
    }
}
