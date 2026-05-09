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

    public function getKota(string $kode): ?array
    {
        return Cache::rememberForever(
            "kota_{$kode}",
            fn () => $this->gql(
                'query GetKota($kode: String!) { kota(kode: $kode) { nama kecamatan { kode nama kelurahan { kode nama kodePos } } } }',
                ['kode' => $kode]
            )['kota'] ?? null
        );
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

    public function getDefaultCuaca(): array
    {
        return Cache::remember('cuaca_default_cities', 1800, function () {
            $cities = [
                ['alias' => 'c1',  'prov' => '31', 'kota' => 'Jakarta'],
                ['alias' => 'c2',  'prov' => '35', 'kota' => 'Surabaya'],
                ['alias' => 'c3',  'prov' => '32', 'kota' => 'Bandung'],
                ['alias' => 'c4',  'prov' => '12', 'kota' => 'Medan'],
                ['alias' => 'c5',  'prov' => '33', 'kota' => 'Semarang'],
                ['alias' => 'c6',  'prov' => '73', 'kota' => 'Makassar'],
                ['alias' => 'c7',  'prov' => '16', 'kota' => 'Palembang'],
                ['alias' => 'c8',  'prov' => '34', 'kota' => 'Yogyakarta'],
                ['alias' => 'c9',  'prov' => '51', 'kota' => 'Denpasar'],
                ['alias' => 'c10', 'prov' => '64', 'kota' => 'Balikpapan'],
            ];

            $parts = array_map(
                fn ($c) => "{$c['alias']}: cuaca(provinsiKode: \"{$c['prov']}\", kota: \"{$c['kota']}\") { kota prakiraan { waktu suhu cuaca kelembapan kecepatanAngin } }",
                $cities
            );

            $data = $this->gql('{ '.implode(' ', $parts).' }');

            $result = [];
            foreach ($cities as $c) {
                if (! empty($data[$c['alias']])) {
                    $result[] = $data[$c['alias']];
                }
            }

            return $result;
        });
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

    public function getKalenderJawaMonth(int $tahun, int $bulan): array
    {
        $cacheKey = "kalender_jawa_{$tahun}_{$bulan}";

        return Cache::remember($cacheKey, 86400, function () use ($tahun, $bulan) {
            $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $bulan, $tahun);
            $parts = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $tanggal = sprintf('%04d-%02d-%02d', $tahun, $bulan, $d);
                $parts[] = "d{$d}: kalenderJawa(tanggal: \"{$tanggal}\") { tanggalMasehi hari pasaran wuku tahunJawa namaWindu tahunDalamWindu }";
            }
            $data = $this->gql('{ '.implode(' ', $parts).' }');
            $result = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $result[$d] = $data["d{$d}"] ?? null;
            }

            return $result;
        });
    }

    public function getTerbilang(float $angka): ?array
    {
        return $this->gql(
            'query Terbilang($angka: Float!) { terbilang(angka: $angka) { angka terbilang } }',
            ['angka' => $angka]
        )['terbilang'] ?? null;
    }

    public function getKodeBankList(): array
    {
        return Cache::rememberForever(
            'kode_bank_list',
            fn () => $this->gql('{ kodeBankList { kode nama } }')['kodeBankList'] ?? []
        );
    }

    public function getPlatNomor(string $kode): ?array
    {
        return $this->gql(
            'query PlatNomor($kode: String!) { platNomor(kode: $kode) { kode wilayah provinsi } }',
            ['kode' => strtoupper(trim($kode))]
        )['platNomor'] ?? null;
    }

    public function getWaktuSholat(string $kota): ?array
    {
        $cacheKey = 'waktu_sholat_'.str_replace(' ', '_', strtolower($kota)).'_'.date('Y-m-d');

        return Cache::remember(
            $cacheKey,
            21600,
            fn () => $this->gql(
                'query WaktuSholat($kota: String!) { waktuSholat(kota: $kota) { kota tanggal subuh terbit dzuhur ashar maghrib isya } }',
                ['kota' => $kota]
            )['waktuSholat'] ?? null
        );
    }

    public function getGempaTerbaru(): ?array
    {
        return Cache::remember(
            'gempa_terbaru',
            300,
            fn () => $this->gql('{ gempaTerbaru { tanggal jam magnitude kedalaman lintang bujur wilayah potensi dirasakan } }')['gempaTerbaru'] ?? null
        );
    }

    public function getGempaList(): array
    {
        return Cache::remember(
            'gempa_list',
            300,
            fn () => $this->gql('{ gempaList { tanggal jam magnitude kedalaman lintang bujur wilayah potensi dirasakan } }')['gempaList'] ?? []
        );
    }

    public function getKodePos(string $kode): array
    {
        return $this->gql(
            'query KodePos($kode: String!) { kodePos(kode: $kode) { kodePos kelurahan kecamatan kota provinsi } }',
            ['kode' => $kode]
        )['kodePos'] ?? [];
    }

    public function getKalenderHijriyah(string $tanggal): ?array
    {
        return $this->gql(
            'query KalenderHijriyah($tanggal: String!) { kalenderHijriyah(tanggal: $tanggal) { tanggalMasehi tanggalHijriyah hari hariArab bulan bulanArab tahun } }',
            ['tanggal' => $tanggal]
        )['kalenderHijriyah'] ?? null;
    }

    public function getKalenderHijriyahMonth(int $tahun, int $bulan): array
    {
        $cacheKey = "kalender_hijriyah_{$tahun}_{$bulan}";

        return Cache::remember($cacheKey, 86400, function () use ($tahun, $bulan) {
            $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $bulan, $tahun);
            $parts = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $tanggal = sprintf('%04d-%02d-%02d', $tahun, $bulan, $d);
                $parts[] = "d{$d}: kalenderHijriyah(tanggal: \"{$tanggal}\") { tanggalMasehi tanggalHijriyah hari hariArab bulan bulanArab tahun }";
            }
            $data = $this->gql('{ '.implode(' ', $parts).' }');
            $result = [];
            for ($d = 1; $d <= $daysInMonth; $d++) {
                $result[$d] = $data["d{$d}"] ?? null;
            }

            return $result;
        });
    }

    public function getHargaBBM(): array
    {
        return Cache::rememberForever(
            'harga_bbm',
            fn () => $this->gql('{ hargaBBM { nama harga satuan jenis } }')['hargaBBM'] ?? []
        );
    }

    public function getIHSG(): ?array
    {
        return Cache::remember(
            'ihsg',
            300,
            fn () => $this->gql('{ ihsg { symbol nama harga perubahan persentasePerubahan open high low volume waktu } }')['ihsg'] ?? null
        );
    }

    public function getIuranBPJS(): array
    {
        return Cache::rememberForever(
            'iuran_bpjs',
            fn () => $this->gql('{ iuranBPJS { kelas segmen nominal keterangan } }')['iuranBPJS'] ?? []
        );
    }

    public function validasiRekening(string $bank, string $noRekening): ?array
    {
        return $this->gql(
            'query ValidasiRekening($bank: String!, $noRekening: String!) { validasiRekening(bank: $bank, noRekening: $noRekening) { valid bank noRekening panjang keterangan } }',
            ['bank' => $bank, 'noRekening' => $noRekening]
        )['validasiRekening'] ?? null;
    }

    public function getStasiunKRL(): array
    {
        return Cache::remember(
            'stasiun_krl',
            3600,
            fn () => $this->gql('{ stasiunKRL { stasiunId stasiunNama stasiunKode } }')['stasiunKRL'] ?? []
        );
    }

    public function getJadwalKRL(string $stasiunId, ?string $timeFrom = null, ?string $timeTo = null): array
    {
        $variables = ['stasiunId' => $stasiunId];
        if ($timeFrom !== null) {
            $variables['timeFrom'] = $timeFrom;
        }
        if ($timeTo !== null) {
            $variables['timeTo'] = $timeTo;
        }

        return $this->gql(
            'query JadwalKRL($stasiunId: String!, $timeFrom: String, $timeTo: String) { jadwalKRL(stasiunId: $stasiunId, timeFrom: $timeFrom, timeTo: $timeTo) { trainId kaName routeName destTime destStasiun colorCode } }',
            $variables
        )['jadwalKRL'] ?? [];
    }

    public function getInflasi(int $tahun): array
    {
        return Cache::remember(
            "inflasi_{$tahun}",
            86400,
            fn () => $this->gql(
                'query Inflasi($tahun: Int) { inflasi(tahun: $tahun) { periode bulan tahun inflasiBulanan inflasiTahunan ihk } }',
                ['tahun' => $tahun]
            )['inflasi'] ?? []
        );
    }
}
