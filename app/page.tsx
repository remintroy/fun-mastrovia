import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, MoveRight, Code2, Terminal, Shapes, Github, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const games = [
  {
    id: "fifteen-puzzle",
    title: "15-Puzzle",
    description:
      "The classic sliding puzzle. Minimalist aesthetic with satisfying mechanics. Built with React and Zustand.",
    image: "/fifteen-puzzle/images/fifteen-puzzle-banner.png",
    category: "Logic",
    href: "/fifteen-puzzle",
    difficulty: "Medium",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/10 font-sans">
      {/* Zen Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--muted)),transparent)]" />
      <div className="fixed inset-0 -z-10 bg-[url('/textures/grains.png')] opacity-[0.03] pointer-events-none" />

      {/* Minimal Nav */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-black text-sm">M</span>
            </div>
            <span className="font-bold tracking-tight text-lg">
              Mastrovia <span className="text-muted-foreground">Lab</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/mastrovia"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-12 px-6 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge
            variant="outline"
            className="mb-8 px-4 py-1 border-border/40 text-muted-foreground bg-accent/10 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-1000"
          >
            <Code2 className="w-3 h-3 mr-2" />
            Open Source Game Lab
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            Play. Build. <br />
            <span className="italic font-light">Explore.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 fill-mode-both leading-relaxed">
            A small corner of the web dedicated to interactive curiosity. Minimalist, professional-grade games built by
            developers, for the open-source community.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
            <Button
              size="lg"
              asChild
              className="rounded-none px-10 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="#games">Enter Hub</Link>
            </Button>
            <Button size="lg" variant="ghost" className="rounded-none px-10 border border-border/40 hover:bg-accent/10">
              <Link href="https://mastrovia.com" target="_blank">
                {" "}
                The Studio{" "}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Games Grid */}
      <section id="games" className="py-24 px-6 border-t border-border/40 text-foreground">
        <div className="container mx-auto">
          <div className="flex flex-col mb-16 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-muted-foreground" />
              The Laboratory
            </h2>
            <p className="text-muted-foreground">
              Experiments in interaction. Every game is a study in clean code and minimalist UI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {games.map((game) => (
              <Link key={game.id} href={game.href} className="group cursor-pointer">
                <Card className="bg-transparent border-none text-foreground overflow-hidden rounded-none shadow-none">
                  <div className="aspect-[16/10] relative mb-6 overflow-hidden bg-accent/5 border border-border/40 group-hover:border-border transition-colors">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/10 backdrop-blur-md text-[10px] text-white/60 border-none transition-colors group-hover:bg-white group-hover:text-black">
                        {game.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold tracking-tight">{game.title}</h3>
                      <MoveRight className="w-5 h-5 text-white/20 group-hover:text-white transition-all group-hover:translate-x-2" />
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-2 italic">{game.description}</p>
                  </div>
                </Card>
              </Link>
            ))}

            {/* Coming Soon */}
            <div className="aspect-[16/10] md:aspect-auto flex flex-col items-center justify-center p-8 border border-dashed border-border/40 text-muted-foreground/40 hover:border-border transition-colors group">
              <div className="mb-6 opacity-40 group-hover:scale-110 transition-transform">
                <Shapes className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expanding...</h3>
              <p className="text-xs text-center max-w-[200px]">More open-source experiments arriving soon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-foreground text-background">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Minimalist Fun</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We believe in stripping away the bloat. No ads, no tracking, just pure interaction designed for curious
                minds.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-foreground text-background">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Open Architecture</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Built with modern tech stacks like Next.js 15, Tailwind, and Shadcn. Every component is designed to be
                modular and readable.
              </p>
            </div>
            <div className="space-y-6">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-foreground text-background">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Community First</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A project born out of curiosity. Aimed at developers who love polishing small things until they shine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-16 border-t border-border/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded bg-foreground/10 flex items-center justify-center">
              <span className="text-muted-foreground font-black text-[10px]">M</span>
            </div>
            <span className="text-sm font-bold tracking-tight text-muted-foreground uppercase">Mastrovia Hub</span>
          </div>
          <div className="text-[12px] text-muted-foreground/40 flex gap-8">
            <Link
              href="https://github.com/mastrovia"
              className="hover:text-foreground transition-colors uppercase tracking-widest"
            >
              GitHub
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors uppercase tracking-widest">
              Source
            </Link>
            <Link
              href="https://mastrovia.com"
              className="hover:text-foreground transition-colors uppercase tracking-widest underline decoration-border underline-offset-4"
            >
              Studio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
