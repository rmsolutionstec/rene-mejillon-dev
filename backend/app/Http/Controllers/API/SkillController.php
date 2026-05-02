<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::orderBy('category')->orderByDesc('level')->get();

        return response()->json(['data' => $skills]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:100',
            'level'    => 'required|integer|min:0|max:100',
            'category' => 'required|in:frontend,backend,database,devops',
            'icon'     => 'nullable|string|max:100',
        ]);

        $skill = Skill::create($validated);

        return response()->json(['data' => $skill], 201);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name'     => 'sometimes|required|string|max:100',
            'level'    => 'sometimes|required|integer|min:0|max:100',
            'category' => 'sometimes|required|in:frontend,backend,database,devops',
            'icon'     => 'nullable|string|max:100',
        ]);

        $skill->update($validated);

        return response()->json(['data' => $skill]);
    }

    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return response()->json(['message' => 'Habilidad eliminada.']);
    }
}
