<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VaultAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->session()->get('vault_ok')) {
            return redirect()->route('vault.login');
        }

        return $next($request);
    }
}
