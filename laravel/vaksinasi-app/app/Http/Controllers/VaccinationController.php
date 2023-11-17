<?php

namespace App\Http\Controllers;

use App\Models\Vaccination;
use App\Http\Requests\StoreVaccinationRequest;
use App\Http\Requests\UpdateVaccinationRequest;
use App\Models\Consultation;
use App\Models\Society;
use App\Models\Spot;
use Database\Seeders\SpotSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    public function index(Request $request)
    {
        $vaccinations = Vaccination::with('spot.regional','vaccine', 'vaccinator')->where('society_id',$request->society->id)->get();
        $result = [];
        foreach ($vaccinations as $key => $value) {
            $keyIndex = '';
            if($key == 0){
                $keyIndex = 'first';
            }else{
                $keyIndex = 'second';
            }

            $countBefore = Vaccination::where('spot_id',$value->spot_id)
                ->where('vaccine_id', $value->vaccine_id)
                ->where('date', $value->date)
                ->where('id','<', $value->id)
                ->count() + 1;

            $result[$keyIndex]['queue'] = $countBefore;
            $result[$keyIndex]['dose'] = $value->dose;
            $result[$keyIndex]['vaccination_date'] = $value->date;
            $result[$keyIndex]['spot'] = $value->spot;
            $result[$keyIndex]['status'] = 'done';
            $result[$keyIndex]['vaccine'] = $value->vaccine;
            $result[$keyIndex]['vaccinator'] = $value->vaccinator;
        }

        if(count($vaccinations)==1){
            $result['second'] = null;
        }elseif(count($vaccinations)==0){
            $result['first']=null;
            $result['second']=null;
        }

        return response()->json([
            'message'=>'success',
            'data'=>[
                'vaccinations'=>$result
            ]
        ],200);
    }

    public function store(Request $request)
    {
        $spot = Spot::find($request->spot_id);
        if(!$spot){
            return response()->json([
                'message'=>'Invalid field',
                'errors'=>'Spot is not found',
            ], 401);
        }
        $validator = Validator::make($request->all(),[
            'date'=>'required|date_format:Y-m-d',
            'spot_id'=>'required|integer',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Invalid Field',
                'errors'=>$validator->errors()
            ],401);
        }

        $lastConsultation = Consultation::where('society_id', $request->society->id)
        ->orderBy('id','desc')
        ->first();

        if(!$lastConsultation){
            return response()->json([
                'message'=>'Your consultation must be accepted by a doctor before'
            ], 401);
        }elseif($lastConsultation->status != 'accepted'){
            return response()->json([
                'message' => 'Your consultation must be accepted by a doctor before'
            ], 401);
        }

        $recentVaccination = Vaccination::where('society_id', $request->society->id)
            ->select('date')->get();

        if(count($recentVaccination)==2){
            return response()->json([
                'message' => 'Society has been 2x vaccinated'
            ], 401);
        }elseif(count($recentVaccination)==1){
            $date = date('Y-m-d', strtotime($recentVaccination[0]->date.'+ 30 days'));
            if($request->date<$date){
                return response()->json([
                    'message'=>'Wait atleast 30 days from the first vaccination'
                ], 401);
            }
        }

        $vaccination = Vaccination::create([
            'dose' => count($recentVaccination)+1,
            'date' => $request->date,
            'society_id' => $request->society->id,
            'spot_id' => $request->spot_id,
            'vaccine_id' => $lastConsultation->vaccine_id,
            'doctor_id' => $lastConsultation->doctor_id,
            'officer_id' => null,
        ]);

        $message = "First vaccination registered successfully";
        if($vaccination->dose==2){
            $message = "Second vaccination registered successfully";
        }

        return response()->json([
            'message'=>$message,
            'data'=>$vaccination,
        ], 200);
    }
}
