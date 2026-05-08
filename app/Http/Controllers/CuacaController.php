<?php

namespace App\Http\Controllers;

use App\Services\IndonesiaQLService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CuacaController extends Controller
{
    public function __construct(
        private readonly IndonesiaQLService $service
    ) {}

    public function index(Request $request): Response
    {
        $provinsiKode = $request->string('provinsi_kode')->toString();
        $kota = $request->string('kota')->toString();

        $kotaList = [];
        if ($provinsiKode) {
            $provinsiDetail = $this->service->getProvinsi($provinsiKode);
            $kotaList = $provinsiDetail['kota'] ?? [];
        }

        return Inertia::render('Cuaca/Index', [
            'provinsiList' => $this->service->getProvinsiList(),
            'kotaList' => $kotaList,
            'cuaca' => ($provinsiKode && $kota) ? $this->service->getCuaca($provinsiKode, $kota) : null,
            'selectedProvinsi' => $provinsiKode,
            'selectedKota' => $kota,
        ]);
    }
}
