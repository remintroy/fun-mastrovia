"use client";

import usePermissions from "@/hooks/usePermissions";
import useSettingsStore from "@/lib/store/settingsStore";
import { cn, event } from "@/lib/utils";
import { VibrateIcon, VibrateOff, Volume2Icon, VolumeOff, RotateCcw } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const generateCleanMatrix = (size = 4) => {
  const matrix: number[][] = [];
  let count = 1;

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      matrix[i][j] = i == size - 1 && j == size - 1 ? -1 : count++;
    }
  }

  return matrix;
};

const findEmptyTile = (matrix: number[][]) => {
  if (!matrix || !matrix.length) return null;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === -1) {
        return { x: i, y: j };
      }
    }
  }

  return null;
};

const isValidMove = (matrix: number[][], x: number, y: number) => {
  if (!matrix || !matrix.length) return false;

  const emptyTile = findEmptyTile(matrix);
  if (!emptyTile) return false;

  return (
    ((Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) ||
      (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x)) &&
    x >= 0 &&
    x <= matrix.length - 1 &&
    y >= 0 &&
    y <= matrix[0].length - 1
  );
};

const moveTile = (matrix: number[][], x: number, y: number) => {
  if (!matrix || !matrix.length || !isValidMove(matrix, x, y)) return;

  const emptyTile = findEmptyTile(matrix)!;
  const newMatrix = matrix.map((row) => [...row]);

  newMatrix[emptyTile.x][emptyTile.y] = matrix[x][y];
  newMatrix[x][y] = -1;

  return newMatrix;
};

const shuffleMatrix = (solution: number[][]): number[][] => {
  const size = solution.length;
  const matrix = JSON.parse(JSON.stringify(solution));
  let emptyPos = { x: size - 1, y: size - 1 };

  // Perform more moves for larger grids to ensure proper shuffling
  const moveCount = Math.max(200, 100 * size * size);

  for (let i = 0; i < moveCount; i++) {
    const possibleMoves = [];

    // Check all possible moves
    if (emptyPos.x > 0) possibleMoves.push({ x: emptyPos.x - 1, y: emptyPos.y }); // up
    if (emptyPos.x < size - 1) possibleMoves.push({ x: emptyPos.x + 1, y: emptyPos.y }); // down
    if (emptyPos.y > 0) possibleMoves.push({ x: emptyPos.x, y: emptyPos.y - 1 }); // left
    if (emptyPos.y < size - 1) possibleMoves.push({ x: emptyPos.x, y: emptyPos.y + 1 }); // right

    // Avoid moving back to the previous position
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    // Perform move
    matrix[emptyPos.x][emptyPos.y] = matrix[move.x][move.y];
    matrix[move.x][move.y] = -1;
    emptyPos = move;
  }

  return matrix;
};

const isCompleted = (matrix: number[][], solution: number[][]) => {
  for (let i = 0; i < solution?.length; i++) {
    for (let j = 0; j < solution?.length; j++) {
      if (matrix[i][j] != solution[i][j]) return false;
    }
  }
  return true;
};

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  if (mins < 1) {
    return `${secs}s`;
  } else {
    return `${mins}m ${secs}s`;
  }
}

const solution = generateCleanMatrix();
let timer: NodeJS.Timeout;

export default function FifteenPuzzleHome() {
  const [matrix, setMatrix] = useState<number[][]>(solution);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeCounter, setTimeCounter] = useState(0);
  const matrixRef = useRef(matrix);
  const isCompletedRef = useRef(completed);
  const permission = usePermissions();
  const setPermissions = useSettingsStore((state) => state.setPermissions);
  const [isVibrateSupported, setIsVibrateSupported] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      setIsVibrateSupported(true);
    }
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const initAudio = async () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any)?.webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
    }

    const res = await fetch("/fifteen-puzzle/audio/bubble.mp3");
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
    audioBufferRef.current = audioBuffer;
  };

  useEffect(() => {
    initAudio();
    setTheme("dark");
  }, []);

  const handleTileMove = (x: number, y: number) => {
    if (isCompletedRef.current) return;
    const newMatrix = moveTile(matrixRef.current, x, y);
    if (newMatrix) {
      setMatrix(newMatrix);
      setMoves((moves) => ++moves);
      setCompleted(isCompleted(newMatrix, solution));
      if (permission.allowAudio && audioContextRef.current && audioBufferRef.current) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0);
      }
      if (permission.allowVibrate && "vibrate" in navigator) navigator?.vibrate?.(5);
      if (!started) setStarted(true);
    } else {
      if (permission.allowVibrate && "vibrate" in navigator) navigator?.vibrate?.([10, 0, 10]);
    }
  };

  useEffect(() => {
    if (completed) isCompletedRef.current = true;
    else isCompletedRef.current = false;

    if (started && !completed) {
      timer = setInterval(() => setTimeCounter((prev) => Number(prev) + 1), 1000);
      event({ action: "game_start", category: "fifteen-puzzle", label: "Start" });
      return () => clearInterval(timer);
    }

    if (completed) {
      clearInterval(timer);
      event({ action: "game_end", category: "fifteen-puzzle", label: "End" });
    }
  }, [started, completed]);

  const handleResetClick = () => {
    setMatrix(shuffleMatrix(solution));
    setMoves(0);
    setCompleted(false);
    setStarted(false);
    setTimeCounter(0);
    event({ action: "game_restart", category: "fifteen-puzzle", label: "Restart" });
  };

  const handleArrowButtonClick = (direction: "up" | "down" | "left" | "right") => {
    const emptyTile = findEmptyTile(matrixRef.current);
    if (!emptyTile) return;

    let { x, y } = { ...emptyTile };

    if (direction === "up") {
      x -= 1;
    } else if (direction === "down") {
      x += 1;
    } else if (direction === "left") {
      y -= 1;
    } else if (direction === "right") {
      y += 1;
    }

    handleTileMove(x, y);
  };

  useEffect(() => {
    setMatrix(shuffleMatrix(solution));
    window.addEventListener("keydown", (e) => {
      if (e.key === "r" || e.key === "R") handleResetClick();
      if (e.key === "ArrowUp") handleArrowButtonClick("up");
      if (e.key === "ArrowDown") handleArrowButtonClick("down");
      if (e.key === "ArrowLeft") handleArrowButtonClick("left");
      if (e.key === "ArrowRight") handleArrowButtonClick("right");
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  useEffect(() => {
    matrixRef.current = matrix;
  }, [matrix]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Universal Game Toolbar */}
      <div className="w-full border-b border-border/40 bg-background/50 backdrop-blur-md">
        <div className="max-w-lg mx-auto h-14 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center">
            <div className="flex flex-col justify-center min-w-[70px]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold leading-none mb-1">
                Time
              </span>
              <span className="text-xl font-mono leading-none tracking-tighter tabular-nums text-foreground/90">
                {formatTime(timeCounter)}
              </span>
            </div>
            <div className="w-px h-6 bg-border/20" />
            <div className="flex flex-col justify-center min-w-[60px]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-bold leading-none mb-1">
                Moves
              </span>
              <span className="text-xl font-mono leading-none tracking-tighter tabular-nums text-foreground/90">
                {moves}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={0}>
              {isVibrateSupported && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPermissions("allowVibrate", !permission?.allowVibrate)}
                      className={cn(
                        "w-10 h-10 transition-all",
                        permission?.allowVibrate ? "text-foreground bg-accent/10" : "text-muted-foreground/40"
                      )}
                    >
                      {permission?.allowVibrate ? (
                        <VibrateIcon className="size-5" />
                      ) : (
                        <VibrateOff className="size-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-[10px] uppercase font-bold tracking-widest">
                    Vibration: {permission?.allowVibrate ? "On" : "Off"}
                  </TooltipContent>
                </Tooltip>
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPermissions("allowAudio", !permission?.allowAudio)}
                    className={cn(
                      "w-10 h-10 transition-all",
                      permission?.allowAudio ? "text-foreground bg-accent/10" : "text-muted-foreground/40"
                    )}
                  >
                    {permission?.allowAudio ? <Volume2Icon className="size-5" /> : <VolumeOff className="size-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-[10px] uppercase font-bold tracking-widest">
                  Audio: {permission?.allowAudio ? "On" : "Off"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-4 gap-8 overflow-y-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <Card className="relative w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] p-4 sm:p-6 bg-card/40 backdrop-blur-md border-border/50 rounded-xl overflow-hidden shadow-2xl">
            <CardContent className="p-0 h-full">
              {!completed ? (
                <div className="grid grid-cols-4 gap-2 sm:gap-4 h-full">
                  {matrix.map((row, rowIndex) =>
                    row?.map((item, colIndex) => {
                      const isCorrect = item !== -1 && item === solution[rowIndex][colIndex];
                      return (
                        <button
                          key={`${rowIndex}-${colIndex}-${item}`}
                          onClick={() => handleTileMove(rowIndex, colIndex)}
                          className={cn(
                            "relative group h-full w-full flex items-center justify-center text-3xl font-black rounded-sm transition-all duration-200 select-none overflow-hidden border-2",
                            item === -1
                              ? "bg-transparent cursor-default border-transparent"
                              : isCorrect
                              ? "bg-card text-primary shadow-inner border-primary/50"
                              : "bg-white text-black active:scale-95 hover:bg-white/95 shadow-2xl border-transparent opacity-90"
                          )}
                        >
                          {item !== -1 && (
                            <>
                              <div
                                className={cn(
                                  "absolute top-1 left-1.5 text-[12px] font-mono font-light transition-all duration-300",
                                  isCorrect ? "opacity-100 text-primary/50" : "opacity-50"
                                )}
                              >
                                0x{item.toString(16).toUpperCase().padStart(2, "0")}
                              </div>
                              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                              <span className="relative z-10">{item}</span>
                            </>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
                  <Badge
                    variant="outline"
                    className="mb-6 bg-foreground text-background border-none px-6 py-1 text-sm font-bold uppercase tracking-[0.2em]"
                  >
                    Success
                  </Badge>
                  <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase text-foreground">System Solved</h2>
                  <p className="text-muted-foreground text-base italic max-w-[280px] leading-relaxed">
                    Sequence verified. Efficiency reached in <span className="text-foreground font-bold">{moves}</span>{" "}
                    circles.
                  </p>
                  <Button
                    onClick={handleResetClick}
                    className="mt-10 px-12 text-base font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95 shadow-xl"
                  >
                    Restart Sequence
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Button
          onClick={handleResetClick}
          variant="secondary"
          className="w-full max-w-[350px] sm:max-w-[500px] h-14 backdrop-blur-md border border-border/50 bg-secondary/50 hover:bg-secondary/80 text-muted-foreground hover:text-foreground text-sm font-bold uppercase tracking-[0.2em] transition-all group"
        >
          <RotateCcw className="w-5 h-5 mr-3 group-hover:-rotate-90 transition-transform duration-500" />
          Force Restart (R)
        </Button>
      </div>
    </div>
  );
}
