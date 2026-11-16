<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_published',
        'image', 'title', 'catalog_key', 'display_order', 'period', 'participation', 'achievements',
        'short_desc',
        'description',
        'category',
        'status',
        'tech',
        'live_url',
        'github_url',
        'year',
        'featured',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'tech' => 'array', 'achievements' => 'array',
        'featured' => 'boolean',
        'year' => 'integer',
    ];
}
