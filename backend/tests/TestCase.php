<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    public function createApplication()
    {
        $app = parent::createApplication();
        // CI-only opt-in: fixed synthetic service, never local .env credentials.
        if (getenv('PORTFOLIO_TEST_POSTGRES') === '1') {
            $app['config']->set('database.default', 'pgsql');
            $app['config']->set('database.connections.pgsql', [
                'driver' => 'pgsql', 'host' => '127.0.0.1', 'port' => 5432,
                'database' => 'portfolio_test', 'username' => 'portfolio',
                'password' => 'portfolio_test_only', 'charset' => 'utf8',
                'prefix' => '', 'search_path' => 'public', 'sslmode' => 'prefer',
            ]);
        }

        return $app;
    }
}
