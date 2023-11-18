<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Http\Requests\StoreKategoriRequest;
use App\Http\Requests\UpdateKategoriRequest;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Kategori::with('barang')->get();
        return response ()->json([
            'success' => true,
            'message' => 'Daftar data kategori',
            'data' => $data
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(HttpRequest $request)
    {
        $input = $request->all();
        $kategori = Kategori::create($input);
        return response()->json([
            'success' => true,
            'message'=>'Kategori Berhasil Ditambahkan',
            'data' => $kategori
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategori $kategori)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kategori $kategori)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategori $kategori)
    {
        $kategori->update($request->all());
        $kategori->save();
        return response()->json([
            'success' => true,
            'message'=>'Kategori diupdate',
            'data'=> $kategori
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategori $kategori)
    {
        $kategori->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Kategori Dihapus',
            'data'=>$kategori,
        ],200);
    }
}
