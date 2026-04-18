import type { DetailLine } from "@/lib/details";

interface CalculationDetailsAccordionProps {
  summaryLabel: string;
  lines: DetailLine[];
}

export function CalculationDetailsAccordion({
  summaryLabel,
  lines
}: CalculationDetailsAccordionProps) {
  return (
    <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <summary className="cursor-pointer text-lg font-bold text-slate-900">{summaryLabel}</summary>
      <div className="mt-4 space-y-2">
        {lines.map((line) => (
          <div
            key={line.label}
            className="flex items-start justify-between gap-4 border-b border-slate-200 pb-2 text-base"
          >
            <span className="font-semibold text-slate-700">{line.label}</span>
            <span className="text-right font-bold text-slate-900">{line.value}</span>
          </div>
        ))}
      </div>
    </details>
  );
}
