export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-lg border border-transparent bg-[#3182CE] px-5 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-[#2569A8] focus:bg-[#2569A8] focus:outline-none focus:ring-2 focus:ring-[#3182CE] focus:ring-offset-2 active:bg-[#1E568C] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
