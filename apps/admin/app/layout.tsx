import type { Metadata } from "next";
import { AdminNav } from "@/components/AdminNav";
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
      <body>
        <AdminNav />
        {children}
      </body>
    </html>
  );
}
