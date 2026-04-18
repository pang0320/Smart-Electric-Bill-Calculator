import Link from "next/link";
import { UI_TEXT } from "@/config/uiText";

export function PageNav() {
  return (
    <nav aria-label="Main" className="mb-4 flex flex-wrap gap-2">
      <Link
        href="/"
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        {UI_TEXT.nav.home}
      </Link>
      <Link
        href="/normal"
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        {UI_TEXT.nav.normal}
      </Link>
      <Link
        href="/tou"
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        {UI_TEXT.nav.tou}
      </Link>
      <Link
        href="/help"
        className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
      >
        {UI_TEXT.nav.help}
      </Link>
    </nav>
  );
}
