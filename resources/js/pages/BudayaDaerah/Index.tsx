import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { BudayaDaerahItem } from '@/types/indonesiaql';

interface Props {
    list: BudayaDaerahItem[];
}

export default function BudayaDaerahIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter((b) => b.provinsi.toLowerCase().includes(search.toLowerCase()))
        : list;

    return (
        <Layout>
            <Head title="Budaya Daerah Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Budaya · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Budaya Daerah
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} provinsi — rumah adat, pakaian adat, tari daerah
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari provinsi..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((item) => (
                    <div
                        key={item.provinsi}
                        className="rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">
                            {item.provinsi}
                        </p>
                        <div className="mt-3 grid grid-cols-1 gap-y-2">
                            <div>
                                <p className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase dark:text-zinc-600">
                                    Rumah Adat
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-zinc-300">
                                    {item.rumahAdat}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase dark:text-zinc-600">
                                    Pakaian Adat
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-zinc-300">
                                    {item.pakaianAdat}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase dark:text-zinc-600">
                                    Tari Daerah
                                </p>
                                <p className="mt-0.5 text-xs font-semibold text-neutral-700 dark:text-zinc-300">
                                    {item.tariDaerah}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada provinsi yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
