export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2
  }).format(value);
}

export function formatUnits(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("th-TH", {
    maximumFractionDigits: 2
  }).format(value);
}
