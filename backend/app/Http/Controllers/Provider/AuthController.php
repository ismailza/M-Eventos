<?php

namespace App\Http\Controllers\Provider;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'username' => ['required', 'string', 'min:3', 'max:40'],
            'password' => ['required', 'min:8'],
            'remember' => ['nullable', 'boolean'],
        ]);
        // authentification with username or email
        $fieldType = filter_var($credentials['username'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        // merge the field type with the request
        $credentials = array_merge([$fieldType => $credentials['username']], ['password' => $credentials['password']]);
        // attempt to authenticate the provider
        if (Auth::guard('provider')->attempt($credentials, $request->has('remember'))) {
            $request->session()->regenerate();
            return response()->json([
                'status' => 200,
                'message' => 'You are logged in successfully.',
                'user' => Auth::guard('provider')->user(),
            ], 200);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Invalid credentials.',
            ], 401);
        }
    }

    public function destroy(Request $request)
    {
        Auth::guard('provider')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status' => 200,
            'message' => 'You are logged out successfully.',
        ], 200);
    }
}
