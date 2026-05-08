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

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-violet-600 uppercase dark:text-violet-400">
                    Kependudukan · 16 Digit
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Validasi NIK
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Validasi Nomor Induk Kependudukan dan ekstrak informasi
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
                                placeholder="Masukkan 16 digit NIK"
                                maxLength={16}
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-mono text-lg tracking-widest transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-600"
                            />
                            {value.length > 0 && (
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-zinc-800">
                                        <div
                                            className={[
                                                'h-full rounded-full transition-all duration-300',
                                                value.length === 16
                                                    ? 'bg-violet-500'
                                                    : 'bg-neutral-300',
                                            ].join(' ')}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-neutral-400 tabular-nums">
                                        {value.length}/16
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={value.length !== 16}
                            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Validasi NIK
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4">
                        {result.valid ? (
                            <div className="overflow-hidden rounded-3xl bg-neutral-900 text-white shadow-xl">
                                <div className="p-6 sm:p-8">
                                    <div className="mb-6 flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase dark:text-neutral-500">
                                                NIK Valid
                                            </p>
                                            <p className="mt-2 font-mono text-xl font-bold tracking-widest text-white">
                                                {nik}
                                            </p>
                                        </div>
                                        <span className="text-4xl">🪪</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
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
                                                className="rounded-xl bg-white/10 px-4 py-3 dark:bg-zinc-800"
                                            >
                                                <p className="text-xs font-medium text-neutral-400 dark:text-zinc-400">
                                                    {label}
                                                </p>
                                                <p className="mt-1 font-semibold text-white dark:text-white">
                                                    {val ?? '—'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-2xl border border-red-200/60 bg-white shadow-sm dark:border-red-900/60 dark:bg-zinc-900">
                                <div className="bg-red-50 px-6 py-4 dark:bg-red-950/30">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">❌</span>
                                        <div>
                                            <p className="font-semibold text-red-800 dark:text-red-300">
                                                NIK Tidak Valid
                                            </p>
                                            <p className="font-mono text-sm text-neutral-500 dark:text-zinc-400">
                                                {nik}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {(result.errors?.length ?? 0) > 0 && (
                                    <div className="px-5 py-4">
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
                )}
            </div>
        </Layout>
    );
}
