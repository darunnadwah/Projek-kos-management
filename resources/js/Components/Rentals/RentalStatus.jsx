import React from 'react';

export default function RentalStatus({ status }) {
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
            case 'aktif':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'completed':
            case 'selesai':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'cancelled':
            case 'batal':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(status)}`}>
            {status ? status.toUpperCase() : 'TIDAK DIKETAHUI'}
        </span>
    );
}