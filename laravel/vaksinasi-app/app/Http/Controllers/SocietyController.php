<?php

namespace App\Http\Controllers;

use App\Models\Society;
use App\Http\Requests\StoreSocietyRequest;
use App\Http\Requests\UpdateSocietyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class SocietyController extends Controller
{
    public function login(Request $request){
        // validate id_card_number & password
        $validation = $request->validate([
            'id_card_number' => 'required',
            'password' => 'required',
        ]);

        $data = Society::with('regional')->where('id_card_number', $request->id_card_number)->first();
        if($data){
            if(Hash::check($request->password, $data->password)){
                $data->login_tokens = md5($data->id_card_number);
                return response()->json([
                    'message' => 'Login Success',
                    'data' => $data,
                ],200);
            }
            else{
                return response()->json([
                    'message' => 'ID Card Number or Password incorrect'
                ], 401);
            }
        }
        else{
            return response()->json([
                'message' => 'ID Card Number or Password incorrect'
            ], 401);
        }
    }

    public function logout(Request $request){
        $token = $request->get('token');
        $data = Society::where('login_tokens', $token)->first();
        if($data){
            $data->login_tokens = null;
            $data->save();
            return response()->json([
                'message' => 'Logout Succesful :3'
            ], 200);
        }
        return response()->json([
            'message' => 'Invalid Token Rawr >:('
        ], 401);
    }
}
