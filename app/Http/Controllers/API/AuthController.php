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

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        JWTAuth::invalidate();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully'
        ], 200);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return response([
            'status' => 'success'
        ]);
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
            return response()->json(['error', 'Could Not Create Token'], 500);
        }

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user
        ], 200)->header('Authorization', "Bearer {$token}");
    }

    /**
     * The user has been registered.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function registered(Request $request, $user)
    {
        $request->session()->flash('status', "{$user->name} thank you for registering.");
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
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
}
