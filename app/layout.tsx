import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-portfolio.vercel.app"), // update once you know your real Vercel URL
  title: {
    default: "Wahab — Developer & Learner",
    template: "%s — Wahab",
  },
  description: "Portfolio and public learning journey toward full-stack development.",
  openGraph: {
    siteName: "Wahab",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
     <body>
  <a href="#main-content" className="skip-link">
    Skip to main content
  </a>
  <SiteHeader />
  {children}
  <SiteFooter />
</body>
    </html>
  );
}