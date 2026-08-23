import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Error Studio — Design the moment something goes wrong",
  description: "A recovery-first error page studio for designing, testing and exporting polished error states.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#f2f1ed",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
