<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class WorkerControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_workers()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/1');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/2');

        $response->assertStatus(403);
    }

    public function test_searchWorkers()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/searchWorkers/2');

        $response->assertStatus(403);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/searchWorkers/1', [
                'column' => "name",
                'order' => "asc",
                'searchString' => "Teszt"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/searchWorkers/1');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/workers/searchWorkers/1', [
                'column' => "Teszt"
            ]);

        $response->assertStatus(422);
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
            ->json('post', '/api/workers/add', [
                'email' => "vasarlo@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/add', [
                'email' => "admin@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/add', [
                'email' => "vasarlo@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/add');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/add', [
                'email' => "dolgozo2@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(409);
    }

    public function test_add_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'dolgozo@localhost',
            'password' => 'asd123'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/add', [
                'email' => "vasarlo@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(403);
    }

    public function test_update_user1()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "vasarlo@localhost",
                'permission' => 1,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "dolgozo@localhost",
                'permission' => 5,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "dolgozo@localhost",
                'permission' => 10,
            ]);

        $response->assertStatus(200);


        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "admin@localhost",
                'permission' => 5,
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "dolgozo2@localhost",
                'permission' => 5,
            ]);

        $response->assertStatus(409);
    }

    public function test_update_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'dolgozo@localhost',
            'password' => 'asd123'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/update', [
                'email' => "dolgozo@localhost",
                'permission' => 1,
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
            ->json('post', '/api/workers/delete', [
                'emails' => ["vasarlo@localhost"]
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/delete', [
                'emails' => ["dolgozo@localhost"]
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/delete', [
                'emails' => ["nemletezo@localhost"]
            ]);

        $response->assertStatus(404);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/delete', [
                'emails' => ["admin@localhost"]
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/delete', [
                'emails' => ["dolgozo2@localhost"]
            ]);

        $response->assertStatus(409);
    }

    public function test_delete_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'dolgozo@localhost',
            'password' => 'asd123'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/workers/delete', [
                'emails' => ["admin@localhost"]
            ]);

        $response->assertStatus(403);
    }
}
