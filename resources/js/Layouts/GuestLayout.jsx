import { Link } from '@inertiajs/react';

function BrandMark() {
    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white">
            <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
            >
                <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
            </svg>
        </span>
    );
}

export default function GuestLayout({ children, title, description }) {
    return (
        <div className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(340px,0.9fr)_minmax(460px,1.1fr)]">
            <section className="relative flex min-h-[300px] flex-col overflow-hidden bg-[#172d28] px-7 py-7 text-white sm:px-10 sm:py-9 lg:min-h-screen lg:px-14 lg:py-10 xl:px-20">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 top-24 h-72 w-72 rounded-full border border-white/[0.08]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-8 top-36 h-48 w-48 rounded-full border border-white/[0.08]"
                />
                <Link
                    className="relative z-10 inline-flex w-fit items-center gap-3"
                    href="/"
                >
                    <BrandMark />
                    <span>
                        <span className="block text-[17px] font-semibold tracking-tight">
                            Kosmate
                        </span>
                        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                            Manajemen hunian
                        </span>
                    </span>
                </Link>

                <div className="relative z-10 my-auto max-w-lg py-9 lg:py-20">
                    <span className="mb-5 block h-px w-10 bg-[#a4c5b8]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.19em] text-[#b7d0c5]">
                        Kamar · Penyewaan · Perizinan
                    </p>
                    <h1 className="mt-5 max-w-md text-3xl font-medium leading-tight tracking-[-0.035em] text-white sm:text-[40px]">
                        Ruang tinggal yang nyaman, dikelola dengan rapi.
                    </h1>
                    <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
                        Informasi kos dan aktivitas penghuni tersusun dalam satu
                        ruang kerja yang mudah digunakan.
                    </p>

                    <div className="mt-9 hidden items-center gap-3 text-[11px] font-medium text-white/55 sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#9cbeaF]" />
                        Praktis untuk pengelola dan penghuni
                    </div>
                </div>

                <p className="relative z-10 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 lg:block">
                    Kosmate · Ruang kerja pengelolaan kos
                </p>
            </section>

            <main className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
                <div className="w-full max-w-[420px]">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                            {title}
                        </h2>
                        {description && (
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                {description}
                            </p>
                        )}
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}
