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

Route::post('/provider/login', [AuthController::class, 'authenticate']);
Route::post('/provider/register', [RegisteredProviderController::class, 'register']);
Route::post('/provider/logout', [AuthController::class, 'destroy']);

Route::get('/provider/user', [AuthController::class, 'user']);

Route::get('/provider/services', [ServiceController::class, 'index']);
Route::get('/provider/services/create', [ServiceController::class, 'create']);
Route::post('provider/services/store', [ServiceController::class, 'store']);
Route::get('/provider/services/{service}/edit', [ServiceController::class, 'edit']);
Route::post('/provider/services/{service}/update', [ServiceController::class, 'update']);
Route::delete('/provider/services/{service}', [ServiceController::class, 'destroy']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'provider'])->get('/provider', function (Request $request) {
    return $request->user();
})->middleware('provider');