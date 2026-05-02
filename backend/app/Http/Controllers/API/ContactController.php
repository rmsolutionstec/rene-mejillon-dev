<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $contacts = Contact::orderByDesc('created_at')
            ->when($request->query('unread'), fn ($q) => $q->whereNull('read_at'))
            ->get();

        return response()->json(['data' => $contacts]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:150',
            'email'   => 'required|email|max:200',
            'subject' => 'nullable|string|max:200',
            'service' => 'nullable|string|max:150',
            'message' => 'required|string|max:3000',
        ]);

        $contact = Contact::create($validated);

        return response()->json([
            'message' => '¡Mensaje enviado correctamente! Me pondré en contacto pronto.',
            'data'    => $contact,
        ], 201);
    }

    public function markRead($id)
    {
        $contact = Contact::findOrFail($id);

        if (! $contact->read_at) {
            $contact->update(['read_at' => now()]);
        }

        return response()->json(['data' => $contact]);
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Contacto eliminado.']);
    }
}
