import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeliHyrox Admin",
  description: "Back-office bureau HeliHyrox"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

