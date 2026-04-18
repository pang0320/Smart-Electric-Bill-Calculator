import { UI_TEXT } from "@/config/uiText";
import { formatCurrency, formatUnits } from "@/lib/format";
import type { BillComparison } from "@/types/calculation";

export interface DetailLine {
  label: string;
  value: string;
}

export function buildCommonDetailLines(
  comparison: BillComparison<Record<string, number>>,
  inputLines: DetailLine[]
): DetailLine[] {
  return [
    ...inputLines,
    {
      label: UI_TEXT.common.details.energyChargeOld,
      value: formatCurrency(comparison.oldBill.energyCharge)
    },
    {
      label: UI_TEXT.common.details.energyChargeNew,
      value: formatCurrency(comparison.newBill.energyCharge)
    },
    {
      label: UI_TEXT.common.details.serviceCharge,
      value: formatCurrency(comparison.oldBill.serviceCharge)
    },
    {
      label: UI_TEXT.common.details.ftOld,
      value: `${formatCurrency(comparison.oldBill.ftAmount)} (${formatUnits(comparison.oldBill.ftRate)} ${UI_TEXT.common.bahtPerUnitLabel})`
    },
    {
      label: UI_TEXT.common.details.ftNew,
      value: `${formatCurrency(comparison.newBill.ftAmount)} (${formatUnits(comparison.newBill.ftRate)} ${UI_TEXT.common.bahtPerUnitLabel})`
    },
    {
      label: UI_TEXT.common.details.vatOld,
      value: formatCurrency(comparison.oldBill.vatAmount)
    },
    {
      label: UI_TEXT.common.details.vatNew,
      value: formatCurrency(comparison.newBill.vatAmount)
    },
    {
      label: UI_TEXT.common.details.oldTotal,
      value: formatCurrency(comparison.oldBill.total)
    },
    {
      label: UI_TEXT.common.details.newTotal,
      value: formatCurrency(comparison.newBill.total)
    },
    {
      label: UI_TEXT.common.details.difference,
      value: formatCurrency(comparison.increase)
    }
  ];
}
