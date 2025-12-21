"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  RotateCw,
  MousePointer2,
  Brain,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash,
  MoveRight,
} from "lucide-react";

type Level = {
  id: number;
  title: string;
  instruction: string;
  type: "checkbox" | "grid" | "logic" | "speed";
};

const LEVELS: Level[] = [
  {
    id: 1,
    title: "Basic Integrity",
    instruction: "Prove you exist by checking the box.",
    type: "checkbox",
  },
  {
    id: 2,
    title: "Visual Association",
    instruction: "Select all squares containing 'EXISTENTIAL DREAD'.",
    type: "grid",
  },
  {
    id: 3,
    title: "Human Logic",
    instruction: "Which of these is most likely to be a memory?",
    type: "logic",
  },
  {
    id: 4,
    title: "Biological Drift",
    instruction: "Click the target three times as it vibrates.",
    type: "speed",
  },
];

export default function CaptchaGauntlet() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [items, setItems] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  const level = LEVELS[levelIdx];

  useEffect(() => {
    if (level.type === "grid") {
      const newItems = Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        texture: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, #111 0%, #000 70%)`,
      }));
      setItems(newItems);
    }
  }, [levelIdx, level.type]);

  const nextLevel = () => {
    if (levelIdx < LEVELS.length - 1) {
      setLevelIdx(levelIdx + 1);
      setStatus("idle");
      setSelected([]);
      setProgress(((levelIdx + 1) / LEVELS.length) * 100);
    } else {
      setStatus("success");
    }
  };

  const handleCheckbox = () => {
    setStatus("processing");
    setTimeout(() => {
      nextLevel();
    }, 1500);
  };

  const handleGridClick = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const verifyGrid = () => {
    setStatus("processing");
    setTimeout(() => {
      if (selected.length > 2) nextLevel();
      else setStatus("failed");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 md:p-12 font-sans selection:bg-primary/20">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,hsl(var(--muted)),transparent)] opacity-20" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      {/* Lab Header */}
      <div className="fixed top-12 left-0 right-0 px-12 flex justify-between items-center z-50">
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-mono text-primary uppercase tracking-[0.5em]">Project_Gauntlet</div>
          <div className="text-xl font-black tracking-tighter italic">HUMAN_VALIDATION</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary shadow-[0_0_10px_--theme(--color-primary/50%)]"
              animate={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            Stage {levelIdx + 1}/{LEVELS.length}
          </span>
        </div>
      </div>

      {/* Main Validation Card */}
      <motion.div
        layout
        className="relative z-10 w-full max-w-md bg-card border border-border rounded-4xl p-10 shadow-2xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {status === "processing" ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 gap-8"
            >
              <div className="relative">
                <div className="w-16 h-16 border-2 border-primary/20 rounded-full" />
                <motion.div
                  className="absolute inset-0 border-t-2 border-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-sm font-black uppercase tracking-[0.3em] text-primary">Analyzing Biometrics</div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Packet trace in progress...
                </div>
              </div>
            </motion.div>
          ) : status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 gap-8"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-2xl font-black uppercase tracking-tighter">Identity Verified</div>
                <div className="text-sm text-muted-foreground italic">You are definitively human. For now.</div>
              </div>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-8 py-3 bg-foreground text-background font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform"
              >
                Return to Lab
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-primary/10 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {level.title}
                  </p>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">{level.instruction}</h2>
              </div>

              {/* Level Logic */}
              <div className="bg-background/40 rounded-2xl border border-border/50 p-6 md:p-8 min-h-[280px] flex items-center justify-center">
                {level.type === "checkbox" && (
                  <div className="group relative flex items-center gap-4 cursor-pointer">
                    <motion.div
                      onClick={handleCheckbox}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-14 h-14 border border-border rounded-2xl flex items-center justify-center bg-accent/10 hover:bg-accent/20 transition-colors"
                    >
                      <div className="w-4 h-4 border border-foreground/40 rounded-sm" />
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold uppercase tracking-widest">I am not a robot</span>
                      <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest underline decoration-border">
                        Read Privary Policy
                      </span>
                    </div>
                  </div>
                )}

                {level.type === "grid" && (
                  <div className="grid grid-cols-3 gap-2 w-full max-w-[240px]">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        onClick={() => handleGridClick(item.id)}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square relative rounded-lg cursor-pointer overflow-hidden border transition-colors ${
                          selected.includes(item.id) ? "border-primary ring-2 ring-primary/20" : "border-border/50"
                        }`}
                        style={{ background: item.texture }}
                      >
                        {selected.includes(item.id) && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                            <CheckCircle2 className="w-6 h-6 text-foreground" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {level.type === "logic" && (
                  <div className="w-full space-y-3">
                    {[
                      "The smell of rain on hot asphalt.",
                      "Battery level: 47%.",
                      "A recursive function with no exit condition.",
                    ].map((choice, i) => (
                      <button
                        key={i}
                        onClick={nextLevel}
                        className="w-full p-4 rounded-xl border border-border/40 bg-accent/5 hover:bg-accent/10 hover:border-border transition-all text-left text-sm font-medium flex justify-between items-center group"
                      >
                        {choice}
                        <MoveRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                )}

                {level.type === "speed" && (
                  <motion.div
                    onClick={nextLevel}
                    animate={{
                      x: [0, 5, -5, 5, 0],
                      y: [0, -3, 3, -3, 0],
                    }}
                    transition={{ duration: 0.1, repeat: Infinity }}
                    className="w-24 h-24 bg-foreground rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_30px_--theme(--color-foreground/20%)] active:scale-95 transition-all"
                  >
                    <div className="w-16 h-16 border-2 border-background rounded-full" />
                  </motion.div>
                )}
              </div>

              {/* Footer Controls */}
              <div className="flex items-center justify-between pt-4">
                <button className="p-3 text-muted-foreground hover:text-foreground transition-colors">
                  <RotateCw className="w-5 h-5" />
                </button>
                {level.type === "grid" && (
                  <button
                    onClick={verifyGrid}
                    disabled={selected.length === 0}
                    className="px-8 py-3 bg-foreground text-background font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100"
                  >
                    Verify Sequence
                  </button>
                )}
                <div className="flex gap-4">
                  <HelpCircle className="w-4 h-4 text-muted-foreground/30" />
                  <Hash className="w-4 h-4 text-muted-foreground/30" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Lab Context */}
      <div className="fixed bottom-12 left-12 max-w-xs pointer-events-none opacity-20">
        <p className="text-[9px] font-mono leading-relaxed uppercase tracking-widest text-muted-foreground">
          Laboratory Note: Modern automated systems have reached 99.9% human mimicry. These tests measure the 0.1%
          irrationality factor that defines biological consciousness.
        </p>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .bg-grid {
          background-size: 20px 20px;
          background-image: linear-gradient(to right, #111 1px, transparent 1px),
            linear-gradient(to bottom, #111 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}
