<?php

use Illuminate\Http\Request;

Route::post('register', 'API\AuthController@register');
Route::post('login', 'API\AuthController@authenticate');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/user', 'API\AuthController@user');
    Route::post('logout', 'API\AuthController@logout');
});
