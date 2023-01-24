<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $Product = Product::all();
        return response()->json($Product);
    }
    public function create(ProductRequest $request)
    {
        $Product = new Product();
        $Product->name = $request->get("name");
        $Product->packaging = $request->get("packaging");
        $Product->unit_of_measure = $request->get("unit_of_measure");
        $Product->type = $request->get("type");

        $Product->save();
        return response()->json($Product->id);
    }
    public function update(Product $Product, ProductRequest $request)
    {

        $Product->name = $request->get("name");
        $Product->packaging = $request->get("packaging");
        $Product->unit_of_measure = $request->get("unit_of_measure");
        $Product->type = $request->get("type");

        $Product->save();
        return response()->json($Product->toArray());
    }
    public function delete(Product $Product)
    {
        $Product->delete();
        return response()->json("OK");
    }
}
