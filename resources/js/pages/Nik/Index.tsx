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
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Validasi NIK
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
                    Validasi Nomor Induk Kependudukan 16 digit
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Nomor Induk Kependudukan
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    setValue(
                                        e.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 16),
                                    )
                                }
                                placeholder="16 digit NIK"
                                maxLength={16}
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-base tracking-widest transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-600"
                            />
                            {value.length > 0 && (
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-zinc-800">
                                        <div
                                            className={[
                                                'h-full rounded-full transition-all duration-300',
                                                value.length === 16
                                                    ? 'bg-green-500'
                                                    : 'bg-neutral-400',
                                            ].join(' ')}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-400">
                                        {value.length}/16
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={value.length !== 16}
                            className="w-full rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
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
                            'bg-white dark:bg-zinc-900',
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
                                        NIK{' '}
                                        {result.valid ? 'Valid' : 'Tidak Valid'}
                                    </p>
                                    <p className="font-mono text-sm text-neutral-500 dark:text-zinc-400">
                                        {nik}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {result.valid && (
                            <div className="p-5">
                                <dl className="grid grid-cols-2 gap-3">
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
                                        <div
                                            key={label}
                                            className="rounded-xl bg-neutral-50 px-4 py-3 dark:bg-zinc-800/50"
                                        >
                                            <dt className="text-xs text-neutral-400 dark:text-zinc-500">
                                                {label}
                                            </dt>
                                            <dd className="mt-1 font-semibold text-neutral-900 dark:text-white">
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
                                            <span className="mt-0.5 shrink-0">
                                                •
                                            </span>
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
