import { Link, usePage } from '@inertiajs/react';

const navigationIcons = {
    dashboard: (
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
    ),
    rooms: (
        <>
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M3 11h18M8 11v4m8-4v4M7 20v1m10-1v1" />
        </>
    ),
    rentals: (
        <>
            <path d="M4 7h16v13H4zM8 7V5a4 4 0 0 1 8 0v2" />
            <path d="M9 12h6m-6 4h4" />
        </>
    ),
    permits: (
        <>
            <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
            <path d="M14 3v5h5M9 13h6m-6 4h6" />
        </>
    ),
    users: (
        <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 8v6m3-3h-6" />
        </>
    ),
};

function NavigationIcon({ name }) {
    return (
        <svg
            aria-hidden="true"
            className="h-[18px] w-[18px] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            viewBox="0 0 24 24"
        >
            {navigationIcons[name]}
        </svg>
    );
}

function BrandMark() {
    return (
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1B3D] text-white">
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

export default function Sidebar({ isOpen, onClose }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const roleLabels = {
        user: 'Penyewa',
        admin: 'Pengelola',
        superadmin: 'Superadmin',
    };
    const navigation = [
        { label: 'Ringkasan', href: route('dashboard'), icon: 'dashboard' },
        ...(['admin', 'superadmin'].includes(user?.role)
            ? [{ label: 'Kelola kamar', href: route('rooms.index'), icon: 'rooms' }]
            : []),
        {
            label: user?.role === 'user' ? 'Sewa kamar' : 'Penyewaan',
            href: route('rentals.index'),
            icon: 'rentals',
        },
        {
            label: user?.role === 'user' ? 'Ajukan izin' : 'Perizinan',
            href: route('permits.index'),
            icon: 'permits',
        },
        ...(user?.role === 'superadmin'
            ? [{ label: 'Pengguna', href: route('users.index'), icon: 'users' }]
            : []),
    ];

    return (
        <>
            {isOpen && (
                <button
                    aria-label="Tutup menu navigasi"
                    className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
                    onClick={onClose}
                    type="button"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[268px] flex-col border-r border-slate-200 bg-white px-5 py-6 transition-transform duration-200 lg:sticky lg:top-0 lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Link
                    className="mb-10 flex items-center gap-3 px-1"
                    href={route('dashboard')}
                    onClick={onClose}
                >
                    <BrandMark />
                    <span>
                        <span className="block text-[17px] font-semibold tracking-tight text-slate-900">
                            Kosmate
                        </span>
                        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Manajemen hunian
                        </span>
                    </span>
                </Link>

                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Menu utama
                </p>
                <nav aria-label="Navigasi utama" className="space-y-1">
                    {navigation.map((item) => {
                        const itemPath = new URL(
                            item.href,
                            window.location.origin,
                        ).pathname;
                        const currentPath = url.split('?')[0];
                        const isActive =
                            itemPath === '/dashboard'
                                ? currentPath === itemPath
                                : currentPath.startsWith(itemPath);

                        return (
                            <Link
                                aria-current={isActive ? 'page' : undefined}
                                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-[#0B1B3D]'
                                        : 'text-slate-600 hover:bg-blue-50/70 hover:text-[#0B1B3D]'
                                }`}
                                href={item.href}
                                key={item.href}
                                onClick={onClose}
                            >
                                <NavigationIcon name={item.icon} />
                                {item.label}
                                {isActive && (
                                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#3182CE]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-slate-100 pt-5">
                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-[#0B1B3D]">
                            {user?.name?.charAt(0)?.toUpperCase() || 'K'}
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-slate-800">
                                {user?.name || 'Pengguna'}
                            </span>
                            <span className="mt-0.5 block truncate text-[11px] capitalize text-slate-500">
                                {roleLabels[user?.role] || 'Akun'}
                            </span>
                        </span>
                    </div>
                </div>
            </aside>
        </>
    );
}
