"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  History as HistoryIcon,
  Trash2,
  Trophy,
  Timer,
  RefreshCcw,
  Cpu,
  Activity,
  Shield,
  Binary,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type State = "idle" | "waiting" | "ready" | "result" | "early";

interface Entry {
  id: string;
  time: number;
  date: string;
}

const HISTORICAL_BENCHMARKS = [
  { ms: 1, label: "Quantum Gate", desc: "Sub-nanosecond scale operational throughput." },
  { ms: 10, label: "L1 Cache Access", desc: "Digital speed. You are basically a CPU." },
  { ms: 50, label: "Fiber Round Trip", desc: "Lightning fast transmission speeds." },
  { ms: 150, label: "Peak Biological", desc: "Top tier professional-grade synaptic speed." },
  { ms: 215, label: "Human Baseline", desc: "Optimal reaction for a healthy biology." },
  { ms: 300, label: "Vintage Mainframe", desc: "Standard interrupt speed of the 1970s." },
  { ms: 500, label: "Old Dial-up", desc: "Connecting... please wait for the carrier." },
  { ms: 1000, label: "Legacy OS", desc: "Significant input delay detected." },
];

export default function ReactionSpeed() {
  const [state, setState] = useState<State>("idle");
  const [time, setTime] = useState<number | null>(null);
  const [history, setHistory] = useState<Entry[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem("reaction_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("reaction_history", JSON.stringify(history.slice(0, 10)));
  }, [history]);

  const startTest = useCallback(() => {
    setState("waiting");
    setTime(null);

    const delay = Math.floor(Math.random() * 3000) + 2000;

    timeoutRef.current = setTimeout(() => {
      setState("ready");
      startTimeRef.current = performance.now();
    }, delay);
  }, []);

  const handleClick = (e: React.PointerEvent) => {
    // CAPTURE IMMEDIATELY: The very first thing we do is record the current high-res timestamp
    const now = performance.now();

    // Prevent default to avoid any scroll/zoom interference during test
    if (state === "waiting" || state === "ready") {
      e.preventDefault();
    }

    if (state === "idle" || state === "result" || state === "early") {
      startTest();
      return;
    }

    if (state === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setState("early");
      return;
    }

    if (state === "ready") {
      // Calculate delta using the 'now' captured at the start of the function call
      const reactionTime = Math.floor(now - startTimeRef.current);
      setTime(reactionTime);
      setState("result");

      const newEntry: Entry = {
        id: Math.random().toString(36).substr(2, 9),
        time: reactionTime,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setHistory((prev) => [newEntry, ...prev].slice(0, 10));
    }
  };

  const getBenchmark = (ms: number) => {
    return HISTORICAL_BENCHMARKS.find((b) => ms <= b.ms) || HISTORICAL_BENCHMARKS[HISTORICAL_BENCHMARKS.length - 1];
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("reaction_history");
  };

  // Memoized average to avoid recalc
  const averageTime = useMemo(() => {
    if (history.length === 0) return 0;
    return (history.reduce((a, b) => a + b.time, 0) / history.length).toFixed(0);
  }, [history]);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden pt-44 pb-24 md:pt-56 md:pb-32 px-4 sm:px-8 flex flex-col items-center">
      {/* --- EXTRAORDINARY BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep Gradient Glow */}
        <div className="absolute inset-0 bg-radial-at-t from-primary/10 via-transparent to-transparent" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-[30vh] bg-linear-to-b from-transparent via-primary/20 to-transparent"
              initial={{ top: "-30%", left: `${i * 20}%` }}
              animate={{ top: "110%" }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(var(--foreground),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground),0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* --- HUD --- */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-12 bg-linear-to-b from-background via-background/90 to-transparent pointer-events-none border-b border-border/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-4 md:gap-6">
          <div className="flex flex-col gap-2 md:gap-3 pointer-events-auto">
            <Link
              href="/"
              className="flex items-center gap-2 text-[9px] md:text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              RETURN_TO_HOME
            </Link>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] md:text-[12px] font-mono text-primary uppercase tracking-[0.4em]">
                  System_Pulse.v2
                </span>
              </div>
              <h1 className="text-2xl md:text-5xl font-black tracking-tighter italic leading-none">REACTION_LAB</h1>
            </div>
          </div>

          <div className="flex gap-6 md:gap-8 pointer-events-auto items-center sm:items-end">
            <div className="flex flex-col border-l-2 border-border pl-3 md:pl-4">
              <span className="text-[9px] md:text-[11px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-1">
                Avg_Ms
              </span>
              <span className="text-base md:text-2xl font-bold tabular-nums text-foreground">{averageTime}</span>
            </div>
            <div className="flex flex-col border-l-2 border-border pl-3 md:pl-4">
              <span className="text-[9px] md:text-[11px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-1">
                Stability
              </span>
              <span className="text-base md:text-2xl font-bold text-green-500/80">98.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-50 text-right opacity-40 hidden sm:block">
        <div className="text-[12px] font-mono uppercase tracking-[0.4em]">Hardware Architecture Laboratory</div>
        <div className="text-[10px] font-mono italic">Validated for biological entities only.</div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Cinematic Test Chamber */}
        <motion.div
          onPointerDown={handleClick}
          layout
          className={`relative w-full aspect-4/3 sm:aspect-video md:aspect-3/1 min-h-[350px] sm:min-h-[400px] md:min-h-0 rounded-3xl sm:rounded-4xl p-1 border transition-all duration-700 cursor-pointer overflow-hidden ${
            state === "waiting"
              ? "border-amber-500/20 bg-amber-500/5 shadow-[0_0_50px_-20px_rgba(245,158,11,0.2)]"
              : state === "ready"
              ? "border-green-500/40 bg-green-500/10 shadow-[0_0_100px_-20px_rgba(34,197,94,0.3)]"
              : state === "early"
              ? "border-destructive/30 bg-destructive/5"
              : "border-border bg-card/5 hover:bg-accent/8"
          }`}
        >
          {/* Inner Glow Layer */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div
              className={`absolute inset-0 bg-radial-at-center from-current via-transparent to-transparent ${
                state === "ready" ? "text-green-500" : state === "waiting" ? "text-amber-500" : "text-blue-500"
              }`}
            />
          </div>

          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 bg-card/5 border border-border rounded-full flex items-center justify-center">
                    <Zap className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-4 px-4">
                  <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-foreground leading-tight">
                    Initiate Sequence
                  </h2>
                  <p className="text-xs sm:text-base font-mono text-muted-foreground uppercase tracking-[0.3em]">
                    Click anywhere to start
                  </p>
                  <div className="pt-2">
                    <span className="text-[9px] md:text-xs font-mono text-muted-foreground/60 uppercase tracking-widest border border-border px-3 py-1 rounded-full inline-block">
                      Wait for Green. Click immediately.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {state === "waiting" && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center"
              >
                <div className="flex gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-amber-500"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <h2 className="text-6xl sm:text-8xl md:text-9xl font-black text-amber-500 tracking-tighter italic">
                  WAIT...
                </h2>
                <div className="mt-6 px-6 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-[10px] sm:text-sm font-mono text-amber-500 uppercase tracking-widest text-center mx-4">
                  Analyzing Peripheral Drift
                </div>
              </motion.div>
            )}

            {state === "ready" && (
              <motion.div
                key="ready"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center"
              >
                <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
                <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-green-400 tracking-tighter drop-shadow-[0_0_40px_rgba(74,222,128,0.5)]">
                  PULSE!
                </h2>
              </motion.div>
            )}

            {state === "early" && (
              <motion.div
                key="early"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full flex flex-col items-center justify-center gap-6"
              >
                <div className="w-20 h-20 bg-destructive/20 rounded-2xl flex items-center justify-center border border-destructive/40 rotate-45">
                  <Activity className="w-10 h-10 text-destructive -rotate-45" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-5xl font-black text-destructive tracking-tighter uppercase italic">
                    False Trigger
                  </h2>
                  <p className="text-xs font-mono text-destructive/40 uppercase tracking-widest">
                    Synchronization failed. Click to recalibrate.
                  </p>
                </div>
              </motion.div>
            )}

            {state === "result" && time && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 md:px-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-4xl items-center">
                  <div className="text-center md:text-left space-y-2 md:space-y-4">
                    <div className="text-[10px] md:text-xs font-mono text-primary uppercase tracking-widest leading-none">
                      Throughput Result
                    </div>
                    <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none tabular-nums text-foreground flex items-baseline justify-center md:justify-start gap-1">
                      {time}
                      <span className="text-xl sm:text-2xl md:text-3xl text-muted-foreground/30 font-light italic">
                        ms
                      </span>
                    </div>
                    <button className="hidden md:flex items-center gap-4 text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group">
                      <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                      Rerun Protocol
                    </button>
                  </div>

                  <div className="bg-card/50 border border-border/50 rounded-3xl p-5 md:p-8 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Shield className="w-16 md:w-20 h-16 md:h-20 text-foreground" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                        <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-widest">
                          Benchmark Sync
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xl md:text-3xl font-black italic tracking-tight text-foreground leading-tight">
                          {getBenchmark(time).label}
                        </div>
                        <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed italic">
                          "{getBenchmark(time).desc}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="md:hidden mt-6 w-full max-w-xs py-4 bg-foreground text-background font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
                  <RefreshCcw className="w-4 h-4" />
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- SUPPLEMENTARY DATA --- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Timeline Log */}
          <div className="lg:col-span-7 bg-card border border-border rounded-4xl p-6 sm:p-10 relative overflow-hidden group">
            <div className="absolute -z-20 top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Binary className="w-32 h-32 text-foreground" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HistoryIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Sequence_History</h3>
              </div>
              <button
                onPointerDown={(e) => {
                  e.stopPropagation(); // Prevent any parent interactions
                  clearHistory();
                }}
                className="w-fit text-[11px] font-mono text-muted-foreground hover:text-destructive transition-all flex items-center gap-2 uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg hover:bg-destructive/10 active:scale-95"
              >
                <Trash2 className="w-4 h-4" /> Purge Logs
              </button>
            </div>

            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((entry, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={entry.id}
                    className="flex items-center justify-between p-5 rounded-2xl bg-muted/30 border border-border group/entry hover:border-primary/20 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[11px] font-mono text-muted-foreground/30 tracking-widest">
                        LOG.{history.length - idx}
                      </span>
                      <span className="text-3xl font-black tabular-nums tracking-tighter text-foreground">
                        {entry.time}
                        <span className="text-sm text-muted-foreground/40 ml-1 italic font-light">ms</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                          Ref_Time
                        </span>
                        <span className="text-[12px] text-muted-foreground font-bold">{entry.date}</span>
                      </div>
                      <div
                        className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] ${
                          entry.time < 250 ? "bg-green-500 shadow-green-500/50" : "bg-primary shadow-primary/50"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center text-white/10 italic text-sm border-2 border-dashed border-white/5 rounded-3xl">
                  Waiting for initial biometric input...
                </div>
              )}
            </div>
          </div>

          {/* Theoretical Analytics */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-card border border-border rounded-4xl p-10 flex flex-col gap-8 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground">Synaptic_Profile</h3>
              </div>

              <div className="space-y-8">
                {[
                  { label: "Neural Throughput", value: `${averageTime}ms`, color: "text-primary" },
                  { label: "Biological Jitter", value: "±4.2ms", color: "text-amber-400" },
                  { label: "Signal Velocity", value: "82 m/s", color: "text-green-400" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end group/stat">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-[0.3em] font-mono group-hover/stat:text-foreground transition-colors">
                      {stat.label}
                    </span>
                    <span className={`text-3xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-primary/10 to-transparent border border-primary/20 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <Timer className="w-24 h-24 text-primary" />
              </div>
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-primary">
                <Activities className="w-3.5 h-3.5" /> Researcher_Note
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed italic font-light">
                "Human interaction bandwidth is fixed by the physical limitations of chemical synapses. While
                transistors operate at sub-nanosecond scales, your nervous system represents the ultimate bottleneck in
                high-frequency computation."
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .bg-radial-at-t {
          background-image: radial-gradient(circle at top, var(--tw-gradient-from), var(--tw-gradient-to));
        }
        .bg-radial-at-center {
          background-image: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
}

function Activities({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
