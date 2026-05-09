import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import Layout from '@/components/Layout';

const API = 'https://gographql.project-n.site/query';

const EXAMPLES: { label: string; query: string; variables?: string }[] = [
    {
        label: 'Provinsi List',
        query: `{ provinsiList { kode nama } }`,
    },
    {
        label: 'Cuaca Jakarta',
        query: `query {
  cuaca(provinsiKode: "31", kota: "Jakarta") {
    kota
    prakiraan {
      waktu suhu cuaca kelembapan
    }
  }
}`,
    },
    {
        label: 'Kurs',
        query: `{ kurs { mataUang kursBeli kursJual kursTengah tanggal } }`,
    },
    {
        label: 'Hari Libur 2026',
        query: `query {
  hariLibur(tahun: 2026) {
    tanggal nama jenis
  }
}`,
    },
    {
        label: 'Validasi NIK',
        query: `query {
  validasiNIK(nik: "3201010101800001") {
    valid provinsi kota tanggalLahir jenisKelamin errors
  }
}`,
    },
    {
        label: 'Kalender Jawa',
        query: `query {
  kalenderJawa(tanggal: "2026-05-08") {
    tanggalMasehi hari pasaran wuku tahunJawa namaWindu
  }
}`,
    },
    {
        label: 'Terbilang',
        query: `query {
  terbilang(angka: 75000000) {
    angka terbilang
  }
}`,
    },
    {
        label: 'Kode Bank List',
        query: `{ kodeBankList { kode nama } }`,
    },
    {
        label: 'Plat Nomor',
        query: `query {
  platNomor(kode: "KB") {
    kode wilayah provinsi
  }
}`,
    },
    {
        label: 'Waktu Sholat',
        query: `query {
  waktuSholat(kota: "Jakarta") {
    kota tanggal subuh terbit dzuhur ashar maghrib isya
  }
}`,
    },
    {
        label: 'Search Wilayah',
        query: `query {
  searchWilayah(query: "Bandung", limit: 5) {
    kode nama tipe kota provinsi
  }
}`,
    },
    {
        label: 'Gempa Terbaru',
        query: `query {
  gempaTerbaru {
    tanggal jam magnitude kedalaman wilayah potensi
  }
}`,
    },
    {
        label: 'Kode Pos',
        query: `query {
  kodePos(kode: "10110") {
    kodePos kelurahan kecamatan kota provinsi
  }
}`,
    },
    {
        label: 'Kalender Hijriyah',
        query: `query {
  kalenderHijriyah(tanggal: "2026-05-09") {
    tanggalMasehi tanggalHijriyah hari hariArab bulan bulanArab tahun
  }
}`,
    },
    {
        label: 'Harga BBM',
        query: `{ hargaBBM { nama harga satuan jenis } }`,
    },
];

export default function PlaygroundIndex() {
    const [query, setQuery] = useState(EXAMPLES[0].query);
    const [variables, setVariables] = useState('');
    const [response, setResponse] = useState('');
    const [status, setStatus] = useState<{ code: number; ms: number } | null>(
        null,
    );
    const [loading, setLoading] = useState(false);
    const [showVars, setShowVars] = useState(false);
    const startRef = useRef<number>(0);

    const run = async () => {
        setLoading(true);
        setResponse('');
        setStatus(null);
        startRef.current = Date.now();

        try {
            const payload: Record<string, unknown> = { query };
            if (variables.trim()) {
                try {
                    payload.variables = JSON.parse(variables);
                } catch {
                    setResponse('Error: Variables harus berupa JSON valid.');
                    setLoading(false);
                    return;
                }
            }

            const res = await fetch(API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const ms = Date.now() - startRef.current;
            const json = await res.json();
            setResponse(JSON.stringify(json, null, 2));
            setStatus({ code: res.status, ms });
        } catch (err) {
            setResponse(
                `Error: ${err instanceof Error ? err.message : String(err)}`,
            );
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            run();
        }
    };

    return (
        <Layout>
            <Head title="Playground" />

            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        GraphQL · Live
                    </p>
                    <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Playground
                    </h1>
                </div>
                <p className="hidden font-mono text-xs text-neutral-300 sm:block dark:text-zinc-700">
                    {API}
                </p>
            </div>

            {/* Example queries */}
            <div className="mb-5 flex flex-wrap gap-1.5">
                {EXAMPLES.map((ex) => (
                    <button
                        key={ex.label}
                        onClick={() => {
                            setQuery(ex.query);
                            setVariables(ex.variables ?? '');
                            setResponse('');
                            setStatus(null);
                        }}
                        className="rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:border-red-900/40 dark:hover:text-red-400"
                    >
                        {ex.label}
                    </button>
                ))}
            </div>

            {/* Editor split */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Left: query editor */}
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="mb-1 flex items-center justify-between">
                            <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                                Query
                            </p>
                            <p className="text-[10px] text-neutral-300 dark:text-zinc-700">
                                Ctrl+Enter
                            </p>
                        </div>
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKey}
                            spellCheck={false}
                            className="h-64 w-full resize-none rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono text-sm leading-relaxed text-neutral-900 focus:border-red-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                        />
                    </div>

                    {/* Variables */}
                    <div>
                        <button
                            onClick={() => setShowVars((v) => !v)}
                            className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase transition-colors hover:text-neutral-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                        >
                            <svg
                                className={[
                                    'h-3 w-3 transition-transform',
                                    showVars ? 'rotate-90' : '',
                                ].join(' ')}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            Variables
                        </button>
                        {showVars && (
                            <textarea
                                value={variables}
                                onChange={(e) => setVariables(e.target.value)}
                                placeholder='{ "key": "value" }'
                                spellCheck={false}
                                className="mt-2 h-24 w-full resize-none rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono text-sm text-neutral-900 placeholder-neutral-300 focus:border-red-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-700"
                            />
                        )}
                    </div>

                    <button
                        onClick={run}
                        disabled={loading || !query.trim()}
                        className="flex items-center justify-center gap-2 rounded-md bg-neutral-900 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        {loading ? (
                            <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                        {loading ? 'Running...' : 'Run Query'}
                    </button>
                </div>

                {/* Right: response */}
                <div>
                    <div className="mb-1 flex items-center justify-between">
                        <p className="text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase dark:text-zinc-500">
                            Response
                        </p>
                        {status && (
                            <div className="flex items-center gap-3">
                                <span
                                    className={[
                                        'text-[10px] font-bold',
                                        status.code === 200
                                            ? 'text-neutral-500 dark:text-zinc-400'
                                            : 'text-red-600',
                                    ].join(' ')}
                                >
                                    {status.code}
                                </span>
                                <span className="font-mono text-[10px] text-neutral-300 dark:text-zinc-700">
                                    {status.ms}ms
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="h-[370px] overflow-auto rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
                        {response ? (
                            <pre className="font-mono text-xs leading-relaxed break-all whitespace-pre-wrap text-neutral-700 dark:text-zinc-300">
                                {response}
                            </pre>
                        ) : (
                            <p className="text-sm text-neutral-300 dark:text-zinc-700">
                                Hasil query akan muncul di sini...
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
