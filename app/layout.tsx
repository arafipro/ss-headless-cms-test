import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const noto_sans = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Simple Headless CMS",
  description:
    "A user-friendly content management system generated using Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={noto_sans.className}>{children}</body>
    </html>
  );
}
