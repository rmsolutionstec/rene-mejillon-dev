<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['projects', 'skills', 'services'] as $name) {
            Schema::table($name, fn (Blueprint $table) => $table->boolean('is_published')->default(false));
        }
        Schema::table('projects', function (Blueprint $table) {
            $table->string('catalog_key')->nullable()->unique();
            $table->unsignedInteger('display_order')->default(100);
            $table->string('image')->nullable();
            $table->string('period')->nullable();
            $table->string('participation')->nullable();
            $table->json('achievements')->nullable();
        });
        Schema::table('services', fn (Blueprint $table) => $table->string('catalog_key')->nullable()->unique());
        Schema::table('skills', function (Blueprint $table) {
            $table->string('experience', 20)->default('learning');
            $table->string('catalog_key')->nullable()->unique();
        });
    }

    public function down(): void
    {
        foreach (['projects', 'skills', 'services'] as $name) {
            Schema::table($name, fn (Blueprint $table) => $table->dropColumn('is_published'));
        }
        Schema::table('projects', function (Blueprint $table) {
            $table->dropUnique(['catalog_key']);
            $table->dropColumn(['catalog_key', 'display_order', 'image', 'period', 'participation', 'achievements']);
        });
        Schema::table('services', function (Blueprint $table) {
            $table->dropUnique(['catalog_key']);
            $table->dropColumn('catalog_key');
        });
        Schema::table('skills', function (Blueprint $table) {
            $table->dropUnique(['catalog_key']);
            $table->dropColumn(['experience', 'catalog_key']);
        });
    }
};
