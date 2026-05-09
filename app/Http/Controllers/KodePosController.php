<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KodePosController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $kode = $request->string('kode')->toString();

        return Inertia::render('KodePos/Index', [
            'kode' => $kode,
            'results' => $kode ? $this->service->getKodePos($kode) : [],
        ]);
    }
}
