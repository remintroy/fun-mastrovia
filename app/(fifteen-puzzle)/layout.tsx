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
    <>
      <div className="absolute top-0 left-0 h-16 border-b w-full flex items-center justify-center">Fifteen Puzzle</div>
      <main className="absolute w-full top-16 bottom-0">{children}</main>
    </>
  );
}
