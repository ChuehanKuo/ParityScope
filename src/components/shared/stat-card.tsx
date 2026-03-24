interface StatCardProps {
  stat: string;
  description: string;
  source?: string;
  color?: "coral" | "teal" | "amber" | "green";
}

export function StatCard({ stat, description, source, color = "coral" }: StatCardProps) {
  const colorClasses = {
    coral: "text-coral border-coral/20",
    teal: "text-teal border-teal/20",
    amber: "text-amber border-amber/20",
    green: "text-green border-green/20",
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} bg-white p-8 shadow-card`}>
      <div className={`text-h1 font-bold ${colorClasses[color].split(" ")[0]}`}>{stat}</div>
      <p className="mt-2 text-body text-dark-gray">{description}</p>
      {source && <p className="mt-3 text-caption text-medium-gray">{source}</p>}
    </div>
  );
}
