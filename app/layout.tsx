import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/content/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Total Solution for Visa and Relocation. Visa, housing and settling-in for expats and their employers in Busan & Seoul — managed end to end, 1:1.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SOJOURN KOREA — Visa & Relocation in Korea",
    template: "%s | SOJOURN KOREA",
  },
  description,
  applicationName: site.name,
  keywords: [
    "Korea relocation",
    "Busan relocation",
    "Seoul relocation",
    "Korea visa service",
    "expat housing Korea",
    "settling in Korea",
    "relocation service Korea",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "SOJOURN KOREA — Visa & Relocation in Korea",
    description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: "/hero/poster.jpg",
        width: 1280,
        height: 720,
        alt: "SOJOURN KOREA — visa and relocation for expats in Busan & Seoul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOJOURN KOREA — Visa & Relocation in Korea",
    description,
    images: ["/hero/poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
