import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { NIKResult } from '@/types/indonesiaql';

interface Props {
    nik: string;
    result: NIKResult | null;
}

const fields = [
    { key: 'provinsi',     label: 'Provinsi' },
    { key: 'kota',         label: 'Kab / Kota' },
    { key: 'kecamatan',    label: 'Kecamatan' },
    { key: 'tanggalLahir', label: 'Tanggal Lahir' },
    { key: 'jenisKelamin', label: 'Jenis Kelamin' },
] as const;

export default function NikIndex({ nik, result }: Props) {
    const [value, setValue] = useState(nik);
    const progress = (value.length / 16) * 100;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value.trim()) router.get('/nik', { nik: value.trim() });
    };

    return (
        <Layout>
            <Head title="Validasi NIK" />

            <div className="mb-10">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Kependudukan · 16 Digit
                </p>
                <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Validasi NIK
                </h1>
                <p className="mt-2 text-neutral-400 dark:text-zinc-500">
                    Validasi NIK dan ekstrak informasi kependudukan
                </p>
            </div>

            <div className="mx-auto max-w-xl">
                <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-2 block text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                Nomor Induk Kependudukan
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    setValue(e.target.value.replace(/\D/g, '').slice(0, 16))
                                }
                                placeholder="3271XXXXXXXXXXXX"
                                maxLength={16}
                                className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 font-mono text-lg tracking-widest transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-600"
                            />
                            {value.length > 0 && (
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="h-0.5 flex-1 overflow-hidden bg-neutral-100 dark:bg-zinc-800">
                                        <div
                                            className={[
                                                'h-full transition-all duration-300',
                                                value.length === 16 ? 'bg-red-500' : 'bg-neutral-300',
                                            ].join(' ')}
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <span className="text-xs tabular-nums text-neutral-400">
                                        {value.length}/16
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={value.length !== 16}
                            className="w-full rounded-lg bg-neutral-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                        >
                            Validasi NIK
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4">
                        {result.valid ? (
                            <div className="rounded-lg bg-neutral-950 dark:bg-zinc-900">
                                {/* Header */}
                                <div className="border-b border-white/10 px-8 py-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold tracking-[0.2em] text-red-400 uppercase">
                                                NIK Valid
                                            </p>
                                            <p className="mt-2 font-mono text-lg font-bold tracking-widest text-white">
                                                {nik}
                                            </p>
                                        </div>
                                        <span className="text-3xl">🪪</span>
                                    </div>
                                </div>
                                {/* Fields */}
                                <div className="divide-y divide-white/5 px-8">
                                    {fields.map(({ key, label }) => (
                                        <div key={key} className="flex items-center justify-between py-4">
                                            <span className="text-[11px] font-bold tracking-[0.15em] text-zinc-500 uppercase">
                                                {label}
                                            </span>
                                            <span className="text-sm font-semibold text-white">
                                                {(result as Record<string, unknown>)[key] as string ?? '—'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-red-200/60 bg-white dark:border-red-900/60 dark:bg-zinc-900">
                                <div className="border-b border-red-100/60 px-6 py-4 dark:border-red-900/40">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-red-600 uppercase">
                                        NIK Tidak Valid
                                    </p>
                                    <p className="mt-1 font-mono text-base text-neutral-500 dark:text-zinc-400">
                                        {nik}
                                    </p>
                                </div>
                                {(result.errors?.length ?? 0) > 0 && (
                                    <ul className="space-y-2 px-6 py-4">
                                        {result.errors.map((err, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                                                <span className="mt-0.5">—</span>
                                                {err}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
