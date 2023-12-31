<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::prefix('user')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('search/{search}', 'search');
        Route::get('getPosts', 'getPosts');
        Route::get('getLikedPosts', 'getLikedPosts');
        Route::get('getFollowingPosts', 'getFollowingPosts');
        Route::post('likePost', 'likePost');
        Route::post('followUser', 'followUser');
        Route::post('addPost', 'addPost');
    });
});