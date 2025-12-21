import type { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "The Turing Test | Mastrovia Lab",
  description:
    "Prove your biological irrationality in this parody series of increasingly absurd human-validation tests from Mastrovia Lab.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}/captcha-gauntlet`,
    title: "The Turing Test | Mastrovia Lab",
    description:
      "Prove your biological irrationality in this parody series of increasingly absurd human-validation tests from Mastrovia Lab.",
    images: [
      {
        url: `${appConfig.baseUrl}/captcha-gauntlet/images/banner.png`,
        width: 1200,
        height: 630,
        alt: "The Turing Test Mastrovia Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Turing Test | Mastrovia Lab",
    description:
      "Prove your biological irrationality in this parody series of increasingly absurd human-validation tests from Mastrovia Lab.",
    images: [`${appConfig.baseUrl}/captcha-gauntlet/images/banner.png`],
  },
};

export default function CaptchaGauntletLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
