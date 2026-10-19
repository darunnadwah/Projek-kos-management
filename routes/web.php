<?php

use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RentalController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserController;

Route::view('/', 'welcome');

Route::resource('rooms', RoomController::class);
Route::resource('rentals', RentalController::class);
Route::resource('permissions', PermissionController::class);
Route::resource('users', UserController::class);