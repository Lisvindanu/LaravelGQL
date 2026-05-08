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
                <p className="mb-2 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-zinc-500">
                    Angka ke Teks · Bahasa Indonesia
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Terbilang
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Konversi angka ke bentuk kata dalam Bahasa Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-lg">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 font-display text-2xl font-bold tracking-tight transition-colors focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-700"
                            />
                            {value && (
                                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                                    = Rp {formatRupiah(parseInt(value, 10))}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!value}
                            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Konversi ke Terbilang
                        </button>
                    </form>
                </div>

                {result && (
                    <div className="mt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                            <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase dark:text-zinc-500">
                                Hasil
                            </p>
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                        </div>

                        <div className="mt-6 rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                Angka
                            </p>
                            <p className="mt-1 font-display text-4xl font-bold text-neutral-900 tabular-nums dark:text-white">
                                {formatRupiah(result.angka)}
                            </p>

                            <div className="mt-5 border-t border-neutral-100 pt-5 dark:border-zinc-800">
                                <p className="text-xs text-neutral-400 dark:text-zinc-500">
                                    Terbilang
                                </p>
                                <p className="mt-2 font-display text-2xl leading-relaxed font-bold text-neutral-900 capitalize dark:text-white">
                                    {result.terbilang}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
