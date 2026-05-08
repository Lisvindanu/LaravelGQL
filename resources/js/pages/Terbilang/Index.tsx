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

            <div className="mb-6">
                <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Terbilang
                </h1>
                <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
                    Konversi angka ke bentuk kata dalam bahasa Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Angka
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={value}
                                onChange={(e) =>
                                    setValue(e.target.value.replace(/\D/g, ''))
                                }
                                placeholder="Contoh: 75000000"
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-600"
                            />
                            {value && (
                                <p className="mt-1.5 text-sm font-medium text-neutral-500 dark:text-zinc-400">
                                    = {formatRupiah(parseInt(value, 10))}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!value}
                            className="w-full rounded-xl bg-neutral-900 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Konversi ke Terbilang
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="border-b border-neutral-100 px-6 py-4 dark:border-zinc-800">
                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                Angka
                            </p>
                            <p className="mt-0.5 font-display text-3xl font-bold text-neutral-900 tabular-nums dark:text-white">
                                {formatRupiah(result.angka)}
                            </p>
                        </div>
                        <div className="p-6">
                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                Terbilang
                            </p>
                            <p className="mt-2 text-xl leading-relaxed font-semibold text-neutral-900 capitalize dark:text-white">
                                {result.terbilang}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
