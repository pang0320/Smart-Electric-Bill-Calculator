import type { TariffTier } from "@/types/calculation";

export function assertNonNegative(value: number, fieldName: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${fieldName} must be a non-negative number.`);
  }
}

export function roundTo(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function calculateTieredCharge(units: number, tiers: TariffTier[]): number {
  assertNonNegative(units, "units");

  let remaining = units;
  let previousCap = 0;
  let charge = 0;

  for (const tier of tiers) {
    if (remaining <= 0) break;

    const tierCap = tier.upTo ?? Number.POSITIVE_INFINITY;
    const tierWidth = tierCap - previousCap;
    const unitsInTier = Math.min(remaining, tierWidth);

    if (unitsInTier > 0) {
      charge += unitsInTier * tier.rate;
      remaining -= unitsInTier;
      previousCap = tierCap;
    }
  }

  return charge;
}

export function findUnitsByBinarySearch(args: {
  targetBill: number;
  billAtUnits: (units: number) => number;
  maxIterations?: number;
  tolerance?: number;
}): number {
  const { targetBill, billAtUnits, maxIterations = 80, tolerance = 0.01 } = args;

  assertNonNegative(targetBill, "targetBill");

  let low = 0;
  let high = 1;

  const minBill = billAtUnits(0);
  if (targetBill <= minBill) return 0;

  // Expand upper bound until it brackets the target bill.
  while (billAtUnits(high) < targetBill && high < 1_000_000) {
    high *= 2;
  }

  // Refine within [low, high] using binary search on a monotonic bill function.
  for (let i = 0; i < maxIterations; i += 1) {
    const mid = (low + high) / 2;
    const bill = billAtUnits(mid);

    if (Math.abs(bill - targetBill) <= tolerance) {
      return mid;
    }

    if (bill < targetBill) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
}
