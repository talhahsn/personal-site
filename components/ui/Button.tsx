type Variant = "primary" | "outline";

export function Button({
  children,
  variant = "primary",
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  variant?: Variant;
  disabled?: boolean;
}) {
  const base =
    "rounded-md px-4 py-2 text-sm font-medium transition hover:scale-[1.03] active:scale-[0.97]";
  const styles = {
    primary: "bg-black dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100",
  };

  return (
    <button
      className={`${base} ${styles[variant]}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
