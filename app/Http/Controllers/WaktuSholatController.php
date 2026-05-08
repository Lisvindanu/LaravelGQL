<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WaktuSholatController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $kota = $request->string('kota')->trim()->toString() ?: null;

        return Inertia::render('WaktuSholat/Index', [
            'kota'   => $kota,
            'result' => $kota ? $this->service->getWaktuSholat($kota) : null,
        ]);
    }
}
