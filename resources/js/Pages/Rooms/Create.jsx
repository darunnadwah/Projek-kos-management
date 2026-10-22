import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        room_number: '',
        description: '',
        price: '',
        status: 'available',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rooms.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headerTitle="Tambah Kamar Baru"
            headerAction={
                <Link
                    href={route('rooms.index')}
                    className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 font-medium px-4 py-2 rounded-lg text-sm transition"
                >
                    Kembali
                </Link>
            }
        >
            <Head title="Tambah Kamar" />

            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Kamar</label>
                        <input
                            type="text"
                            value={data.room_number}
                            onChange={(e) => setData('room_number', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                            placeholder="Contoh: Kamar 101"
                        />
                        {errors.room_number && (
                            <p className="text-red-500 text-xs mt-1">{errors.room_number}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deskripsi / Fasilitas</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="3"
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                            placeholder="Fasilitas AC, Kamar mandi dalam, Springbed..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Harga per Bulan (Rp)</label>
                        <input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                            placeholder="1500000"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status Kamar</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
                        >
                            <option value="available">Tersedia</option>
                            <option value="occupied">Terisi</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                        )}
                    </div>

                    <div className="pt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#3182CE] hover:bg-[#2569A8] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Kamar'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}