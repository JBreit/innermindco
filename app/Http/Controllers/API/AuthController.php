<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use JWTAuth;
use Validator;

class AuthController extends Controller
{
    /**
     * API Authenticate, on success return JWT Auth token
     * @param Request $request
     * @return JsonResponse
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'status' => 'error',
                'message' => $validator->messages()
            ]);
        }

        try {
            if (!$token = JWTAuth::attempt($credentials)) {

                return response()->json([
                    'status' => 'error',
                    'message' => 'We can`t find an account with this credentials.'
                ], 401);
            }
        } catch (JWTException $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Failed to login, please try again.'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'token' => $token
            ]
        ], 200)->header('Authorization', "Bearer {$token}");
    }

    public function register(RegisterFormRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'password' => bcrypt($request->password)
        ]);

        try {
          if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid Credentials'], 401);
          }
        } catch (JWTException $e) {
          return response()->json(['error', 'could_not_create_token'], 500);
        }

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ], 200)->header('Authorization', "Bearer {$token}");
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        $user = auth()->user();
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function refresh()
    {
        return response([
         'status' => 'success'
        ]);
    }
}
