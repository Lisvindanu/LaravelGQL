<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class IndonesiaQLService
{
    private const string ENDPOINT = 'https://gographql.project-n.site/query';

    private function gql(string $query, array $variables = []): array
    {
        try {
            $payload = ['query' => $query];

            if (! empty($variables)) {
                $payload['variables'] = $variables;
            }

            $response = Http::timeout(15)->post(self::ENDPOINT, $payload);

            return $response->json('data') ?? [];
        } catch (\Throwable $e) {
            Log::error('GraphQL request failed', [
                'error' => $e->getMessage(),
                'query' => substr($query, 0, 100),
            ]);

            return [];
        }
    }

    public function getProvinsiList(): array
    {
        return Cache::rememberForever(
            'provinsi_list',
            fn () => $this->gql('{ provinsiList { kode nama } }')['provinsiList'] ?? []
        );
    }

    public function getProvinsi(string $kode): ?array
    {
        return Cache::rememberForever(
            "provinsi_{$kode}",
            fn () => $this->gql(
                'query GetProvinsi($kode: String!) { provinsi(kode: $kode) { nama kota { kode nama } } }',
                ['kode' => $kode]
            )['provinsi'] ?? null
        );
    }

    public function searchWilayah(string $query, int $limit = 10): array
    {
        return $this->gql(
            'query SearchWilayah($query: String!, $limit: Int) { searchWilayah(query: $query, limit: $limit) { kode nama tipe kota provinsi } }',
            ['query' => $query, 'limit' => $limit]
        )['searchWilayah'] ?? [];
    }

    public function getCuaca(string $provinsiKode, string $kota): ?array
    {
        $cacheKey = 'cuaca_'.$provinsiKode.'_'.str_replace(' ', '_', strtolower($kota));

        return Cache::remember(
            $cacheKey,
            1800,
            fn () => $this->gql(
                'query GetCuaca($provinsiKode: String!, $kota: String!) { cuaca(provinsiKode: $provinsiKode, kota: $kota) { kota prakiraan { waktu suhu kelembapan cuaca kecepatanAngin arahAngin } } }',
                ['provinsiKode' => $provinsiKode, 'kota' => $kota]
            )['cuaca'] ?? null
        );
    }

    public function getKurs(): array
    {
        return Cache::remember(
            'kurs_all',
            3600,
            fn () => $this->gql('{ kurs { mataUang kursBeli kursJual kursTengah tanggal } }')['kurs'] ?? []
        );
    }

    public function getHariLibur(int $tahun, ?int $bulan = null): array
    {
        $cacheKey = $bulan !== null ? "hari_libur_{$tahun}_{$bulan}" : "hari_libur_{$tahun}";

        return Cache::remember($cacheKey, 86400, function () use ($tahun, $bulan) {
            $variables = ['tahun' => $tahun];

            if ($bulan !== null) {
                $variables['bulan'] = $bulan;
            }

            return $this->gql(
                'query GetHariLibur($tahun: Int!, $bulan: Int) { hariLibur(tahun: $tahun, bulan: $bulan) { tanggal nama jenis } }',
                $variables
            )['hariLibur'] ?? [];
        });
    }

    public function validasiNIK(string $nik): ?array
    {
        return $this->gql(
            'query ValidasiNIK($nik: String!) { validasiNIK(nik: $nik) { valid nik provinsi kota kecamatan tanggalLahir jenisKelamin errors } }',
            ['nik' => $nik]
        )['validasiNIK'] ?? null;
    }

    public function getKalenderJawa(string $tanggal): ?array
    {
        return $this->gql(
            'query KalenderJawa($tanggal: String!) { kalenderJawa(tanggal: $tanggal) { tanggalMasehi hari pasaran wuku tahunJawa namaWindu tahunDalamWindu } }',
            ['tanggal' => $tanggal]
        )['kalenderJawa'] ?? null;
    }

    public function getTerbilang(float $angka): ?array
    {
        return $this->gql(
            'query Terbilang($angka: Float!) { terbilang(angka: $angka) { angka terbilang } }',
            ['angka' => $angka]
        )['terbilang'] ?? null;
    }
}
