import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { KalenderHijriyahResult } from '@/types/indonesiaql';

interface Props {
    tanggal: string;
    result: KalenderHijriyahResult | null;
}

export default function KalenderHijriyahIndex({ tanggal, result }: Props) {
    const [value, setValue] = useState(tanggal);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (value) {
            router.get('/kalender-hijriyah', { tanggal: value });
        }
    };

    return (
        <Layout>
            <Head title="Kalender Hijriyah" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Penanggalan Hijriyah · Islam
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Kalender Hijriyah
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Konversi tanggal Masehi ke penanggalan Hijriyah
                </p>
            </div>

            <div className="max-w-sm">
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-0 border-b border-neutral-300 focus-within:border-red-600 dark:border-zinc-700"
                >
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="flex-1 bg-transparent py-2.5 text-sm text-neutral-900 focus:outline-none dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={!value}
                        className="py-2.5 pl-4 text-sm font-semibold text-red-600 transition-colors hover:text-red-700 focus:outline-none disabled:opacity-40"
                    >
                        Konversi
                    </button>
                </form>
            </div>

            {result && (
                <div className="mt-10 max-w-sm">
                    <div className="mb-2 text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-500">
                        {result.tanggalMasehi ?? tanggal}
                    </div>

                    <div className="border-l-4 border-red-600 pl-6">
                        <p
                            className="font-display text-5xl leading-tight font-black text-neutral-900 dark:text-white"
                            dir="rtl"
                        >
                            {result.hariArab}
                        </p>
                        <p className="mt-1 font-display text-2xl font-black text-neutral-400 dark:text-zinc-500">
                            {result.hari}
                        </p>
                    </div>

                    <div className="mt-8 divide-y divide-neutral-100 border-t border-neutral-200 dark:divide-zinc-800 dark:border-zinc-800">
                        {[
                            { label: 'Tanggal Hijriyah', value: result.tanggalHijriyah },
                            { label: 'Bulan', value: result.bulan },
                            { label: 'Bulan (Arab)', value: result.bulanArab },
                            { label: 'Tahun Hijriyah', value: String(result.tahun) },
                        ].map(({ label, value: val }) => (
                            <div key={label} className="flex items-baseline justify-between py-3">
                                <p className="text-xs text-neutral-400 dark:text-zinc-500">{label}</p>
                                <p className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                                    {val}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Layout>
    );
}
