<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\ShopTypeController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StorageController;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkerController;
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
    Route::group(['prefix' => '/myProfile'], function () {
        Route::get('/', [ProfileController::class, 'myProfile'])->name("myProfile");
        Route::post('/nameEmail', [ProfileController::class, 'nameEmail'])->name("NameOrEmailChange");
        Route::post('/passwordChange', [ProfileController::class, 'passwordChange'])->name("passwordChange");
        Route::post('/postalCodeChange', [ProfileController::class, 'postalCodeChange'])->name("postalCodeChange");
        Route::post("/uploadImage", [ProfileController::class, "uploadImage"])->name("uploadImage");
        Route::delete("/deleteImage", [ProfileController::class, "deleteImage"])->name("deleteImage");
    });

    Route::post('/Logout', [AuthController::class, 'logout'])->name("logout");
    Route::get('/getShop/{shop}', [ShopController::class, 'get']);
    Route::put("/myShop/{shop}", [ShopController::class, "update"])->name("updateShop");

    Route::group(['prefix' => '/shops'], function () {
        Route::get("/", [ShopController::class, "index"])->name("getShops");
        Route::get('/getStorage/{shop}', [StorageController::class, 'getStorage'])->name("getStorage");
        Route::get('/searchStorage/{shop}', [StorageController::class, 'searchStorage'])->name("searchStorage");
        Route::post("/create", [ShopController::class, "create"])->name("createShop");
        Route::put("/{shop}", [ShopController::class, "update"])->name("updateShop");
        Route::delete("/{shop}", [ShopController::class, "delete"])->name("deleteShop");
        Route::post("/rate/{shop}", [RatingController::class, "rate"])->name("rateShop");
        Route::post("/{shop}/uploadImage", [ShopController::class, "uploadImage"])->name("uploadImage");
        Route::delete("/{shop}/deleteImage", [ShopController::class, "deleteImage"])->name("deleteImage");
        Route::post("/{shop}/OpeningHours", [ShopController::class, "OpeningHours"])->name("updateOpeningHours");
    });

    Route::group(['prefix' => '/storages'], function () {
        Route::post("/add", [StorageController::class, "add"])->name("addItem");
        Route::put("/{storage}", [StorageController::class, "update"])->name("updatestorage");
        Route::delete("/delete", [StorageController::class, "delete"])->name("deletestorage");
    });

    Route::group(['prefix' => '/workers'], function () {
        Route::get('/{shop}', [WorkerController::class, 'workers'])->name("showWorkers");
        Route::get('/searchWorkers/{shop}', [WorkerController::class, 'searchWorkers'])->name("showWorkers");
        Route::post('/add', [WorkerController::class, 'add'])->name("addWorker");
        Route::post('/update', [WorkerController::class, 'update'])->name("updateWorker");
        Route::post('/delete', [WorkerController::class, 'delete'])->name("deleteWorker");
    });

    Route::group(['prefix' => '/logs'], function () {
        Route::get("/{shop}", [LogController::class, "index"])->name("getlogs");
        Route::get("/searchLogs/{shop}", [LogController::class, "searchLogs"])->name("searchlogs");
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

Route::group(['prefix' => '/shoptypes'], function () {
    Route::get("/", [ShopTypeController::class, "index"])->name("getShoptypes");
    Route::post("/create", [ShopTypeController::class, "create"])->name("createShoptype");
    Route::put("/{shoptype}", [ShopTypeController::class, "update"])->name("updateShoptype");
    Route::delete("/{shoptype}", [ShopTypeController::class, "delete"])->name("deleteshoptype");
});

Route::group(['prefix' => '/products'], function () {
    Route::get("/", [ProductController::class, "index"])->name("getproducts");
    Route::post("/create", [ProductController::class, "create"])->name("createproduct");
    Route::put("/{product}", [ProductController::class, "update"])->name("updateproduct");
    Route::delete("/{product}", [ProductController::class, "delete"])->name("deleteproduct");
});

Route::get("/storages", [StorageController::class, "index"])->name("getstorages");
