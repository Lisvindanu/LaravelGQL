import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { KursItem } from '@/types/indonesiaql';

interface Props {
    kurs: KursItem[];
}

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

const FLAG: Record<string, string> = {
    USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵',
    AUD: '🇦🇺', SGD: '🇸🇬', CNY: '🇨🇳', SAR: '🇸🇦',
    MYR: '🇲🇾', HKD: '🇭🇰', KRW: '🇰🇷', INR: '🇮🇳',
    CHF: '🇨🇭', AED: '🇦🇪',
};

export default function KursIndex({ kurs }: Props) {
    const tanggal = kurs[0]?.tanggal ?? '-';

    return (
        <Layout>
            <Head title="Kurs Valuta Asing" />

            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Kurs Valuta Asing
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Kurs valuta asing terhadap Rupiah · Diperbarui setiap jam
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200/60 bg-white px-4 py-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {tanggal}
                    </span>
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Mata Uang
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Kurs Beli
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Kurs Tengah
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Kurs Jual
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {kurs.map((item, i) => (
                                <tr
                                    key={item.mataUang}
                                    className={[
                                        'transition-colors hover:bg-red-50/40 dark:hover:bg-gray-800/50',
                                        i < kurs.length - 1
                                            ? 'border-b border-gray-100 dark:border-gray-800/60'
                                            : '',
                                    ].join(' ')}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl leading-none">
                                                {FLAG[item.mataUang] ?? '💱'}
                                            </span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {item.mataUang}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm tabular-nums text-gray-500 dark:text-gray-400">
                                        {formatRupiah(item.kursBeli)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-semibold tabular-nums text-gray-900 dark:text-gray-100">
                                            {formatRupiah(item.kursTengah)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm tabular-nums text-gray-500 dark:text-gray-400">
                                        {formatRupiah(item.kursJual)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-400 dark:text-gray-600">
                * Semua nilai dalam Rupiah (IDR). Spread ±0.5% dari kurs tengah.
            </p>
        </Layout>
    );
}
