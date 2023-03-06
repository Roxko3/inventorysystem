<?php

namespace Tests\Feature;

use Database\Seeders\RatingErrorSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ShopControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_index()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/');

        $response->assertStatus(200);
    }

    public function test_get()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/1');

        $response->assertStatus(200);

        $this->seed(RatingErrorSeeder::class);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/1');

        $response->assertStatus(500);
    }

    public function test_create()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'vasarlo@localhost',
            'password' => 'password'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/create');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/create', [
                'name' => "bolt",
                'shop_type_id' => 1,
                'address' => "utca",
                'owner' => "Józsi",
                'city' => "Szombathely",
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/create', [
                'name' => "bolt2",
                'shop_type_id' => 1,
                'address' => "utca",
                'owner' => "Józsi",
                'city' => "Szombathely",
            ]);

        $response->assertStatus(403);
    }

    public function test_update()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/shops/1');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/shops/2', [
                'name' => "bolt",
                'shop_type_id' => 1,
                'address' => "utca",
                'owner' => "Józsi",
                'city' => "Szombathely",
            ]);

        $response->assertStatus(403);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/shops/1', [
                'name' => "bolt",
                'shop_type_id' => 3,
                'address' => "utca",
                'owner' => "Józsi",
                'city' => "Szombathely",
            ]);

        $response->assertStatus(200);
    }

    public function test_delete()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/1');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/2');

        $response->assertStatus(403);
    }

    public function test_uploadImage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/uploadImage');

        $response->assertStatus(422);

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/1/deleteImage');

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/2/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(403);
    }

    public function test_deleteImage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/1/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/1/deleteImage');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/1/deleteImage');

        $response->assertStatus(404);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/shops/2/deleteImage');

        $response->assertStatus(403);
    }
}
