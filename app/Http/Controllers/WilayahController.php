<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WilayahController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $searchQuery = $request->string('q')->toString();
        $provinsiKode = $request->string('provinsi')->toString();

        return Inertia::render('Wilayah/Index', [
            'provinsiList' => $this->service->getProvinsiList(),
            'searchQuery' => $searchQuery,
            'searchResults' => $searchQuery ? $this->service->searchWilayah($searchQuery) : [],
            'provinsiDetail' => $provinsiKode ? $this->service->getProvinsi($provinsiKode) : null,
            'selectedProvinsi' => $provinsiKode,
        ]);
    }
}
