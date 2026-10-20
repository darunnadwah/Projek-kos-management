export default function Header({ title, action }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}