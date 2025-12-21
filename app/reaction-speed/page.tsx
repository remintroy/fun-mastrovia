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
} from "lucide-react";

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

  const handleClick = () => {
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
      const endTime = performance.now();
      const reactionTime = Math.floor(endTime - startTimeRef.current);
      setTime(reactionTime);
      setState("result");

      const newEntry: Entry = {
        id: Math.random().toString(36).substr(2, 9),
        time: reactionTime,
        date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setHistory((prev) => [newEntry, ...prev].slice(0, 5));
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
    <div className="relative min-h-screen bg-[#020202] text-white font-sans flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden selection:bg-blue-500/30">
      {/* --- EXTRAORDINARY BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep Gradient Glow */}
        <div className="absolute inset-0 bg-radial-at-t from-blue-900/10 via-transparent to-transparent" />

        {/* Animated Particles (CSS only for simplicity and perf) */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-[30vh] bg-linear-to-b from-transparent via-blue-500/20 to-transparent"
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
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(26,26,26,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,0.3)_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* --- HUD --- */}
      <div className="fixed top-12 left-12 z-50 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em]">System_Pulse.v2</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter italic">REACTION_LAB</h1>
        </div>

        <div className="hidden md:flex gap-8">
          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Avg_Ms</span>
            <span className="text-lg font-bold tabular-nums text-white/80">{averageTime}</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-4">
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Stability</span>
            <span className="text-lg font-bold text-green-500/80">98.4%</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-12 right-12 z-50 text-right opacity-40">
        <div className="text-[10px] font-mono uppercase tracking-[0.4em]">Hardware Architecture Laboratory</div>
        <div className="text-[9px] font-mono italic">Validated for biological entities only.</div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Cinematic Test Chamber */}
        <motion.div
          onClick={handleClick}
          layout
          className={`relative w-full aspect-21/9 md:aspect-3/1 rounded-[3rem] p-1 border transition-all duration-700 cursor-pointer overflow-hidden ${
            state === "waiting"
              ? "border-amber-500/20 bg-amber-500/5 shadow-[0_0_50px_-20px_rgba(245,158,11,0.2)]"
              : state === "ready"
              ? "border-green-500/40 bg-green-500/10 shadow-[0_0_100px_-20px_rgba(34,197,94,0.3)]"
              : state === "early"
              ? "border-rose-500/30 bg-rose-500/5"
              : "border-white/10 bg-white/5 hover:bg-white/8"
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
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
                    <Zap className="w-10 h-10 text-blue-400" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                    Initiate Sequence
                  </h2>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">
                    Click anywhere to sync neural pathways
                  </p>
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
                <h2 className="text-7xl md:text-8xl font-black text-amber-500 tracking-tighter italic">WAIT...</h2>
                <div className="mt-4 px-4 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-[10px] font-mono text-amber-500 uppercase tracking-widest">
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
                <h2 className="text-8xl md:text-[10rem] font-black text-green-400 tracking-tighter drop-shadow-[0_0_40px_rgba(74,222,128,0.5)]">
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
                <div className="w-20 h-20 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/40 rotate-45">
                  <Activity className="w-10 h-10 text-rose-500 -rotate-45" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-5xl font-black text-rose-500 tracking-tighter uppercase italic">False Trigger</h2>
                  <p className="text-xs font-mono text-rose-500/40 uppercase tracking-widest">
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
                className="h-full flex flex-col items-center justify-center px-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
                  <div className="text-center md:text-left">
                    <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-2">
                      Throughput Result
                    </div>
                    <div className="text-8xl md:text-9xl font-black tracking-tighter leading-none mb-4 tabular-nums">
                      {time}
                      <span className="text-2xl text-white/20">ms</span>
                    </div>
                    <button className="hidden md:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors group">
                      <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                      Rerun Protocol
                    </button>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Shield className="w-16 h-16" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                          Benchmark Sync
                        </span>
                      </div>
                      <div>
                        <div className="text-2xl font-black italic tracking-tight mb-1">{getBenchmark(time).label}</div>
                        <p className="text-xs text-white/50 leading-relaxed italic">"{getBenchmark(time).desc}"</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="md:hidden mt-8 w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl">
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- SUPPLEMENTARY DATA --- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Timeline Log */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Binary className="w-32 h-32 text-white" />
            </div>

            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <HistoryIcon className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em]">Sequence_History</h3>
              </div>
              <button
                onClick={clearHistory}
                className="text-[10px] font-mono text-white/20 hover:text-rose-500 transition-colors flex items-center gap-2 uppercase tracking-widest"
              >
                <Trash2 className="w-3.5 h-3.5" /> Purge Logs
              </button>
            </div>

            <div className="space-y-4">
              {history.length > 0 ? (
                history.map((entry, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={entry.id}
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#0a0a0a]/50 border border-white/5 group/entry hover:border-white/20 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-[9px] font-mono text-white/10 tracking-widest">
                        LOG.{history.length - idx}
                      </span>
                      <span className="text-2xl font-black tabular-nums tracking-tighter">
                        {entry.time}
                        <span className="text-xs text-white/20 ml-1 italic font-light">ms</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Ref_Time</span>
                        <span className="text-[10px] text-white/60 font-bold">{entry.date}</span>
                      </div>
                      <div
                        className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] ${
                          entry.time < 250 ? "bg-green-500 shadow-green-500/50" : "bg-blue-500 shadow-blue-500/50"
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
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-8 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em]">Synaptic_Profile</h3>
              </div>

              <div className="space-y-8">
                {[
                  { label: "Neural Throughput", value: `${averageTime}ms`, color: "text-blue-400" },
                  { label: "Biological Jitter", value: "±4.2ms", color: "text-amber-400" },
                  { label: "Signal Velocity", value: "82 m/s", color: "text-green-400" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end group/stat">
                    <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono group-hover/stat:text-white/50 transition-colors">
                      {stat.label}
                    </span>
                    <span className={`text-2xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 opacity-10">
                <Timer className="w-24 h-24" />
              </div>
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-blue-400">
                <Activities className="w-3.5 h-3.5" /> Researcher_Note
              </h4>
              <p className="text-xs text-white/60 leading-relaxed italic font-light">
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
