import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { PlatNomorResult } from '@/types/indonesiaql';

interface Props {
    kode: string | null;
    result: PlatNomorResult | null;
}

export default function PlatNomorIndex({ kode, result }: Props) {
    const [value, setValue] = useState(kode ?? '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const k = value.trim().toUpperCase();
        if (k) router.get('/plat-nomor', { kode: k });
    };

    return (
        <Layout>
            <Head title="Plat Nomor" />

            <div className="mb-10">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Referensi · Tanda Nomor Kendaraan
                </p>
                <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Plat Nomor
                </h1>
                <p className="mt-2 text-neutral-400 dark:text-zinc-500">
                    Cari wilayah berdasarkan kode plat kendaraan
                </p>
            </div>

            <div className="mx-auto max-w-sm">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value.toUpperCase())}
                        placeholder="B, D, AA..."
                        maxLength={3}
                        className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 font-mono text-2xl font-black tracking-widest uppercase transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="rounded-lg bg-neutral-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                    >
                        Cari
                    </button>
                </form>

                {kode && !result && (
                    <div className="mt-10 text-center">
                        <p className="font-mono text-6xl font-black text-neutral-100 dark:text-zinc-800">{kode}</p>
                        <p className="mt-3 text-sm text-neutral-400">Kode plat tidak ditemukan</p>
                    </div>
                )}

                {result && (
                    <div className="mt-10">
                        {/* License plate visual */}
                        <div className="mx-auto max-w-xs">
                            <div className="overflow-hidden rounded-lg border-4 border-neutral-900 bg-white shadow-2xl dark:border-zinc-100">
                                {/* Plate header */}
                                <div className="border-b-2 border-neutral-900 bg-neutral-900 px-4 py-1.5 text-center dark:border-zinc-100">
                                    <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">
                                        🇮🇩 · Indonesia
                                    </span>
                                </div>
                                {/* Plate number */}
                                <div className="flex items-center justify-center px-8 py-6">
                                    <span className="font-mono text-7xl font-black leading-none tracking-widest text-neutral-900">
                                        {result.kode}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Location info */}
                        <div className="mt-8 border-t border-neutral-100 pt-8 dark:border-zinc-800">
                            <div className="space-y-4">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                                        Wilayah
                                    </span>
                                    <span className="text-xl font-bold text-neutral-900 dark:text-white">
                                        {result.wilayah}
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <span className="text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                                        Provinsi
                                    </span>
                                    <span className="text-xl font-bold text-neutral-900 dark:text-white">
                                        {result.provinsi}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
