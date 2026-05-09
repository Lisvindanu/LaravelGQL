<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Inertia\Inertia;
use Inertia\Response;

class BpjsController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(): Response
    {
        return Inertia::render('Bpjs/Index', [
            'list' => $this->service->getIuranBPJS(),
        ]);
    }
}
