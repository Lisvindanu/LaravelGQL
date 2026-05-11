import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { BandaraItem } from '@/types/indonesiaql';

interface Props {
    list: BandaraItem[];
}

export default function BandaraIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter(
              (b) =>
                  b.kodeIATA.toLowerCase().includes(search.toLowerCase()) ||
                  b.nama.toLowerCase().includes(search.toLowerCase()) ||
                  b.kota.toLowerCase().includes(search.toLowerCase()) ||
                  b.provinsi.toLowerCase().includes(search.toLowerCase()),
          )
        : list;

    return (
        <Layout>
            <Head title="Bandara Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    IATA · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Bandara Indonesia
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Daftar bandar udara dengan kode IATA
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari kode, nama, kota, provinsi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                {filtered.map((item) => (
                    <div key={item.kodeIATA} className="flex items-center gap-4 py-3">
                        <span className="w-12 font-mono text-sm font-black text-red-600">
                            {item.kodeIATA}
                        </span>
                        <div>
                            <p className="text-sm font-medium text-neutral-800 dark:text-zinc-200">
                                {item.nama}
                            </p>
                            <p className="text-[11px] text-neutral-400 dark:text-zinc-500">
                                {item.kota}, {item.provinsi}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada bandara yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
