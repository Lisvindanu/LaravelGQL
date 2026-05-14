import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { StasiunKeretaItem } from '@/types/indonesiaql';

interface Props {
    list: StasiunKeretaItem[];
}

const TIPE_STYLE: Record<string, { bg: string; text: string }> = {
    KRL: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-400' },
    MRT: { bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-700 dark:text-red-400' },
    LRT: { bg: 'bg-orange-100 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-400' },
};

const DEFAULT_STYLE = { bg: 'bg-neutral-100 dark:bg-zinc-800', text: 'text-neutral-500 dark:text-zinc-400' };

export default function StasiunKeretaIndex({ list }: Props) {
    const [search, setSearch] = useState('');
    const [tipeFilter, setTipeFilter] = useState<string>('Semua');

    const tipes = ['Semua', 'KRL', 'MRT', 'LRT'];

    const filtered = list.filter((s) => {
        const matchTipe = tipeFilter === 'Semua' || s.tipe === tipeFilter;
        const matchSearch =
            !search.trim() ||
            s.nama.toLowerCase().includes(search.toLowerCase()) ||
            s.kode.toLowerCase().includes(search.toLowerCase()) ||
            s.kota.toLowerCase().includes(search.toLowerCase());
        return matchTipe && matchSearch;
    });

    return (
        <Layout>
            <Head title="Stasiun Kereta Jabodetabek" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Transportasi · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Stasiun Kereta
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} stasiun KRL / MRT / LRT Jabodetabek
                </p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
                {tipes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTipeFilter(t)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                            tipeFilter === t
                                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nama, kode, atau kota..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item, i) => {
                    const style = TIPE_STYLE[item.tipe] ?? DEFAULT_STYLE;
                    return (
                        <div
                            key={`${item.kode}-${i}`}
                            className="rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.nama}
                                </p>
                                <span
                                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${style.bg} ${style.text}`}
                                >
                                    {item.tipe}
                                </span>
                            </div>
                            <div className="mt-2 flex items-center gap-3">
                                <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    {item.kode}
                                </span>
                                <span className="text-[11px] text-neutral-400 dark:text-zinc-500">
                                    {item.jalur}
                                </span>
                            </div>
                            <p className="mt-1 text-[10px] text-neutral-400 dark:text-zinc-600">
                                {item.kota}
                            </p>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada stasiun yang cocok.
                </p>
            )}
        </Layout>
    );
}
