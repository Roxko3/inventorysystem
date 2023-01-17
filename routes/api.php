<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ShopTypeController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StorageController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Models\Shop;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/getShop/{shop}', [ShopController::class, 'get']);
    Route::put("/myShop/{shop}", [ShopController::class, "update"])->name("updateShop");
    Route::post("/myShop/{shop}/uploadImage", [ShopController::class, "uploadImage"])->name("uploadImage");

    Route::group(['prefix' => '/ratings'], function () {
        Route::get("/", [RatingController::class, "index"])->name("getRatings");
        Route::post("/create", [RatingController::class, "create"])->name("createRating");
        Route::put("/{rating}", [RatingController::class, "update"])->name("updateRating");
        Route::delete("/{rating}", [RatingController::class, "delete"])->name("deleteRating");
    });
});

Route::post("/login", [AuthController::class, "login"])->name("login");
Route::post("/register", [AuthController::class, "register"])->name("register");

Route::group(['prefix' => '/users'], function () {
    Route::get("/", [UserController::class, "index"])->name("getUsers");
    Route::post("/create", [UserController::class, "create"])->name("createUser");
    Route::put("/{user}", [UserController::class, "update"])->name("updateUser");
    Route::delete("/{user}", [UserController::class, "delete"])->name("deleteUser");
});
Route::group(['prefix' => '/shops'], function () {
    Route::get("/", [ShopController::class, "index"])->name("getShops");
    Route::post("/create", [ShopController::class, "create"])->name("createShop");
    Route::put("/{shop}", [ShopController::class, "update"])->name("updateShop");
    Route::delete("/{shop}", [ShopController::class, "delete"])->name("deleteShop");
});
Route::group(['prefix' => '/shoptypes'], function () {
    Route::get("/", [ShopTypeController::class, "index"])->name("getShoptypes");
    Route::post("/create", [ShopTypeController::class, "create"])->name("createShoptype");
    Route::put("/{shoptype}", [ShopTypeController::class, "update"])->name("updateShoptype");
    Route::delete("/{shoptype}", [ShopTypeController::class, "delete"])->name("deleteshoptype");
});
Route::group(['prefix' => '/logs'], function () {
    Route::get("/", [LogController::class, "index"])->name("getlogs");
    Route::post("/create", [LogController::class, "create"])->name("createlog");
    Route::delete("/{log}", [LogController::class, "delete"])->name("deletelog");
});
Route::group(['prefix' => '/products'], function () {
    Route::get("/", [ProductController::class, "index"])->name("getproducts");
    Route::post("/create", [ProductController::class, "create"])->name("createproduct");
    Route::put("/{product}", [ProductController::class, "update"])->name("updateproduct");
    Route::delete("/{product}", [ProductController::class, "delete"])->name("deleteproduct");
});
Route::group(['prefix' => '/storage'], function () {
    Route::get("/", [StorageController::class, "index"])->name("getstorages");
    Route::post("/create", [StorageController::class, "create"])->name("createstorage");
    Route::put("/{storage}", [StorageController::class, "update"])->name("updatestorage");
    Route::delete("/{storage}", [StorageController::class, "delete"])->name("deletestorage");
});
