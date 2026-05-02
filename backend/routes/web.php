<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'René Mejillón Dev API', 'version' => '1.0']);
});
