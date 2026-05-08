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
        'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-red-400',
    kota: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-red-400',
    provinsi:
        'bg-teal-100 text-red-700 dark:bg-teal-950/40 dark:text-red-400',
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
        <div className="overflow-hidden rounded-xl border border-neutral-100 dark:border-zinc-800">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between bg-neutral-50 px-4 py-3 text-left transition-colors hover:bg-neutral-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800"
            >
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {kec.nama}
                </span>
                <div className="flex items-center gap-2">
                    {kec.kelurahan.length > 0 && (
                        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-teal-950/40 dark:text-red-400">
                            {kec.kelurahan.length} kel
                        </span>
                    )}
                    <svg
                        className={[
                            'h-4 w-4 text-neutral-400 transition-transform',
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
                <div className="grid grid-cols-2 gap-1 bg-white p-3 dark:bg-zinc-900/50">
                    {kec.kelurahan.map((kel) => (
                        <div
                            key={kel.kode}
                            className="rounded-lg px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400"
                        >
                            {kel.nama}
                            {kel.kodePos && (
                                <span className="ml-1 text-neutral-300 dark:text-zinc-600">
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

    const provinsiNama =
        provinsiList.find((p) => p.kode === selectedProvinsi)?.nama ??
        selectedProvinsi;

    const showHome = !selectedProvinsi && !selectedKota && !searchQuery;
    const showProvinsi = selectedProvinsi && !selectedKota;
    const showKota = !!selectedKota && !!kotaDetail;

    return (
        <Layout>
            <Head title="Wilayah Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-red-600 uppercase dark:text-red-400">
                    34 Provinsi · 514 Kota · 7.2k Kecamatan
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Wilayah Indonesia
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Jelajahi data wilayah hingga tingkat kelurahan
                </p>
            </div>

            <div className="mb-5">
                <form onSubmit={handleSearch}>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <svg
                                className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400"
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
                                className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pr-4 pl-9 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none"
                        >
                            Cari
                        </button>
                    </div>
                </form>
            </div>

            {searchQuery && (
                <div className="mb-5 rounded-lg border border-neutral-200/60 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-neutral-500 uppercase dark:text-zinc-400">
                        Hasil "{searchQuery}"
                    </p>
                    {searchResults.length > 0 ? (
                        <div className="space-y-1">
                            {searchResults.map((item) => (
                                <div
                                    key={item.kode}
                                    className="rounded-xl bg-neutral-50 px-4 py-3 dark:bg-zinc-800/50"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                            {item.nama}
                                        </span>
                                        <span
                                            className={[
                                                'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
                                                TIPE_COLOR[item.tipe] ??
                                                    'bg-neutral-100 text-neutral-600 dark:bg-zinc-700 dark:text-zinc-300',
                                            ].join(' ')}
                                        >
                                            {item.tipe}
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-xs text-neutral-400">
                                        {item.kota} · {item.provinsi}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-400">
                            Tidak ada hasil untuk "{searchQuery}"
                        </p>
                    )}
                </div>
            )}

            {(showProvinsi || showKota) && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 rounded-lg bg-neutral-100 px-3 py-1.5 text-neutral-600 transition-colors hover:bg-teal-100 hover:text-red-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-teal-950/40 dark:hover:text-red-400"
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
                    <span className="text-neutral-300 dark:text-zinc-700">
                        /
                    </span>
                    {showKota ? (
                        <>
                            <button
                                onClick={() =>
                                    handleProvinsiSelect(selectedProvinsi)
                                }
                                className="text-neutral-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                            >
                                {provinsiNama}
                            </button>
                            <span className="text-neutral-300 dark:text-zinc-700">
                                /
                            </span>
                            <span className="font-semibold text-neutral-900 dark:text-white">
                                {kotaDetail?.nama}
                            </span>
                        </>
                    ) : (
                        <span className="font-semibold text-neutral-900 dark:text-white">
                            {provinsiNama}
                        </span>
                    )}
                </div>
            )}

            {showHome && (
                <div className="rounded-lg border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="mb-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                        Semua Provinsi ({provinsiList.length})
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {provinsiList.map((p) => (
                            <button
                                key={p.kode}
                                onClick={() => handleProvinsiSelect(p.kode)}
                                className="rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:border-teal-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-teal-800 dark:hover:bg-teal-950/20 dark:hover:text-red-400"
                            >
                                {p.nama}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {showProvinsi && provinsiDetail && (
                <div className="rounded-lg border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex items-center gap-2">
                        <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                            {provinsiDetail.nama}
                        </p>
                        <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-teal-950/40 dark:text-red-400">
                            {provinsiDetail.kota.length} kota/kab
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {provinsiDetail.kota.map((k) => (
                            <button
                                key={k.kode}
                                onClick={() => handleKotaSelect(k.kode)}
                                className="rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-3 text-left text-sm text-neutral-700 transition-colors hover:border-teal-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-teal-800 dark:hover:bg-teal-950/20 dark:hover:text-red-400"
                            >
                                <span className="line-clamp-2 leading-snug">
                                    {k.nama}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {showKota && (
                <div
                    className={[
                        'grid gap-5',
                        cuaca ? 'lg:grid-cols-[1fr_320px]' : '',
                    ].join(' ')}
                >
                    <div className="rounded-lg border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-4 flex items-center gap-2">
                            <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Kecamatan
                            </p>
                            <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-teal-950/40 dark:text-red-400">
                                {kotaDetail.kecamatan.length} kecamatan
                            </span>
                        </div>
                        <div className="space-y-2">
                            {kotaDetail.kecamatan.map((kec) => (
                                <KecamatanCard key={kec.kode} kec={kec} />
                            ))}
                        </div>
                    </div>

                    {cuaca && (
                        <div className="rounded-lg border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                    Cuaca {cuaca.kota}
                                </p>
                                <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-950/40 dark:text-red-400">
                                    Real-time
                                </span>
                            </div>
                            <div className="space-y-2">
                                {cuaca.prakiraan.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 dark:bg-zinc-800/50"
                                    >
                                        <span className="text-2xl leading-none">
                                            {weatherEmoji(p.cuaca)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-neutral-400">
                                                    {p.waktu
                                                        .split('T')[1]
                                                        ?.slice(0, 5) ??
                                                        p.waktu}
                                                </span>
                                                <span className="font-bold text-neutral-900 dark:text-white">
                                                    {p.suhu}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-zinc-400">
                                                {p.cuaca}
                                            </p>
                                            <p className="text-xs text-neutral-400">
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
