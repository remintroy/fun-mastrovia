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
    stack: "React, Zustand, Tailwind",
    href: "/fifteen-puzzle",
    difficulty: "Medium",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/10 font-sans overflow-x-hidden">
      {/* Zen Laboratory Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,hsl(var(--muted)),transparent)]" />
      <div className="fixed inset-0 -z-10 bg-grid opacity-[0.05] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[url('/textures/grains.png')] opacity-[0.02] pointer-events-none" />

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
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[ -0.05em] mb-10 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both leading-[0.9]">
            RESEARCH. <br />
            <span className="italic font-light opacity-40">EXPERIMENT.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground/80 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200 fill-mode-both leading-relaxed font-light tracking-wide uppercase">
            A minimalist sanctuary for interactive logic. <br className="hidden md:block" />
            built with absolute precision for the curious few.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-both">
            <Button
              size="lg"
              asChild
              className="rounded-none px-10 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="#games">Enter Hub</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none px-10 border-border/40 hover:bg-foreground hover:text-background transition-all"
            >
              <Link href="https://mastrovia.com" target="_blank">
                The Studio
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Laboratory Index */}
      <section id="games" className="py-32 px-6 border-t border-border/40 text-foreground overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <div className="text-[10px] font-mono text-primary/60 mb-4 tracking-[0.4em] uppercase">
                // subjects_catalogue
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">
                The <span className="text-muted-foreground/40 not-italic">Laboratory</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-light">
                An index of interactive curiosities. Every project is an isolated experiment in logic, interaction, and
                clean architecture.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-4 text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">
                <span>Index_Verified</span>
                <div className="w-12 h-px bg-border/40" />
                <span>v1.5.0</span>
              </div>
            </div>
          </div>

          <div className="space-y-32">
            {games.map((game, idx) => (
              <Link key={game.id} href={game.href} className="group block relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Subject Metadata */}
                  <div className="lg:col-span-3 order-2 lg:order-1">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl font-black tabular-nums opacity-60 lg:opacity-30 lg:group-hover:opacity-100 transition-opacity duration-700">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
                            Project_ID
                          </span>
                          <span className="text-sm font-bold uppercase tracking-tight">{game.id}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2 border-b border-border/40">
                          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase">Status</span>
                          <Badge
                            variant="outline"
                            className="rounded-none text-[9px] font-bold border-foreground/20 text-foreground"
                          >
                            STABLE_RELEASE
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/40">
                          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase">Complexity</span>
                          <span className="text-[11px] font-bold uppercase">{game.difficulty}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-border/40">
                          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase">Stack</span>
                          <span className="text-[11px] font-bold uppercase italic">{game.stack}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 order-1 lg:order-2">
                    <div className="aspect-video relative overflow-hidden bg-accent/5 border border-border/40 lg:group-hover:border-primary/50 transition-all duration-700 shadow-xl lg:shadow-2xl lg:group-hover:shadow-primary/5">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover opacity-100 lg:opacity-60 lg:group-hover:opacity-100 transition-all duration-1000 scale-100 lg:scale-110 lg:group-hover:scale-100"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-40 lg:opacity-20 lg:group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </div>

                  {/* Subject Details */}
                  <div className="lg:col-span-3 order-3">
                    <div className="space-y-6">
                      <h3 className="text-4xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {game.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed italic border-l-2 border-border/40 pl-4 py-1">
                        {game.description}
                      </p>
                      <Button
                        variant="ghost"
                        className="group/btn p-0 h-auto hover:bg-transparent text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4"
                      >
                        Initiate Sequence
                        <MoveRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Next Experiment Slot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center cursor-default">
              <div className="lg:col-span-3 order-2 lg:order-1">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black tabular-nums text-foreground/20">02</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Project_ID
                    </span>
                    <span className="text-sm font-bold uppercase tracking-tight text-foreground/40">
                      NULL_UNDEFINED
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2">
                <div className="aspect-video border border-dashed border-border flex items-center justify-center bg-accent/5">
                  <div className="flex flex-col items-center gap-4">
                    <Shapes className="w-12 h-12 text-muted-foreground/40 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground">
                      // data_unstable
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 order-3">
                <div className="space-y-4">
                  <h3 className="text-4xl font-black tracking-tight uppercase italic text-foreground/40">Expanding</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px]">
                    More experimental open-source artifacts currently in technical review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Ethos */}
      <section className="py-32 border-t border-border/40 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="lg:w-1/3">
              <Badge variant="outline" className="mb-6 px-3 py-1 border-primary/20 text-primary/60 bg-primary/5">
                The Protocol
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 max-w-[300px]">
                Laboratory <br />
                <span className="italic font-light opacity-50">Ethos</span>
              </h2>
              <div className="h-px w-20 bg-foreground/20" />
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              <div className="group">
                <div className="text-[10px] font-mono text-muted-foreground/40 mb-4 tracking-[0.3em] uppercase">
                  // protocol_01
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Simple
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Just the essentials. We stripped away the bloat so you can jump straight into the experience without
                  any distractions or complex setup.
                </p>
              </div>

              <div className="group">
                <div className="text-[10px] font-mono text-muted-foreground/40 mb-4 tracking-[0.3em] uppercase">
                  // protocol_02
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Interactive
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  A digital playground for the curious. Everything here is meant to be touched, clicked, and tested—feel
                  free to explore every corner of the lab.
                </p>
              </div>

              <div className="group">
                <div className="text-[10px] font-mono text-muted-foreground/40 mb-4 tracking-[0.3em] uppercase">
                  // protocol_03
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Fun
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Built purely for the joy of it. No ulterior motives, no tracking—just the raw satisfaction of a solved
                  sequence and a brief moment of fun.
                </p>
              </div>

              <div className="group">
                <div className="text-[10px] font-mono text-muted-foreground/40 mb-4 tracking-[0.3em] uppercase">
                  // protocol_04
                </div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-foreground" />
                  Open Source
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Power to the community. Developed as a free gift to the open-source world. Our lab is your lab—feel
                  free to fork, hack, and improve together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 md:py-16 border-t border-border/40">
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
