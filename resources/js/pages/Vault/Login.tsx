import { Head, useForm } from '@inertiajs/react';

export default function VaultLogin() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/vault/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f0efe9] px-4 dark:bg-zinc-950">
            <Head title="Vault · Login" />

            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <p className="mb-1 text-[10px] font-bold tracking-[0.2em] text-red-600 uppercase">
                        Internal · Vault
                    </p>
                    <h1 className="font-display text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
                        Developer Access
                    </h1>
                </div>

                <form
                    onSubmit={submit}
                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                    <div className="mb-4">
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-500 dark:text-zinc-400">
                            Email
                        </label>
                        <input
                            type="email"
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                            placeholder="email@domain.com"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="mb-1.5 block text-xs font-semibold text-neutral-500 dark:text-zinc-400">
                            Password
                        </label>
                        <input
                            type="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-red-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-700 disabled:opacity-40 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                        {processing ? 'Masuk...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
}
