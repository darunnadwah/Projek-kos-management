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
                `inline-flex items-center rounded-lg border border-transparent bg-[#183b34] px-5 py-2.5 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-[#244d43] focus:bg-[#244d43] focus:outline-none focus:ring-2 focus:ring-[#3b7868] focus:ring-offset-2 active:bg-[#102a25] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
