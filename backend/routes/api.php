<?php

use App\Http\Controllers\Provider\AuthController;
use App\Http\Controllers\Provider\RegisteredProviderController;
use App\Http\Controllers\Provider\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/provider')->group(function () {
    Route::post('/login', [AuthController::class, 'authenticate']);
    Route::post('/register', [RegisteredProviderController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'destroy']);

    Route::get('/user', [AuthController::class, 'user']);

    Route::prefix('/services')->group(function () {
        Route::get('/', [ServiceController::class, 'index']);
        Route::get('/create', [ServiceController::class, 'create']);
        Route::post('/store', [ServiceController::class, 'store']);
        Route::get('/{service}/edit', [ServiceController::class, 'edit']);
        Route::post('/{service}/update', [ServiceController::class, 'update']);
        Route::delete('/{service}', [ServiceController::class, 'destroy']);
    });
});


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'provider'])->get('/provider', function (Request $request) {
    return $request->user();
})->middleware('provider');