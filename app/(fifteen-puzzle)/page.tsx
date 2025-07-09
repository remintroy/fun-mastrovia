"use client";

import usePermissions from "@/hooks/usePermissions";
import useSettingsStore from "@/lib/store/settingsStore";
import { cn } from "@/lib/utils";
import { VibrateIcon, VibrateOff, Volume2Icon, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
    ((Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) || (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x)) &&
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
  const permission = usePermissions();
  const setPermissions = useSettingsStore((state) => state.setPermissions);
  const [isVibrateSupported, setIsVibrateSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      setIsVibrateSupported(true);
    }
  }, []);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
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

    initAudio();
  }, []);

  const handleTileMove = (x: number, y: number) => {
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
    if (started && !completed) {
      timer = setInterval(() => {
        setTimeCounter((prev) => Number(prev) + 0.1);
      }, 100);

      return () => clearInterval(timer);
    }

    if (completed) clearInterval(timer);
  }, [started, completed]);

  const handleResetClick = () => {
    setMatrix(shuffleMatrix(solution));
    setMoves(0);
    setCompleted(false);
    setStarted(false);
    setTimeCounter(0);
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
    <div className="w-full h-full flex flex-col gap-[10px] items-center justify-center">
      <div className="w-[350px] sm:w-[500px] h-[60px] flex justify-between gap-[10px]">
        <div className="border bg-black/30 backdrop-blur-xs h-full p-2 px-4 flex gap-[20px] rounded-md w-min">
          <div className="min-w-[55px]">
            <div className="text-gray-300 text-sm">Time</div>
            <div className="text-xl leading-5 whitespace-nowrap">{formatTime(timeCounter)}</div>
          </div>
          <div className="">
            <div className="text-gray-300 text-sm">Moves</div>
            <div className="text-xl leading-5">{moves}</div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <div
            onClick={() => setPermissions("allowVibrate", !permission?.allowVibrate)}
            className={cn(
              "border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px] rounded-md select-none cursor-pointer",
              permission?.allowVibrate ? "text-white" : "text-red-200",
              isVibrateSupported ? "flex" : "hidden"
            )}
          >
            {permission?.allowVibrate ? <VibrateIcon /> : <VibrateOff />}
          </div>

          <div
            onClick={() => setPermissions("allowAudio", !permission?.allowAudio)}
            className={cn(
              "border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px] rounded-md select-none cursor-pointer",
              permission?.allowAudio ? "text-white" : "text-red-200"
            )}
          >
            {permission?.allowAudio ? <Volume2Icon /> : <VolumeOff />}
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] gap-[10px] p-[15px] sm:p-[25px] box-border border bg-black/30 backdrop-blur-xs grid grid-cols-4 rounded-md relative">
        {!completed &&
          matrix.map((row, rowIndex) => {
            return row?.map((item, colIndex) => {
              return (
                <div
                  key={item}
                  onClick={() => handleTileMove(rowIndex, colIndex)}
                  className={cn(
                    "relative group w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] text-black flex items-center justify-center text-xl font-bold rounded-sm select-none overflow-hidden",
                    matrix[rowIndex][colIndex] == -1 ? "cursor-default bg-accent" : "cursor-pointer bg-[#fdffef]",
                    matrix[rowIndex][colIndex] != -1 && matrix[rowIndex][colIndex] != solution[rowIndex][colIndex] && "bg-[#fdffefce]"
                    // item != -1 && "hover:scale-103 transition-transform duration-100"
                  )}
                >
                  {item != -1 && (
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  )}

                  <div className="relative z-10">{item == -1 ? "" : item}</div>
                </div>
              );
            });
          })}
        {completed && (
          <div className="absolute left-0 top-0 w-full h-full flex flex-col gap-1 items-center justify-center">
            <p className="text-lg">Nice Job! You nailed it</p>
            <p>
              You did it in <span className="font-bold">{moves}</span> moves
            </p>
          </div>
        )}
      </div>
      <div
        onClick={handleResetClick}
        className="w-[350px] sm:w-[500px] h-[60px] border bg-black/30 backdrop-blur-xs flex items-center justify-center rounded-md select-none cursor-pointer"
      >
        Restart
      </div>
      {/* <div className="w-[350px] sm:w-[500px] h-[60px] flex items-center justify-center px-4">Move tiles in grid to order them from 1 to 15.</div> */}
    </div>
  );
}
