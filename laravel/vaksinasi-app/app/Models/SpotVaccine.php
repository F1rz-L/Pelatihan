<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpotVaccine extends Model
{
    use HasFactory;

    protected $fillable = [
        'spot_id',
        'vaccine_id',
    ];
}
