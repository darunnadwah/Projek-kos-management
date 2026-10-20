<?php

use App\Http\Controllers\RoomController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\PermitController;
use App\Http\Controllers\UserController;
use App\Models\Room;
use App\Models\Rental;
use App\Models\Permit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Redirect Halaman Utama ke Login
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Group Route yang Membutuhkan Autentikasi (Login)
Route::middleware(['auth'])->group(function () {

    // Halaman Dashboard Utama
    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'stats' => [
                'totalRooms'   => Room::count(),
                'totalRentals' => Rental::when($user->role === 'user', fn ($query) => $query->where('user_id', $user->id))->count(),
                'totalPermits' => Permit::when($user->role === 'user', fn ($query) => $query->where('user_id', $user->id))->count(),
            ]
        ]);
    })->name('dashboard');

    Route::get('rentals', [RentalController::class, 'index'])->name('rentals.index');
    Route::get('permits', [PermitController::class, 'index'])->name('permits.index');

    // Penyewa mengajukan sewa dan izin; superadmin memiliki akses penuh.
    Route::middleware(['role:user,superadmin'])->group(function () {
        Route::resource('rentals', RentalController::class)->only(['create', 'store']);
        Route::resource('permits', PermitController::class)->only(['create', 'store']);
    });

    // Admin dan superadmin mengelola kamar, penyewaan, serta perizinan.
    Route::middleware(['role:admin,superadmin'])->group(function () {
        Route::resource('rooms', RoomController::class);
        Route::resource('rentals', RentalController::class)->only(['update', 'destroy']);
        Route::resource('permits', PermitController::class)->only(['update', 'destroy']);
    });

    // Hanya superadmin yang dapat mengelola akun dan peran pengguna.
    Route::middleware(['role:superadmin'])->group(function () {
        Route::resource('users', UserController::class)->except(['show']);
    });

});

// 3. Import Route Autentikasi bawaan Breeze (Login, Register, Logout, dll)
require __DIR__.'/auth.php';