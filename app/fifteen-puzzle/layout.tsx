import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import type { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Fifteen Puzzle",
  description: "Simple and interactive fifteen puzzle game.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}`,
    title: "Fifteen Puzzle",
    description: "Simple and interactive fifteen puzzle game.",
    images: [
      {
        url: `${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`,
        width: 1920,
        height: 1024,
        alt: "Fifteen Puzzle Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fifteen Puzzle",
    description: "Simple and interactive fifteen puzzle game.",
    images: [`${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`],
  },
};

export default function FifteenPuzzleGameLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={cn("relative h-dvh", "inconsolata")}>
      {/* TODO: Make this website adaptive with light theme */}
      <div className={cn("w-full h-full absolute left-0 right-0", "bg-grid")} />
      <Image
        alt="Mastroiva Logo"
        src={"/mastrovia-logo.webp"}
        width={918}
        height={499}
        className="absolute left-[50%] translate-x-[-50%] top-[80px] opacity-10 px-20 lg:px-0"
        priority
      />
      <div className="bg-radial from-background/40 to-background absolute top-0 left-0 w-full h-full" />
      <div className="bg-[url('/textures/grains.png')] absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.08]" />
      <div className="absolute top-0 left-0 h-16 border-b w-full flex items-center justify-between px-6 backdrop-blur-md z-50 bg-background/40">
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <MoveLeft className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-1" />
          <span>
            Back<span className="hidden sm:inline"> to Hub</span>
          </span>
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-wider uppercase text-muted-foreground/70 whitespace-nowrap text-[12px] sm:text-lg">
          Fifteen Puzzle
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/mastrovia-logo.webp"
            alt="Mastrovia Logo"
            width={24}
            height={24}
            className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </div>

      <main className="absolute w-full top-16 bottom-10 sm:bottom-20 overflow-y-auto">{children}</main>
      <div className="absolute flex justify-center py-3 sm:py-6 bottom-0 left-0 w-full border-t border-border/40 bg-background/20 backdrop-blur-sm">
        <div className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold">
          Developed by{" "}
          <a
            href="https://mastrovia.com"
            className="text-foreground hover:text-primary transition-colors underline decoration-border underline-offset-4"
            target="_blank"
          >
            Mastrovia Studio
          </a>
        </div>
      </div>
    </div>
  );
}
