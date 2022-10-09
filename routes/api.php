<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\FeedbackController;
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

Route::post('/login', [AuthController::class, 'api_login']);
Route::post('/forgot-password', [AuthController::class, 'apiForgotPass']);
Route::post('/reset-password', [AuthController::class, 'resetPass']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('feedbacks', [FeedbackController::class, 'index']);
Route::get('feedbacks/{id}', [FeedbackController::class, 'show']);
Route::post('feedbacks', [FeedbackController::class, 'store']);

Route::get('contact', [ContactUsController::class, 'index']);
Route::get('contact/{id}', [ContactUsController::class, 'show']);
Route::post('contact', [ContactUsController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::put('/change-password', [AuthController::class, 'changePass']);
    Route::put('/update', [AuthController::class, 'update']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/email/verification-notification', [AuthController::class, 'resendVerification']);
    Route::delete('delete', [AuthController::class, 'delete']);

    Route::get('bookings', [BookingController::class, 'index']);
    Route::get('bookings/{id}', [BookingController::class, 'show']);
    Route::post('bookings/{id}/cancel', [BookingController::class, 'cancel']);
    Route::post('bookings', [BookingController::class, 'store']);
    Route::put('bookings/{id}', [BookingController::class, 'update']);
    Route::delete('bookings/{id}', [BookingController::class, 'destroy']);
});