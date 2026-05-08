<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TerbilangController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $angka = $request->has('angka') ? $request->integer('angka') : null;

        return Inertia::render('Terbilang/Index', [
            'angka' => $angka,
            'result' => $angka !== null ? $this->service->getTerbilang($angka) : null,
        ]);
    }
}
