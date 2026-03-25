export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-6">
      <h2 className="text-3xl font-semibold mb-12 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
