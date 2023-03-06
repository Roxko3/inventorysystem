<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ShopTypeControllerTest extends TestCase
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

        $response = $this->json('get', '/api/shoptypes/');

        $response->assertStatus(200);
    }


    public function test_create()
    {
        $this->seed();

        $response = $this->json('post', '/api/shoptypes/create', [
            'name' => "description",
        ]);

        $response->assertStatus(422);

        $response = $this->json('post', '/api/shoptypes/create', [
            'name' => "description",
            'size' => "asc",
        ]);

        $response->assertStatus(200);
    }

    public function test_update()
    {
        $this->seed();

        $response = $this->json('put', '/api/shoptypes/1', [
            'name' => "description",
            'size' => "asc",
        ]);

        $response->assertStatus(200);
    }

    public function test_delete()
    {
        $this->artisan('migrate:fresh');

        $response = $this->json('post', '/api/shoptypes/create', [
            'name' => "description",
            'size' => "asc",
        ]);

        $response = $this->json('delete', '/api/shoptypes/1');

        $response->assertStatus(200);
    }
}
