<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
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

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return redirect('/');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPass']);

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('about-us', function () {
    return view('welcome');
});

Route::get('help', function () {
    return view('welcome');
});

Route::get('contact-us', function () {
    return view('welcome');
});

Route::get('/email/verify', function () {
    return view('welcome');
})->middleware('auth:sanctum')->name('verification.notice');

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

Route::middleware(['auth:sanctum', 'verified'])->group(function () {

    Route::get('/change-password', function () {
        return view('welcome');
    });

    Route::get('/profile', function () {
        return view('welcome');
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
});