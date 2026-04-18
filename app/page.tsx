import { AppHeader } from "@/components/AppHeader";
import { CalculatorCard } from "@/components/CalculatorCard";
import { DisclaimerBox } from "@/components/DisclaimerBox";
import { HelpBox } from "@/components/HelpBox";
import { PageNav } from "@/components/PageNav";
import { PrimaryLinkButton } from "@/components/PrimaryLinkButton";
import { UI_TEXT } from "@/config/uiText";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <PageNav />

      <AppHeader title={UI_TEXT.appName} subtitle={UI_TEXT.shortDescription} />

      <CalculatorCard>
        <div className="space-y-3">
          <PrimaryLinkButton href="/normal">{UI_TEXT.home.normalButton}</PrimaryLinkButton>
          <PrimaryLinkButton href="/tou">{UI_TEXT.home.touButton}</PrimaryLinkButton>
          <p className="rounded-2xl bg-sky-50 p-3 text-base font-semibold text-slate-800">
            {UI_TEXT.estimateNote}
          </p>
        </div>
      </CalculatorCard>

      <HelpBox title={UI_TEXT.home.howToTitle} lines={UI_TEXT.home.howToSteps} />

      <DisclaimerBox
        title={UI_TEXT.home.importantTitle}
        items={[UI_TEXT.home.importantBody]}
      />
    </div>
  );
}
