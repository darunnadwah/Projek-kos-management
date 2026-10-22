export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#3182CE] shadow-sm focus:ring-[#3182CE] ' +
                className
            }
        />
    );
}
