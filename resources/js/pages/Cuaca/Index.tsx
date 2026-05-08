import { Head, router } from '@inertiajs/react';
import Layout from '@/components/Layout';
import type { CuacaData, Kota, Provinsi } from '@/types/indonesiaql';

interface Props {
    provinsiList: Provinsi[];
    kotaList: Kota[];
    cuaca: CuacaData | null;
    selectedProvinsi: string;
    selectedKota: string;
}

export default function CuacaIndex({
    provinsiList,
    kotaList,
    cuaca,
    selectedProvinsi,
    selectedKota,
}: Props) {
    const handleProvinsiChange = (kode: string) => {
        router.get('/cuaca', kode ? { provinsi_kode: kode } : {});
    };

    const handleKotaChange = (nama: string) => {
        if (selectedProvinsi && nama) {
            router.get('/cuaca', {
                provinsi_kode: selectedProvinsi,
                kota: nama,
            });
        }
    };

    return (
        <Layout>
            <Head title="Prakiraan Cuaca" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Prakiraan Cuaca
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Data cuaca real-time dari BMKG per kota di Indonesia
                </p>
            </div>

            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Provinsi
                        </label>
                        <select
                            value={selectedProvinsi}
                            onChange={(e) =>
                                handleProvinsiChange(e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        >
                            <option value="">-- Pilih Provinsi --</option>
                            {provinsiList.map((p) => (
                                <option key={p.kode} value={p.kode}>
                                    {p.nama}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Kota / Kabupaten
                        </label>
                        <select
                            value={selectedKota}
                            onChange={(e) => handleKotaChange(e.target.value)}
                            disabled={kotaList.length === 0}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        >
                            <option value="">-- Pilih Kota --</option>
                            {kotaList.map((k) => (
                                <option
                                    key={k.kode}
                                    value={k.nama.toLowerCase()}
                                >
                                    {k.nama}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {cuaca && (
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {cuaca.kota}
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                        Waktu
                                    </th>
                                    <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                                        Cuaca
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                        Suhu
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                        Kelembapan
                                    </th>
                                    <th className="px-4 py-3 text-right font-medium text-gray-500 dark:text-gray-400">
                                        Angin
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {cuaca.prakiraan.map((p, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    >
                                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                                            {p.waktu}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                            {p.cuaca}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                                            {p.suhu}°C
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                                            {p.kelembapan}%
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">
                                            {p.kecepatanAngin} km/h{' '}
                                            {p.arahAngin}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {selectedProvinsi && selectedKota && !cuaca && (
                <p className="mt-4 text-center text-sm text-gray-400">
                    Data cuaca tidak tersedia untuk kota ini.
                </p>
            )}
        </Layout>
    );
}
