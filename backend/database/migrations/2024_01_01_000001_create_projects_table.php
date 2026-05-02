<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('short_desc', 300)->nullable();
            $table->text('description')->nullable();
            $table->string('category', 100)->nullable();
            $table->string('status', 50)->default('Completado');
            $table->json('tech')->nullable();
            $table->string('live_url', 255)->nullable();
            $table->string('github_url', 255)->nullable();
            $table->unsignedSmallInteger('year')->nullable();
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
