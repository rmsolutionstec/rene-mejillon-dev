<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\SkillRequest;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['data' => Skill::when(! $request->is('api/admin/*'), fn ($query) => $query->where('is_published', true))->orderBy('id')->get(), 'meta' => ['catalog_version' => 2]]);
    }

    public function show($id)
    {
        return response()->json(['data' => Skill::findOrFail($id)]);
    }

    public function store(SkillRequest $request)
    {
        return response()->json(['data' => Skill::create($request->validated())], 201);
    }

    public function update(SkillRequest $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->validated());

        return response()->json(['data' => $skill]);
    }

    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();

        return response()->json(['message' => 'Habilidad eliminada.']);
    }
}
