"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Microscope,
  Zap,
  Database,
  Globe,
  Box,
  Layers,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Info,
} from "lucide-react";

// Data for our scales
const SCALES = [
  {
    id: "electron",
    name: "Electron",
    size: "0.000000000000001 m",
    rawSize: 1e-15,
    description: "The fundamental charge carrier. Without its flow, computation doesn't exist.",
    fact: "Electrons are so small that they behave both as particles and waves, a property used in quantum computing.",
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/20 to-blue-600/20",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    id: "silicon-atom",
    name: "Silicon Atom",
    size: "0.2 nm",
    rawSize: 2e-10,
    description: "The primary element of the semiconductor industry.",
    fact: "Silicon is the second most abundant element in Earth's crust by mass, after oxygen.",
    icon: <Layers className="w-8 h-8 text-cyan-400" />,
    color: "from-cyan-500/20 to-cyan-600/20",
    glow: "rgba(34, 211, 238, 0.5)",
  },
  {
    id: "transistor",
    name: "3nm Transistor",
    size: "3 nm",
    rawSize: 3e-9,
    description: "The smallest unit of logic. Modern chips pack billions of these.",
    fact: "A single human hair is about 20,000 times wider than a modern 3nm transistor gate.",
    icon: <Microscope className="w-8 h-8 text-indigo-400" />,
    color: "from-indigo-500/20 to-indigo-600/20",
    glow: "rgba(129, 140, 248, 0.5)",
  },
  {
    id: "logic-gate",
    name: "Logic Gate",
    size: "50 nm",
    rawSize: 5e-8,
    description: "A physical arrangement of transistors that performs Boolean logic (AND, OR, NOT).",
    fact: "Every complex software, from YouTube to AI, is ultimately just billions of these gates switching.",
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    color: "from-purple-500/20 to-purple-600/20",
    glow: "rgba(168, 85, 247, 0.5)",
  },
  {
    id: "cpu-core",
    name: "CPU Core",
    size: "2 mm",
    rawSize: 0.002,
    description: "An individual processing unit within a processor, capable of executing its own instructions.",
    fact: "Modern chips like the Apple M3 contain billions of transistors in a single core.",
    icon: <Cpu className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/20 to-emerald-600/20",
    glow: "rgba(52, 211, 153, 0.5)",
  },
  {
    id: "micro-chip",
    name: "The Microchip",
    size: "15 mm",
    rawSize: 0.015,
    description: "The full silicon die, containing cores, cache, and memory controllers.",
    fact: "The 'clean rooms' where these are made are 10,000 times cleaner than a hospital operating room.",
    icon: <Box className="w-8 h-8 text-amber-400" />,
    color: "from-amber-500/20 to-amber-600/20",
    glow: "rgba(251, 191, 36, 0.5)",
  },
  {
    id: "motherboard",
    name: "Motherboard",
    size: "30 cm",
    rawSize: 0.3,
    description: "The central nervous system of a computer, connecting all components.",
    fact: "Early computers used point-to-point wiring; modern motherboards use up to 12 layers of copper traces.",
    icon: <Layers className="w-8 h-8 text-orange-400" />,
    color: "from-orange-500/20 to-orange-600/20",
    glow: "rgba(251, 146, 60, 0.5)",
  },
  {
    id: "server-rack",
    name: "Server Rack",
    size: "2 m",
    rawSize: 2,
    description: "Stacked units of computing power, housing dozens of individual servers.",
    fact: "A single rack can consume as much power as a small residential home.",
    icon: <Database className="w-8 h-8 text-rose-400" />,
    color: "from-rose-500/20 to-rose-600/20",
    glow: "rgba(251, 113, 133, 0.5)",
  },
  {
    id: "data-center",
    name: "Data Center",
    size: "100 m",
    rawSize: 100,
    description: "Giant facilities housing thousands of server racks, the physical form of 'The Cloud'.",
    fact: "Hyperscale data centers can be the size of several football stadiums.",
    icon: <Database className="w-8 h-8 text-fuchsia-400" />,
    color: "from-fuchsia-500/20 to-fuchsia-600/20",
    glow: "rgba(232, 121, 249, 0.5)",
  },
  {
    id: "internet",
    name: "The Global Internet",
    size: "12,742 km",
    rawSize: 12742000,
    description: "The global network connecting billions of devices via fiber and satellite.",
    fact: "99% of international data is transmitted through cables on the ocean floor, not satellites.",
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    color: "from-blue-600/20 to-blue-700/20",
    glow: "rgba(37, 99, 235, 0.5)",
  },
];

export default function ScaleOfComputing() {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextScale = () => {
    if (index < SCALES.length - 1) setIndex(index + 1);
  };

  const prevScale = () => {
    if (index > 0) setIndex(index - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextScale();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevScale();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

  const current = SCALES[index];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-blue-500/30 font-sans">
      {/* Dynamic Background Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #333 1px, transparent 0)`,
          backgroundSize: `${Math.max(20, 100 - index * 8)}px ${Math.max(20, 100 - index * 8)}px`,
          transition: "background-size 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Progress Indicator */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 no-scrollbar">
        {SCALES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i === index ? "bg-blue-500 w-8" : i < index ? "bg-blue-500/40" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Main Experience */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side */}
          <div className="relative flex items-center justify-center h-[300px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-64 h-64 md:w-96 md:h-96"
              >
                {/* Visual Representation */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-linear-to-br ${current.color} border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-all duration-300`}
                  style={{ boxShadow: `0 0 80px -20px ${current.glow}` }}
                >
                  <div className="scale-[2.5] md:scale-[4]">{current.icon}</div>

                  {/* Decorative Elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full border border-white/5 bg-[radial-gradient(circle_at_center,var(--tw-gradient-from)_0%,transparent_70%)]" />
                  </div>
                </div>

                {/* Size Ring */}
                <svg className="absolute -inset-8 w-[calc(100%+64px)] h-[calc(100%+64px)] opacity-20 animate-[spin_20s_linear_infinite]">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="48%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-8">
            <motion.div layout className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20 tracking-wider">
                  SCALE {index + 1} OF {SCALES.length}
                </span>
                <span className="text-white/40 text-xs font-mono uppercase tracking-widest flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> Size: {current.size}
                </span>
              </div>

              <motion.h1
                key={`${current.id}-title`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-white/50"
              >
                {current.name}
              </motion.h1>

              <motion.p
                key={`${current.id}-desc`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg"
              >
                {current.description}
              </motion.p>
            </motion.div>

            <motion.div
              key={`${current.id}-fact`}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-start"
            >
              <div className="mt-1 p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Info className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-white/40 tracking-widest">Did you know?</span>
                <p className="text-sm text-white/70 italic leading-snug">"{current.fact}"</p>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-6 pt-4">
              <button
                onClick={prevScale}
                disabled={index === 0}
                className={`p-4 rounded-full border border-white/10 transition-all ${
                  index === 0 ? "opacity-20 cursor-not-allowed" : "hover:bg-white/10 hover:scale-110 active:scale-95"
                }`}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={nextScale}
                disabled={index === SCALES.length - 1}
                className={`flex-1 group flex items-center justify-center gap-2 p-4 rounded-2xl bg-white text-black font-bold transition-all ${
                  index === SCALES.length - 1
                    ? "opacity-20 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {index === SCALES.length - 1 ? "End of Journey" : "Zoom Out"}
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Context */}
      <div className="fixed bottom-8 left-0 right-0 px-8 flex justify-between items-end z-50 pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">
            Hardware Architecture Laboratory
          </div>
          <div className="w-32 h-px bg-linear-to-r from-white/20 to-transparent" />
        </div>

        <div className="text-right flex flex-col items-end gap-2">
          <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Press ↑ or ↓ to navigate</div>
          <div className="w-32 h-px bg-linear-to-l from-white/20 to-transparent" />
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
