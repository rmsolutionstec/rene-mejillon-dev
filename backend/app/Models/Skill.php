<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_published', 'catalog_key',
        'name',
        'experience',
        'category',
        'icon',
    ];

    protected $hidden = ['level'];

    protected $casts = [
        'is_published' => 'boolean',
        'level' => 'integer',
    ];
}
