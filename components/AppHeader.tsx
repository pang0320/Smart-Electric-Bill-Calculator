import { UI_TEXT } from "@/config/uiText";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  return (
    <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-sky-700">{UI_TEXT.appName}</p>
      <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-900">{title}</h1>
      {subtitle ? <p className="mt-3 text-lg text-slate-700">{subtitle}</p> : null}
    </header>
  );
}
