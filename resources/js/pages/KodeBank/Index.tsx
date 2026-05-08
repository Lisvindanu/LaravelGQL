import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { KodeBankItem } from '@/types/indonesiaql';

interface Props {
    banks: KodeBankItem[];
}

export default function KodeBankIndex({ banks }: Props) {
    const [query, setQuery] = useState('');

    const filtered = query
        ? banks.filter(
              (b) =>
                  b.kode.includes(query) ||
                  b.nama.toLowerCase().includes(query.toLowerCase()),
          )
        : banks;

    return (
        <Layout>
            <Head title="Kode Bank" />

            <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        Referensi · Transfer Antarbank
                    </p>
                    <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Kode Bank
                    </h1>
                </div>
                <span className="mb-1 font-mono text-5xl font-black text-neutral-100 dark:text-zinc-800">
                    {banks.length}
                </span>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari nama bank atau kode..."
                    className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600"
                />
            </div>

            <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <p className="font-mono text-4xl font-black text-neutral-100 dark:text-zinc-800">
                            ?
                        </p>
                        <p className="mt-3 text-sm text-neutral-400">
                            Tidak ada hasil untuk "{query}"
                        </p>
                    </div>
                ) : (
                    filtered.map((b) => (
                        <div
                            key={b.kode}
                            className="flex items-center gap-6 py-3.5 hover:bg-neutral-50/50 dark:hover:bg-zinc-900/50"
                        >
                            <span className="w-12 shrink-0 font-mono text-sm font-black text-neutral-900 dark:text-white">
                                {b.kode}
                            </span>
                            <span className="text-sm text-neutral-600 dark:text-zinc-300">
                                {b.nama}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {query && filtered.length > 0 && (
                <p className="mt-4 text-right text-xs text-neutral-300 dark:text-zinc-700">
                    {filtered.length} / {banks.length}
                </p>
            )}
        </Layout>
    );
}
