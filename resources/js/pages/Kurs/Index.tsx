import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { KursItem } from '@/types/indonesiaql';

interface Props {
    kurs: KursItem[];
}

const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID').format(value);

export default function KursIndex({ kurs }: Props) {
    const tanggal = kurs[0]?.tanggal ?? '-';

    return (
        <Layout>
            <Head title="Kurs Valuta Asing" />

            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Kurs Valuta Asing
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Kurs transaksi Bank Indonesia
                    </p>
                </div>
                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {tanggal}
                </span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                    Mata Uang
                                </th>
                                <th className="px-6 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                    Kurs Beli
                                </th>
                                <th className="px-6 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                    Kurs Tengah
                                </th>
                                <th className="px-6 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                    Kurs Jual
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {kurs.map((item) => (
                                <tr
                                    key={item.mataUang}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">
                                        {item.mataUang}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-700 tabular-nums dark:text-gray-300">
                                        {formatRupiah(item.kursBeli)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-gray-900 tabular-nums dark:text-gray-100">
                                        {formatRupiah(item.kursTengah)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-700 tabular-nums dark:text-gray-300">
                                        {formatRupiah(item.kursJual)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
                * Semua nilai dalam Rupiah (IDR). Diperbarui setiap 1 jam.
            </p>
        </Layout>
    );
}
