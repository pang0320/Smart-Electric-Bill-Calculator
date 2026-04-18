import { AppHeader } from "@/components/AppHeader";
import { CalculatorCard } from "@/components/CalculatorCard";
import { PageNav } from "@/components/PageNav";
import { UI_TEXT } from "@/config/uiText";

export default function HelpPage() {
  return (
    <div className="space-y-4">
      <PageNav />
      <AppHeader title={UI_TEXT.help.title} subtitle={UI_TEXT.help.intro} />

      <CalculatorCard>
        <ul className="space-y-3 text-lg text-slate-800">
          {UI_TEXT.help.points.map((point) => (
            <li key={point} className="font-semibold">
              • {point}
            </li>
          ))}
        </ul>
      </CalculatorCard>
    </div>
  );
}
