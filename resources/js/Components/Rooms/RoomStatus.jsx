import React from 'react';

export default function RoomStatus({ status }) {
    // Menentukan warna badge berdasarkan nilai status
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
            case 'tersedia':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'occupied':
            case 'terisi':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'maintenance':
            case 'perbaikan':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    // Label tampilan teks yang ramah pengguna
    const getStatusLabel = (status) => {
        switch (status?.toLowerCase()) {
            case 'available':
            case 'tersedia':
                return 'Tersedia';
            case 'occupied':
            case 'terisi':
                return 'Terisi';
            case 'maintenance':
            case 'perbaikan':
                return 'Dalam Perbaikan';
            default:
                return status || 'Tidak Diketahui';
        }
    };

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(status)}`}>
            {getStatusLabel(status)}
        </span>
    );
}