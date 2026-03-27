export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-4">
      <h2 className="text-2xl font-semibold mb-6 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
