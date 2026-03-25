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
    primary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100",
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
