<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email = config('portfolio.admin_email');
        $password = config('portfolio.admin_password');
        if (! $email || ! filter_var($email, FILTER_VALIDATE_EMAIL) || ! is_string($password) || strlen($password) < 12) {
            throw new \RuntimeException('Configura ADMIN_EMAIL y ADMIN_PASSWORD (mínimo 12 caracteres) antes de ejecutar el seeder.');
        }
        User::firstOrCreate(['email' => $email], ['name' => 'René Mejillón', 'password' => Hash::make($password)]);
        $this->call([ProjectSeeder::class, SkillSeeder::class, ServiceSeeder::class]);
    }
}
