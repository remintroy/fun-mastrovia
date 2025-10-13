import { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Reaction Game",
  description: "Simple and interactive Reaction Game game.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}`,
    title: "Reaction Game",
    description: "Simple and interactive Reaction Game game.",
    images: [
      // {
      //   url: `${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`,
      //   width: 1920,
      //   height: 1024,
      //   alt: "Reaction Game Thumbnail",
      // },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reaction Game",
    description: "Simple and interactive Reaction Game game.",
    // images: [`${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`],
  },
};

export default function FifteenPuzzleGameLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="absolute top-0 left-0 h-16 border-b w-full flex items-center justify-center">Fifteen Puzzle</div>
      <main className="absolute w-full top-16 bottom-10">{children}</main>
    </>
  );
}
