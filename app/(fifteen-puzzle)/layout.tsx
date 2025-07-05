import { cn } from "@/lib/utils";
import styles from "./style.module.css";
import Image from "next/image";
import mastroviaLogo from "./assets/mastrovia-logo.png";

export default function FifteenPuzzleGameLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative h-dvh">
      <div className={cn("w-full h-full absolute left-0 right-0", styles["bg-grid"])} />
      <Image
        alt="Mastroiva Logo"
        src={mastroviaLogo}
        className="absolute left-[50%] translate-x-[-50%] top-[64px] opacity-10 px-20 lg:px-0"
      />
      <div className="bg-radial from-[#00000000] to-[#000000] absolute top-0 left-0 w-full h-full" />
      <div className="bg-[url('/textures/grains.png')] absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.08]"></div>
      <main className="absolute w-full top-0 bottom-10">{children}</main>
      <div className="fixed flex justify-center py-2 bottom-0 left-0 w-full border-t bg-black/25">
        <div className="text-gray-400">
          Powerd by <a href="https://mastrovia.com/">Mastrovia</a>
        </div>
      </div>
    </div>
  );
}
