import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import RentalForm from '@/Components/Rentals/RentalForm';

export default function Edit({ rental, users = [], rooms = [] }) {
    const { data, setData, put, errors, processing } = useForm({
        user_id: rental.user_id || '',
        room_id: rental.room_id || '',
        start_date: rental.start_date || '',
        end_date: rental.end_date || '',
        total_price: rental.total_price || '',
        status: rental.status || 'active',
        payment_status: rental.payment_status || 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/rentals/${rental.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Penyewaan" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Transaksi Penyewaan</h1>
                <Link href="/rentals" className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                    Batal
                </Link>
            </div>

            <RentalForm
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                handleSubmit={handleSubmit}
                users={users}
                rooms={rooms}
                isEdit={true}
            />
        </div>
    );
}