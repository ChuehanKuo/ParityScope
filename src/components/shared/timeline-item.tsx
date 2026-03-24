interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  status: "past" | "current" | "upcoming";
}

export function TimelineItem({ date, title, description, status }: TimelineItemProps) {
  const dotColors = {
    past: "bg-medium-gray",
    current: "bg-coral animate-pulse",
    upcoming: "bg-teal",
  };

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`h-4 w-4 rounded-full ${dotColors[status]} shrink-0 mt-1`} />
        <div className="w-px flex-1 bg-light-gray" />
      </div>
      <div className="pb-8">
        <span className="text-body-sm font-medium text-teal">{date}</span>
        <h4 className="mt-1 text-h4 font-semibold text-navy">{title}</h4>
        <p className="mt-1 text-body text-medium-gray">{description}</p>
      </div>
    </div>
  );
}
