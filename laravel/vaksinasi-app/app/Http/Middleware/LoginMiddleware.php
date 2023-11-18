<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->get('token');
        if(!$token){
            return response()->json([
                'success'=>false,
                'message'=>'Token Not found'
            ],401);
        }else{
            $account = User::where('remember_token', $token)-> first();
            if(!$account){
                return response()->json([
                    'success'=>false,
                    'message'=> 'Token not found'
                ],401);
            }
        }
        return $next($request);
    }
}
