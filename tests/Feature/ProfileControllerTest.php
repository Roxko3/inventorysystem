<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProfileControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_myProfile()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('get', '/api/myProfile');

        $response->assertStatus(200);
    }

    public function test_nameEmail()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'name' => 'admin2',
                'email' => 'admin2@localhost'
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'name' => 'admin',
                'email' => 'vasarlo@localhost'
            ]);

        $response->assertStatus(409);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/nameEmail', [
                'name' => 'admin',
            ]);

        $response->assertStatus(422);
    }

    public function test_passwordChange()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange');

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange', [
                'old-password' => "alma",
                'new-password' => "TesztElek1",
                'new-password-repeat' => "TesztElek1"
            ]);

        $response->assertStatus(422);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange', [
                'old-password' => "admin",
                'new-password' => "TesztElek1",
                'new-password-repeat' => "TesztElek1"
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/passwordChange', [
                'old-password' => "TesztElek1",
                'new-password' => "TesztElek1",
                'new-password-repeat' => "TesztElek1"
            ]);

        $response->assertStatus(422);
    }

    public function test_cityChange()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/cityChange', [
                'city' => "Szombathely",
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/cityChange', [
                'city' => "123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432123432532523432",
            ]);

        $response->assertStatus(422);
    }

    public function test_uploadImage()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $image = UploadedFile::fake()->create('image.jpg', 100);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(200);
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
            ->json('post', '/api/myProfile/uploadImage', [
                'image' => $image,
            ]);

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteImage');

        $response->assertStatus(404);;
    }

    public function test_deleteProfile()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('delete', '/api/myProfile/deleteProfile');

        $response->assertStatus(200);
    }

    public function test_leaveShop_user1()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'admin@localhost',
            'password' => 'admin'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/leaveShop');

        $response->assertStatus(403);
    }

    public function test_leaveShop_user2()
    {
        $this->seed();

        $response = $this->post('api/login', [
            'email' => 'dolgozo@localhost',
            'password' => 'asd123'
        ]);

        $token = json_decode($response->content(), true)['token'];

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/leaveShop');

        $response->assertStatus(200);

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->json('post', '/api/myProfile/leaveShop');

        $response->assertStatus(403);
    }
}
