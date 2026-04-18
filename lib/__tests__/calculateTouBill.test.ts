import { describe, expect, it } from "vitest";
import { calculateTouBillComparison } from "@/lib/calculateTouBill";

describe("calculateTouBillComparison", () => {
  it("calculates TOU bill correctly for peak/off-peak input", () => {
    const result = calculateTouBillComparison(100, 200);

    expect(result.oldBill.energyCharge).toBeCloseTo(1107.2, 4);
    expect(result.oldBill.serviceCharge).toBeCloseTo(24.62, 4);
    expect(result.oldBill.ftAmount).toBeCloseTo(29.16, 4);
    expect(result.oldBill.total).toBeCloseTo(1242.2486, 4);

    expect(result.newBill.ftAmount).toBeCloseTo(48.69, 4);
    expect(result.newBill.total).toBeCloseTo(1263.1457, 4);
    expect(result.increase).toBeCloseTo(20.8971, 4);
  });

  it("supports zero peak and off-peak units", () => {
    const result = calculateTouBillComparison(0, 0);

    expect(result.oldBill.energyCharge).toBe(0);
    expect(result.oldBill.ftAmount).toBe(0);
    expect(result.oldBill.total).toBeGreaterThan(0);
  });

  it("throws for invalid negative values", () => {
    expect(() => calculateTouBillComparison(-1, 0)).toThrow();
    expect(() => calculateTouBillComparison(0, -1)).toThrow();
  });
});
