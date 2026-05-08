<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlatNomorController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $kode = $request->string('kode')->upper()->trim()->toString() ?: null;

        return Inertia::render('PlatNomor/Index', [
            'kode'   => $kode,
            'result' => $kode ? $this->service->getPlatNomor($kode) : null,
        ]);
    }
}
