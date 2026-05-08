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
        $kotaKode = $request->string('kota')->toString();

        $kotaDetail = null;
        $cuaca = null;

        if ($kotaKode) {
            $kotaDetail = $this->service->getKota($kotaKode);
            if ($kotaDetail) {
                $provinsiFromKota = substr($kotaKode, 0, 2);
                $kotaNama = strtolower(preg_replace('/^(kota|kabupaten)\s+/i', '', $kotaDetail['nama']));
                $cuaca = $this->service->getCuaca($provinsiFromKota, $kotaNama);
            }
        }

        return Inertia::render('Wilayah/Index', [
            'provinsiList' => $this->service->getProvinsiList(),
            'searchQuery' => $searchQuery,
            'searchResults' => $searchQuery ? $this->service->searchWilayah($searchQuery) : [],
            'provinsiDetail' => $provinsiKode ? $this->service->getProvinsi($provinsiKode) : null,
            'selectedProvinsi' => $provinsiKode,
            'kotaDetail' => $kotaDetail,
            'selectedKota' => $kotaKode,
            'cuaca' => $cuaca,
        ]);
    }
}
