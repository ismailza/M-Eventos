<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisteredProviderRequest;
use App\Models\Provider;

class RegisteredProviderController extends Controller
{
    public function register(RegisteredProviderRequest $request) {
        $data = $request->validated();
        $data['photo'] = $request->validated('photo')->store('images/providers', 'public');
        Provider::create($data);
        return response()->json([
            'status' => 200,
            'message' => 'Vous êtes inscrit avec succès',
        ], 200);
    }
}
