<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KrlController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $stasiunId = $request->string('stasiunId')->toString();
        $timeFrom = $request->string('timeFrom')->toString();
        $timeTo = $request->string('timeTo')->toString();

        return Inertia::render('Krl/Index', [
            'stasiun' => $this->service->getStasiunKRL(),
            'stasiunId' => $stasiunId,
            'jadwal' => $stasiunId ? $this->service->getJadwalKRL($stasiunId, $timeFrom ?: null, $timeTo ?: null) : [],
        ]);
    }
}
