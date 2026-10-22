import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const metricStyles = {
    rooms: {
        icon: (
            <>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 11h18M8 11v4m8-4v4" />
            </>
        ),
        iconClass: 'bg-[#edf4f1] text-[#315e50]',
    },
    rentals: {
        icon: (
            <>
                <path d="M4 7h16v13H4zM8 7V5a4 4 0 0 1 8 0v2" />
                <path d="M9 12h6" />
            </>
        ),
        iconClass: 'bg-[#f2f1eb] text-[#756d49]',
    },
    permits: {
        icon: (
            <>
                <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                <path d="M14 3v5h5M9 13h6m-6 4h6" />
            </>
        ),
        iconClass: 'bg-[#f5efeb] text-[#8b5f48]',
    },
};

const shortcuts = [
    {
        key: 'rooms',
        href: 'rooms.index',
        title: 'Kelola kamar',
        description: 'Perbarui informasi dan ketersediaan kamar.',
        icon: 'rooms',
        roles: ['admin', 'superadmin'],
    },
    {
        key: 'rentals',
        href: 'rentals.index',
        title: 'Penyewaan',
        description: 'Lihat data dan status penyewaan.',
        icon: 'rentals',
        roles: ['admin', 'superadmin'],
    },
    {
        key: 'rentals-user',
        href: 'rentals.index',
        title: 'Sewa kamar',
        description: 'Lihat penyewaan atau ajukan kamar.',
        icon: 'rentals',
        roles: ['user'],
    },
    {
        key: 'permits',
        href: 'permits.index',
        title: 'Perizinan',
        description: 'Tinjau permohonan izin penghuni.',
        icon: 'permits',
        roles: ['admin', 'superadmin'],
    },
    {
        key: 'permits-user',
        href: 'permits.index',
        title: 'Ajukan izin',
        description: 'Kirim dan pantau permohonan izin.',
        icon: 'permits',
        roles: ['user'],
    },
    {
        key: 'users',
        href: 'users.index',
        title: 'Pengguna',
        description: 'Atur akun dan akses pengguna.',
        icon: 'users',
        roles: ['superadmin'],
    },
];

function MetricIcon({ type, className }) {
    return (
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${className}`}>
            <svg
                aria-hidden="true"
                className="h-[19px] w-[19px]"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
            >
                {metricStyles[type].icon}
            </svg>
        </span>
    );
}

function ShortcutIcon({ type }) {
    return (
        <svg
            aria-hidden="true"
            className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#315e50]"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {type === 'rooms' && (
                <>
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M3 11h18M8 11v4m8-4v4" />
                </>
            )}
            {type === 'rentals' && (
                <>
                    <path d="M4 7h16v13H4zM8 7V5a4 4 0 0 1 8 0v2" />
                    <path d="M9 12h6" />
                </>
            )}
            {type === 'permits' && (
                <>
                    <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
                    <path d="M14 3v5h5M9 13h6" />
                </>
            )}
            {type === 'users' && (
                <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="M20 8v6m3-3h-6" />
                </>
            )}
        </svg>
    );
}

export default function Dashboard({ auth, stats }) {
    const { totalRooms = 0, totalRentals = 0, totalPermits = 0 } = stats || {};
    const user = auth.user;
    const isResident = user.role === 'user';
    const availableShortcuts = shortcuts.filter((shortcut) =>
        shortcut.roles.includes(user.role),
    );
    const metrics = [
        {
            key: 'rooms',
            label: 'Jumlah kamar',
            detail: 'Kamar terdaftar',
            value: totalRooms,
        },
        {
            key: 'rentals',
            label: isResident ? 'Penyewaan saya' : 'Penyewaan',
            detail: isResident ? 'Data penyewaan Anda' : 'Catatan penyewaan',
            value: totalRentals,
        },
        {
            key: 'permits',
            label: isResident ? 'Permohonan izin' : 'Perizinan',
            detail: isResident ? 'Permohonan Anda' : 'Permohonan penghuni',
            value: totalPermits,
        },
    ];
    const primaryAction = isResident ? (
        <Link
            className="inline-flex items-center justify-center rounded-lg bg-[#183b34] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244d43] focus:outline-none focus:ring-2 focus:ring-[#3b7868] focus:ring-offset-2"
            href={route('rentals.create')}
        >
            Ajukan sewa
        </Link>
    ) : (
        <Link
            className="inline-flex items-center justify-center rounded-lg bg-[#183b34] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244d43] focus:outline-none focus:ring-2 focus:ring-[#3b7868] focus:ring-offset-2"
            href={route('rooms.create')}
        >
            Tambah kamar
        </Link>
    );

    return (
        <AuthenticatedLayout
            headerTitle="Ringkasan"
            headerDescription={
                isResident
                    ? 'Pantau informasi penyewaan dan permohonanmu di sini.'
                    : 'Pantau kamar, penyewaan, dan permohonan penghuni.'
            }
            headerAction={primaryAction}
        >
            <Head title="Ringkasan" />

            <section
                aria-label="Statistik pengelolaan"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
                {metrics.map((metric) => (
                    <article
                        className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] sm:p-6"
                        key={metric.key}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[13px] font-medium text-slate-500">
                                    {metric.label}
                                </p>
                                <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight text-slate-900">
                                    {Number(metric.value).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <MetricIcon
                                className={metricStyles[metric.key].iconClass}
                                type={metric.key}
                            />
                        </div>
                        <p className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500">
                            {metric.detail}
                        </p>
                    </article>
                ))}
            </section>

            <section className="mt-8">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-base font-semibold tracking-tight text-slate-900">
                            Akses cepat
                        </h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Pilih menu untuk melanjutkan pekerjaan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {availableShortcuts.map((shortcut) => (
                        <Link
                            className="group flex min-h-[104px] items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:border-[#b8cec5] hover:bg-[#fcfdfc] focus:outline-none focus:ring-2 focus:ring-[#3b7868] focus:ring-offset-2"
                            href={route(shortcut.href)}
                            key={shortcut.key}
                        >
                            <span>
                                <span className="block text-sm font-semibold text-slate-800">
                                    {shortcut.title}
                                </span>
                                <span className="mt-1.5 block text-xs leading-5 text-slate-500">
                                    {shortcut.description}
                                </span>
                            </span>
                            <ShortcutIcon type={shortcut.icon} />
                        </Link>
                    ))}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
