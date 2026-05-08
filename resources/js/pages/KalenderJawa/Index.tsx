import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { KalenderJawaResult } from '@/types/indonesiaql';

interface Props {
    tanggal: string;
    result: KalenderJawaResult | null;
}

export default function KalenderJawaIndex({ tanggal, result }: Props) {
    const [value, setValue] = useState(tanggal);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value) {
            router.get('/kalender-jawa', { tanggal: value });
        }
    };

    return (
        <Layout>
            <Head title="Kalender Jawa" />

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-amber-600 uppercase dark:text-amber-400">
                    Penanggalan Jawa · Tradisional
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Kalender Jawa
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Konversi tanggal Masehi ke penanggalan Jawa
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="date"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                        />
                        <button
                            type="submit"
                            disabled={!value}
                            className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Konversi
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-amber-200/60 bg-white shadow-sm dark:border-amber-900/30 dark:bg-zinc-900">
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 dark:from-amber-950/20 dark:to-yellow-950/20">
                            <p className="text-xs text-amber-700/60 dark:text-amber-400/60">
                                Tanggal Masehi
                            </p>
                            <p className="mt-0.5 font-semibold text-neutral-900 dark:text-white">
                                {result.tanggalMasehi ?? tanggal}
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="mb-5 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-6 text-center text-white shadow-md">
                                <p className="font-display text-3xl font-bold">
                                    {result.hari} {result.pasaran}
                                </p>
                                <p className="mt-2 text-amber-100">
                                    Tahun {result.tahunJawa} · Windu {result.namaWindu}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Hari', value: result.hari },
                                    { label: 'Pasaran', value: result.pasaran },
                                    { label: 'Wuku', value: result.wuku },
                                    { label: 'Tahun Jawa', value: String(result.tahunJawa) },
                                    { label: 'Nama Windu', value: result.namaWindu },
                                    { label: 'Tahun dalam Windu', value: String(result.tahunDalamWindu) },
                                ].map(({ label, value: val }) => (
                                    <div
                                        key={label}
                                        className="rounded-xl bg-amber-50 px-4 py-3 dark:bg-amber-950/20"
                                    >
                                        <p className="text-xs text-amber-700/60 dark:text-amber-400/60">
                                            {label}
                                        </p>
                                        <p className="mt-1 font-semibold text-neutral-900 dark:text-white">
                                            {val}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
