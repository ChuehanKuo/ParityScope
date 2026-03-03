interface BadgeProps {
  children: React.ReactNode;
  variant?: "teal" | "coral" | "navy" | "amber" | "green" | "outline";
}

export function Badge({ children, variant = "teal" }: BadgeProps) {
  const variants = {
    teal: "bg-teal/10 text-teal",
    coral: "bg-coral/10 text-coral",
    navy: "bg-navy/10 text-navy",
    amber: "bg-amber/10 text-amber-dark",
    green: "bg-green/10 text-green-dark",
    outline: "border border-light-gray text-medium-gray",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-body-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
