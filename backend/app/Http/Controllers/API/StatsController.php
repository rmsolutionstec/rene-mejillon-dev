<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;

class StatsController extends Controller
{
    public function index()
    {
        $monthly = [];
        $first = now()->startOfMonth()->subMonths(5);
        for ($index = 0; $index < 6; $index++) {
            $start = $first->copy()->addMonths($index);
            $monthly[] = [
                'month' => $start->format('Y-m'),
                'total' => Contact::where('created_at', '>=', $start)->where('created_at', '<', $start->copy()->addMonth())->count(),
            ];
        }

        return response()->json(['data' => [
            'projects' => Project::count(), 'skills' => Skill::count(), 'services' => Service::count(),
            'contacts' => Contact::count(), 'unread' => Contact::whereNull('read_at')->count(),
            'monthly' => $monthly,
            'byCategory' => Skill::selectRaw('category, COUNT(*) as total')->groupBy('category')->get(),
        ]]);
    }
}
