import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Q1 Article Writer - AI-Powered Academic Writing",
  description: "Generate humanized, Q1-quality academic articles with AI assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
