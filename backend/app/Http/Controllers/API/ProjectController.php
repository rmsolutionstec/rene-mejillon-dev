<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['data' => Project::when(! $request->is('api/admin/*'), fn ($query) => $query->where('is_published', true))->orderBy('display_order')->orderByDesc('featured')->orderByDesc('year')->get(), 'meta' => ['catalog_version' => 2]]);
    }

    public function show($id)
    {
        return response()->json(['data' => Project::where('is_published', true)->findOrFail($id)]);
    }

    public function store(ProjectRequest $request)
    {
        return response()->json(['data' => Project::create($request->validated())], 201);
    }

    public function update(ProjectRequest $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->validated());

        return response()->json(['data' => $project]);
    }

    public function destroy($id)
    {
        Project::findOrFail($id)->delete();

        return response()->json(['message' => 'Proyecto eliminado.']);
    }
}
