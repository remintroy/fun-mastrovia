import type { Metadata } from "next";
import { appConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Reaction Speed | Mastrovia Lab",
  description:
    "Benchmark your neural response time. Measure your millisecond throughput against biological standards in the Mastrovia Reaction Speed diagnostic.",
  openGraph: {
    type: "website",
    url: `${appConfig.baseUrl}/reaction-speed`,
    title: "Reaction Speed | Mastrovia Lab",
    description:
      "Benchmark your neural response time. Measure your millisecond throughput against biological standards in the Mastrovia Reaction Speed diagnostic.",
    images: [
      {
        url: `${appConfig.baseUrl}/reaction-speed/images/banner.png`,
        width: 1200,
        height: 630,
        alt: "Reaction Speed Mastrovia Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reaction Speed | Mastrovia Lab",
    description:
      "Benchmark your neural response time. Measure your millisecond throughput against biological standards in the Mastrovia Reaction Speed diagnostic.",
    images: [`${appConfig.baseUrl}/reaction-speed/images/banner.png`],
  },
};

export default function ReactionSpeedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
