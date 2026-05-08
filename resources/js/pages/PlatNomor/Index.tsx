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

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-orange-500 uppercase dark:text-orange-400">
                    Referensi · Tanda Nomor Kendaraan
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Plat Nomor
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Cari wilayah berdasarkan kode plat nomor kendaraan Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-md">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Kode Plat
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    setValue(e.target.value.toUpperCase())
                                }
                                placeholder="Contoh: B, D, AA"
                                maxLength={3}
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-display text-2xl font-bold tracking-widest uppercase transition-colors focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!value.trim()}
                            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Cari Wilayah
                        </button>
                    </form>
                </div>

                {kode && !result && (
                    <div className="mt-6 rounded-2xl border border-neutral-200/60 bg-white py-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-3xl">🚗</p>
                        <p className="mt-3 font-medium text-neutral-500 dark:text-zinc-400">
                            Kode plat "{kode}" tidak ditemukan
                        </p>
                    </div>
                )}

                {result && (
                    <div className="mt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                            <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase dark:text-zinc-500">
                                Hasil
                            </p>
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                        </div>

                        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="border-b border-neutral-100 bg-orange-50 px-6 py-5 dark:border-zinc-800 dark:bg-orange-950/20">
                                <p className="text-xs text-orange-500 dark:text-orange-400">
                                    Kode Plat
                                </p>
                                <p className="font-display mt-1 text-5xl font-bold tracking-widest text-neutral-900 dark:text-white">
                                    {result.kode}
                                </p>
                            </div>
                            <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                                <div className="flex items-center justify-between px-6 py-4">
                                    <span className="text-sm text-neutral-500 dark:text-zinc-400">
                                        Wilayah
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                                        {result.wilayah}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between px-6 py-4">
                                    <span className="text-sm text-neutral-500 dark:text-zinc-400">
                                        Provinsi
                                    </span>
                                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
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
