"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AppHeader } from "@/components/AppHeader";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { LargeModeSelector } from "@/components/LargeModeSelector";
import { NumberInput } from "@/components/NumberInput";
import { PageNav } from "@/components/PageNav";
import { ResultSummaryCard } from "@/components/ResultSummaryCard";
import { UI_TEXT } from "@/config/uiText";
import { calculateNormalBillComparison } from "@/lib/calculateNormalBill";
import { buildCommonDetailLines } from "@/lib/details";
import { formatCurrency, formatUnits } from "@/lib/format";
import { reverseEstimateNormalUnits } from "@/lib/reverseEstimateNormalUnits";
import { validateRequiredNumber } from "@/lib/validation";
import type { BillComparison, CalculatorInputMode } from "@/types/calculation";

type NormalResult = {
  comparison: BillComparison<{ units: number }>;
  fromBillEstimation: boolean;
  inputOldBill?: number;
};

export default function NormalPage() {
  const [mode, setMode] = useState<CalculatorInputMode>("units");
  const [unitsInput, setUnitsInput] = useState("");
  const [billInput, setBillInput] = useState("");
  const [unitsError, setUnitsError] = useState<string | null>(null);
  const [billError, setBillError] = useState<string | null>(null);
  const [result, setResult] = useState<NormalResult | null>(null);

  const modeOptions = useMemo(
    () => [
      { value: "units" as const, label: UI_TEXT.normal.modeUnits },
      { value: "bill" as const, label: UI_TEXT.normal.modeBill }
    ],
    []
  );

  function clearResultAndErrors() {
    setResult(null);
    setUnitsError(null);
    setBillError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    if (mode === "units") {
      const error = validateRequiredNumber(unitsInput);
      setUnitsError(error);
      setBillError(null);

      if (error) return;

      const units = Number(unitsInput);
      const comparison = calculateNormalBillComparison(units);

      setResult({ comparison, fromBillEstimation: false });
      return;
    }

    const error = validateRequiredNumber(billInput);
    setBillError(error);
    setUnitsError(null);

    if (error) return;

    const oldBillInput = Number(billInput);
    const estimate = reverseEstimateNormalUnits(oldBillInput);

    setResult({
      comparison: estimate.comparison,
      fromBillEstimation: true,
      inputOldBill: oldBillInput
    });
  }

  function handleReset() {
    setUnitsInput("");
    setBillInput("");
    clearResultAndErrors();
  }

  const detailLines = useMemo(() => {
    if (!result) return [];

    const inputLines = result.fromBillEstimation
      ? [
          {
            label: UI_TEXT.normal.billLabel,
            value:
              result.inputOldBill !== undefined
                ? formatCurrency(result.inputOldBill)
                : "-"
          },
          {
            label: UI_TEXT.common.details.estimatedUnits,
            value: `${formatUnits(result.comparison.input.units)} ${UI_TEXT.common.unitLabel}`
          }
        ]
      : [
          {
            label: UI_TEXT.normal.unitsLabel,
            value: `${formatUnits(result.comparison.input.units)} ${UI_TEXT.common.unitLabel}`
          }
        ];

    return buildCommonDetailLines(result.comparison, inputLines);
  }, [result]);

  return (
    <div className="space-y-4">
      <PageNav />
      <AppHeader title={UI_TEXT.normal.title} subtitle={UI_TEXT.normal.subtitle} />

      <CalculatorCard>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <LargeModeSelector
            value={mode}
            options={modeOptions}
            onChange={(newMode) => {
              setMode(newMode);
              clearResultAndErrors();
            }}
            ariaLabel={UI_TEXT.common.modeSelectorNormalAria}
          />

          {mode === "units" ? (
            <NumberInput
              id="normal-units"
              label={UI_TEXT.normal.unitsLabel}
              placeholder={UI_TEXT.normal.unitsPlaceholder}
              value={unitsInput}
              error={unitsError}
              onChange={(value) => {
                setUnitsInput(value);
                setUnitsError(null);
                setResult(null);
              }}
            />
          ) : (
            <NumberInput
              id="normal-bill"
              label={UI_TEXT.normal.billLabel}
              placeholder={UI_TEXT.normal.billPlaceholder}
              value={billInput}
              error={billError}
              onChange={(value) => {
                setBillInput(value);
                setBillError(null);
                setResult(null);
              }}
            />
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              className="min-h-14 rounded-2xl bg-sky-600 px-4 py-3 text-xl font-bold text-white shadow-sm transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {UI_TEXT.common.calculateButton}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="min-h-14 rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 text-xl font-bold text-slate-800 transition-colors hover:border-sky-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {UI_TEXT.common.clearButton}
            </button>
          </div>
        </form>
      </CalculatorCard>

      {result ? (
        <>
          <CalculatorCard>
            <p className="text-lg font-bold text-slate-900">
              {UI_TEXT.common.monthlyUnitsLabel}
              {result.fromBillEstimation ? ` ${UI_TEXT.common.estimatedSuffix}` : ""}:{" "}
              {formatUnits(result.comparison.input.units)} {UI_TEXT.common.unitLabel}
            </p>
            {result.fromBillEstimation ? (
              <p className="mt-2 text-base font-semibold text-slate-700">{UI_TEXT.normal.estimatedUnitsNote}</p>
            ) : null}
          </CalculatorCard>

          <ResultSummaryCard
            oldBill={result.comparison.oldBill.total}
            newBill={result.comparison.newBill.total}
            increase={result.comparison.increase}
            summary={`${UI_TEXT.common.summaryPrefix} ${formatCurrency(result.comparison.increase)} ${UI_TEXT.common.summarySuffix}`}
            details={detailLines}
            estimateBadge={result.fromBillEstimation ? UI_TEXT.common.estimationBadge : undefined}
          />
        </>
      ) : null}

      <DisclaimerBox
        title={UI_TEXT.common.notesTitle}
        items={[
          UI_TEXT.disclaimers.estimateOnly,
          UI_TEXT.disclaimers.billMayDiffer,
          UI_TEXT.disclaimers.futureTariffMayChange
        ]}
      />
    </div>
  );
}
