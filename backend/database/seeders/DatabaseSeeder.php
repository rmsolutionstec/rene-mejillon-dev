<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user — change email and password before deploying
        User::firstOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@renemejillon.dev')],
            [
                'name'     => 'René Mejillón',
                'password' => Hash::make(env('ADMIN_PASSWORD', 'changeme_before_deploy')),
            ]
        );

        $this->call([
            ProjectSeeder::class,
            SkillSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
