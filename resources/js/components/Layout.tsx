import { useState, type PropsWithChildren } from 'react';
import NavBar from '@/components/NavBar';

export default function Layout({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#f0efe9] dark:bg-zinc-950">
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <NavBar open={open} onClose={() => setOpen(false)} />

            <div className="flex min-w-0 flex-1 flex-col md:ml-52">
                {/* Mobile top bar */}
                <div className="flex h-14 items-center gap-3 border-b border-neutral-200/60 bg-white/80 px-4 backdrop-blur-sm md:hidden dark:border-zinc-800 dark:bg-zinc-900/80">
                    <button
                        onClick={() => setOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-600 hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                        aria-label="Open menu"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <span className="font-semibold tracking-tight">
                        <span className="text-red-600">Indonesia</span>
                        <span className="text-neutral-900 dark:text-white">
                            QL
                        </span>
                    </span>
                </div>

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
