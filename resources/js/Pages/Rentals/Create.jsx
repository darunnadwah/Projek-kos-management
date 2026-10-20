import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth, rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        room_id: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rentals.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headerTitle="Form Pengajuan Sewa Kamar"
            headerAction={
                <Link
                    href={route('rentals.index')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg text-sm transition"
                >
                    Kembali
                </Link>
            }
        >
            <Head title="Ajukan Sewa" />

            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pilih Kamar Kost</label>
                        <select
                            value={data.room_id}
                            onChange={(e) => setData('room_id', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        >
                            <option value="">-- Pilih Kamar yang Tersedia --</option>
                            {rooms && rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.room_number} - Rp {Number(room.price).toLocaleString('id-ID')} / bulan
                                </option>
                            ))}
                        </select>
                        {errors.room_id && (
                            <p className="text-red-500 text-xs mt-1">{errors.room_id}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Mulai Sewa</label>
                        <input
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        />
                        {errors.start_date && (
                            <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal Selesai Sewa (Opsional)</label>
                        <input
                            type="date"
                            value={data.end_date}
                            onChange={(e) => setData('end_date', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        />
                        <p className="text-xs text-gray-400 mt-1">Kosongkan jika ingin menyewa bulanan tanpa batas waktu tertentu.</p>
                        {errors.end_date && (
                            <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>
                        )}
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Sewa'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}