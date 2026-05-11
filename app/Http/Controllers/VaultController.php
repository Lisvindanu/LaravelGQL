<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VaultController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Vault/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $validEmail    = config('vault.email');
        $validPassword = config('vault.password');

        if ($request->email === $validEmail && $request->password === $validPassword) {
            $request->session()->put('vault_ok', true);

            return redirect()->route('vault.dev');
        }

        return back()->withErrors(['email' => 'Email atau password salah.']);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('vault_ok');

        return redirect()->route('vault.login');
    }
}
