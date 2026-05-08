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

const weatherEmoji = (desc: string): string => {
    const d = desc.toLowerCase();
    if (d.includes('badai') || d.includes('petir')) return '⛈️';
    if (d.includes('hujan lebat') || d.includes('deras')) return '🌧️';
    if (d.includes('hujan')) return '🌦️';
    if (d.includes('kabut') || d.includes('asap')) return '🌫️';
    if (d.includes('mendung') || d.includes('berawan tebal')) return '☁️';
    if (d.includes('cerah berawan') || d.includes('berawan')) return '⛅';
    if (d.includes('cerah')) return '☀️';
    return '🌤️';
};

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
            router.get('/cuaca', { provinsi_kode: selectedProvinsi, kota: nama });
        }
    };

    return (
        <Layout>
            <Head title="Prakiraan Cuaca" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Prakiraan Cuaca
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Data cuaca real-time per kota di Indonesia
                </p>
            </div>

            <div className="mb-6 rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Provinsi
                        </label>
                        <select
                            value={selectedProvinsi}
                            onChange={(e) => handleProvinsiChange(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100"
                        >
                            <option value="">-- Pilih Provinsi --</option>
                            {provinsiList.map((p) => (
                                <option key={p.kode} value={p.kode}>{p.nama}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Kota / Kabupaten
                        </label>
                        <select
                            value={selectedKota}
                            onChange={(e) => handleKotaChange(e.target.value)}
                            disabled={kotaList.length === 0}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-100"
                        >
                            <option value="">-- Pilih Kota --</option>
                            {kotaList.map((k) => (
                                <option key={k.kode} value={k.nama.toLowerCase()}>{k.nama}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {cuaca && (
                <div>
                    <div className="mb-4 flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {cuaca.kota}
                        </h2>
                        <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                            Real-time
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {cuaca.prakiraan.map((p, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-gray-200/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                            >
                                <p className="text-xs text-gray-400 dark:text-gray-500">{p.waktu}</p>
                                <p className="mt-2 text-3xl leading-none">{weatherEmoji(p.cuaca)}</p>
                                <p className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                                    {p.suhu}
                                </p>
                                <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                                    {p.cuaca}
                                </p>
                                <div className="mt-3 space-y-1 border-t border-gray-100 pt-2 dark:border-gray-800">
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>💧</span>
                                        <span>{p.kelembapan}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>💨</span>
                                        <span>{p.kecepatanAngin}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedProvinsi && selectedKota && !cuaca && (
                <div className="rounded-2xl border border-gray-200/60 bg-white py-16 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-3xl">🌤️</p>
                    <p className="mt-3 font-medium text-gray-500 dark:text-gray-400">
                        Data cuaca tidak tersedia untuk kota ini
                    </p>
                </div>
            )}

            {!selectedProvinsi && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-3xl">🌏</p>
                    <p className="mt-3 font-medium text-gray-500 dark:text-gray-400">
                        Pilih provinsi dan kota untuk melihat prakiraan cuaca
                    </p>
                </div>
            )}
        </Layout>
    );
}
