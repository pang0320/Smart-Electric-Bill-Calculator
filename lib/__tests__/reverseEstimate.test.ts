import { describe, expect, it } from "vitest";
import { calculateNormalBillComparison } from "@/lib/calculateNormalBill";
import { calculateTouBillComparison } from "@/lib/calculateTouBill";
import { reverseEstimateNormalUnits } from "@/lib/reverseEstimateNormalUnits";
import { reverseEstimateTouUnits } from "@/lib/reverseEstimateTouUnits";

describe("reverse estimation", () => {
  it("estimates normal units close to original usage", () => {
    const originalUnits = 275;
    const oldBill = calculateNormalBillComparison(originalUnits).oldBill.total;

    const estimated = reverseEstimateNormalUnits(oldBill);

    expect(estimated.estimatedUnits).toBeCloseTo(originalUnits, 0);
    expect(estimated.comparison.oldBill.total).toBeCloseTo(oldBill, 1);
  });

  it("estimates TOU usage close to original usage for balanced pattern", () => {
    const originalPeak = 200;
    const originalOffPeak = 200;
    const oldBill = calculateTouBillComparison(originalPeak, originalOffPeak).oldBill.total;

    const estimated = reverseEstimateTouUnits(oldBill, "balanced");

    expect(estimated.estimatedTotalUnits).toBeCloseTo(400, 0);
    expect(estimated.estimatedPeakUnits).toBeCloseTo(200, 0);
    expect(estimated.estimatedOffPeakUnits).toBeCloseTo(200, 0);
    expect(estimated.comparison.oldBill.total).toBeCloseTo(oldBill, 1);
  });

  it("returns zero estimated units when target bill is at or below minimum modeled bill", () => {
    const estimatedNormal = reverseEstimateNormalUnits(0);
    const estimatedTou = reverseEstimateTouUnits(0, "mostlyNighttime");

    expect(estimatedNormal.estimatedUnits).toBe(0);
    expect(estimatedTou.estimatedTotalUnits).toBe(0);
  });

  it("throws when reverse estimation receives invalid negative bill", () => {
    expect(() => reverseEstimateNormalUnits(-10)).toThrow();
    expect(() => reverseEstimateTouUnits(-10, "balanced")).toThrow();
  });
});
