<?php

namespace App\Providers;

use App\Models\Shop;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('shop-worker', function (User $user, int $shop) {
            return $user->shop_id === $shop;
        });

        Gate::define('shop-cashier', function (User $user) {
            return $user->permission >= 1;
        });

        Gate::define('shop-manager', function (User $user) {
            return $user->permission >= 5;
        });

        Gate::define('shop-owner', function (User $user) {
            return $user->permission >= 10;
        });
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $spaUrl = $url;

            return (new MailMessage)
                ->subject('Verify Email Address')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', $spaUrl);
        });
    }
}
