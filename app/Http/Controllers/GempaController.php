<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Inertia\Inertia;
use Inertia\Response;

class GempaController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(): Response
    {
        return Inertia::render('Gempa/Index', [
            'terbaru' => $this->service->getGempaTerbaru(),
            'list' => $this->service->getGempaList(),
        ]);
    }
}
