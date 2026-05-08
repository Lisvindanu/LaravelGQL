import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { WaktuSholatResult } from '@/types/indonesiaql';

interface Props {
    kota: string | null;
    result: WaktuSholatResult | null;
}

const times = [
    { key: 'subuh',   label: 'Subuh' },
    { key: 'terbit',  label: 'Terbit' },
    { key: 'dzuhur',  label: 'Dzuhur' },
    { key: 'ashar',   label: 'Ashar' },
    { key: 'maghrib', label: 'Maghrib' },
    { key: 'isya',    label: 'Isya' },
] as const;

export default function WaktuSholatIndex({ kota, result }: Props) {
    const [value, setValue] = useState(kota ?? '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const k = value.trim();
        if (k) router.get('/waktu-sholat', { kota: k });
    };

    return (
        <Layout>
            <Head title="Waktu Sholat" />

            <div className="mb-10">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Real-time · Aladhan API
                </p>
                <h1 className="font-display text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Waktu Sholat
                </h1>
                <p className="mt-2 text-neutral-400 dark:text-zinc-500">
                    Jadwal sholat berdasarkan nama kota
                </p>
            </div>

            <div className="mx-auto max-w-sm">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Jakarta, Bandung, Surabaya..."
                        className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />
                    <button
                        type="submit"
                        disabled={!value.trim()}
                        className="rounded-lg bg-neutral-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                    >
                        Cari
                    </button>
                </form>

                {kota && !result && (
                    <div className="mt-10 text-center">
                        <p className="text-4xl">🕌</p>
                        <p className="mt-3 text-sm text-neutral-400">
                            Jadwal untuk "{kota}" tidak tersedia
                        </p>
                    </div>
                )}

                {result && (
                    <div className="mt-10">
                        <div className="mb-6 flex items-baseline justify-between">
                            <div>
                                <p className="text-2xl font-black text-neutral-900 dark:text-white">
                                    {result.kota}
                                </p>
                                <p className="text-xs text-neutral-400">{result.tanggal}</p>
                            </div>
                            <span className="text-[10px] font-bold tracking-widest text-red-600 uppercase">
                                Hari ini
                            </span>
                        </div>

                        {/* Time grid */}
                        <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                            {times.map(({ key, label }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between py-4"
                                >
                                    <span className="text-[11px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                        {label}
                                    </span>
                                    <span className="font-mono text-3xl font-black tabular-nums text-neutral-900 dark:text-white">
                                        {result[key]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
