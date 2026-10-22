import { Link, usePage } from '@inertiajs/react';

export default function Navbar({ onMenuClick }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const roleLabels = {
        user: 'Penyewa',
        admin: 'Pengelola',
        superadmin: 'Superadmin',
    };

    return (
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-white/10 bg-[#0B1B3D] px-5 text-white shadow-sm sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
                <button
                    aria-label="Buka menu navigasi"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200/75">
                        Kosmate · Ruang kerja
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                        Pengelolaan kos
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden text-right sm:block">
                    <p className="text-xs font-semibold text-white">
                        {user?.name || 'Pengguna'}
                    </p>
                    <p className="mt-0.5 text-[11px] capitalize text-blue-100/70">
                        {roleLabels[user?.role] || 'Akun'}
                    </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-semibold text-white sm:hidden">
                    {user?.name?.charAt(0)?.toUpperCase() || 'K'}
                </span>
                <span className="hidden h-8 w-px bg-white/15 sm:block" />
                <Link
                    className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
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