export default function RoomCard({ room, action, selected = false }) {
    return (
        <article
            className={`overflow-hidden rounded-xl border bg-white transition ${
                selected
                    ? 'border-[#315e50] ring-2 ring-[#315e50]/15'
                    : 'border-slate-200/80 hover:border-[#b8cec5] hover:shadow-sm'
            }`}
        >
            <div className="relative flex h-32 items-center justify-between overflow-hidden bg-[#edf3ef] px-5">
                <span
                    aria-hidden="true"
                    className="absolute -right-5 -top-12 h-40 w-40 rounded-full border border-[#315e50]/10"
                />
                <span
                    aria-hidden="true"
                    className="absolute -right-1 -top-6 h-28 w-28 rounded-full border border-[#315e50]/10"
                />
                <div className="relative z-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#55766a]">
                        Kamar kos
                    </p>
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#183b34]">
                        {room.room_number}
                    </h2>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold text-[#315e50]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4d8a6e]" />
                        Tersedia
                    </span>
                </div>
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/70 text-[#315e50]">
                    <svg
                        aria-hidden="true"
                        className="h-7 w-7"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 16h18M5 11V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3m0 0V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3M5 18v2m14-2v2" />
                    </svg>
                </span>
            </div>

            <div className="p-5">
                <div className="min-h-[60px]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-400">
                        Fasilitas
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-slate-600">
                        {room.description || 'Informasi fasilitas belum tersedia.'}
                    </p>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
                    <div>
                        <p className="text-[10px] text-slate-500">Harga sewa</p>
                        <p className="mt-1 text-[15px] font-semibold tracking-tight text-slate-900">
                            Rp {Number(room.price).toLocaleString('id-ID')}
                            <span className="ml-1 text-[10px] font-normal text-slate-500">
                                / bulan
                            </span>
                        </p>
                    </div>
                    {action}
                </div>
            </div>
        </article>
    );
}
