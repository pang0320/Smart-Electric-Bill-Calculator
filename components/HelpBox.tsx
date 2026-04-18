interface HelpBoxProps {
  title: string;
  lines: readonly string[];
}

export function HelpBox({ title, lines }: HelpBoxProps) {
  return (
    <details className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm" open>
      <summary className="cursor-pointer text-xl font-extrabold text-slate-900">{title}</summary>
      <ul className="mt-4 space-y-2 text-base text-slate-700">
        {lines.map((line) => (
          <li key={line} className="font-semibold">
            • {line}
          </li>
        ))}
      </ul>
    </details>
  );
}
