import { Head } from '@inertiajs/react';
import Layout from '@/components/Layout';

const API = 'https://gographql.project-n.site/query';

function Code({ children }: { children: string }) {
    return (
        <pre className="overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono text-xs leading-relaxed text-neutral-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {children}
        </pre>
    );
}

function Badge({ children }: { children: string }) {
    return (
        <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-600 uppercase dark:bg-red-950/30 dark:text-red-400">
            {children}
        </span>
    );
}

function H2({ tag, children }: { tag: string; children: string }) {
    return (
        <div className="flex items-center gap-3 mb-4 mt-10 first:mt-0">
            <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
                {children}
            </h2>
            <Badge>{tag}</Badge>
        </div>
    );
}

function H3({ children }: { children: string }) {
    return (
        <h3 className="mb-2 mt-6 text-sm font-bold text-neutral-700 dark:text-zinc-300">
            {children}
        </h3>
    );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-zinc-700">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-zinc-700 dark:bg-zinc-900">
                        {headers.map((h) => (
                            <th
                                key={h}
                                className="px-4 py-2.5 text-left text-[10px] font-bold tracking-widest text-neutral-400 uppercase dark:text-zinc-500"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr
                            key={i}
                            className="border-b border-neutral-100 last:border-0 dark:border-zinc-800"
                        >
                            {row.map((cell, j) => (
                                <td
                                    key={j}
                                    className="px-4 py-2.5 font-mono text-xs text-neutral-600 dark:text-zinc-400"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default function VaultDev() {
    return (
        <Layout>
            <Head title="Developer Guide · Vault" />

            <div className="mb-8">
                <p className="mb-2 text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase">
                    Internal · Vault
                </p>
                <h1 className="font-display text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    Developer Guide
                </h1>
                <p className="mt-2 text-sm text-neutral-400 dark:text-zinc-500">
                    Panduan onboarding untuk developer yang melanjutkan project ini.
                </p>
            </div>

            {/* Overview */}
            <section>
                <H2 tag="Umum">Overview</H2>
                <p className="mb-4 text-sm text-neutral-500 dark:text-zinc-400">
                    Project ini terdiri dari dua repo terpisah:
                </p>
                <Table
                    headers={['Repo', 'Stack', 'Lokasi Lokal', 'Live']}
                    rows={[
                        ['API (GoGraphQL)', 'Go 1.25 + gqlgen', '/Sites/RisetGraphql', API],
                        ['Web (GraphqlWEB)', 'Laravel 13 + Inertia + React 19', '/Sites/GraphqlWEB', 'frontend ini'],
                    ]}
                />
                <p className="mt-3 font-mono text-xs text-neutral-400 dark:text-zinc-500">
                    GitHub: https://github.com/Lisvindanu/GoGraphQl
                </p>
            </section>

            {/* API */}
            <section>
                <H2 tag="Backend">API — GoGraphQL</H2>

                <H3>Setup Lokal</H3>
                <Code>{`cp .env.example .env
# isi DB_URL dengan PostgreSQL connection string
go run ./cmd/server/
# playground: http://localhost:8080/`}</Code>

                <H3>Struktur Folder</H3>
                <Code>{`cmd/server/main.go              ← entry point, HTTP mux, service wiring
graph/
  schema/*.graphqls             ← definisi GraphQL schema (schema-first)
  *.resolvers.go                ← implementasi resolver
  resolver.go                   ← struct Resolver + NewResolver()
internal/
  service/*_svc.go              ← business logic
  repository/*_repo.go          ← database queries (PostgreSQL)
  staticdata/*.go               ← data statis (Go slice, no DB)
  staticdata/photos/pahlawan/   ← 165 foto JPG, di-embed ke binary
  cache/inmemory.go             ← in-memory TTL cache
  middleware/                   ← CORS, rate limit, logging, recovery
  database/migrations/          ← SQL migrations`}</Code>

                <H3>Cara Tambah Fitur Baru</H3>
                <Code>{`1. Buat graph/schema/nama_fitur.graphqls
2. go run github.com/99designs/gqlgen@v0.17.90 generate
3. Buat internal/service/nama_svc.go
4. Implementasi resolver di graph/nama_fitur.resolvers.go
5. Daftarkan di graph/resolver.go (struct field + NewResolver param)
6. Wire di cmd/server/main.go`}</Code>

                <H3>Data Sources</H3>
                <Table
                    headers={['Fitur', 'Sumber']}
                    rows={[
                        ['Wilayah, NIK, Kode Pos', 'PostgreSQL (data BPS)'],
                        ['Cuaca', 'BMKG XML real-time'],
                        ['Kurs', 'Bank Indonesia SOAP XML'],
                        ['Hari Libur', 'PostgreSQL (SKB 3 Menteri)'],
                        ['Kalender Jawa, Hijriyah, Terbilang', 'Pure calculation'],
                        ['Kode Bank, Plat Nomor, BBM, BPJS, UMR, Bandara', 'Static slice (internal/staticdata/)'],
                        ['Gempa', 'BMKG JSON real-time'],
                        ['IHSG', 'Fetch live'],
                        ['Gunung Berapi, Pahlawan', 'Static slice + embedded photos'],
                    ]}
                />

                <H3>Deploy ke VPS</H3>
                <Code>{`# push dari lokal
git push origin main

# di VPS (167.253.158.192)
cd /var/www/gographql-src && git pull
export PATH=$PATH:/usr/local/go/bin
go build -o /var/www/gographql/gographql ./cmd/server/
pm2 restart gographql   # id: 46`}</Code>
                <p className="mt-2 text-xs text-neutral-400 dark:text-zinc-500">
                    Binary jalan di port <span className="font-mono">8010</span>, di-proxy Nginx ke domain.
                </p>
            </section>

            {/* Web */}
            <section>
                <H2 tag="Frontend">Web — GraphqlWEB</H2>

                <H3>Setup Lokal</H3>
                <Code>{`composer install && npm install
cp .env.example .env && php artisan key:generate
npm run dev
php artisan serve`}</Code>

                <H3>Struktur Folder</H3>
                <Code>{`app/
  Http/Controllers/               ← satu controller per halaman
  Services/IndonesiaQLService.php ← SEMUA query GraphQL ada di sini
resources/js/
  pages/                          ← React pages (Inertia)
  components/                     ← Layout, NavBar, dll
  types/indonesiaql.ts            ← TypeScript interfaces
routes/web.php                    ← route definitions`}</Code>

                <H3>Pattern Penting ⚠️</H3>
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
                    <strong>GraphQL TIDAK boleh di-fetch dari client-side React.</strong>
                    <br />
                    <span className="mt-1 block font-mono text-xs opacity-80">
                        Browser → Controller → IndonesiaQLService → GraphQL API → Inertia props → React
                    </span>
                </div>

                <H3>Cara Tambah Halaman Baru</H3>
                <Code>{`1. Tambah method di app/Services/IndonesiaQLService.php
2. Buat app/Http/Controllers/NamaController.php
3. Buat resources/js/pages/Nama/Index.tsx
4. Tambah interface di resources/js/types/indonesiaql.ts
5. Tambah route di routes/web.php
6. Tambah link di resources/js/components/NavBar.tsx`}</Code>

                <H3>Halaman yang Sudah Ada</H3>
                <Table
                    headers={['URL', 'Deskripsi']}
                    rows={[
                        ['/', 'Landing page'],
                        ['/playground', 'GraphQL playground'],
                        ['/wilayah', 'Wilayah administratif'],
                        ['/cuaca', 'Prakiraan cuaca BMKG'],
                        ['/kurs', 'Kurs Bank Indonesia'],
                        ['/hari-libur', 'Hari libur nasional'],
                        ['/nik', 'Validasi NIK'],
                        ['/kalender-jawa', 'Kalender Jawa'],
                        ['/kalender-hijriyah', 'Kalender Hijriyah'],
                        ['/terbilang', 'Angka ke teks'],
                        ['/kode-bank', 'Kode bank Indonesia'],
                        ['/plat-nomor', 'Plat nomor kendaraan'],
                        ['/waktu-sholat', 'Waktu sholat'],
                        ['/gempa', 'Info gempa BMKG'],
                        ['/kode-pos', 'Kode pos'],
                        ['/harga-bbm', 'Harga BBM Pertamina'],
                        ['/saham', 'IHSG'],
                        ['/bpjs', 'Iuran BPJS'],
                        ['/rekening', 'Validasi nomor rekening'],
                        ['/inflasi', 'Data inflasi'],
                        ['/umr', 'UMR provinsi'],
                        ['/emas', 'Harga emas Antam'],
                        ['/bandara', 'Bandara Indonesia'],
                        ['/gunung-berapi', '150 gunung berapi'],
                        ['/pahlawan', '191 pahlawan nasional + foto'],
                    ]}
                />

                <H3>Deploy ke VPS</H3>
                <Code>{`cd /var/www/LaravelGQL && git pull
composer install --no-dev
npm run build
php artisan config:cache && php artisan route:cache && php artisan view:cache`}</Code>
            </section>

            {/* Endpoint */}
            <section>
                <H2 tag="API">GraphQL Endpoint</H2>
                <Table
                    headers={['Key', 'Value']}
                    rows={[
                        ['URL', API],
                        ['Method', 'POST'],
                        ['Content-Type', 'application/json'],
                        ['Cache cuaca', '30 menit'],
                        ['Cache kurs', '1 jam'],
                        ['Cache gempa', '5 menit'],
                        ['Cache wilayah', 'permanent'],
                    ]}
                />
                <H3>Contoh Request</H3>
                <Code>{`curl -X POST ${API} \\
  -H "Content-Type: application/json" \\
  -d '{"query":"{ pahlawanList { nama tahunDiangkat foto } }"}'`}</Code>

                <ul className="mt-4 space-y-1 text-sm text-neutral-500 dark:text-zinc-400">
                    <li>• Foto pahlawan di-embed ke binary Go — tidak perlu file server terpisah</li>
                    <li>• Rate limit via env <span className="font-mono text-xs">RATE_LIMIT_RPM</span></li>
                    <li>• Tambah data statis: edit <span className="font-mono text-xs">internal/staticdata/*.go</span> → rebuild → deploy</li>
                </ul>
            </section>
        </Layout>
    );
}
