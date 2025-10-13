import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {/* Layout */}
          <div className={cn("relative h-dvh", "inconsolata")}>
            <div className={cn("w-full h-full absolute left-0 right-0", "bg-grid")} />
            <Image
              alt="Mastroiva Logo"
              src={"/mastrovia-logo.webp"}
              width={918}
              height={499}
              className="absolute left-[50%] translate-x-[-50%] top-[80px] opacity-10 px-20 lg:px-0"
              priority
            />
            <div className="bg-radial from-[#0000001e] to-[#000000] absolute top-0 left-0 w-full h-full" />
            <div className="bg-[url('/textures/grains.png')] absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.08]" />
            <div className="absolute left-0 right-0 top-0 bottom-10">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>

        {/* Google analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
