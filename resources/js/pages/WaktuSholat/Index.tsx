import { Head, router } from '@inertiajs/react';
import { type FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import type { WaktuSholatResult } from '@/types/indonesiaql';

interface Props {
    kota: string | null;
    result: WaktuSholatResult | null;
}

const sholatTimes = [
    { key: 'subuh',   label: 'Subuh',   icon: '🌙' },
    { key: 'terbit',  label: 'Terbit',  icon: '🌅' },
    { key: 'dzuhur',  label: 'Dzuhur',  icon: '☀️' },
    { key: 'ashar',   label: 'Ashar',   icon: '🌤️' },
    { key: 'maghrib', label: 'Maghrib', icon: '🌆' },
    { key: 'isya',    label: 'Isya',    icon: '🌃' },
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

            <div className="mb-8">
                <p className="mb-2 text-xs font-bold tracking-widest text-teal-600 uppercase dark:text-teal-400">
                    Real-time · Aladhan API
                </p>
                <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                    Waktu Sholat
                </h1>
                <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                    Jadwal sholat 5 waktu berdasarkan nama kota di Indonesia
                </p>
            </div>

            <div className="mx-auto max-w-md">
                <div className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-neutral-400 uppercase dark:text-zinc-500">
                                Nama Kota
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Contoh: Jakarta, Bandung, Surabaya"
                                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base transition-colors focus:border-teal-400 focus:ring-2 focus:ring-teal-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white dark:placeholder-zinc-700"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!value.trim()}
                            className="w-full rounded-xl bg-neutral-900 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                        >
                            Cari Jadwal Sholat
                        </button>
                    </form>
                </div>

                {kota && !result && (
                    <div className="mt-6 rounded-2xl border border-neutral-200/60 bg-white py-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-3xl">🕌</p>
                        <p className="mt-3 font-medium text-neutral-500 dark:text-zinc-400">
                            Jadwal sholat untuk "{kota}" tidak tersedia
                        </p>
                    </div>
                )}

                {result && (
                    <div className="mt-6">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                            <p className="text-xs font-bold tracking-widest text-neutral-400 uppercase dark:text-zinc-500">
                                Jadwal
                            </p>
                            <div className="h-px flex-1 bg-neutral-200 dark:bg-zinc-800" />
                        </div>

                        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <div className="border-b border-neutral-100 bg-teal-50 px-6 py-4 dark:border-zinc-800 dark:bg-teal-950/20">
                                <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                                    🕌 {result.kota}
                                </p>
                                <p className="mt-0.5 text-xs text-neutral-500 dark:text-zinc-500">
                                    {result.tanggal}
                                </p>
                            </div>
                            <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                                {sholatTimes.map(({ key, label, icon }) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between px-6 py-3.5"
                                    >
                                        <span className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-zinc-300">
                                            <span className="text-base">{icon}</span>
                                            {label}
                                        </span>
                                        <span className="font-display text-lg font-bold tabular-nums text-neutral-900 dark:text-white">
                                            {result[key]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
