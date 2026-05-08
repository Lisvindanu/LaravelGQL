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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Kalender Jawa
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Konversi tanggal Masehi ke penanggalan Jawa
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        Konversi
                    </button>
                </form>

                {result && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                            Tanggal Masehi:{' '}
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {tanggal}
                            </span>
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Hari', value: result.hari },
                                { label: 'Pasaran', value: result.pasaran },
                                { label: 'Wuku', value: result.wuku },
                                {
                                    label: 'Tahun Jawa',
                                    value: result.tahunJawa,
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
                                    className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                                >
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {label}
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {val}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            {result.hari} {result.pasaran}, Tahun{' '}
                            {result.tahunJawa} Windu {result.namaWindu}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
