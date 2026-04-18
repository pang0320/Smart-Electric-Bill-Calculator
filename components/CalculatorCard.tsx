import type { ReactNode } from "react";

interface CalculatorCardProps {
  children: ReactNode;
}

export function CalculatorCard({ children }: CalculatorCardProps) {
  return <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">{children}</section>;
}
