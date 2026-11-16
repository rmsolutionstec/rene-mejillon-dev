<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_published',
        'title', 'catalog_key',
        'description',
        'icon',
        'price',
        'features',
        'popular',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'features' => 'array',
        'popular' => 'boolean',
    ];
}
