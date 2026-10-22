export default function Header({ title, description, action }) {
    return (
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[28px]">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
                        {description}
                    </p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}