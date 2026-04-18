import { TARIFFS } from "@/config/tariffs";
import type { BillBreakdown, BillComparison } from "@/types/calculation";
import { assertNonNegative } from "@/lib/math";

function calculateTouBillAtFt(peakUnits: number, offPeakUnits: number, ftRate: number): BillBreakdown {
  assertNonNegative(peakUnits, "peakUnits");
  assertNonNegative(offPeakUnits, "offPeakUnits");

  const units = peakUnits + offPeakUnits;
  const energyCharge =
    peakUnits * TARIFFS.tou.onPeakRate + offPeakUnits * TARIFFS.tou.offPeakRate;

  const serviceCharge = TARIFFS.tou.serviceCharge;
  const ftAmount = units * ftRate;
  const subtotalBeforeVat = energyCharge + serviceCharge + ftAmount;
  const vatAmount = subtotalBeforeVat * TARIFFS.vatRate;
  const total = subtotalBeforeVat + vatAmount;

  return {
    units,
    energyCharge,
    serviceCharge,
    ftRate,
    ftAmount,
    subtotalBeforeVat,
    vatAmount,
    total
  };
}

export function calculateTouBillComparison(
  peakUnits: number,
  offPeakUnits: number
): BillComparison<{ peakUnits: number; offPeakUnits: number; totalUnits: number }> {
  const oldBill = calculateTouBillAtFt(peakUnits, offPeakUnits, TARIFFS.ft.old);
  const newBill = calculateTouBillAtFt(peakUnits, offPeakUnits, TARIFFS.ft.new);

  return {
    input: {
      peakUnits,
      offPeakUnits,
      totalUnits: peakUnits + offPeakUnits
    },
    oldBill,
    newBill,
    increase: newBill.total - oldBill.total
  };
}
