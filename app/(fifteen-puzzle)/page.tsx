"use client";

// import useAudio from "@/hooks/useAudio";
import usePermissions from "@/hooks/usePermissions";
import { cn } from "@/lib/utils";
import { VibrateIcon, Volume2Icon } from "lucide-react";
import { useState } from "react";

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

  return (Math.abs(x - emptyTile.x) === 1 && y === emptyTile.y) || (Math.abs(y - emptyTile.y) === 1 && x === emptyTile.x);
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

const solution = generateCleanMatrix();

export default function FifteenPuzzleHome() {
  const [matrix, setMatrix] = useState<number[][]>(shuffleMatrix(solution));
  const permission = usePermissions();
  // const audio = useAudio();

  const handleTileClick = (x: number, y: number) => {
    const newMatrix = moveTile(matrix, x, y);
    if (newMatrix) {
      // audio.playMoveAudio();
      setMatrix(newMatrix);
    }
  };

  const handleResetClick = () => {
    setMatrix(shuffleMatrix(solution));
  };

  return (
    <div className="w-full h-full flex flex-col gap-[10px] items-center justify-center">
      <div className="w-[350px] sm:w-[500px] h-[60px] flex justify-between gap-[10px]">
        <div className="border bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px]">
          <div>
            <div className="text-gray-300 text-sm">Time</div>
            <div className="text-xl leading-5">10s</div>
          </div>
          <div>
            <div className="text-gray-300 text-sm">Moves</div>
            <div className="text-xl leading-5">10</div>
          </div>
        </div>
        <div className="flex gap-[10px]">
          <div className="border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px]">
            <VibrateIcon />
          </div>
          <div className="border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px]">
            <Volume2Icon />
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] gap-[10px] p-[15px] sm:p-[25px] box-border border bg-black/30 backdrop-blur-xs grid grid-cols-4 ">
        {matrix.map((row, rowIndex) => {
          return row?.map((item, colIndex) => {
            return (
              <div
                key={item}
                onClick={() => handleTileClick(rowIndex, colIndex)}
                className={cn(
                  "w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] bg-[#fdffef] text-black flex items-center justify-center text-xl font-bold cursor-pointer",
                  item == -1 ? "bg-accent" : ""
                )}
              >
                {item == -1 ? "" : item}
              </div>
            );
          });
        })}
        {/* <div className="w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] bg-accent"></div> */}
      </div>
      <div
        onClick={handleResetClick}
        className="w-[350px] sm:w-[500px] h-[60px] border bg-black/30 backdrop-blur-xs flex items-center justify-center"
      >
        Restart
      </div>
      {/* <div className="w-[350px] sm:w-[500px] h-[60px] flex items-center justify-center px-4">Move tiles in grid to order them from 1 to 15.</div> */}
    </div>
  );
}
