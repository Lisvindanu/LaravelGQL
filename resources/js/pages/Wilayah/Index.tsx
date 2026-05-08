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

function KecamatanCard({ kec }: { kec: Kecamatan }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-neutral-100 last:border-b-0 dark:border-zinc-800">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between px-0 py-3 text-left"
            >
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {kec.nama}
                </span>
                <div className="flex items-center gap-3">
                    {kec.kelurahan.length > 0 && (
                        <span className="font-mono text-xs text-neutral-400 dark:text-zinc-500">
                            {kec.kelurahan.length} kel
                        </span>
                    )}
                    <svg
                        className={[
                            'h-3.5 w-3.5 text-neutral-300 transition-transform dark:text-zinc-600',
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
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-3 pl-4">
                    {kec.kelurahan.map((kel) => (
                        <div
                            key={kel.kode}
                            className="text-xs text-neutral-500 dark:text-zinc-400"
                        >
                            {kel.nama}
                            {kel.kodePos && (
                                <span className="ml-1.5 text-neutral-300 dark:text-zinc-600">
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
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    34 Provinsi · 514 Kota · 7.2k Kecamatan
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Wilayah Indonesia
                </h1>
            </div>

            <div className="mb-6">
                <form onSubmit={handleSearch}>
                    <div className="flex gap-0 border-b border-neutral-300 focus-within:border-red-600 dark:border-zinc-700">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari provinsi, kota, kecamatan..."
                            className="flex-1 bg-transparent py-2.5 text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none dark:text-white dark:placeholder-zinc-600"
                        />
                        <button
                            type="submit"
                            className="py-2.5 pl-4 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 focus:outline-none"
                        >
                            Cari
                        </button>
                    </div>
                </form>
            </div>

            {searchQuery && (
                <div className="mb-6">
                    <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                        Hasil "{searchQuery}"
                    </p>
                    {searchResults.length > 0 ? (
                        <div className="divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                            {searchResults.map((item) => (
                                <div
                                    key={item.kode}
                                    className="flex items-center justify-between gap-3 py-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                            {item.nama}
                                        </p>
                                        <p className="mt-0.5 text-xs text-neutral-400 dark:text-zinc-500">
                                            {item.kota} · {item.provinsi}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                        {item.tipe}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-8 text-sm text-neutral-400 dark:text-zinc-600">
                            Tidak ada hasil untuk "{searchQuery}"
                        </p>
                    )}
                </div>
            )}

            {(showProvinsi || showKota) && (
                <div className="mb-5 flex items-center gap-2 text-sm">
                    <button
                        onClick={handleBack}
                        className="font-medium text-neutral-400 transition-colors hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
                    >
                        &larr; Kembali
                    </button>
                    <span className="text-neutral-200 dark:text-zinc-700">
                        /
                    </span>
                    {showKota ? (
                        <>
                            <button
                                onClick={() =>
                                    handleProvinsiSelect(selectedProvinsi)
                                }
                                className="text-neutral-400 hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
                            >
                                {provinsiNama}
                            </button>
                            <span className="text-neutral-200 dark:text-zinc-700">
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
                <div>
                    <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                        Semua Provinsi ({provinsiList.length})
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {provinsiList.map((p) => (
                            <button
                                key={p.kode}
                                onClick={() => handleProvinsiSelect(p.kode)}
                                className="rounded-md border border-neutral-100 bg-neutral-50 px-3 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-red-900/40 dark:hover:bg-red-950/20 dark:hover:text-red-400"
                            >
                                {p.nama}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {showProvinsi && provinsiDetail && (
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                            {provinsiDetail.nama}
                        </p>
                        <span className="font-mono text-xs text-neutral-300 dark:text-zinc-700">
                            {provinsiDetail.kota.length} kota/kab
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 md:grid-cols-4">
                        {provinsiDetail.kota.map((k) => (
                            <button
                                key={k.kode}
                                onClick={() => handleKotaSelect(k.kode)}
                                className="rounded-md border border-neutral-100 bg-neutral-50 px-3 py-3 text-left text-sm text-neutral-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-red-900/40 dark:hover:bg-red-950/20 dark:hover:text-red-400"
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
                        'grid gap-6',
                        cuaca ? 'lg:grid-cols-[1fr_300px]' : '',
                    ].join(' ')}
                >
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                                Kecamatan
                            </p>
                            <span className="font-mono text-xs text-neutral-300 dark:text-zinc-700">
                                {kotaDetail.kecamatan.length}
                            </span>
                        </div>
                        <div>
                            {kotaDetail.kecamatan.map((kec) => (
                                <KecamatanCard key={kec.kode} kec={kec} />
                            ))}
                        </div>
                    </div>

                    {cuaca && (
                        <div>
                            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                                Cuaca {cuaca.kota}
                            </p>
                            <div className="divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                                {cuaca.prakiraan.map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between py-3"
                                    >
                                        <div>
                                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                                {p.waktu
                                                    .split('T')[1]
                                                    ?.slice(0, 5) ?? p.waktu}
                                            </p>
                                            <p className="mt-0.5 text-xs text-neutral-500 dark:text-zinc-400">
                                                {p.cuaca}
                                            </p>
                                            <p className="text-xs text-neutral-300 dark:text-zinc-700">
                                                {p.kelembapan} ·{' '}
                                                {p.kecepatanAngin}
                                            </p>
                                        </div>
                                        <p className="font-mono text-xl font-black text-neutral-900 dark:text-white">
                                            {p.suhu}
                                        </p>
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
