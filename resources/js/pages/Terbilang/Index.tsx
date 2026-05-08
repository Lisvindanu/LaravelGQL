import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { TerbilangResult } from '@/types/indonesiaql';

interface Props {
    angka: number | null;
    result: TerbilangResult | null;
}

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

export default function TerbilangIndex({ angka, result }: Props) {
    const [value, setValue] = useState(angka !== null ? String(angka) : '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const parsed = parseInt(value.replace(/\D/g, ''), 10);
        if (!isNaN(parsed)) {
            router.get('/terbilang', { angka: parsed });
        }
    };

    return (
        <Layout>
            <Head title="Terbilang" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Terbilang
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Konversi angka ke bentuk kata dalam bahasa Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={(e) =>
                                setValue(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="Masukkan angka, contoh: 75000000"
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <button
                            type="submit"
                            disabled={!value}
                            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Konversi
                        </button>
                    </div>
                    {value && (
                        <p className="mt-2 text-sm text-gray-400">
                            = {formatRupiah(parseInt(value, 10))}
                        </p>
                    )}
                </form>

                {result && (
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Angka
                        </p>
                        <p className="mb-4 text-2xl font-bold text-gray-900 tabular-nums dark:text-gray-100">
                            {formatRupiah(result.angka)}
                        </p>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Terbilang
                        </p>
                        <p className="rounded-lg bg-gray-50 p-4 text-lg font-medium text-gray-800 capitalize dark:bg-gray-800 dark:text-gray-200">
                            {result.terbilang}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
