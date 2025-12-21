import type { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "15-Puzzle | Mastrovia Lab",
  description:
    "Challenge your logic with the classic sliding 15-puzzle. A minimalist, high-performance diagnostic game from Mastrovia Research Lab.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}/fifteen-puzzle`,
    title: "15-Puzzle | Mastrovia Lab",
    description:
      "Challenge your logic with the classic sliding 15-puzzle. A minimalist, high-performance diagnostic game from Mastrovia Research Lab.",
    images: [
      {
        url: `${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`,
        width: 1200,
        height: 630,
        alt: "15-Puzzle Mastrovia Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "15-Puzzle | Mastrovia Lab",
    description:
      "Challenge your logic with the classic sliding 15-puzzle. A minimalist, high-performance diagnostic game from Mastrovia Research Lab.",
    images: [`${appConfig.baseUrl}/fifteen-puzzle/images/fifteen-puzzle-banner.png`],
  },
};

export default function FifteenPuzzleGameLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
