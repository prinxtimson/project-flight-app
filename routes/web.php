<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('about-us', function () {
    return view('welcome');
});

Route::get('help', function () {
    return view('welcome');
});

Route::get('contact-us', function () {
    return view('welcome');
});

Route::middleware(['guest'])->group(function () {
    
    Route::get('login', function () {
        return view('welcome');
    })->name('login');

    Route::get('register', function () {
        return view('welcome');
    })->name('register');

    Route::get('password/reset/{token}', function () {
        return view('welcome');
    })->name('password.reset');

    Route::get('forgot-password', function () {
        return view('welcome');
    });

});

Route::prefix('bookings')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::get('schedule', function () {
        return view('welcome');
    });
    Route::get('reschedule', function () {
        return view('welcome');
    });
    Route::get('cancel', function () {
        return view('welcome');
    });
});

