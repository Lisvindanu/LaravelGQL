import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/components/Layout';
import type { KalenderJawaResult } from '@/types/indonesiaql';

interface Props {
    bulan: number;
    tahun: number;
    hari: number | null;
    kalender: Record<number, KalenderJawaResult | null>;
}

const MONTHS = [
    '',
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];
const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

function goTo(bulan: number, tahun: number, hari?: number) {
    let b = bulan, t = tahun;
    if (b < 1) { b = 12; t--; }
    if (b > 12) { b = 1; t++; }
    const params: Record<string, number> = { bulan: b, tahun: t };
    if (hari) params.hari = hari;
    router.get('/kalender-jawa', params);
}

export default function KalenderJawaIndex({ bulan, tahun, hari, kalender }: Props) {
    const [selected, setSelected] = useState<number | null>(hari ?? null);

    const today = new Date();
    const isThisMonth = today.getFullYear() === tahun && today.getMonth() + 1 === bulan;
    const todayDate = isThisMonth ? today.getDate() : -1;

    const firstDow = new Date(tahun, bulan - 1, 1).getDay();
    const daysInMonth = Math.max(0, ...Object.keys(kalender).map(Number));
    const selectedData = selected !== null ? kalender[selected] : null;

    return (
        <Layout>
            <Head title="Kalender Jawa" />

            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        Penanggalan Jawa · Tradisional
                    </p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Kalender Jawa
                    </h1>
                </div>
                <div className="flex flex-col items-end gap-2 pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase dark:text-zinc-600">
                            Cari
                        </span>
                        <input
                            type="date"
                            onChange={(e) => {
                                if (e.target.value) {
                                    const [y, m, d] = e.target.value.split('-').map(Number);
                                    goTo(m, y, d);
                                }
                            }}
                            className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                        />
                    </div>
                    <input
                        type="month"
                        value={`${tahun}-${String(bulan).padStart(2, '0')}`}
                        onChange={(e) => {
                            if (e.target.value) {
                                const [y, m] = e.target.value.split('-').map(Number);
                                goTo(m, y);
                            }
                        }}
                        className="rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-white"
                    />
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={() => goTo(bulan - 1, tahun)}
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                    ← Sebelumnya
                </button>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    {MONTHS[bulan]} {tahun}
                </h2>
                <button
                    onClick={() => goTo(bulan + 1, tahun)}
                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                    Berikutnya →
                </button>
            </div>

            <div className="gap-6 lg:grid lg:grid-cols-[1fr_280px]">
                <div>
                    <div className="mb-1 grid grid-cols-7">
                        {DAY_NAMES.map((d) => (
                            <div
                                key={d}
                                className="py-2 text-center text-[10px] font-bold tracking-[0.1em] text-neutral-400 uppercase dark:text-zinc-600"
                            >
                                {d}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5">
                        {Array.from({ length: firstDow }).map((_, i) => (
                            <div key={`e${i}`} className="min-h-[64px]" />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                            const data = kalender[d];
                            const isToday = d === todayDate;
                            const isSelected = d === selected;
                            return (
                                <button
                                    key={d}
                                    onClick={() => setSelected(isSelected ? null : d)}
                                    className={[
                                        'flex min-h-[64px] w-full flex-col items-start gap-0.5 rounded-lg p-1.5 text-left transition-colors',
                                        isSelected
                                            ? 'bg-neutral-900 dark:bg-white'
                                            : isToday
                                                ? 'bg-red-50 dark:bg-red-950/30'
                                                : 'hover:bg-neutral-50 dark:hover:bg-zinc-800/40',
                                    ].join(' ')}
                                >
                                    <span
                                        className={[
                                            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-black tabular-nums',
                                            isToday && !isSelected
                                                ? 'bg-red-600 text-white'
                                                : isSelected
                                                    ? 'text-white dark:text-neutral-900'
                                                    : 'text-neutral-900 dark:text-white',
                                        ].join(' ')}
                                    >
                                        {d}
                                    </span>
                                    {data && (
                                        <span
                                            className={[
                                                'text-[9px] leading-tight',
                                                isSelected
                                                    ? 'text-neutral-400 dark:text-neutral-600'
                                                    : 'text-neutral-400 dark:text-zinc-600',
                                            ].join(' ')}
                                        >
                                            {data.hari}
                                            <br />
                                            {data.pasaran}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 lg:mt-0">
                    {selected !== null && selectedData ? (
                        <div className="sticky top-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="mb-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase dark:text-zinc-600">
                                {selectedData.tanggalMasehi}
                            </p>
                            <div className="mb-6 border-l-4 border-red-600 pl-4">
                                <p className="font-display text-3xl font-black leading-tight text-neutral-900 dark:text-white">
                                    {selectedData.hari}
                                </p>
                                <p className="font-display text-xl font-black text-neutral-400 dark:text-zinc-500">
                                    {selectedData.pasaran}
                                </p>
                            </div>
                            <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                                {[
                                    { label: 'Wuku', value: selectedData.wuku },
                                    { label: 'Tahun Jawa', value: String(selectedData.tahunJawa) },
                                    { label: 'Nama Windu', value: selectedData.namaWindu },
                                    { label: 'Tahun dalam Windu', value: String(selectedData.tahunDalamWindu) },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex items-baseline justify-between py-2.5">
                                        <p className="text-xs text-neutral-400 dark:text-zinc-500">{label}</p>
                                        <p className="font-mono text-sm font-bold text-neutral-900 dark:text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-neutral-200 dark:border-zinc-800">
                            <p className="text-center text-sm text-neutral-300 dark:text-zinc-700">
                                Pilih tanggal
                                <br />
                                untuk melihat detail
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
