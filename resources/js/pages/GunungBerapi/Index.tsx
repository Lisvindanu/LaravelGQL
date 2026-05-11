import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { GunungBerapiItem } from '@/types/indonesiaql';

interface Props {
    list: GunungBerapiItem[];
}

export default function GunungBerapiIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter((g) =>
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

            <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                {filtered.map((item) => (
                    <div key={item.nama} className="py-3">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.nama}
                                </p>
                                <p className="mt-0.5 text-[11px] text-neutral-400 dark:text-zinc-500">
                                    {item.bentuk} · {item.tinggiMeter}
                                </p>
                            </div>
                            <span className="shrink-0 rounded bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-zinc-800 dark:text-zinc-400">
                                {item.estimasiLetusanTerakhir}
                            </span>
                        </div>
                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-zinc-600">
                            {item.geolokasi}
                        </p>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada gunung yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
