import { TARIFFS } from "@/config/tariffs";
import { calculateTouBillComparison } from "@/lib/calculateTouBill";
import { findUnitsByBinarySearch, roundTo } from "@/lib/math";
import type { ReverseTouEstimateResult, UsagePattern } from "@/types/calculation";

export function reverseEstimateTouUnits(
  oldBillAmount: number,
  pattern: UsagePattern
): ReverseTouEstimateResult {
  // Pattern ratio approximates how total units are split between Peak and Off-Peak.
  const ratio = TARIFFS.touPatternRatios[pattern];

  const estimatedTotalUnitsRaw = findUnitsByBinarySearch({
    targetBill: oldBillAmount,
    billAtUnits: (totalUnits) => {
      const peakUnits = totalUnits * ratio.peak;
      const offPeakUnits = totalUnits * ratio.offPeak;

      return calculateTouBillComparison(peakUnits, offPeakUnits).oldBill.total;
    }
  });

  const estimatedTotalUnits = roundTo(estimatedTotalUnitsRaw, 2);
  const estimatedPeakUnits = roundTo(estimatedTotalUnits * ratio.peak, 2);
  const estimatedOffPeakUnits = roundTo(estimatedTotalUnits * ratio.offPeak, 2);

  return {
    estimatedTotalUnits,
    estimatedPeakUnits,
    estimatedOffPeakUnits,
    estimatedOldBillInput: oldBillAmount,
    pattern,
    comparison: calculateTouBillComparison(estimatedPeakUnits, estimatedOffPeakUnits)
  };
}
