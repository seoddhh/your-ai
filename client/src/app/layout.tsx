import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import Sidebar from "@/components/layout/Sidebar";
import FilterChips from "@/components/ui/FilterChips";
import { ColorSchemeScript } from "@mantine/core";
import { Providers } from "@/components/Providers";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Spectrum - Persona Lab",
  description: "Archive of AI personas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link href="http://cdn.jsdelivr.net/font-d2coding/1.3.2/d2coding.css" rel="stylesheet" />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Providers>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <FilterChips />
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
