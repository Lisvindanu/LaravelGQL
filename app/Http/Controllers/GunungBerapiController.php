<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GunungBerapiController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('GunungBerapi/Index', [
            'list' => $this->service->getGunungBerapiList(),
        ]);
    }
}
