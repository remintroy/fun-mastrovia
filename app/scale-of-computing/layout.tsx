import type { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "The Silicon Scale | Mastrovia Lab",
  description:
    "An immersive journey through the physical dimensions of computing. From subatomic particles to the global internet.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}/scale-of-computing`,
    title: "The Silicon Scale | Mastrovia Lab",
    description:
      "An immersive journey through the physical dimensions of computing. From subatomic particles to the global internet.",
    images: [
      {
        url: `${appConfig.baseUrl}/scale-of-computing/images/banner.png`,
        width: 1200,
        height: 630,
        alt: "The Silicon Scale Mastrovia Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Silicon Scale | Mastrovia Lab",
    description:
      "An immersive journey through the physical dimensions of computing. From subatomic particles to the global internet.",
    images: [`${appConfig.baseUrl}/scale-of-computing/images/banner.png`],
  },
};

export default function ScaleOfComputingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
