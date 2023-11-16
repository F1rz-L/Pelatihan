<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Society extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_card_number',
        'name',
        'password',
        'born_date',
        'gender',
        'address',
        'login_tokens',
        'regional_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function regional(){
        return $this -> belongsTo(Regional::class);
    }
}
