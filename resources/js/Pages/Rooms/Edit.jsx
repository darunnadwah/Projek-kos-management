import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ConfirmActionDialog from '@/Components/ConfirmActionDialog';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ auth, room }) {
    const { data, setData, put, processing, errors } = useForm({
        room_number: room.room_number || '',
        description: room.description || '',
        price: room.price || '',
        status: room.status || 'available',
    });
    const [isConfirmingUpdate, setIsConfirmingUpdate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsConfirmingUpdate(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            headerTitle={`Edit ${room.room_number}`}
            headerAction={
                <Link
                    href={route('rooms.index')}
                    className="bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 font-medium px-4 py-2 rounded-lg text-sm transition"
                >
                    Kembali
                </Link>
            }
        >
            <Head title={`Edit ${room.room_number}`} />

            <div className="max-w-2xl bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nomor Kamar</label>
                        <input
                            type="text"
                            value={data.room_number}
                            onChange={(e) => setData('room_number', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-[#3182CE] focus:ring-[#3182CE] text-sm"
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
                            {processing ? 'Perbarui...' : 'Perbarui Data Kamar'}
                        </button>
                    </div>
                </form>
            </div>
            <ConfirmActionDialog
                show={isConfirmingUpdate}
                title="Simpan perubahan kamar?"
                message={`Perubahan untuk ${room.room_number} akan disimpan.`}
                confirmLabel="Simpan perubahan"
                onCancel={() => setIsConfirmingUpdate(false)}
                onConfirm={() => {
                    setIsConfirmingUpdate(false);
                    put(route('rooms.update', room.id));
                }}
            />
        </AuthenticatedLayout>
    );
}