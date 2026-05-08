import { Head, router } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { CuacaData, Kota, Provinsi } from '@/types/indonesiaql';

interface KecamatanSimple {
    kode: string;
    nama: string;
}

interface Props {
    provinsiList: Provinsi[];
    kotaList: Kota[];
    kecamatanList: KecamatanSimple[];
    cuaca: CuacaData | null;
    defaultCities: CuacaData[];
    selectedProvinsi: string;
    selectedKota: string;
    selectedKotaKode: string;
    selectedKecamatan: string;
}

export default function CuacaIndex({
    provinsiList,
    kotaList,
    kecamatanList,
    cuaca,
    defaultCities,
    selectedProvinsi,
    selectedKota,
    selectedKotaKode,
    selectedKecamatan,
}: Props) {
    const handleProvinsiChange = (kode: string) => {
        router.get('/cuaca', kode ? { provinsi_kode: kode } : {});
    };

    const handleKotaChange = (kode: string) => {
        const nama = kotaList.find((k) => k.kode === kode)?.nama ?? '';
        router.get('/cuaca', {
            provinsi_kode: selectedProvinsi,
            kota_kode: kode,
            kota: nama,
        });
    };

    const handleKecamatanChange = (nama: string) => {
        const params: Record<string, string> = {
            provinsi_kode: selectedProvinsi,
            kota_kode: selectedKotaKode,
            kota: selectedKota,
        };
        if (nama) params.kecamatan = nama;
        router.get('/cuaca', params);
    };

    const currentCondition = cuaca?.prakiraan[0];

    return (
        <Layout>
            <Head title="Prakiraan Cuaca" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Real-time · BMKG
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Prakiraan Cuaca
                </h1>
            </div>

            <div className="mb-8 grid gap-6 border-b border-neutral-100 pb-8 sm:grid-cols-3 dark:border-zinc-800">
                <div>
                    <label className="mb-1 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        Provinsi
                    </label>
                    <select
                        value={selectedProvinsi}
                        onChange={(e) => handleProvinsiChange(e.target.value)}
                        className="w-full border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-900 focus:border-red-600 focus:outline-none dark:border-zinc-700 dark:text-white"
                    >
                        <option value="">-- Pilih Provinsi --</option>
                        {provinsiList.map((p) => (
                            <option key={p.kode} value={p.kode}>
                                {p.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        Kota / Kabupaten
                    </label>
                    <select
                        value={selectedKotaKode}
                        onChange={(e) => handleKotaChange(e.target.value)}
                        disabled={kotaList.length === 0}
                        className="w-full border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-900 focus:border-red-600 focus:outline-none disabled:opacity-40 dark:border-zinc-700 dark:text-white"
                    >
                        <option value="">-- Pilih Kota --</option>
                        {kotaList.map((k) => (
                            <option key={k.kode} value={k.kode}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        Kecamatan{' '}
                        <span className="font-normal normal-case">
                            (opsional)
                        </span>
                    </label>
                    <select
                        value={selectedKecamatan}
                        onChange={(e) => handleKecamatanChange(e.target.value)}
                        disabled={kecamatanList.length === 0}
                        className="w-full border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-900 focus:border-red-600 focus:outline-none disabled:opacity-40 dark:border-zinc-700 dark:text-white"
                    >
                        <option value="">-- Semua Kecamatan --</option>
                        {kecamatanList.map((k) => (
                            <option key={k.kode} value={k.nama}>
                                {k.nama}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {cuaca && currentCondition && (
                <div>
                    <div className="mb-8 border-l-4 border-red-600 pl-6">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                            {cuaca.kota}
                        </p>
                        <div className="mt-3 flex flex-wrap items-baseline gap-6">
                            <p className="font-mono text-8xl leading-none font-black text-neutral-900 dark:text-white">
                                {currentCondition.suhu}
                            </p>
                            <div>
                                <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                                    {currentCondition.cuaca}
                                </p>
                                <p className="mt-1 text-sm text-neutral-400 dark:text-zinc-500">
                                    {currentCondition.kelembapan} kelembapan
                                    &middot; {currentCondition.kecepatanAngin}
                                </p>
                                <p className="text-sm text-neutral-400 dark:text-zinc-500">
                                    Arah {currentCondition.arahAngin}
                                </p>
                            </div>
                        </div>
                    </div>

                    {cuaca.prakiraan.length > 1 && (
                        <div>
                            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                                Prakiraan Berikutnya
                            </p>
                            <div className="flex overflow-x-auto border-t border-neutral-200 dark:border-zinc-800">
                                {cuaca.prakiraan.slice(1).map((p, i) => (
                                    <div
                                        key={i}
                                        className="min-w-[100px] flex-none border-r border-neutral-100 px-4 py-4 last:border-r-0 dark:border-zinc-800"
                                    >
                                        <p className="text-xs text-neutral-400 dark:text-zinc-600">
                                            {p.waktu
                                                .split('T')[1]
                                                ?.slice(0, 5) ?? p.waktu}
                                        </p>
                                        <p className="mt-2 font-mono text-2xl font-black text-neutral-900 dark:text-white">
                                            {p.suhu}
                                        </p>
                                        <p className="mt-1 line-clamp-2 text-xs text-neutral-500 dark:text-zinc-400">
                                            {p.cuaca}
                                        </p>
                                        <p className="mt-1 text-xs text-neutral-300 dark:text-zinc-700">
                                            {p.kelembapan}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {selectedProvinsi &&
                (selectedKota || selectedKecamatan) &&
                !cuaca && (
                    <p className="py-12 text-center text-sm text-neutral-400 dark:text-zinc-600">
                        Data cuaca tidak tersedia untuk lokasi ini.
                    </p>
                )}

            {!selectedProvinsi && defaultCities.length > 0 && (
                <div>
                    <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                        10 Kota Besar
                    </p>
                    <div className="divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {defaultCities.map((city) => {
                            const now = city.prakiraan[0];
                            if (!now) return null;
                            return (
                                <div
                                    key={city.kota}
                                    className="flex items-baseline justify-between py-3.5"
                                >
                                    <p className="text-sm font-medium text-neutral-700 dark:text-zinc-300">
                                        {city.kota}
                                    </p>
                                    <div className="flex items-baseline gap-5">
                                        <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                            {now.cuaca}
                                        </p>
                                        <p className="font-mono text-xl font-black text-neutral-900 dark:text-white">
                                            {now.suhu}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {!selectedProvinsi && defaultCities.length === 0 && (
                <p className="py-16 text-center text-sm text-neutral-400 dark:text-zinc-600">
                    Pilih provinsi dan kota untuk melihat prakiraan cuaca.
                </p>
            )}
        </Layout>
    );
}
