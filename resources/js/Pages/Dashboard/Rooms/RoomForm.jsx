import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '../../../Components/AuthenticatedLayout';

const statuses = [
    { value: 'available', label: 'Tersedia' },
    { value: 'occupied', label: 'Terisi' },
    { value: 'maintenance', label: 'Perbaikan' },
];

export default function RoomForm({ room = null }) {
    const isEditing = room !== null;
    const form = useForm({
        room_number: room?.room_number ?? '',
        status: room?.status ?? '',
        base_price: room ? String(room.base_price) : '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isEditing) {
            form.put(`/rooms/${room.id}`);
            return;
        }

        form.post('/rooms');
    };

    const inputClassName = (field) => `w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${
        form.errors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

    return (
        <AuthenticatedLayout>
        <div className="mx-auto max-w-2xl p-4 sm:p-6">
            <Head title={isEditing ? `Ubah kamar ${room.room_number}` : 'Tambah kamar'} />

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow sm:p-6">
                <h1 className="mb-6 text-xl font-bold text-gray-800">
                    {isEditing ? `Ubah kamar ${room.room_number}` : 'Tambah kamar baru'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="room_number" className="mb-1 block text-sm font-medium text-gray-700">
                            Nomor kamar
                        </label>
                        <input
                            id="room_number"
                            name="room_number"
                            type="text"
                            autoComplete="off"
                            maxLength={255}
                            required
                            aria-invalid={Boolean(form.errors.room_number)}
                            aria-describedby={form.errors.room_number ? 'room_number_error' : undefined}
                            className={inputClassName('room_number')}
                            value={form.data.room_number}
                            onChange={(event) => form.setData('room_number', event.target.value)}
                        />
                        {form.errors.room_number && (
                            <p id="room_number_error" role="alert" className="mt-1 text-xs text-red-600">
                                {form.errors.room_number}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
                            Status kamar
                        </label>
                        <select
                            id="status"
                            name="status"
                            required
                            aria-invalid={Boolean(form.errors.status)}
                            aria-describedby={form.errors.status ? 'status_error' : undefined}
                            className={inputClassName('status')}
                            value={form.data.status}
                            onChange={(event) => form.setData('status', event.target.value)}
                        >
                            <option value="">-- Pilih status --</option>
                            {statuses.map((status) => (
                                <option key={status.value} value={status.value}>
                                    {status.label}
                                </option>
                            ))}
                        </select>
                        {form.errors.status && (
                            <p id="status_error" role="alert" className="mt-1 text-xs text-red-600">
                                {form.errors.status}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="base_price" className="mb-1 block text-sm font-medium text-gray-700">
                            Harga dasar (Rp)
                        </label>
                        <input
                            id="base_price"
                            name="base_price"
                            type="number"
                            min="0"
                            max="4294967295"
                            step="1"
                            inputMode="numeric"
                            required
                            aria-invalid={Boolean(form.errors.base_price)}
                            aria-describedby={form.errors.base_price ? 'base_price_error' : undefined}
                            className={inputClassName('base_price')}
                            value={form.data.base_price}
                            onChange={(event) => form.setData('base_price', event.target.value)}
                        />
                        {form.errors.base_price && (
                            <p id="base_price_error" role="alert" className="mt-1 text-xs text-red-600">
                                {form.errors.base_price}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                            href="/rooms"
                            className="rounded-lg bg-gray-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-600"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {form.processing
                                ? 'Menyimpan...'
                                : isEditing
                                    ? 'Perbarui kamar'
                                    : 'Simpan kamar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </AuthenticatedLayout>
    );
}
