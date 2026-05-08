<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KalenderJawaController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $tanggal = $request->string('tanggal')->toString();

        return Inertia::render('KalenderJawa/Index', [
            'tanggal' => $tanggal ?: date('Y-m-d'),
            'result' => $tanggal ? $this->service->getKalenderJawa($tanggal) : null,
        ]);
    }
}
