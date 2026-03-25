export function Card({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
      rounded-2xl 
      bg-white 
      p-8 
      shadow-sm 
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      cursor-pointer
      border border-gray-100
     ${className}`}
     {...props}
    >
      {children}
    </div>
  );
}
