import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { NIKResult } from '@/types/indonesiaql';

interface Props {
    nik: string;
    result: NIKResult | null;
}

export default function NikIndex({ nik, result }: Props) {
    const [value, setValue] = useState(nik);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            router.get('/nik', { nik: value.trim() });
        }
    };

    return (
        <Layout>
            <Head title="Validasi NIK" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Validasi NIK
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Validasi Nomor Induk Kependudukan (16 digit)
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                            setValue(
                                e.target.value.replace(/\D/g, '').slice(0, 16),
                            )
                        }
                        placeholder="Masukkan NIK 16 digit..."
                        maxLength={16}
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-mono text-sm tracking-widest focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={value.length !== 16}
                        className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Validasi
                    </button>
                </form>

                {result && (
                    <div
                        className={[
                            'rounded-xl border p-6 shadow-sm',
                            result.valid
                                ? 'border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30'
                                : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30',
                        ].join(' ')}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <span className="text-2xl">
                                {result.valid ? '✅' : '❌'}
                            </span>
                            <div>
                                <p
                                    className={[
                                        'font-semibold',
                                        result.valid
                                            ? 'text-green-800 dark:text-green-300'
                                            : 'text-red-800 dark:text-red-300',
                                    ].join(' ')}
                                >
                                    NIK {result.valid ? 'Valid' : 'Tidak Valid'}
                                </p>
                                <p className="font-mono text-sm text-gray-500">
                                    {nik}
                                </p>
                            </div>
                        </div>

                        {result.valid && (
                            <dl className="grid grid-cols-2 gap-4">
                                {[
                                    {
                                        label: 'Provinsi',
                                        value: result.provinsi,
                                    },
                                    {
                                        label: 'Kota/Kabupaten',
                                        value: result.kota,
                                    },
                                    {
                                        label: 'Tanggal Lahir',
                                        value: result.tanggalLahir,
                                    },
                                    {
                                        label: 'Jenis Kelamin',
                                        value: result.jenisKelamin,
                                    },
                                ].map(({ label, value: val }) => (
                                    <div key={label}>
                                        <dt className="text-xs text-gray-500 dark:text-gray-400">
                                            {label}
                                        </dt>
                                        <dd className="mt-0.5 font-medium text-gray-900 dark:text-gray-100">
                                            {val}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}

                        {result.errors.length > 0 && (
                            <ul className="mt-3 space-y-1">
                                {result.errors.map((err, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-red-700 dark:text-red-400"
                                    >
                                        • {err}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
