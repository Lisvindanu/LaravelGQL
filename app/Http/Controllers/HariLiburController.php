<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HariLiburController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $tahun = $request->integer('tahun', (int) date('Y'));
        $bulan = $request->has('bulan') ? $request->integer('bulan') : null;

        return Inertia::render('HariLibur/Index', [
            'hariLibur' => $this->service->getHariLibur($tahun, $bulan),
            'selectedTahun' => $tahun,
            'selectedBulan' => $bulan,
        ]);
    }
}
