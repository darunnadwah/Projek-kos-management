<?php

use App\Http\Controllers\RoomController;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\PermitController;
use App\Models\Room;
use App\Models\Rental;
use App\Models\Permit;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Redirect Halaman Utama ke Login
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Group Route yang Membutuhkan Autentikasi (Login)
Route::middleware(['auth'])->group(function () {

    // Halaman Dashboard Utama
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'stats' => [
                'totalRooms'   => Room::count(),
                'totalRentals' => Rental::count(),
                'totalPermits' => Permit::count(),
            ]
        ]);
    })->name('dashboard');

    // Akses untuk Semua User yang Sudah Login (Superadmin, Admin, User)
    Route::resource('rentals', RentalController::class);
    Route::resource('permits', PermitController::class);

    // Akses Khusus Admin & Superadmin saja
    Route::middleware(['role:admin,superadmin'])->group(function () {
        Route::resource('rooms', RoomController::class);
    });

    // Akses Khusus Superadmin saja
    Route::middleware(['role:superadmin'])->group(function () {
        // Route khusus superadmin nanti ditempatkan di sini
    });

});

// 3. Import Route Autentikasi bawaan Breeze (Login, Register, Logout, dll)
require __DIR__.'/auth.php';