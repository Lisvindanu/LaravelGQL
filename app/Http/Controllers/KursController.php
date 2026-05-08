<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Inertia\Inertia;
use Inertia\Response;

class KursController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(): Response
    {
        return Inertia::render('Kurs/Index', [
            'kurs' => $this->service->getKurs(),
        ]);
    }
}
