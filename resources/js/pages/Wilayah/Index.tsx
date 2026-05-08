import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { Provinsi, ProvinsiDetail, WilayahResult } from '@/types/indonesiaql';

interface Props {
    provinsiList: Provinsi[];
    searchQuery: string;
    searchResults: WilayahResult[];
    provinsiDetail: ProvinsiDetail | null;
    selectedProvinsi: string;
}

const TIPE_COLOR: Record<string, string> = {
    kecamatan: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
    kota: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
    provinsi: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
};

export default function WilayahIndex({
    provinsiList,
    searchQuery,
    searchResults,
    provinsiDetail,
    selectedProvinsi,
}: Props) {
    const [query, setQuery] = useState(searchQuery);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        router.get('/wilayah', { q: query }, { preserveScroll: true });
    };

    const handleProvinsiChange = (kode: string) => {
        router.get('/wilayah', kode ? { provinsi: kode } : {}, { preserveScroll: true });
    };

    return (
        <Layout>
            <Head title="Wilayah Indonesia" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Wilayah Indonesia
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Cari dan jelajahi data wilayah seluruh Indonesia
                </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                {/* Search */}
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Cari Wilayah
                    </h2>
                    <form onSubmit={handleSearch}>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <svg
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
                                    placeholder="Cari kota, kecamatan..."
                                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-500"
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

                    {searchResults.length > 0 && (
                        <div className="mt-4 space-y-1">
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
                    )}

                    {searchQuery && searchResults.length === 0 && (
                        <div className="mt-6 text-center">
                            <p className="text-2xl">🔍</p>
                            <p className="mt-2 text-sm text-gray-400">
                                Tidak ada hasil untuk "{searchQuery}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Provinsi picker */}
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Detail Provinsi
                    </h2>
                    <select
                        value={selectedProvinsi}
                        onChange={(e) => handleProvinsiChange(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100"
                    >
                        <option value="">-- Pilih Provinsi --</option>
                        {provinsiList.map((p) => (
                            <option key={p.kode} value={p.kode}>{p.nama}</option>
                        ))}
                    </select>

                    {provinsiDetail && (
                        <div className="mt-4">
                            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {provinsiDetail.nama}
                                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                    {provinsiDetail.kota.length} kota/kab
                                </span>
                            </p>
                            <div className="grid max-h-60 grid-cols-2 gap-1.5 overflow-y-auto pr-1">
                                {provinsiDetail.kota.map((k) => (
                                    <div
                                        key={k.kode}
                                        className="rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                    >
                                        {k.nama}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* All provinces grid */}
            {!selectedProvinsi && !searchQuery && (
                <div className="mt-5 rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Semua Provinsi ({provinsiList.length})
                    </h2>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {provinsiList.map((p) => (
                            <button
                                key={p.kode}
                                onClick={() => handleProvinsiChange(p.kode)}
                                className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                            >
                                {p.nama}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
