<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(['data' => Service::when(! $request->is('api/admin/*'), fn ($query) => $query->where('is_published', true))->orderBy('id')->get(), 'meta' => ['catalog_version' => 2]]);
    }

    public function show($id)
    {
        return response()->json(['data' => Service::where('is_published', true)->findOrFail($id)]);
    }

    public function store(ServiceRequest $request)
    {
        return response()->json(['data' => Service::create($request->validated())], 201);
    }

    public function update(ServiceRequest $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->validated());

        return response()->json(['data' => $service]);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();

        return response()->json(['message' => 'Servicio eliminado.']);
    }
}
