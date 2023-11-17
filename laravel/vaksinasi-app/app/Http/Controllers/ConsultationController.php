<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Http\Requests\StoreConsultationRequest;
use App\Http\Requests\UpdateConsultationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultationController extends Controller
{
    public function index(Request $request)
    {
        $data = Consultation::with('doctor')->where('society_id', $request->society->id);
        $data = $data->select('id','status','disease_history','current_symptoms','doctor_notes','doctor_id')->get();
        return response()->json([
            'message' => 'success',
            'data' => $data
        ], 200);
    }

    
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'disease_history' => 'required|string',
            'current_symptoms' => 'required|string',
        ]);

        if($validation->fails()){
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $validation->errors()
            ], 422);
        }

        $data = Consultation::create([
            'society_id' => $request->society->id,
            'doctor_id' => NULL,
            'status' => 'pending',
            'disease_history' => $request->disease_history,
            'current_symptoms' => $request->current_symptoms,
        ]);

        return response()->json([
            'message' => 'Request consultation sent succesful'
        ], 200);
    }
}
