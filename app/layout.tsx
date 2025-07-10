import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastrovia fun hub",
  description: "A collection of fun and interactive games.",
  manifest: "/manifest.json",
};

export const appConfig = {
  baseUrl: "https://fun.mastrovia.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PYXMK94XMQ" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PYXMK94XMQ');
          `}
        </Script>
      </body>
    </html>
  );
}
