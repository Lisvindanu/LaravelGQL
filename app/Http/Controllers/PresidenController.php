<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PresidenController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        return Inertia::render('Presiden/Index', [
            'list' => $this->service->getPresidenList(),
        ]);
    }
}
