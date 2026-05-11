<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PenginapanController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $kota = $request->string('kota')->toString();

        return Inertia::render('Penginapan/Index', [
            'list'      => $kota ? $this->service->getPenginapan($kota) : [],
            'kotaInput' => $kota,
        ]);
    }
}
