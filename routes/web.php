<?php

use App\Http\Controllers\Auth\EmailPasswordAuthController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;

Route::view('/', 'welcome');

Route::middleware('guest')->group(function () {
    Route::get('/login', [GoogleAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [EmailPasswordAuthController::class, 'login'])
        ->middleware('throttle:5,1')
        ->name('login.store');
    Route::get('/register', [EmailPasswordAuthController::class, 'showRegistration'])
        ->name('register');
    Route::post('/register', [EmailPasswordAuthController::class, 'register'])
        ->middleware('throttle:5,1')
        ->name('register.store');
    Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirectToGoogle'])
        ->middleware('throttle:10,1')
        ->name('auth.google.redirect');
    Route::get('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])
        ->middleware('throttle:10,1')
        ->name('auth.google.callback');
});

Route::post('/logout', [GoogleAuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

Route::middleware(['auth', 'role:admin,petugas'])->group(function () {
    Route::resource('rooms', RoomController::class);
});
Route::resource('rentals', RentalController::class);
Route::resource('permissions', PermissionController::class);
Route::resource('users', UserController::class);