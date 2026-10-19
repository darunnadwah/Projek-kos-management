import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ permission }) {
    const { data, setData, put, errors, processing } = useForm({
        user_id: permission.user_id || '',
        type: permission.type || 'izin_tamu',
        description: permission.description || '',
        status: permission.status || 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/permissions/${permission.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Ubah Permission" />
            
            <h1 className="text-2xl font-bold mb-6">Ubah Data Permission / Laporan</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">ID User</label>
                    <input 
                        type="text" 
                        value={data.user_id} 
                        onChange={e => setData('user_id', e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                    {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Tipe</label>
                    <select 
                        value={data.type} 
                        onChange={e => setData('type', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="izin_tamu">Izin Tamu</option>
                        <option value="izin_kendaraan">Izin Kendaraan</option>
                        <option value="komplain_fasilitas">Komplain Fasilitas</option>
                    </select>
                    {errors.type && <div className="text-red-500 text-sm mt-1">{errors.type}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Deskripsi</label>
                    <textarea 
                        value={data.description} 
                        onChange={e => setData('description', e.target.value)}
                        className="w-full border p-2 rounded"
                        rows="3"
                    ></textarea>
                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Status</label>
                    <select 
                        value={data.status} 
                        onChange={e => setData('status', e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
                </div>

                <div className="flex gap-4">
                    <button disabled={processing} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Perbarui
                    </button>
                    <Link href="/permissions" className="bg-gray-300 px-4 py-2 rounded">
                        Batal
                    </Link>
                </div>
            </form>
        </div>
    );
}