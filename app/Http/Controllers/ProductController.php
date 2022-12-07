<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function indexproduct()
    {
        $Product = Product::all();
        return response()->json($Product);
    }
    public function createproduct(ProductRequest $request)
    {
        $Product = new Product();
        $Product->name = $request->get("name");
        $Product->packaging = $request->get("packaging");
        $Product->unit_of_measure= $request->get("unit_of_measure");
        $Product->type= $request->get("type");

        $Product->save();
        return response()->json($Product->id);
    }
    public function updateproduct(Product $Product, ProductRequest $request)
    {
        
        $Product->name = $request->get("name");
        $Product->packaging = $request->get("packaging");
        $Product->unit_of_measure= $request->get("unit_of_measure");
        $Product->type= $request->get("type");

        $Product->save();
        return response()->json($Product->toArray());
    }
    public function deleteproduct(Product $Product)
    {
        $Product->delete();
        return response()->json("OK");
    }

}
