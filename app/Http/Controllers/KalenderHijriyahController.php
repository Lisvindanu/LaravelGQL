<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KalenderHijriyahController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $tanggal = $request->string('tanggal')->toString();

        return Inertia::render('KalenderHijriyah/Index', [
            'tanggal' => $tanggal ?: date('Y-m-d'),
            'result' => $tanggal ? $this->service->getKalenderHijriyah($tanggal) : null,
        ]);
    }
}
