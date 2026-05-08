import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type {
    CuacaData,
    Kecamatan,
    KotaDetail,
    Provinsi,
    ProvinsiDetail,
    WilayahResult,
} from '@/types/indonesiaql';

interface Props {
    provinsiList: Provinsi[];
    searchQuery: string;
    searchResults: WilayahResult[];
    provinsiDetail: ProvinsiDetail | null;
    selectedProvinsi: string;
    kotaDetail: KotaDetail | null;
    selectedKota: string;
    cuaca: CuacaData | null;
}

const TIPE_COLOR: Record<string, string> = {
    kecamatan:
        'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
    kota: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
    provinsi: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
};

const weatherEmoji = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes('badai') || d.includes('petir')) return '⛈️';
    if (d.includes('hujan lebat')) return '🌧️';
    if (d.includes('hujan')) return '🌦️';
    if (d.includes('kabut')) return '🌫️';
    if (d.includes('mendung') || d.includes('berawan tebal')) return '☁️';
    if (d.includes('berawan')) return '⛅';
    if (d.includes('cerah')) return '☀️';
    return '🌤️';
};

function KecamatanCard({ kec }: { kec: Kecamatan }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800"
            >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {kec.nama}
                </span>
                <div className="flex items-center gap-2">
                    {kec.kelurahan.length > 0 && (
                        <span className="text-xs text-gray-400">
                            {kec.kelurahan.length} kel
                        </span>
                    )}
                    <svg
                        className={[
                            'h-4 w-4 text-gray-400 transition-transform',
                            open ? 'rotate-180' : '',
                        ].join(' ')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </button>
            {open && kec.kelurahan.length > 0 && (
                <div className="grid grid-cols-2 gap-1 bg-white p-3 dark:bg-gray-900/50">
                    {kec.kelurahan.map((kel) => (
                        <div
                            key={kel.kode}
                            className="rounded-lg px-3 py-1.5 text-xs text-gray-600 dark:text-gray-400"
                        >
                            {kel.nama}
                            {kel.kodePos && (
                                <span className="ml-1 text-gray-400 dark:text-gray-600">
                                    {kel.kodePos}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function WilayahIndex({
    provinsiList,
    searchQuery,
    searchResults,
    provinsiDetail,
    selectedProvinsi,
    kotaDetail,
    selectedKota,
    cuaca,
}: Props) {
    const [query, setQuery] = useState(searchQuery);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/wilayah', { q: query }, { preserveScroll: true });
    };

    const handleProvinsiSelect = (kode: string) => {
        router.get('/wilayah', kode ? { provinsi: kode } : {});
    };

    const handleKotaSelect = (kode: string) => {
        router.get('/wilayah', { kota: kode, provinsi: selectedProvinsi });
    };

    const handleBack = () => {
        if (selectedKota && selectedProvinsi) {
            router.get('/wilayah', { provinsi: selectedProvinsi });
        } else {
            router.get('/wilayah');
        }
    };

    // Find provinsi name for breadcrumb
    const provinsiNama =
        provinsiList.find((p) => p.kode === selectedProvinsi)?.nama ??
        selectedProvinsi;

    const showHome = !selectedProvinsi && !selectedKota && !searchQuery;
    const showProvinsi = selectedProvinsi && !selectedKota;
    const showKota = !!selectedKota && !!kotaDetail;

    return (
        <Layout>
            <Head title="Wilayah Indonesia" />

            <div className="mb-6">
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Wilayah Indonesia
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
                    Jelajahi data wilayah hingga tingkat kelurahan
                </p>
            </div>

            {/* Search bar */}
            <div className="mb-5">
                <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <svg
                                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari provinsi, kota, kecamatan..."
                                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-9 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
                        >
                            Cari
                        </button>
                    </div>
                </form>
            </div>

            {/* Search results */}
            {searchQuery && (
                <div className="mb-5 rounded-2xl border border-gray-200/60 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        Hasil Pencarian "{searchQuery}"
                    </p>
                    {searchResults.length > 0 ? (
                        <div className="space-y-1">
                            {searchResults.map((item) => (
                                <div
                                    key={item.kode}
                                    className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {item.nama}
                                        </span>
                                        <span
                                            className={[
                                                'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                                                TIPE_COLOR[item.tipe] ??
                                                    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
                                            ].join(' ')}
                                        >
                                            {item.tipe}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-400">
                                        {item.kota} · {item.provinsi}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400">
                            Tidak ada hasil untuk "{searchQuery}"
                        </p>
                    )}
                </div>
            )}

            {/* Breadcrumb + back button */}
            {(showProvinsi || showKota) && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Kembali
                    </button>
                    <span className="text-gray-300 dark:text-gray-700">/</span>
                    {showKota ? (
                        <>
                            <button
                                onClick={() =>
                                    handleProvinsiSelect(selectedProvinsi)
                                }
                                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                            >
                                {provinsiNama}
                            </button>
                            <span className="text-gray-300 dark:text-gray-700">
                                /
                            </span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {kotaDetail?.nama}
                            </span>
                        </>
                    ) : (
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {provinsiNama}
                        </span>
                    )}
                </div>
            )}

            {/* Home: all provinces grid */}
            {showHome && (
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <p className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        Semua Provinsi ({provinsiList.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {provinsiList.map((p) => (
                            <button
                                key={p.kode}
                                onClick={() => handleProvinsiSelect(p.kode)}
                                className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            >
                                {p.nama}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Province view: kota grid */}
            {showProvinsi && provinsiDetail && (
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <p className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        {provinsiDetail.nama}
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 normal-case dark:bg-gray-800">
                            {provinsiDetail.kota.length} kota/kab
                        </span>
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {provinsiDetail.kota.map((k) => (
                            <button
                                key={k.kode}
                                onClick={() => handleKotaSelect(k.kode)}
                                className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-left text-sm text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            >
                                <span className="line-clamp-2 leading-snug">
                                    {k.nama}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Kota view: kecamatan + weather */}
            {showKota && (
                <div
                    className={[
                        'grid gap-5',
                        cuaca ? 'lg:grid-cols-[1fr_340px]' : '',
                    ].join(' ')}
                >
                    {/* Kecamatan list */}
                    <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                            Kecamatan
                            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 normal-case dark:bg-gray-800">
                                {kotaDetail.kecamatan.length} kecamatan
                            </span>
                        </p>
                        <div className="space-y-2">
                            {kotaDetail.kecamatan.map((kec) => (
                                <KecamatanCard key={kec.kode} kec={kec} />
                            ))}
                        </div>
                    </div>

                    {/* Weather panel */}
                    {cuaca && (
                        <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <div className="mb-4 flex items-center gap-2">
                                <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                                    Cuaca
                                </p>
                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                                    Real-time
                                </span>
                            </div>
                            <div className="space-y-2">
                                {cuaca.prakiraan.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
                                    >
                                        <span className="text-2xl leading-none">
                                            {weatherEmoji(p.cuaca)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400">
                                                    {p.waktu}
                                                </span>
                                                <span className="font-bold text-gray-900 dark:text-gray-100">
                                                    {p.suhu}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                                                {p.cuaca}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                💧{p.kelembapan} · 💨
                                                {p.kecepatanAngin}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}
