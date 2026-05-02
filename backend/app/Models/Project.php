<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
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
        'tech'     => 'array',
        'featured' => 'boolean',
        'year'     => 'integer',
    ];
}
