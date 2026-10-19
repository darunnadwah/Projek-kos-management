import React from 'react';

export default function RoomForm({ data, setData, errors, processing, handleSubmit, isEdit = false }) {
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
            {/* Nomor Kamar */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Nomor Kamar</label>
                <input
                    type="text"
                    value={data.room_number || ''}
                    onChange={e => setData('room_number', e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Contoh: 101 / A-01"
                />
                {errors.room_number && <div className="text-red-500 text-sm mt-1">{errors.room_number}</div>}
            </div>

            {/* Harga Dasar (base_price) */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Harga Dasar (Rp)</label>
                <input
                    type="number"
                    value={data.base_price || ''}
                    onChange={e => setData('base_price', e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Contoh: 1500000"
                />
                {errors.base_price && <div className="text-red-500 text-sm mt-1">{errors.base_price}</div>}
            </div>

            {/* Status Kamar */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Status Kamar</label>
                <select
                    value={data.status || 'available'}
                    onChange={e => setData('status', e.target.value)}
                    className="w-full border p-2 rounded"
                >
                    <option value="available">Tersedia (Available)</option>
                    <option value="occupied">Terisi (Occupied)</option>
                    <option value="maintenance">Dalam Perbaikan (Maintenance)</option>
                </select>
                {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
            </div>

            {/* Tombol Aksi & Umpan Balik Processing (Sesuai Syarat Pertemuan 6) */}
            <div className="flex gap-4">
                <button
                    disabled={processing}
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui Kamar' : 'Simpan Kamar')}
                </button>
            </div>
        </form>
    );
}