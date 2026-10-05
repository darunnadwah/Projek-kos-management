<?php

use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'welcome');

Route::resource('rooms', RoomController::class);
