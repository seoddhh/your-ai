import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { Providers } from "@/components/Providers";
import Sidebar from "@/components/layout/Sidebar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your AI - Custom Instructions Hub",
  description: "도메인별 AI 맞춤 응답 규칙을 발견하고, 다른 응답 규칙이 어떻게 AI 응답을 바꾸는지 비교해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-mantine-color-scheme="light">
      <head>
        <link href="https://cdn.jsdelivr.net/font-d2coding/1.3.2/d2coding.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <Providers>
          <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-color)',
          }}>
            {/* 플로팅 사이드바 - 배경 없이 아이콘만 */}
            <Sidebar />

            {/* 메인 콘텐츠 영역 - 사이드바 margin 없음 */}
            <main style={{
              minHeight: '100vh',
            }}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
