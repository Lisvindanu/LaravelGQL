<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UmrController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $tahun = $request->integer('tahun') ?: 2025;

        return Inertia::render('UMR/Index', [
            'list' => $this->service->getUMRList($tahun),
            'tahun' => $tahun,
        ]);
    }
}
