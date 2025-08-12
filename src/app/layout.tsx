import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import React from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "CodeExpertos - Desarrollo de Software y Soluciones Digitales",
  description: "Expertos en desarrollo de apps web, móviles y mantenimiento de software. Llevamos tu negocio al siguiente nivel.",
  keywords: ["desarrollo web","apps móviles","software","mantenimiento","CodeExpertos"],
  authors: [{ name: "CodeExpertos" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "CodeExpertos - Desarrollo de Software y Soluciones Digitales",
    description: "Expertos en desarrollo de apps web, móviles y mantenimiento de software.",
    type: "website",
    locale: "es_ES",
    siteName: "CodeExpertos",
    url: "https://codeexpertos.example.com"
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeExpertos - Desarrollo de Software y Soluciones Digitales",
    description: "Expertos en desarrollo de apps web, móviles y mantenimiento de software.",
    creator: "@codeexpertos"
  },
  metadataBase: new URL("https://codeexpertos.example.com")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
