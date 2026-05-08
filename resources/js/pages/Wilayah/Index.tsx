import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type {
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
}

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
        router.get('/wilayah', kode ? { provinsi: kode } : {}, {
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title="Wilayah Indonesia" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Wilayah Indonesia
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Cari dan jelajahi data wilayah seluruh Indonesia
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
                        Cari Wilayah
                    </h2>
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Contoh: bandung, surabaya..."
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            Cari
                        </button>
                    </form>

                    {searchResults.length > 0 && (
                        <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                            {searchResults.map((item) => (
                                <div key={item.kode} className="py-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">
                                            {item.nama}
                                        </span>
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 capitalize dark:bg-gray-800 dark:text-gray-400">
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
                        <p className="mt-4 text-sm text-gray-400">
                            Tidak ada hasil untuk "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Provinsi picker */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
                        Detail Provinsi
                    </h2>
                    <select
                        value={selectedProvinsi}
                        onChange={(e) => handleProvinsiChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <option value="">-- Pilih Provinsi --</option>
                        {provinsiList.map((p) => (
                            <option key={p.kode} value={p.kode}>
                                {p.nama}
                            </option>
                        ))}
                    </select>

                    {provinsiDetail && (
                        <div className="mt-4">
                            <h3 className="mb-3 font-medium text-gray-800 dark:text-gray-200">
                                {provinsiDetail.nama} —{' '}
                                {provinsiDetail.kota.length} kota/kabupaten
                            </h3>
                            <div className="grid max-h-64 grid-cols-2 gap-1 overflow-y-auto">
                                {provinsiDetail.kota.map((k) => (
                                    <div
                                        key={k.kode}
                                        className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
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
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <h2 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
                        Semua Provinsi ({provinsiList.length})
                    </h2>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {provinsiList.map((p) => (
                            <button
                                key={p.kode}
                                onClick={() => handleProvinsiChange(p.kode)}
                                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950 dark:hover:text-red-400"
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
