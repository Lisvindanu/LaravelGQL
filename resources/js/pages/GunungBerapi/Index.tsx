import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { GunungBerapiItem } from '@/types/indonesiaql';

interface Props {
    list: GunungBerapiItem[];
}

const BENTUK_STYLE: Record<string, { bg: string; text: string }> = {
    stratovulkan:          { bg: 'bg-orange-100 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-400' },
    supervulkan:           { bg: 'bg-red-100 dark:bg-red-950',    text: 'text-red-700 dark:text-red-400' },
    kaldera:               { bg: 'bg-purple-100 dark:bg-purple-950', text: 'text-purple-700 dark:text-purple-400' },
    kompleks:              { bg: 'bg-blue-100 dark:bg-blue-950',   text: 'text-blue-700 dark:text-blue-400' },
    maar:                  { bg: 'bg-cyan-100 dark:bg-cyan-950',   text: 'text-cyan-700 dark:text-cyan-400' },
    'kubah lava':          { bg: 'bg-amber-100 dark:bg-amber-950', text: 'text-amber-700 dark:text-amber-400' },
    fumarol:               { bg: 'bg-zinc-100 dark:bg-zinc-800',   text: 'text-zinc-600 dark:text-zinc-400' },
    kerucut:               { bg: 'bg-green-100 dark:bg-green-950', text: 'text-green-700 dark:text-green-400' },
    'kerucut piroklastik': { bg: 'bg-lime-100 dark:bg-lime-950',   text: 'text-lime-700 dark:text-lime-400' },
    'kerucut bara':        { bg: 'bg-yellow-100 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-400' },
    perisai:               { bg: 'bg-teal-100 dark:bg-teal-950',   text: 'text-teal-700 dark:text-teal-400' },
    gabungan:              { bg: 'bg-indigo-100 dark:bg-indigo-950', text: 'text-indigo-700 dark:text-indigo-400' },
    'bawah laut':          { bg: 'bg-sky-100 dark:bg-sky-950',     text: 'text-sky-700 dark:text-sky-400' },
};

const DEFAULT_STYLE = { bg: 'bg-neutral-100 dark:bg-zinc-800', text: 'text-neutral-500 dark:text-zinc-400' };

function bentukStyle(bentuk: string) {
    return BENTUK_STYLE[bentuk.toLowerCase()] ?? DEFAULT_STYLE;
}

export default function GunungBerapiIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter(
              (g) =>
                  g.nama.toLowerCase().includes(search.toLowerCase()) ||
                  g.bentuk.toLowerCase().includes(search.toLowerCase()),
          )
        : list;

    return (
        <Layout>
            <Head title="Gunung Berapi Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Geografi · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Gunung Berapi
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} gunung berapi di Indonesia
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nama atau jenis..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item) => {
                    const style = bentukStyle(item.bentuk);
                    return (
                        <div
                            key={item.nama}
                            className="rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.nama}
                                </p>
                                <span
                                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${style.bg} ${style.text}`}
                                >
                                    {item.bentuk}
                                </span>
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-y-2">
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-zinc-600">
                                        Tinggi
                                    </p>
                                    <p className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-zinc-300">
                                        {item.tinggiMeter}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 dark:text-zinc-600">
                                        Letusan Terakhir
                                    </p>
                                    <p className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-zinc-300">
                                        {item.estimasiLetusanTerakhir}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-2 text-[10px] text-neutral-400 dark:text-zinc-600">
                                {item.geolokasi}
                            </p>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada gunung yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
