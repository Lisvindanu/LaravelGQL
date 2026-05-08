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
        $kotaNama = $request->string('kota')->toString();
        $kotaKode = $request->string('kota_kode')->toString();
        $kecamatanNama = $request->string('kecamatan')->toString();

        $kotaList = [];
        $kecamatanList = [];

        if ($provinsiKode) {
            $provinsiDetail = $this->service->getProvinsi($provinsiKode);
            $kotaList = $provinsiDetail['kota'] ?? [];
        }

        if ($kotaKode) {
            $kotaDetail = $this->service->getKota($kotaKode);
            $kecamatanList = array_map(
                fn ($k) => ['kode' => $k['kode'], 'nama' => $k['nama']],
                $kotaDetail['kecamatan'] ?? []
            );
        }

        $cuacaQuery = $kecamatanNama ?: $kotaNama;

        return Inertia::render('Cuaca/Index', [
            'provinsiList' => $this->service->getProvinsiList(),
            'kotaList' => $kotaList,
            'kecamatanList' => $kecamatanList,
            'cuaca' => $cuacaQuery ? $this->service->getCuaca($provinsiKode, $cuacaQuery) : null,
            'selectedProvinsi' => $provinsiKode,
            'selectedKota' => $kotaNama,
            'selectedKotaKode' => $kotaKode,
            'selectedKecamatan' => $kecamatanNama,
        ]);
    }
}
