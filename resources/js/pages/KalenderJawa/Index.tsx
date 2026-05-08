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

            <div className="mb-6">
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Kalender Jawa
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
                    Konversi tanggal Masehi ke penanggalan Jawa
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="date"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Konversi
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="border-b border-amber-100/80 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-yellow-950/20">
                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                Tanggal Masehi
                            </p>
                            <p className="mt-0.5 font-semibold text-neutral-900 dark:text-white">
                                {result.tanggalMasehi ?? tanggal}
                            </p>
                        </div>

                        <div className="p-5">
                            <div className="mb-4 rounded-xl bg-amber-50 px-5 py-4 text-center dark:bg-amber-950/20">
                                <p className="font-display text-2xl font-bold text-amber-900 dark:text-amber-300">
                                    {result.hari} {result.pasaran}
                                </p>
                                <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                                    Tahun {result.tahunJawa} · Windu{' '}
                                    {result.namaWindu}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Hari', value: result.hari },
                                    { label: 'Pasaran', value: result.pasaran },
                                    { label: 'Wuku', value: result.wuku },
                                    {
                                        label: 'Tahun Jawa',
                                        value: String(result.tahunJawa),
                                    },
                                    {
                                        label: 'Nama Windu',
                                        value: result.namaWindu,
                                    },
                                    {
                                        label: 'Tahun dalam Windu',
                                        value: String(result.tahunDalamWindu),
                                    },
                                ].map(({ label, value: val }) => (
                                    <div
                                        key={label}
                                        className="rounded-xl bg-neutral-50 px-4 py-3 dark:bg-zinc-800/50"
                                    >
                                        <p className="text-xs text-neutral-400 dark:text-zinc-500">
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
