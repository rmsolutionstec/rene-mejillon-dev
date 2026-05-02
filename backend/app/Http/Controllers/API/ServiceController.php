<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderByDesc('popular')->orderBy('id')->get();

        return response()->json(['data' => $services]);
    }

    public function show($id)
    {
        $service = Service::findOrFail($id);

        return response()->json(['data' => $service]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:150',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:50',
            'price'       => 'nullable|string|max:100',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:200',
            'popular'     => 'boolean',
        ]);

        $service = Service::create($validated);

        return response()->json(['data' => $service], 201);
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title'       => 'sometimes|required|string|max:150',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:50',
            'price'       => 'nullable|string|max:100',
            'features'    => 'nullable|array',
            'features.*'  => 'string|max:200',
            'popular'     => 'boolean',
        ]);

        $service->update($validated);

        return response()->json(['data' => $service]);
    }

    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Servicio eliminado.']);
    }
}
