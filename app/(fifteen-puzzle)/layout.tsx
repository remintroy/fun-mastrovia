import { cn } from "@/lib/utils";
import styles from "./style.module.css";
import Image from "next/image";
import { Metadata } from "next";
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
    <div className={cn("relative h-dvh", styles.inconsolata)}>
      {/* TODO: Make this website adaptive with light theme */}
      <div className={cn("w-full h-full absolute left-0 right-0", styles["bg-grid"])} />
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
      <div className="absolute top-0 left-0 h-16 border-b w-full flex items-center justify-center">Fifteen Puzzle</div>
      <main className="absolute w-full top-16 bottom-10">{children}</main>
      <div className="absolute flex justify-center py-2 bottom-0 left-0 w-full border-t">
        <div className="text-gray-400">
          Powered by{" "}
          <a href="https://mastrovia.com" className="underline" target="_blank">
            Mastrovia
          </a>
        </div>
      </div>
    </div>
  );
}
