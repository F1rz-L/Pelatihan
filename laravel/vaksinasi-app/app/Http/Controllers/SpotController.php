<?php

namespace App\Http\Controllers;

use App\Models\Spot;
use App\Http\Requests\StoreSpotRequest;
use App\Http\Requests\UpdateSpotRequest;
use App\Models\Vaccination;
use App\Models\Vaccine;
use Illuminate\Support\Facades\Validator;

class SpotController extends Controller
{
    public function index()
    {
        $data = Spot::with('vaccines')->get();
        $vaccines = Vaccine::all();

        $result = [];

        foreach($data as $key => $value){
            $result[$key]['id'] = $value ->id;
            $result[$key]['name'] = $value ->name;
            $result[$key]['address'] = $value ->address;
            $result[$key]['serve'] = $value ->serve;
            $result[$key]['capacity'] = $value ->capacity;
            foreach($vaccines as $vaccine){
                foreach($value->vaccines as $spotVaccine){
                    $name = $vaccine->name;
                    if($vaccine->id == $spotVaccine->id){
                        $result[$key]['avalaible_vaccines'][$name] = true;
                    }else if(!isset($result[$key]['avalaible_vaccines'][$name])){
                        $result[$key]['avalaible_vaccines'][$name] = false;
                    }
                }
            }
        }

        return response()->json([
            'message' => 'success',
            'data' => ['spots'=>$result],
        ], 200);
    }

    public function show($id)
    {
        $spot = Spot::find($id);
        $date = request()->get('date');
        
        if(!$date){
            $date = date('yyyy-mm-dd');
        }
        
        $params = array_merge(['spot'=>$spot, 'date'=>$date]);
        
        $valid = Validator::make($params, [
            'date' => 'date_format:Y-m-d',
            'spot' => 'required',
        ]);
        
        if($valid->fails()){
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $valid->errors(),
            ], 422);
        }

        $vaccination_count = Vaccination::where('spot_id', $spot->id)
            ->where('date', $date)
            ->count();

        $data = [
            'date'=>$date,
            'spot'=>$spot,
            'vaccination_count'=>$vaccination_count,
        ];

        return response()->json([
            'message'=>'success',
            'data' =>$data,
        ], 200);
    }
}
