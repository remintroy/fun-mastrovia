"use client";

// import useAudio from "@/hooks/useAudio";
import usePermissions from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";
import { VibrateIcon, Volume2Icon } from "lucide-react";
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

const solution = generateCleanMatrix();

export default function FifteenPuzzleHome() {
  const [matrix, setMatrix] = useState<number[][]>(solution);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);
  const matrixRef = useRef(matrix);
  // const permission = usePermissions();
  // const audio = useAudio();

  const handleTileMove = (x: number, y: number) => {
    const newMatrix = moveTile(matrixRef.current, x, y);
    if (newMatrix) {
      // audio.playMoveAudio();
      setMatrix(newMatrix);
      setMoves((moves) => ++moves);
      setCompleted(isCompleted(newMatrix, solution));
    }
  };

  const handleResetClick = () => {
    setMatrix(shuffleMatrix(solution));
    setMoves(0);
    setCompleted(false);
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
        <div className="border bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px] rounded-md">
          <div>
            <div className="text-gray-300 text-sm">Time</div>
            <div className="text-xl leading-5">10s</div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Moves</div>
            <div className="text-xl leading-5">{moves}</div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <div className="border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px] rounded-md select-none cursor-pointer">
            <VibrateIcon />
          </div>
          <div className="border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px] rounded-md select-none cursor-pointer">
            <Volume2Icon />
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
                    "w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] bg-[#fdffef] text-black flex items-center justify-center text-xl font-bold cursor-pointer",
                    matrix[rowIndex][colIndex] == -1 ? "cursor-default" : "cursor-pointer",
                    matrix[rowIndex][colIndex] == solution[rowIndex][colIndex] ? "bg-[#fdffef]" : "bg-[#fdffefce]",
                    item == -1 ? "bg-accent" : "",
                    "rounded-md select-none"
                  )}
                >
                  {item == -1 ? "" : item}
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
