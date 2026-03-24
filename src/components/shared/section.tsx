interface SectionProps {
  children: React.ReactNode;
  background?: "white" | "off-white" | "navy";
  className?: string;
  id?: string;
}

export function Section({ children, background = "white", className = "", id }: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    "off-white": "bg-off-white",
    navy: "bg-navy text-white",
  };

  return (
    <section id={id} className={`px-4 py-section sm:px-6 lg:px-8 ${bgClasses[background]} ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
