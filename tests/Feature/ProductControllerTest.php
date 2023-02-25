<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function test_index()
    {
        $this->seed();

        $response = $this->json('get', '/api/products/');

        $response->assertStatus(200);
    }


    public function test_create()
    {
        $this->seed();

        $response = $this->json('post', '/api/products/create', [
            'name' => "description",
        ]);

        $response->assertStatus(422);

        $response = $this->json('post', '/api/products/create', [
            'name' => "description",
            'packaging' => "asc",
            'unit_of_measure' => "tej",
            'type' => "asd"
        ]);

        $response->assertStatus(200);
    }

    public function test_update()
    {
        $this->seed();

        $response = $this->json('put', '/api/products/1', [
            'name' => "update",
            'packaging' => "asc",
            'unit_of_measure' => "tej",
            'type' => "asd"
        ]);

        $response->assertStatus(200);
    }

    public function test_delete()
    {
        $this->artisan('migrate:fresh');

        $this->json('post', '/api/products/create', [
            'name' => "description",
            'packaging' => "asc",
            'unit_of_measure' => "tej",
            'type' => "asd"
        ]);

        $response = $this->json('delete', '/api/products/1');

        $response->assertStatus(200);
    }
}
