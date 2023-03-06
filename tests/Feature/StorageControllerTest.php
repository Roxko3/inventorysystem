<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StorageControllerTest extends TestCase
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
            ->json('get', '/api/storages/');

        $response->assertStatus(200);
    }

    public function test_getStorage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/getStorage/1');

        $response->assertStatus(200);
    }

    public function test_searchStorage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/searchStorage/1', [
                'column' => "name",
                'order' => "asc",
                'searchString' => "tej"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/searchStorage/1', [
                'column' => "price",
                'order' => "asc",
                'searchString' => "tej",
                'is_deleted' => "0"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/searchStorage/1', [
                'is_deleted' => "0"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/searchStorage/1', [
                'column' => "teszt",
                'order' => "teszt",
                'searchString' => "teszt"
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/shops/searchStorage/1', [
                'column' => "stock"
            ]);

        $response->assertStatus(200);
    }

    public function test_add_user1()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/storages/add', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 1000
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/storages/add', [
                'product_id' => "name",
                'amount' => "!",
                'price' => 1007457457450
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/storages/add', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 2000
            ]);

        $response->assertStatus(409);
    }

    public function test_add_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'vasarlo@localhost',
            'password' => 'password'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/storages/add', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 1000
            ]);

        $response->assertStatus(403);
    }

    public function test_update()
    {
        //$this->artisan('migrate:fresh');
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/storages/1', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 1000,
                'expiration' => null
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/storages/5', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 1000
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('put', '/api/storages/4', [
                'product_id' => 1,
                'amount' => 50,
                'price' => 1000
            ]);

        $response->assertStatus(403);
    }

    public function test_delete_user1()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/storages/delete', [
                "ids" => [1, 2, 3]
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/storages/delete', [
                "ids" => [1, 2, 4]
            ]);

        $response->assertStatus(403);
    }

    public function test_delete_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'vasarlo@localhost',
            'password' => 'password'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/storages/delete', [
                "ids" => [1, 2, 3]
            ]);

        $response->assertStatus(403);
    }
}
