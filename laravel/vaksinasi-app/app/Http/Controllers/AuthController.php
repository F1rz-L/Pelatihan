<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only(['email','password']);
        $account= User::where('email', $credentials['email'])->where('password',$credentials['password'])->first();
        if(!$account){
            return response()->json([
                'success'=>'false',
                'message'=>'Email Password None',
            ],401);
        }else{
            $account->remember_token = md5($credentials['email']);
            $account->save();
            return response()->json([
                'success'=>true,
                'message'=>'Login gud',
                'data'=>$account,
                'token'=>$account->remember_token,
            ],200);
        }  
    }
}
