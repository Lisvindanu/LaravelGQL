import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { PTNItem } from '@/types/indonesiaql';

interface Props {
    list: PTNItem[];
}

const AKREDITASI_STYLE: Record<string, { bg: string; text: string }> = {
    Unggul: { bg: 'bg-emerald-100 dark:bg-emerald-950', text: 'text-emerald-700 dark:text-emerald-400' },
    'Baik Sekali': { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-400' },
    Baik: { bg: 'bg-sky-100 dark:bg-sky-950', text: 'text-sky-700 dark:text-sky-400' },
};

const DEFAULT_STYLE = { bg: 'bg-neutral-100 dark:bg-zinc-800', text: 'text-neutral-500 dark:text-zinc-400' };

export default function PTNIndex({ list }: Props) {
    const [search, setSearch] = useState('');
    const [akreditasiFilter, setAkreditasiFilter] = useState<string>('Semua');

    const akreditasiOptions = ['Semua', 'Unggul', 'Baik Sekali', 'Baik'];

    const filtered = list.filter((p) => {
        const matchAkreditasi = akreditasiFilter === 'Semua' || p.akreditasi === akreditasiFilter;
        const matchSearch =
            !search.trim() ||
            p.nama.toLowerCase().includes(search.toLowerCase()) ||
            p.singkatan.toLowerCase().includes(search.toLowerCase()) ||
            p.kota.toLowerCase().includes(search.toLowerCase()) ||
            p.provinsi.toLowerCase().includes(search.toLowerCase());
        return matchAkreditasi && matchSearch;
    });

    return (
        <Layout>
            <Head title="Perguruan Tinggi Negeri Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Pendidikan · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    PTN Indonesia
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} Perguruan Tinggi Negeri · akreditasi 2026
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {akreditasiOptions.map((a) => (
                    <button
                        key={a}
                        onClick={() => setAkreditasiFilter(a)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                            akreditasiFilter === a
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                        }`}
                    >
                        {a}
                    </button>
                ))}
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nama, singkatan, atau kota..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item) => {
                    const style = AKREDITASI_STYLE[item.akreditasi] ?? DEFAULT_STYLE;
                    return (
                        <div
                            key={item.singkatan}
                            className="rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                        {item.nama}
                                    </p>
                                    <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-zinc-500">
                                        {item.kota}, {item.provinsi}
                                    </p>
                                </div>
                                <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-neutral-600 dark:bg-zinc-800 dark:text-zinc-300">
                                    {item.singkatan}
                                </span>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
                                >
                                    {item.akreditasi}
                                </span>
                                <span className="text-[10px] text-neutral-400 dark:text-zinc-600">
                                    {item.jenis}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada PTN yang cocok.
                </p>
            )}
        </Layout>
    );
}
