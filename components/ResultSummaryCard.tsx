import { UI_TEXT } from "@/config/uiText";
import { formatCurrency } from "@/lib/format";
import type { DetailLine } from "@/lib/details";
import { CalculationDetailsAccordion } from "@/components/CalculationDetailsAccordion";

interface ResultSummaryCardProps {
  oldBill: number;
  newBill: number;
  increase: number;
  summary: string;
  details: DetailLine[];
  estimateBadge?: string;
}

export function ResultSummaryCard({
  oldBill,
  newBill,
  increase,
  summary,
  details,
  estimateBadge
}: ResultSummaryCardProps) {
  return (
    <section className="rounded-3xl border-2 border-sky-300 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-900">{UI_TEXT.common.resultTitle}</h2>

      {estimateBadge ? (
        <p className="mt-3 inline-block rounded-xl bg-amber-100 px-3 py-2 text-base font-bold text-amber-900">
          {estimateBadge}
        </p>
      ) : null}

      <div className="mt-4 space-y-3 text-lg">
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold text-slate-700">{UI_TEXT.common.oldBill}</span>
          <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(oldBill)}</span>
        </p>
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold text-slate-700">{UI_TEXT.common.newBill}</span>
          <span className="text-2xl font-extrabold text-slate-900">{formatCurrency(newBill)}</span>
        </p>
        <p className="flex items-baseline justify-between gap-3">
          <span className="font-semibold text-slate-700">{UI_TEXT.common.increase}</span>
          <span className="text-3xl font-black text-rose-700">{formatCurrency(increase)}</span>
        </p>
      </div>

      <p className="mt-4 rounded-2xl bg-sky-50 p-4 text-lg font-semibold text-slate-900">{summary}</p>

      <CalculationDetailsAccordion summaryLabel={UI_TEXT.common.seeDetails} lines={details} />
    </section>
  );
}
