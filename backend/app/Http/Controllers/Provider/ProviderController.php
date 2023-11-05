<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Provider;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProviderController extends Controller
{
    public function index()
    {
        return [
            'countServices' => Service::where('provider_id', Auth::guard('provider')->user()->id)->count(),
            'countBooking' => 0,
        ];
    }

    public function show(Provider $provider)
    {
        return response()->json([
            'status' => 200,
            'provider' => $provider
        ]);
    }

}
