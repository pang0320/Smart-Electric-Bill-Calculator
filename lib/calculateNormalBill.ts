import { TARIFFS } from "@/config/tariffs";
import type { BillBreakdown, BillComparison } from "@/types/calculation";
import { assertNonNegative, calculateTieredCharge } from "@/lib/math";

function getNormalSchedule(units: number) {
  // Residential normal tariff changes schedule when monthly usage exceeds 150 units.
  if (units <= TARIFFS.normal.lowUsageCutoffUnits) {
    return TARIFFS.normal.schedules.lowUsage;
  }

  return TARIFFS.normal.schedules.highUsage;
}

function calculateNormalBillAtFt(units: number, ftRate: number): BillBreakdown {
  assertNonNegative(units, "units");

  const schedule = getNormalSchedule(units);
  const energyCharge = calculateTieredCharge(units, schedule.tiers);
  const serviceCharge = schedule.serviceCharge;
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

export function calculateNormalBillComparison(units: number): BillComparison<{ units: number }> {
  const oldBill = calculateNormalBillAtFt(units, TARIFFS.ft.old);
  const newBill = calculateNormalBillAtFt(units, TARIFFS.ft.new);

  return {
    input: { units },
    oldBill,
    newBill,
    increase: newBill.total - oldBill.total
  };
}
