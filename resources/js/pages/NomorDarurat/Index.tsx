import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { NomorDaruratItem } from '@/types/indonesiaql';

interface Props {
    list: NomorDaruratItem[];
}

const KATEGORI_STYLE: Record<string, { bg: string; text: string }> = {
    'Darurat Utama': { bg: 'bg-red-100 dark:bg-red-950', text: 'text-red-700 dark:text-red-400' },
    Keamanan: { bg: 'bg-blue-100 dark:bg-blue-950', text: 'text-blue-700 dark:text-blue-400' },
    Medis: { bg: 'bg-green-100 dark:bg-green-950', text: 'text-green-700 dark:text-green-400' },
    Kebencanaan: { bg: 'bg-orange-100 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-400' },
    Utilitas: { bg: 'bg-yellow-100 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-400' },
    Transportasi: { bg: 'bg-sky-100 dark:bg-sky-950', text: 'text-sky-700 dark:text-sky-400' },
    Sosial: { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-400' },
    Pemerintahan: { bg: 'bg-neutral-100 dark:bg-zinc-800', text: 'text-neutral-600 dark:text-zinc-400' },
};

const DEFAULT_STYLE = { bg: 'bg-neutral-100 dark:bg-zinc-800', text: 'text-neutral-500 dark:text-zinc-400' };

export default function NomorDaruratIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter(
              (n) =>
                  n.nomor.toLowerCase().includes(search.toLowerCase()) ||
                  n.layanan.toLowerCase().includes(search.toLowerCase()) ||
                  n.kategori.toLowerCase().includes(search.toLowerCase()),
          )
        : list;

    return (
        <Layout>
            <Head title="Nomor Darurat Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Keselamatan · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Nomor Darurat
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} nomor darurat nasional Indonesia
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nomor atau layanan..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item) => {
                    const style = KATEGORI_STYLE[item.kategori] ?? DEFAULT_STYLE;
                    return (
                        <div
                            key={item.nomor}
                            className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40">
                                <span className="font-mono text-base font-black text-red-600 dark:text-red-400">
                                    {item.nomor}
                                </span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.layanan}
                                </p>
                                <span
                                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}
                                >
                                    {item.kategori}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada nomor yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
