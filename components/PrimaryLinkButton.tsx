import Link from "next/link";
import type { ReactNode } from "react";

interface PrimaryLinkButtonProps {
  href: string;
  children: ReactNode;
}

export function PrimaryLinkButton({ href, children }: PrimaryLinkButtonProps) {
  return (
    <Link
      href={href}
      className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-sky-600 px-4 py-3 text-center text-xl font-bold text-white shadow-sm transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
    >
      {children}
    </Link>
  );
}
