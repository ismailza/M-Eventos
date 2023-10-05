<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use Illuminate\Http\Request;

class ProviderController extends Controller
{
    public function index()
    {
        // 
    }

    public function show(Provider $provider)
    {
        return response()->json([
            'status' => 200,
            'provider' => $provider
        ]);
    }
}
