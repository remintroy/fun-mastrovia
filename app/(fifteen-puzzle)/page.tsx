import { VibrateIcon, Volume2Icon } from "lucide-react";

export default function FifteenPuzzleHome() {
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
          <div className="border items-center justify-cente bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px]">
            <VibrateIcon />
          </div>
          <div className="border items-center justify-center bg-black/30 backdrop-blur-xs w-min h-full p-2 px-4 flex gap-[20px]">
            <Volume2Icon />
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] gap-[10px] p-[15px] sm:p-[25px] box-border border bg-black/30 backdrop-blur-xs grid grid-cols-4 ">
        {Array(15)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                key={i}
                className="w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] bg-[#fdffef] text-black flex items-center justify-center text-xl font-bold cursor-pointer"
              >
                {i + 1}
              </div>
            );
          })}
        <div className="w-[72px] sm:w-[105px] h-[72px] sm:h-[105px] bg-accent"></div>
      </div>
      <div className="w-[350px] sm:w-[500px] h-[60px] border bg-black/30 backdrop-blur-xs flex items-center justify-center">Restart</div>
      <div className="w-[350px] sm:w-[500px] h-[60px] flex items-center justify-center px-4">Move tiles in grid to order them from 1 to 15.</div>
    </div>
  );
}
