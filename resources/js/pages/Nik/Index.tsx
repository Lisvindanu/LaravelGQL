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

    const progress = (value.length / 16) * 100;

    return (
        <Layout>
            <Head title="Validasi NIK" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Validasi NIK
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Validasi Nomor Induk Kependudukan 16 digit
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                Nomor Induk Kependudukan
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    setValue(e.target.value.replace(/\D/g, '').slice(0, 16))
                                }
                                placeholder="16 digit NIK"
                                maxLength={16}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-mono text-base tracking-widest transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100 dark:placeholder-gray-600"
                            />
                            {value.length > 0 && (
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                        <div
                                            className={[
                                                'h-full rounded-full transition-all duration-300',
                                                value.length === 16
                                                    ? 'bg-green-500'
                                                    : 'bg-red-400',
                                            ].join(' ')}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {value.length}/16
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={value.length !== 16}
                            className="w-full rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Validasi NIK
                        </button>
                    </form>
                </div>

                {result && (
                    <div
                        className={[
                            'mt-4 overflow-hidden rounded-2xl border shadow-sm',
                            result.valid
                                ? 'border-green-200/60 dark:border-green-900/60'
                                : 'border-red-200/60 dark:border-red-900/60',
                            'bg-white dark:bg-gray-900',
                        ].join(' ')}
                    >
                        <div
                            className={[
                                'px-6 py-4',
                                result.valid
                                    ? 'bg-green-50 dark:bg-green-950/30'
                                    : 'bg-red-50 dark:bg-red-950/30',
                            ].join(' ')}
                        >
                            <div className="flex items-center gap-3">
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
                                    <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                                        {nik}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {result.valid && (
                            <div className="p-5">
                                <dl className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Provinsi', value: result.provinsi },
                                        { label: 'Kota/Kabupaten', value: result.kota },
                                        { label: 'Tanggal Lahir', value: result.tanggalLahir },
                                        { label: 'Jenis Kelamin', value: result.jenisKelamin },
                                    ].map(({ label, value: val }) => (
                                        <div
                                            key={label}
                                            className="rounded-xl bg-gray-50 px-4 py-3 dark:bg-gray-800/50"
                                        >
                                            <dt className="text-xs text-gray-400 dark:text-gray-500">
                                                {label}
                                            </dt>
                                            <dd className="mt-1 font-semibold text-gray-900 dark:text-gray-100">
                                                {val}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        {(result.errors?.length ?? 0) > 0 && (
                            <div className="px-5 pb-5">
                                <ul className="space-y-1.5">
                                    {result.errors.map((err, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400"
                                        >
                                            <span className="mt-0.5 shrink-0">•</span>
                                            {err}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
