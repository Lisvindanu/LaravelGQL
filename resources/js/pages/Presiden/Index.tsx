import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { PresidenItem } from '@/types/indonesiaql';

interface Props {
    list: PresidenItem[];
}

export default function PresidenIndex({ list }: Props) {
    const [search, setSearch] = useState('');

    const filtered = search.trim()
        ? list.filter(
              (p) =>
                  p.nama.toLowerCase().includes(search.toLowerCase()) ||
                  p.wakilPresiden.toLowerCase().includes(search.toLowerCase()),
          )
        : list;

    return (
        <Layout>
            <Head title="Presiden Republik Indonesia" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Sejarah · Pemerintahan
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Presiden RI
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    {list.length} Presiden Republik Indonesia
                </p>
            </div>

            <div className="mb-6 max-w-sm">
                <input
                    type="text"
                    placeholder="Cari nama presiden..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500"
                />
            </div>

            <div className="flex flex-col gap-3">
                {filtered.map((item) => (
                    <div
                        key={item.urutan}
                        className="flex gap-4 rounded-xl border border-neutral-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 dark:bg-zinc-800">
                            <span className="font-mono text-sm font-black text-neutral-500 dark:text-zinc-400">
                                {item.urutan}
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {item.nama}
                                </p>
                                <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 dark:bg-zinc-800 dark:text-zinc-400">
                                    {item.mulaiJabatan}–{item.akhirJabatan === 0 ? 'sekarang' : item.akhirJabatan}
                                </span>
                            </div>
                            {item.wakilPresiden && (
                                <p className="mt-1 text-[11px] leading-relaxed text-neutral-400 dark:text-zinc-500">
                                    Wapres: {item.wakilPresiden}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <p className="mt-8 text-center text-sm text-neutral-400 dark:text-zinc-500">
                    Tidak ada presiden yang cocok dengan "{search}".
                </p>
            )}
        </Layout>
    );
}
