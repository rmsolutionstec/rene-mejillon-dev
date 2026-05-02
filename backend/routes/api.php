<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\ServiceController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\StatsController;

/*
|--------------------------------------------------------------------------
| Public routes
|--------------------------------------------------------------------------
*/
Route::get('/projects',     [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/skills',       [SkillController::class, 'index']);
Route::get('/services',     [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::post('/contact',     [ContactController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth routes
|--------------------------------------------------------------------------
*/
Route::post('/admin/login',  [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/admin/me',      [AuthController::class, 'me'])->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| Protected admin routes (Sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

    // Stats
    Route::get('/stats', [StatsController::class, 'index']);

    // Projects CRUD
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);

    // Skills CRUD
    Route::apiResource('skills', SkillController::class)->except(['index']);

    // Services CRUD
    Route::apiResource('services', ServiceController::class)->except(['index', 'show']);

    // Contacts management
    Route::get('/contacts',            [ContactController::class, 'index']);
    Route::patch('/contacts/{id}/read', [ContactController::class, 'markRead']);
    Route::delete('/contacts/{id}',    [ContactController::class, 'destroy']);
});
