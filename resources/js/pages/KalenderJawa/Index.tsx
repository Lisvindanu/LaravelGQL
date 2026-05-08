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
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Kalender Jawa
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Konversi tanggal Masehi ke penanggalan Jawa
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="date"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none"
                        >
                            Konversi
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <div className="border-b border-amber-100/80 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-yellow-950/20">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Tanggal Masehi
                            </p>
                            <p className="mt-0.5 font-semibold text-gray-900 dark:text-gray-100">
                                {result.tanggalMasehi ?? tanggal}
                            </p>
                        </div>

                        <div className="p-5">
                            <div className="mb-4 rounded-xl bg-amber-50 px-5 py-3 text-center dark:bg-amber-950/20">
                                <p className="text-lg font-bold text-amber-900 dark:text-amber-300">
                                    {result.hari} {result.pasaran}
                                </p>
                                <p className="text-sm text-amber-700 dark:text-amber-400">
                                    Tahun {result.tahunJawa} Windu {result.namaWindu}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Hari', value: result.hari },
                                    { label: 'Pasaran', value: result.pasaran },
                                    { label: 'Wuku', value: result.wuku },
                                    { label: 'Tahun Jawa', value: String(result.tahunJawa) },
                                    { label: 'Nama Windu', value: result.namaWindu },
                                    {
                                        label: 'Tahun dalam Windu',
                                        value: String(result.tahunDalamWindu),
                                    },
                                ].map(({ label, value: val }) => (
                                    <div
                                        key={label}
                                        className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
                                    >
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {label}
                                        </p>
                                        <p className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
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
