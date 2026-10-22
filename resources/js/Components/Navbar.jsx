import { Link, usePage } from '@inertiajs/react';

export default function Navbar({ onMenuClick }) {
    const { props } = usePage();
    const user = props.auth?.user;

    return (
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-white/95 px-5 backdrop-blur sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
                <button
                    aria-label="Buka menu navigasi"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
                    onClick={onMenuClick}
                    type="button"
                >
                    <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Ruang kerja
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-slate-800">
                        Pengelolaan kos
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden text-right sm:block">
                    <p className="text-xs font-semibold text-slate-800">
                        {user?.name || 'Pengguna'}
                    </p>
                    <p className="mt-0.5 text-[11px] capitalize text-slate-500">
                        {user?.role || 'Akun'}
                    </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce9e4] text-sm font-semibold text-[#25483f] sm:hidden">
                    {user?.name?.charAt(0)?.toUpperCase() || 'K'}
                </span>
                <span className="hidden h-8 w-px bg-slate-200 sm:block" />
                <Link
                    className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    href={route('logout')}
                    method="post"
                    as="button"
                >
                    Keluar
                </Link>
            </div>
        </header>
    );
}