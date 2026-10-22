export default function Header({ title, description, action }) {
    return (
        <div className="relative mb-8 flex flex-col justify-between gap-5 overflow-hidden rounded-2xl bg-[#0B1B3D] px-6 py-6 text-white shadow-sm sm:flex-row sm:items-center sm:px-8 sm:py-7">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/[0.07]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-14 h-44 w-44 rounded-full border border-white/[0.07]"
            />
            <div className="relative z-10 flex items-start gap-4">
                <span className="mt-1 hidden h-12 w-1 shrink-0 rounded-full bg-[#3182CE] sm:block" />
                <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/75">
                        Kosmate <span className="px-1 text-white/30">/</span> Ruang kerja
                    </p>
                    <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-[28px]">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-blue-100/75">
                            {description}
                        </p>
                    )}
                </div>
            </div>
            {action && <div className="relative z-10 shrink-0">{action}</div>}
        </div>
    );
}