import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { FooterNote } from "@/components/FooterNote";
import { UI_TEXT } from "@/config/uiText";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"]
});

export const metadata: Metadata = {
  title: UI_TEXT.appName,
  description: UI_TEXT.shortDescription
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body className={notoSansThai.className}>
        <main className="mx-auto w-full max-w-2xl px-4 py-4 sm:px-6">{children}</main>
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
          <FooterNote note={UI_TEXT.footerNote} />
        </div>
      </body>
    </html>
  );
}
