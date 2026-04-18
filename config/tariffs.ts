import type { TariffTier, UsagePattern } from "@/types/calculation";

export const TARIFFS = {
  vatRate: 0.07,
  ft: {
    old: 0.0972,
    new: 0.1623
  },
  normal: {
    lowUsageCutoffUnits: 150,
    schedules: {
      lowUsage: {
        serviceCharge: 8.19,
        tiers: [
          { upTo: 15, rate: 2.3488 },
          { upTo: 25, rate: 2.9882 },
          { upTo: 35, rate: 3.2405 },
          { upTo: 100, rate: 3.6237 },
          { upTo: 150, rate: 3.7171 },
          { upTo: 400, rate: 4.2218 },
          { upTo: null, rate: 4.4217 }
        ] satisfies TariffTier[]
      },
      highUsage: {
        serviceCharge: 24.62,
        tiers: [
          { upTo: 150, rate: 3.2484 },
          { upTo: 400, rate: 4.2218 },
          { upTo: null, rate: 4.4217 }
        ] satisfies TariffTier[]
      }
    }
  },
  tou: {
    onPeakRate: 5.7982,
    offPeakRate: 2.6369,
    serviceCharge: 24.62
  },
  touPatternRatios: {
    mostlyDaytime: { peak: 0.7, offPeak: 0.3 },
    balanced: { peak: 0.5, offPeak: 0.5 },
    mostlyNighttime: { peak: 0.3, offPeak: 0.7 }
  } satisfies Record<UsagePattern, { peak: number; offPeak: number }>
} as const;
