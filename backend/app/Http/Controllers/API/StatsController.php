<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function index()
    {
        $totalProjects  = Project::count();
        $totalSkills    = Skill::count();
        $totalServices  = Service::count();
        $totalContacts  = Contact::count();
        $unreadContacts = Contact::whereNull('read_at')->count();

        // Monthly contacts (last 6 months) — PostgreSQL syntax
        $monthly = Contact::select(
                DB::raw("TO_CHAR(created_at, 'Mon') as month"),
                DB::raw('COUNT(*) as total')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy(DB::raw("TO_CHAR(created_at, 'Mon')"), DB::raw("DATE_TRUNC('month', created_at)"))
            ->orderBy(DB::raw("DATE_TRUNC('month', created_at)"))
            ->get();

        // Skills by category
        $byCategory = Skill::select('category', DB::raw('COUNT(*) as total'))
            ->groupBy('category')
            ->get();

        return response()->json([
            'data' => [
                'projects'      => $totalProjects,
                'skills'        => $totalSkills,
                'services'      => $totalServices,
                'contacts'      => $totalContacts,
                'unread'        => $unreadContacts,
                'monthly'       => $monthly,
                'byCategory'    => $byCategory,
            ],
        ]);
    }
}
