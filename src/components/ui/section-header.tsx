interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  theme = "light",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const titleColor = theme === "dark" ? "text-white" : "text-navy";
  const labelColor = theme === "dark" ? "text-teal-light" : "text-teal";
  const descColor = theme === "dark" ? "text-light-gray" : "text-medium-gray";

  return (
    <div className={alignClass}>
      {label && (
        <p
          className={`text-body-sm font-semibold uppercase tracking-wider ${labelColor}`}
        >
          {label}
        </p>
      )}
      <h2 className={`mt-2 text-h2 font-bold ${titleColor}`}>{title}</h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-3xl text-body-lg ${descColor} ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
