interface ComparisonTableProps {
  headers: string[];
  rows: { feature: string; values: (string | boolean)[] }[];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 border-light-gray px-6 py-4 text-left text-body-sm font-semibold text-navy">Feature</th>
            {headers.map((h) => (
              <th key={h} className="border-b-2 border-light-gray px-6 py-4 text-center text-body-sm font-semibold text-navy">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature} className="border-b border-light-gray">
              <td className="px-6 py-4 text-body-sm text-dark-gray">{row.feature}</td>
              {row.values.map((val, i) => (
                <td key={i} className="px-6 py-4 text-center text-body-sm">
                  {typeof val === "boolean" ? (
                    val ? (
                      <svg className="mx-auto h-5 w-5 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    ) : (
                      <svg className="mx-auto h-5 w-5 text-medium-gray" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    )
                  ) : (
                    <span className="text-dark-gray">{val}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
