<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShopControllerTest extends TestCase
{
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
            ->json('get', '/api/getShop/1');

        $response->assertStatus(200);
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
                'postal_code' => "9700"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/shops/create', [
                'name' => "bolt2",
                'shop_type_id' => 1,
                'address' => "utca",
                'owner' => "Józsi",
                'postal_code' => "9700"
            ]);

        $response->assertStatus(403);
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
}
