<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NikController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $nik = $request->string('nik')->toString();

        return Inertia::render('Nik/Index', [
            'nik' => $nik,
            'result' => $nik ? $this->service->validasiNIK($nik) : null,
        ]);
    }
}
