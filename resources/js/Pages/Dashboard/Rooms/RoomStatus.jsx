const statusStyles = {
    available: 'bg-emerald-100 text-emerald-800',
    occupied: 'bg-amber-100 text-amber-800',
    maintenance: 'bg-gray-100 text-gray-700',
};

const statusLabels = {
    available: 'Tersedia',
    occupied: 'Terisi',
    maintenance: 'Perbaikan',
};

export default function RoomStatus({ status }) {
    return (
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status] ?? 'bg-gray-100 text-gray-700'}`}>
            {statusLabels[status] ?? status}
        </span>
    );
}
