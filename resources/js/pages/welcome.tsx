import { Head, Link } from '@inertiajs/react';
import Layout from '@/components/Layout';

export default function Welcome() {
    return (
        <Layout>
            <Head title="Beranda" />

            <div className="flex min-h-[70vh] flex-col justify-center">
                <p className="mb-4 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Open GraphQL API · Indonesia
                </p>

                <h1 className="font-display text-6xl font-black leading-none tracking-tight text-neutral-900 sm:text-8xl dark:text-white">
                    Indonesia
                    <br />
                    <span className="text-red-600">QL</span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-400 dark:text-zinc-500">
                    Data publik Indonesia dalam satu GraphQL API — wilayah, cuaca,
                    kurs, hari libur, NIK, kalender Jawa, terbilang, kode bank,
                    plat nomor, dan waktu sholat.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                        href="/wilayah"
                        className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900"
                    >
                        Mulai Eksplorasi →
                    </Link>
                    <a
                        href="https://gographql.project-n.site/query"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                    >
                        GraphQL Playground
                    </a>
                </div>

                <div className="mt-16 flex items-center gap-8 border-t border-neutral-100 pt-8 dark:border-zinc-800">
                    {[
                        { value: '34', label: 'Provinsi' },
                        { value: '514', label: 'Kota / Kab' },
                        { value: '7.2k+', label: 'Kecamatan' },
                        { value: '10', label: 'Fitur API' },
                    ].map((s) => (
                        <div key={s.label}>
                            <p className="font-mono text-2xl font-black text-neutral-900 dark:text-white">
                                {s.value}
                            </p>
                            <p className="text-xs text-neutral-400 dark:text-zinc-600">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
