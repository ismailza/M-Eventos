<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::whereHas('service', function ($query) {
            $query->where('provider_id', Auth::guard('provider')->user()->id);
        })->with('service', 'client', 'package')->latest()->get();
    }
}
