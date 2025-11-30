import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bilimsel Araştırma Yazma Platformu",
  description: "IMRAD formatında detaylı bilimsel makale yazma aracı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
