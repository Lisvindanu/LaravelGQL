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
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Angka ke Teks · Bahasa Indonesia
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Terbilang
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Konversi angka ke bentuk kata dalam Bahasa Indonesia
                </p>
            </div>

            <div className="max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="border-b border-neutral-300 focus-within:border-red-600 dark:border-zinc-700">
                        <input
                            type="text"
                            inputMode="numeric"
                            value={value}
                            onChange={(e) =>
                                setValue(e.target.value.replace(/\D/g, ''))
                            }
                            placeholder="Masukkan angka..."
                            className="w-full bg-transparent py-3 font-mono text-3xl font-black tracking-tight text-neutral-900 placeholder-neutral-200 focus:outline-none dark:text-white dark:placeholder-zinc-700"
                        />
                    </div>
                    {value && (
                        <p className="mt-2 font-mono text-sm text-neutral-400 dark:text-zinc-500">
                            = Rp {formatRupiah(parseInt(value, 10))}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={!value}
                        className="mt-5 rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus:outline-none disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        Konversi
                    </button>
                </form>

                {result && (
                    <div className="mt-10">
                        <div className="h-px bg-neutral-200 dark:bg-zinc-800" />
                        <div className="pt-8">
                            <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                                Angka
                            </p>
                            <p className="mt-1 font-mono text-5xl font-black text-neutral-900 tabular-nums dark:text-white">
                                {formatRupiah(result.angka)}
                            </p>

                            <div className="mt-8 border-l-4 border-red-600 pl-6">
                                <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                                    Terbilang
                                </p>
                                <p className="mt-2 font-display text-2xl leading-snug font-black text-neutral-900 capitalize dark:text-white">
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
