<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InflasiController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $tahun = $request->integer('tahun') ?: (int) date('Y');

        return Inertia::render('Inflasi/Index', [
            'list' => $this->service->getInflasi($tahun),
            'tahun' => $tahun,
        ]);
    }
}
