<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('featured', 'desc')
            ->orderBy('year', 'desc')
            ->get();

        return response()->json(['data' => $projects]);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);

        return response()->json(['data' => $project]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:200',
            'short_desc'  => 'nullable|string|max:300',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'status'      => 'nullable|string|max:50',
            'tech'        => 'nullable|array',
            'tech.*'      => 'string|max:50',
            'live_url'    => 'nullable|url|max:255',
            'github_url'  => 'nullable|url|max:255',
            'year'        => 'nullable|integer|min:2010|max:2050',
            'featured'    => 'boolean',
        ]);

        $project = Project::create($validated);

        return response()->json(['data' => $project], 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:200',
            'short_desc'  => 'nullable|string|max:300',
            'description' => 'nullable|string',
            'category'    => 'nullable|string|max:100',
            'status'      => 'nullable|string|max:50',
            'tech'        => 'nullable|array',
            'tech.*'      => 'string|max:50',
            'live_url'    => 'nullable|url|max:255',
            'github_url'  => 'nullable|url|max:255',
            'year'        => 'nullable|integer|min:2010|max:2050',
            'featured'    => 'boolean',
        ]);

        $project->update($validated);

        return response()->json(['data' => $project]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Proyecto eliminado.']);
    }
}
