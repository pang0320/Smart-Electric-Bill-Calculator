"use client";

import { useMemo, useState, type FormEvent } from "react";
import { AppHeader } from "@/components/AppHeader";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { HelpBox } from "@/components/HelpBox";
import { LargeModeSelector } from "@/components/LargeModeSelector";
import { NumberInput } from "@/components/NumberInput";
import { PageNav } from "@/components/PageNav";
import { ResultSummaryCard } from "@/components/ResultSummaryCard";
import { UI_TEXT } from "@/config/uiText";
import { calculateTouBillComparison } from "@/lib/calculateTouBill";
import { buildCommonDetailLines } from "@/lib/details";
import { formatCurrency, formatUnits } from "@/lib/format";
import { reverseEstimateTouUnits } from "@/lib/reverseEstimateTouUnits";
import { validateRequiredNumber } from "@/lib/validation";
import type {
  BillComparison,
  CalculatorInputMode,
  ReverseTouEstimateResult,
  UsagePattern
} from "@/types/calculation";

type TouResult = {
  comparison: BillComparison<{ peakUnits: number; offPeakUnits: number; totalUnits: number }>;
  fromBillEstimation: boolean;
  inputOldBill?: number;
  pattern?: UsagePattern;
  estimate?: ReverseTouEstimateResult;
};

export default function TouPage() {
  const [mode, setMode] = useState<CalculatorInputMode>("units");
  const [peakInput, setPeakInput] = useState("");
  const [offPeakInput, setOffPeakInput] = useState("");
  const [billInput, setBillInput] = useState("");
  const [pattern, setPattern] = useState<UsagePattern>("balanced");

  const [peakError, setPeakError] = useState<string | null>(null);
  const [offPeakError, setOffPeakError] = useState<string | null>(null);
  const [billError, setBillError] = useState<string | null>(null);

  const [result, setResult] = useState<TouResult | null>(null);

  const modeOptions = useMemo(
    () => [
      { value: "units" as const, label: UI_TEXT.tou.modeUnits },
      { value: "bill" as const, label: UI_TEXT.tou.modeBill }
    ],
    []
  );

  const patternOptions: { value: UsagePattern; label: string }[] = [
    { value: "mostlyDaytime", label: UI_TEXT.tou.patterns.mostlyDaytime },
    { value: "balanced", label: UI_TEXT.tou.patterns.balanced },
    { value: "mostlyNighttime", label: UI_TEXT.tou.patterns.mostlyNighttime }
  ];

  function clearResultAndErrors() {
    setResult(null);
    setPeakError(null);
    setOffPeakError(null);
    setBillError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    if (mode === "units") {
      const peakErr = validateRequiredNumber(peakInput);
      const offPeakErr = validateRequiredNumber(offPeakInput);

      setPeakError(peakErr);
      setOffPeakError(offPeakErr);
      setBillError(null);

      if (peakErr || offPeakErr) return;

      const peakUnits = Number(peakInput);
      const offPeakUnits = Number(offPeakInput);
      const comparison = calculateTouBillComparison(peakUnits, offPeakUnits);

      setResult({ comparison, fromBillEstimation: false });
      return;
    }

    const error = validateRequiredNumber(billInput);
    setBillError(error);
    setPeakError(null);
    setOffPeakError(null);

    if (error) return;

    const oldBillInput = Number(billInput);
    const estimate = reverseEstimateTouUnits(oldBillInput, pattern);

    setResult({
      comparison: estimate.comparison,
      fromBillEstimation: true,
      inputOldBill: oldBillInput,
      pattern,
      estimate
    });
  }

  function handleReset() {
    setPeakInput("");
    setOffPeakInput("");
    setBillInput("");
    setPattern("balanced");
    clearResultAndErrors();
  }

  const detailLines = useMemo(() => {
    if (!result) return [];

    const inputLines = result.fromBillEstimation
      ? [
          {
            label: UI_TEXT.tou.billLabel,
            value:
              result.inputOldBill !== undefined
                ? formatCurrency(result.inputOldBill)
                : "-"
          },
          {
            label: UI_TEXT.tou.patternLabel,
            value: result.pattern ? UI_TEXT.tou.patterns[result.pattern] : "-"
          },
          {
            label: UI_TEXT.common.details.estimatedUnits,
            value: `${formatUnits(result.comparison.input.totalUnits)} ${UI_TEXT.common.unitLabel}`
          },
          {
            label: UI_TEXT.tou.peakLabel,
            value: `${formatUnits(result.comparison.input.peakUnits)} ${UI_TEXT.common.unitLabel}`
          },
          {
            label: UI_TEXT.tou.offPeakLabel,
            value: `${formatUnits(result.comparison.input.offPeakUnits)} ${UI_TEXT.common.unitLabel}`
          }
        ]
      : [
          {
            label: UI_TEXT.tou.peakLabel,
            value: `${formatUnits(result.comparison.input.peakUnits)} ${UI_TEXT.common.unitLabel}`
          },
          {
            label: UI_TEXT.tou.offPeakLabel,
            value: `${formatUnits(result.comparison.input.offPeakUnits)} ${UI_TEXT.common.unitLabel}`
          }
        ];

    return buildCommonDetailLines(result.comparison, inputLines);
  }, [result]);

  return (
    <div className="space-y-4">
      <PageNav />
      <AppHeader title={UI_TEXT.tou.title} subtitle={UI_TEXT.tou.subtitle} />

      <CalculatorCard>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <LargeModeSelector
            value={mode}
            options={modeOptions}
            onChange={(newMode) => {
              setMode(newMode);
              clearResultAndErrors();
            }}
            ariaLabel={UI_TEXT.common.modeSelectorTouAria}
          />

          {mode === "units" ? (
            <div className="space-y-4">
              <NumberInput
                id="tou-peak-units"
                label={UI_TEXT.tou.peakLabel}
                placeholder={UI_TEXT.tou.peakPlaceholder}
                value={peakInput}
                error={peakError}
                onChange={(value) => {
                  setPeakInput(value);
                  setPeakError(null);
                  setResult(null);
                }}
              />
              <NumberInput
                id="tou-offpeak-units"
                label={UI_TEXT.tou.offPeakLabel}
                placeholder={UI_TEXT.tou.offPeakPlaceholder}
                value={offPeakInput}
                error={offPeakError}
                onChange={(value) => {
                  setOffPeakInput(value);
                  setOffPeakError(null);
                  setResult(null);
                }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <NumberInput
                id="tou-bill"
                label={UI_TEXT.tou.billLabel}
                placeholder={UI_TEXT.tou.billPlaceholder}
                value={billInput}
                error={billError}
                onChange={(value) => {
                  setBillInput(value);
                  setBillError(null);
                  setResult(null);
                }}
              />

              <div className="space-y-2">
                <label htmlFor="usage-pattern" className="block text-lg font-bold text-slate-900">
                  {UI_TEXT.tou.patternLabel}
                </label>
                <select
                  id="usage-pattern"
                  name="usage-pattern"
                  value={pattern}
                  onChange={(event) => {
                    setPattern(event.target.value as UsagePattern);
                    setResult(null);
                  }}
                  className="min-h-14 w-full rounded-2xl border-2 border-slate-300 bg-white px-4 text-lg text-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
                >
                  {patternOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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

      <HelpBox title={UI_TEXT.tou.touTimeTitle} lines={UI_TEXT.tou.touTimeLines} />

      {result ? (
        <>
          <CalculatorCard>
            <p className="text-lg font-bold text-slate-900">
              {UI_TEXT.common.peakShortLabel}: {formatUnits(result.comparison.input.peakUnits)} {UI_TEXT.common.unitLabel}
            </p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {UI_TEXT.common.offPeakShortLabel}: {formatUnits(result.comparison.input.offPeakUnits)}{" "}
              {UI_TEXT.common.unitLabel}
            </p>
            {result.fromBillEstimation ? (
              <p className="mt-2 text-base font-semibold text-slate-700">{UI_TEXT.tou.estimatedUnitsNote}</p>
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
          UI_TEXT.disclaimers.futureTariffMayChange,
          UI_TEXT.disclaimers.touDependsOnTiming
        ]}
      />
    </div>
  );
}
