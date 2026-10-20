import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    const { totalRooms = 0, totalRentals = 0, totalPermits = 0 } = stats || {};

    return (
        <AuthenticatedLayout user={auth.user} headerTitle="Dashboard Utama">
            <Head title="Dashboard" />

            {/* Banner Selamat Datang */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-md mb-6">
                <h2 className="text-2xl font-bold">Selamat Datang, {auth.user.name}! 👋</h2>
                <p className="mt-1 text-indigo-100 text-sm">
                    Anda login sebagai{' '}
                    <span className="uppercase font-extrabold tracking-wider bg-white/20 px-2 py-0.5 rounded text-xs text-white">
                        {auth.user.role}
                    </span>
                </p>
            </div>

            {/* Ringkasan Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Kamar */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Kamar</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalRooms}</h3>
                    </div>
                    <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-2xl">
                        🛏️
                    </div>
                </div>

                {/* Total Penyewaan */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Penyewaan</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalRentals}</h3>
                    </div>
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-2xl">
                        🔑
                    </div>
                </div>

                {/* Total Perizinan */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Perizinan</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalPermits}</h3>
                    </div>
                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-2xl">
                        📝
                    </div>
                </div>
            </div>

            {/* Akses Cepat */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-base font-bold text-gray-900 mb-4">Navigasi Cepat</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(auth.user.role === 'admin' || auth.user.role === 'superadmin') && (
                        <Link
                            href={route('rooms.index')}
                            className="p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition text-sm font-semibold text-gray-700 hover:text-indigo-600 block"
                        >
                            Kelola Data Kamar →
                        </Link>
                    )}
                    <Link
                        href={route('rentals.index')}
                        className="p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition text-sm font-semibold text-gray-700 hover:text-indigo-600 block"
                    >
                        Lihat Penyewaan →
                    </Link>
                    <Link
                        href={route('permits.index')}
                        className="p-4 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 transition text-sm font-semibold text-gray-700 hover:text-indigo-600 block"
                    >
                        Lihat Perizinan →
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}