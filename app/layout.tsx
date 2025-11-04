import type { Metadata } from "next";
import { Geist, Geist_Mono, Jersey_15, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-pixels",
  subsets: ["latin"],
  weight: ["400"],
});

const jersey15 = Jersey_15({
  variable: "--font-jersey-15",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Wordless",
  description: "Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${pressStart.variable} ${jersey15.variable} h-full antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
