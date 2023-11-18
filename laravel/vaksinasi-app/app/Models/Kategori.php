<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'kategori'
    ];

    public function barang(){
        return $this -> hasMany(Barang::class, 'kategori_id', 'id');
    }    

    public function order() {
        return $this -> hasManyThrough(Order::class,Barang::class,'kategori_id','barang_id','id','id');
    }
}
