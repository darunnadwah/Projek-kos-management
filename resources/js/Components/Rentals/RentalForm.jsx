import React from 'react';

export default function RentalForm({ data, setData, errors, processing, handleSubmit, users = [], rooms = [], isEdit = false }) {
    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
            {/* Pilih Penyewa / User */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Pilih Penyewa</label>
                <select
                    value={data.user_id || ''}
                    onChange={e => setData('user_id', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="">-- Pilih Penyewa --</option>
                    {users.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.name} ({u.email})
                        </option>
                    ))}
                </select>
                {errors.user_id && <div className="text-red-500 text-sm mt-1">{errors.user_id}</div>}
            </div>

            {/* Pilih Kamar / Room */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Pilih Kamar</label>
                <select
                    value={data.room_id || ''}
                    onChange={e => setData('room_id', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="">-- Pilih Kamar --</option>
                    {rooms.map((r) => (
                        <option key={r.id} value={r.id}>
                            Kamar No. {r.room_number} - Rp {Number(r.base_price).toLocaleString('id-ID')} ({r.status})
                        </option>
                    ))}
                </select>
                {errors.room_id && <div className="text-red-500 text-sm mt-1">{errors.room_id}</div>}
            </div>

            {/* Tanggal Mulai */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Tanggal Mulai Sewa</label>
                <input
                    type="date"
                    value={data.start_date || ''}
                    onChange={e => setData('start_date', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                />
                {errors.start_date && <div className="text-red-500 text-sm mt-1">{errors.start_date}</div>}
            </div>

            {/* Tanggal Selesai */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Tanggal Selesai Sewa</label>
                <input
                    type="date"
                    value={data.end_date || ''}
                    onChange={e => setData('end_date', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                />
                {errors.end_date && <div className="text-red-500 text-sm mt-1">{errors.end_date}</div>}
            </div>

            {/* Total Harga */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Total Harga (Rp)</label>
                <input
                    type="number"
                    value={data.total_price || ''}
                    onChange={e => setData('total_price', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                    placeholder="Contoh: 1500000"
                />
                {errors.total_price && <div className="text-red-500 text-sm mt-1">{errors.total_price}</div>}
            </div>

            {/* Status Transaksi */}
            <div>
                <label className="block text-gray-700 font-bold mb-1">Status Transaksi</label>
                <select
                    value={data.status || 'active'}
                    onChange={e => setData('status', e.target.value)}
                    className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
                >
                    <option value="active">Active (Aktif)</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed (Selesai)</option>
                    <option value="cancelled">Cancelled (Batal)</option>
                </select>
                {errors.status && <div className="text-red-500 text-sm mt-1">{errors.status}</div>}
            </div>

            {/* Tombol Submit dengan Umpan Balik Processing */}
            <div className="pt-2">
                <button
                    disabled={processing}
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui Penyewaan' : 'Simpan Penyewaan')}
                </button>
            </div>
        </form>
    );
}