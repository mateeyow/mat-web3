import "./globals.css";
import type { Metadata } from "next";
import { font } from "./fonts";

export const metadata: Metadata = {
  title: "MAT | My Awesome Token",
  description: "Get free tokens daily by checking in!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${font.variable}`} lang="en">
      <body className="bg-primary text-white">{children}</body>
    </html>
  );
}
