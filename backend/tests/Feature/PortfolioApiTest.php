<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\ProjectSeeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\SkillSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    private function user(): User
    {
        return User::create(['name' => 'Administrador de prueba', 'email' => 'admin@example.test', 'password' => 'synthetic-test-password']);
    }

    private function catalog(): void
    {
        $this->seed([ProjectSeeder::class, SkillSeeder::class, ServiceSeeder::class]);
    }

    public function test_unpublished_records_are_visible_only_in_admin(): void
    {
        $project = Project::create(['title' => 'Borrador privado', 'is_published' => false]);
        $this->getJson('/api/projects')->assertJsonPath('data', [])->assertJsonPath('meta.catalog_version', 2);
        $this->getJson('/api/projects/'.$project->id)->assertNotFound();
        Sanctum::actingAs($this->user());
        $this->getJson('/api/admin/projects')->assertJsonCount(1, 'data');
        $this->putJson('/api/admin/projects/'.$project->id, ['is_published' => true])->assertOk();
        $this->getJson('/api/projects')->assertJsonCount(1, 'data');
    }

    public function test_catalog_sync_previews_without_writes_and_requires_explicit_overwrite(): void
    {
        $this->artisan('portfolio:sync')->assertSuccessful();
        $this->assertDatabaseCount('projects', 0);
        $this->artisan('portfolio:sync', ['--apply' => true])->assertSuccessful();
        $this->assertDatabaseCount('projects', 8);
        Project::where('catalog_key', 'academia')->update(['description' => 'Edición posterior']);
        $this->artisan('portfolio:sync', ['--apply' => true])->assertSuccessful();
        $this->assertDatabaseHas('projects', ['description' => 'Edición posterior']);
        $this->artisan('portfolio:sync', ['--apply' => true, '--overwrite' => true])->assertSuccessful();
        $this->assertDatabaseMissing('projects', ['description' => 'Edición posterior']);
        $this->assertDatabaseCount('projects', 8);
    }

    public function test_public_catalog_matches_shared_data_and_has_no_percentage_levels(): void
    {
        $this->catalog();
        $this->getJson('/api/projects')->assertOk()->assertJsonCount(8, 'data')
            ->assertJsonPath('data.0.catalog_key', 'academia')->assertJsonPath('data.1.catalog_key', 'fundacion');
        $this->getJson('/api/skills')->assertOk()->assertJsonPath('data.0.experience', 'practice')
            ->assertJsonMissingPath('data.0.level');
        $this->getJson('/api/services')->assertOk()->assertJsonCount(5, 'data');
    }

    public function test_seeders_are_repeatable_and_preserve_edits_and_contacts(): void
    {
        $this->catalog();
        Project::first()->update(['title' => 'Título editado', 'description' => 'Edición administrativa']);
        Skill::first()->update(['name' => 'Nombre editado']);
        Contact::create(['name' => 'Demo', 'email' => 'demo@example.test', 'message' => 'Mensaje sintético']);
        $this->catalog();
        $this->assertDatabaseCount('projects', 8);
        $this->assertDatabaseCount('skills', 16);
        $this->assertDatabaseCount('services', 5);
        $this->assertDatabaseHas('projects', ['description' => 'Edición administrativa']);
        $this->assertDatabaseCount('contacts', 1);
    }

    public function test_seeder_refuses_missing_admin_configuration(): void
    {
        config(['portfolio.admin_email' => null, 'portfolio.admin_password' => null]);
        $this->expectException(\RuntimeException::class);
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_lists_and_writes_require_authentication(): void
    {
        foreach (['projects', 'skills', 'services', 'contacts', 'stats'] as $resource) {
            $this->getJson('/api/admin/'.$resource)->assertUnauthorized();
        }
        $this->postJson('/api/admin/projects', ['title' => 'Unauthorized'])->assertUnauthorized();
    }

    public function test_admin_crud_is_reflected_in_public_catalog(): void
    {
        Sanctum::actingAs($this->user());
        foreach ([
            'projects' => ['title' => 'Proyecto de prueba', 'tech' => ['React'], 'display_order' => 0, 'period' => '2026', 'achievements' => ['Aporte comprobado']],
            'skills' => ['name' => 'Habilidad de prueba', 'category' => 'frontend', 'experience' => 'practice'],
            'services' => ['title' => 'Servicio de prueba', 'features' => ['Alcance acordado']],
        ] as $resource => $payload) {
            $this->getJson('/api/admin/'.$resource)->assertOk();
            $id = $this->postJson('/api/admin/'.$resource, array_merge($payload, ['is_published' => true]))->assertCreated()->json('data.id');
            $field = $resource === 'skills' ? 'name' : 'title';
            $this->putJson('/api/admin/'.$resource.'/'.$id, [$field => 'Actualizado'])->assertOk();
            $this->getJson('/api/'.$resource)->assertOk()->assertJsonFragment([$field => 'Actualizado']);
            $this->deleteJson('/api/admin/'.$resource.'/'.$id)->assertOk();
            $this->getJson('/api/'.$resource)->assertJsonPath('data', []);
        }
    }

    public function test_admin_validation_rejects_script_urls_and_invalid_skill_classification(): void
    {
        Sanctum::actingAs($this->user());
        $this->postJson('/api/admin/projects', ['title' => '<b></b>'])->assertUnprocessable();
        $this->postJson('/api/admin/projects', ['title' => 'Demo', 'live_url' => 'javascript:alert(1)'])->assertUnprocessable();
        $this->postJson('/api/admin/skills', ['name' => 'React', 'category' => 'frontend', 'experience' => 'expert'])->assertUnprocessable();
    }

    public function test_contact_sanitizes_before_validation_and_does_not_echo_personal_data(): void
    {
        $payload = ['name' => '<b>Demo</b>', 'email' => 'demo@example.test', 'service' => '<i>Soporte</i>', 'message' => '<p>Consulta de prueba</p>'];
        $this->postJson('/api/contact', $payload)->assertCreated()->assertJsonMissingPath('data');
        $this->assertDatabaseHas('contacts', ['name' => 'Demo', 'service' => 'Soporte', 'message' => 'Consulta de prueba']);
        $this->postJson('/api/contact', ['name' => '<b></b>', 'email' => 'demo@example.test', 'message' => 'Consulta'])->assertUnprocessable();
    }

    public function test_contact_is_limited_to_three_requests_per_hour(): void
    {
        $payload = ['name' => 'Demo', 'email' => 'demo@example.test', 'message' => 'Consulta sintética'];
        for ($i = 0; $i < 3; $i++) {
            $this->postJson('/api/contact', array_merge($payload, ['is_published' => true]))->assertCreated();
        }
        $this->postJson('/api/contact', $payload)->assertTooManyRequests();
        $this->assertDatabaseCount('contacts', 3);
    }

    public function test_database_cache_supports_rate_limiting(): void
    {
        config(['cache.default' => 'database']);
        $payload = ['name' => 'Demo', 'email' => 'demo@example.test', 'message' => 'Consulta sintética'];
        for ($i = 0; $i < 3; $i++) {
            $this->postJson('/api/contact', $payload)->assertCreated();
        }
        $this->postJson('/api/contact', $payload)->assertTooManyRequests();
        $this->assertGreaterThan(0, DB::table('cache')->count());
    }

    public function test_stats_include_real_months_across_year_boundaries(): void
    {
        $this->travelTo(now()->setDate(2026, 1, 15));
        Sanctum::actingAs($this->user());
        Contact::create(['name' => 'Demo', 'email' => 'demo@example.test', 'message' => 'Demo'])->forceFill(['created_at' => now()->subMonth()])->save();
        $this->getJson('/api/admin/stats')->assertOk()->assertJsonPath('data.contacts', 1)
            ->assertJsonCount(6, 'data.monthly')->assertJsonPath('data.monthly.4.month', '2025-12')
            ->assertJsonPath('data.monthly.4.total', 1)->assertJsonPath('data.monthly.5.total', 0);
    }

    public function test_login_rejects_invalid_credentials_and_limits_attempts(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/admin/login', ['email' => 'demo@example.test', 'password' => 'invalid'])->assertUnprocessable();
        }
        $this->postJson('/api/admin/login', ['email' => 'demo@example.test', 'password' => 'invalid'])->assertTooManyRequests();
    }

    public function test_bearer_token_expires_after_twenty_four_hours(): void
    {
        $user = $this->user();
        $token = $this->postJson('/api/admin/login', ['email' => $user->email, 'password' => 'synthetic-test-password'])->assertOk()->json('token');
        $this->withToken($token)->getJson('/api/admin/me')->assertOk();
        $this->travel(23)->hours();
        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/admin/me')->assertOk();
        $this->travel(2)->hours();
        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/admin/me')->assertUnauthorized();
    }

    public function test_logout_revokes_the_current_token(): void
    {
        $user = $this->user();
        $token = $user->createToken('admin-token')->plainTextToken;
        $this->withToken($token)->postJson('/api/admin/logout')->assertOk();
        $this->assertDatabaseCount('personal_access_tokens', 0);
        $this->app['auth']->forgetGuards();
        $this->withToken($token)->getJson('/api/admin/me')->assertUnauthorized();
    }
}
