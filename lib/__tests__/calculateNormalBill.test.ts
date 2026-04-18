import { describe, expect, it } from "vitest";
import { calculateNormalBillComparison } from "@/lib/calculateNormalBill";

describe("calculateNormalBillComparison", () => {
  it("calculates normal bill correctly for 100 units", () => {
    const result = calculateNormalBillComparison(100);

    expect(result.oldBill.energyCharge).toBeCloseTo(333.0595, 4);
    expect(result.oldBill.serviceCharge).toBeCloseTo(8.19, 4);
    expect(result.oldBill.ftAmount).toBeCloseTo(9.72, 4);
    expect(result.oldBill.total).toBeCloseTo(375.537365, 4);

    expect(result.newBill.ftAmount).toBeCloseTo(16.23, 4);
    expect(result.newBill.total).toBeCloseTo(382.503065, 4);
    expect(result.increase).toBeCloseTo(6.9657, 4);
  });

  it("uses low usage schedule at 150 and high usage schedule above 150", () => {
    const at150 = calculateNormalBillComparison(150);
    const at151 = calculateNormalBillComparison(151);

    expect(at150.oldBill.serviceCharge).toBeCloseTo(8.19, 4);
    expect(at151.oldBill.serviceCharge).toBeCloseTo(24.62, 4);
  });

  it("applies highest normal tier above 400 units", () => {
    const at400 = calculateNormalBillComparison(400);
    const at401 = calculateNormalBillComparison(401);

    const energyDelta = at401.oldBill.energyCharge - at400.oldBill.energyCharge;
    expect(energyDelta).toBeCloseTo(4.4217, 4);
  });

  it("accepts zero usage", () => {
    const zero = calculateNormalBillComparison(0);

    expect(zero.oldBill.energyCharge).toBe(0);
    expect(zero.oldBill.ftAmount).toBe(0);
    expect(zero.oldBill.total).toBeGreaterThan(0);
  });

  it("throws for invalid negative units", () => {
    expect(() => calculateNormalBillComparison(-1)).toThrow();
  });
});
