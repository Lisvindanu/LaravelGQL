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

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-emerald-600 uppercase dark:text-emerald-400">
                    Referensi · Transfer Antarbank
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Kode Bank
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Kode transfer {banks.length} bank di Indonesia
                </p>
            </div>

            <div className="mb-5">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari nama bank atau kode..."
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm shadow-sm transition-colors focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600"
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-neutral-100 dark:border-zinc-800">
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Kode
                            </th>
                            <th className="px-5 py-3 text-left text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Nama Bank
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-zinc-800">
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={2}
                                    className="px-5 py-10 text-center text-neutral-400 dark:text-zinc-500"
                                >
                                    Tidak ada hasil untuk "{query}"
                                </td>
                            </tr>
                        ) : (
                            filtered.map((b) => (
                                <tr
                                    key={b.kode}
                                    className="hover:bg-neutral-50 dark:hover:bg-zinc-800/50"
                                >
                                    <td className="px-5 py-3">
                                        <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-0.5 font-mono text-sm font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
                                            {b.kode}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-neutral-800 dark:text-zinc-200">
                                        {b.nama}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {filtered.length > 0 && (
                <p className="mt-3 text-right text-xs text-neutral-400 dark:text-zinc-600">
                    Menampilkan {filtered.length} dari {banks.length} bank
                </p>
            )}
        </Layout>
    );
}
