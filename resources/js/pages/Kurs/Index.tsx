import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { KursItem } from '@/types/indonesiaql';

interface Props {
    kurs: KursItem[];
}

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

const FLAG: Record<string, string> = {
    USD: '🇺🇸',
    EUR: '🇪🇺',
    GBP: '🇬🇧',
    JPY: '🇯🇵',
    AUD: '🇦🇺',
    SGD: '🇸🇬',
    CNY: '🇨🇳',
    SAR: '🇸🇦',
    MYR: '🇲🇾',
    HKD: '🇭🇰',
    KRW: '🇰🇷',
    INR: '🇮🇳',
    CHF: '🇨🇭',
    AED: '🇦🇪',
};

const NAMA: Record<string, string> = {
    USD: 'Dolar AS',
    EUR: 'Euro',
    GBP: 'Poundsterling',
    JPY: 'Yen Jepang',
    AUD: 'Dolar Australia',
    SGD: 'Dolar Singapura',
    CNY: 'Yuan Tiongkok',
    SAR: 'Riyal Saudi',
    MYR: 'Ringgit Malaysia',
    HKD: 'Dolar Hong Kong',
    KRW: 'Won Korea',
    INR: 'Rupee India',
    CHF: 'Franc Swiss',
    AED: 'Dirham UEA',
};

export default function KursIndex({ kurs }: Props) {
    const tanggal = kurs[0]?.tanggal ?? '-';

    return (
        <Layout>
            <Head title="Kurs Valuta Asing" />

            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-xs font-bold tracking-widest text-red-600 uppercase dark:text-red-400">
                        Bank Indonesia · Diperbarui setiap jam
                    </p>
                    <h1 className="font-display text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Kurs Valuta Asing
                    </h1>
                    <p className="mt-2 text-neutral-500 dark:text-zinc-400">
                        Kurs beli, jual, dan tengah terhadap Rupiah
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-neutral-200/60 bg-white px-4 py-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    <span className="text-xs font-medium text-neutral-600 dark:text-zinc-400">
                        {tanggal}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {kurs.map((item) => (
                    <div
                        key={item.mataUang}
                        className="rounded-lg border border-neutral-200/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-3xl leading-none">
                                {FLAG[item.mataUang] ?? '💱'}
                            </span>
                            <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-bold text-neutral-600 dark:bg-zinc-800 dark:text-zinc-400">
                                {item.mataUang}
                            </span>
                        </div>
                        <p className="truncate text-xs text-neutral-400 dark:text-zinc-500">
                            {NAMA[item.mataUang] ?? item.mataUang}
                        </p>
                        <p className="mt-1 font-display text-xl font-bold text-neutral-900 tabular-nums dark:text-white">
                            {formatRupiah(item.kursTengah)}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-zinc-600">
                            kurs tengah
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-1 border-t border-neutral-100 pt-3 dark:border-zinc-800">
                            <div>
                                <p className="text-xs text-neutral-300 dark:text-zinc-600">
                                    Beli
                                </p>
                                <p className="text-xs font-medium text-neutral-500 tabular-nums dark:text-zinc-400">
                                    {formatRupiah(item.kursBeli)}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-300 dark:text-zinc-600">
                                    Jual
                                </p>
                                <p className="text-xs font-medium text-neutral-500 tabular-nums dark:text-zinc-400">
                                    {formatRupiah(item.kursJual)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-6 text-xs text-neutral-400 dark:text-zinc-600">
                * Semua nilai dalam Rupiah (IDR). Spread ±0.5% dari kurs tengah.
            </p>
        </Layout>
    );
}
