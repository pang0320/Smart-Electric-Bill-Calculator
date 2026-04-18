import { calculateNormalBillComparison } from "@/lib/calculateNormalBill";
import { findUnitsByBinarySearch, roundTo } from "@/lib/math";
import type { ReverseNormalEstimateResult } from "@/types/calculation";

export function reverseEstimateNormalUnits(oldBillAmount: number): ReverseNormalEstimateResult {
  const estimatedUnitsRaw = findUnitsByBinarySearch({
    targetBill: oldBillAmount,
    billAtUnits: (units) => calculateNormalBillComparison(units).oldBill.total
  });

  const estimatedUnits = roundTo(estimatedUnitsRaw, 2);
  const comparison = calculateNormalBillComparison(estimatedUnits);

  return {
    estimatedUnits,
    estimatedOldBillInput: oldBillAmount,
    comparison
  };
}
