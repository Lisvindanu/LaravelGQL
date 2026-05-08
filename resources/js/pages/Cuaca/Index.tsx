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

const weatherEmoji = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes('badai') || d.includes('petir')) return '⛈️';
    if (d.includes('hujan lebat') || d.includes('deras')) return '🌧️';
    if (d.includes('hujan')) return '🌦️';
    if (d.includes('kabut') || d.includes('asap')) return '🌫️';
    if (d.includes('mendung') || d.includes('berawan tebal')) return '☁️';
    if (d.includes('cerah berawan') || d.includes('berawan')) return '⛅';
    if (d.includes('cerah')) return '☀️';
    return '🌤️';
};

const weatherBg = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes('badai') || d.includes('petir'))
        return 'from-slate-600 to-slate-800';
    if (d.includes('hujan')) return 'from-blue-500 to-indigo-700';
    if (d.includes('kabut')) return 'from-slate-400 to-slate-600';
    if (d.includes('mendung') || d.includes('berawan tebal'))
        return 'from-slate-400 to-blue-500';
    if (d.includes('berawan')) return 'from-sky-400 to-blue-500';
    return 'from-sky-400 to-blue-600';
};

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
    const bg = currentCondition
        ? weatherBg(currentCondition.cuaca)
        : 'from-sky-400 to-blue-600';

    return (
        <Layout>
            <Head title="Prakiraan Cuaca" />

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-sky-600 uppercase dark:text-sky-400">
                    Real-time · Open-Meteo
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Prakiraan Cuaca
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Data cuaca real-time per kota dan kecamatan di Indonesia
                </p>
            </div>

            <div className="mb-6 rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                            Provinsi
                        </label>
                        <select
                            value={selectedProvinsi}
                            onChange={(e) =>
                                handleProvinsiChange(e.target.value)
                            }
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
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
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                            Kota / Kabupaten
                        </label>
                        <select
                            value={selectedKotaKode}
                            onChange={(e) => handleKotaChange(e.target.value)}
                            disabled={kotaList.length === 0}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
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
                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                            Kecamatan{' '}
                            <span className="font-normal text-neutral-300 normal-case dark:text-zinc-600">
                                (opsional)
                            </span>
                        </label>
                        <select
                            value={selectedKecamatan}
                            onChange={(e) =>
                                handleKecamatanChange(e.target.value)
                            }
                            disabled={kecamatanList.length === 0}
                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
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
            </div>

            {cuaca && currentCondition && (
                <div>
                    <div
                        className={`mb-4 overflow-hidden rounded-3xl bg-gradient-to-br ${bg} p-8 text-white shadow-xl`}
                    >
                        <p className="text-sm text-white/70">{cuaca.kota}</p>
                        <div className="mt-4 flex items-end gap-5">
                            <span className="text-8xl leading-none">
                                {weatherEmoji(currentCondition.cuaca)}
                            </span>
                            <div>
                                <p className="font-display text-6xl leading-none font-bold">
                                    {currentCondition.suhu}
                                </p>
                                <p className="mt-2 text-lg text-white/80">
                                    {currentCondition.cuaca}
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/70">
                            <span>💧 {currentCondition.kelembapan}</span>
                            <span>💨 {currentCondition.kecepatanAngin}</span>
                            <span>↗ {currentCondition.arahAngin}</span>
                        </div>
                    </div>

                    <p className="mb-3 text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                        Prakiraan 8 Jam
                    </p>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {cuaca.prakiraan.slice(1).map((p, i) => (
                            <div
                                key={i}
                                className="w-32 flex-none rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <p className="truncate text-xs text-neutral-400 dark:text-zinc-500">
                                    {p.waktu.split('T')[1]?.slice(0, 5) ??
                                        p.waktu}
                                </p>
                                <p className="mt-2 text-2xl leading-none">
                                    {weatherEmoji(p.cuaca)}
                                </p>
                                <p className="mt-2 font-display text-xl font-bold text-neutral-900 dark:text-white">
                                    {p.suhu}
                                </p>
                                <p className="mt-0.5 line-clamp-2 text-xs text-neutral-500 dark:text-zinc-400">
                                    {p.cuaca}
                                </p>
                                <div className="mt-3 space-y-1 border-t border-neutral-100 pt-2 dark:border-zinc-800">
                                    <div className="flex items-center justify-between text-xs text-neutral-400">
                                        <span>💧</span>
                                        <span>{p.kelembapan}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-neutral-400">
                                        <span>💨</span>
                                        <span>{p.kecepatanAngin}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedProvinsi &&
                (selectedKota || selectedKecamatan) &&
                !cuaca && (
                    <div className="rounded-2xl border border-neutral-200/60 bg-white py-16 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-4xl">🌤️</p>
                        <p className="mt-3 font-medium text-neutral-500 dark:text-zinc-400">
                            Data cuaca tidak tersedia untuk lokasi ini
                        </p>
                    </div>
                )}

            {!selectedProvinsi && defaultCities.length > 0 && (
                <div>
                    <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                        10 Kota Besar Indonesia
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {defaultCities.map((city) => {
                            const now = city.prakiraan[0];
                            if (!now) return null;
                            const cityBg = weatherBg(now.cuaca);
                            return (
                                <div
                                    key={city.kota}
                                    className={`overflow-hidden rounded-2xl bg-gradient-to-br ${cityBg} p-4 text-white shadow-sm`}
                                >
                                    <p className="truncate text-xs font-semibold text-white/70">
                                        {city.kota}
                                    </p>
                                    <p className="mt-2 text-4xl leading-none">
                                        {weatherEmoji(now.cuaca)}
                                    </p>
                                    <p className="mt-2 font-display text-3xl leading-none font-bold">
                                        {now.suhu}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-xs text-white/70">
                                        {now.cuaca}
                                    </p>
                                    <p className="mt-2 text-xs text-white/50">
                                        💧 {now.kelembapan}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {!selectedProvinsi && defaultCities.length === 0 && (
                <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 py-20 text-center dark:border-sky-900/30 dark:bg-sky-950/10">
                    <p className="text-5xl">🌏</p>
                    <p className="mt-4 font-display text-lg font-semibold text-neutral-700 dark:text-zinc-300">
                        Pilih lokasi untuk melihat cuaca
                    </p>
                    <p className="mt-1 text-sm text-neutral-400 dark:text-zinc-500">
                        Pilih provinsi, lalu kota atau kecamatan
                    </p>
                </div>
            )}
        </Layout>
    );
}
