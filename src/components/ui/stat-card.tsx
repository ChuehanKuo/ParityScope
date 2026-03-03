interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-display font-bold text-teal">{value}</p>
      <p className="mt-1 text-h4 font-semibold text-navy">{label}</p>
      {description && (
        <p className="mt-2 text-body-sm text-medium-gray">{description}</p>
      )}
    </div>
  );
}
