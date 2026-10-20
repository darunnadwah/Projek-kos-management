import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import RentalForm from '@/Components/Rentals/RentalForm';

export default function Create({ users = [], rooms = [] }) {
    const { data, setData, post, errors, processing } = useForm({
        user_id: '',
        room_id: '',
        start_date: '',
        end_date: '',
        total_price: '',
        status: 'active',
        payment_status: 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/rentals');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Tambah Penyewaan" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tambah Data Penyewaan Baru</h1>
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
                isEdit={false}
            />
        </div>
    );
}