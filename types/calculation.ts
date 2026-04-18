export type UsagePattern = "mostlyDaytime" | "balanced" | "mostlyNighttime";

export type CalculatorInputMode = "units" | "bill";

export interface TariffTier {
  upTo: number | null;
  rate: number;
}

export interface BillBreakdown {
  units: number;
  energyCharge: number;
  serviceCharge: number;
  ftRate: number;
  ftAmount: number;
  subtotalBeforeVat: number;
  vatAmount: number;
  total: number;
}

export interface BillComparison<TInput extends Record<string, number>> {
  input: TInput;
  oldBill: BillBreakdown;
  newBill: BillBreakdown;
  increase: number;
}

export interface ReverseNormalEstimateResult {
  estimatedUnits: number;
  estimatedOldBillInput: number;
  comparison: BillComparison<{ units: number }>;
}

export interface ReverseTouEstimateResult {
  estimatedTotalUnits: number;
  estimatedPeakUnits: number;
  estimatedOffPeakUnits: number;
  estimatedOldBillInput: number;
  pattern: UsagePattern;
  comparison: BillComparison<{ peakUnits: number; offPeakUnits: number; totalUnits: number }>;
}
