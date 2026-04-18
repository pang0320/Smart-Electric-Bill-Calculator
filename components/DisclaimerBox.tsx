import type { ReactNode } from "react";

interface DisclaimerBoxProps {
  title: string;
  items: readonly string[];
  extra?: ReactNode;
}

export function DisclaimerBox({ title, items, extra }: DisclaimerBoxProps) {
  return (
    <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-4">
      <h2 className="text-xl font-extrabold text-amber-900">{title}</h2>
      <ul className="mt-3 space-y-2 text-base text-amber-950">
        {items.map((item) => (
          <li key={item} className="font-semibold">
            • {item}
          </li>
        ))}
      </ul>
      {extra ? <div className="mt-2 text-base font-semibold text-amber-950">{extra}</div> : null}
    </aside>
  );
}
