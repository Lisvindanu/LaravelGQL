import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { KodePosResult } from '@/types/indonesiaql';

interface Props {
    kode: string;
    results: KodePosResult[];
}

export default function KodePosIndex({ kode, results }: Props) {
    const [value, setValue] = useState(kode);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            router.get('/kode-pos', { kode: value.trim() });
        }
    };

    return (
        <Layout>
            <Head title="Kode Pos" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Wilayah · Referensi
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Kode Pos
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Cari kelurahan berdasarkan kode pos
                </p>
            </div>

            <div className="max-w-xs">
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-0 border-b border-neutral-300 focus-within:border-red-600 dark:border-zinc-700"
                >
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Contoh: 10110"
                        maxLength={5}
                        className="flex-1 bg-transparent py-2.5 font-mono text-sm text-neutral-900 placeholder-neutral-300 focus:outline-none dark:text-white dark:placeholder-zinc-600"
                    />
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="py-2.5 pl-4 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 focus:outline-none disabled:opacity-40"
                    >
                        Cari
                    </button>
                </form>
            </div>

            {kode && results.length === 0 && (
                <p className="mt-8 text-sm text-neutral-400 dark:text-zinc-500">
                    Kode pos tidak ditemukan.
                </p>
            )}

            {results.length > 0 && (
                <div className="mt-8 max-w-lg">
                    <p className="mb-3 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                        {results.length} kelurahan ditemukan
                    </p>
                    <div className="divide-y divide-neutral-100 border-t border-b border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {results.map((r, i) => (
                            <div key={i} className="py-3">
                                <div className="flex items-baseline justify-between">
                                    <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                                        {r.kelurahan}
                                    </p>
                                    <span className="font-mono text-xs font-bold text-red-600">
                                        {r.kodePos}
                                    </span>
                                </div>
                                <p className="mt-0.5 text-xs text-neutral-400 dark:text-zinc-500">
                                    {r.kecamatan} · {r.kota} · {r.provinsi}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
