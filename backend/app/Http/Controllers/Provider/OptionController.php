<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use App\Models\Option;
use Illuminate\Http\Request;

class OptionController extends Controller
{
    //
    public function store(Request $request)
    {
        Option::create([
            'name' => $request->name,
        ]);
        // return options
        return response()->json([
            'message' => 'Option created successfully',
            'options' => Option::all(),
        ]);
    }
}
