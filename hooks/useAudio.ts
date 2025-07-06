import { useEffect, useState } from "react";
import usePermissions from "./usePermissions";

const useAudio = () => {
  const permissions = usePermissions();
  const [moveAudio, setMoveAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (permissions.allowAudio) {
      (async () => {
        const bubbleAudioFile = await import("../app/(fifteen-puzzle)/assets/audio/bubble.mp3");
        const bubbleAudio = new Audio(bubbleAudioFile.default);
        setMoveAudio(bubbleAudio);
      })();
    }
  }, [permissions]);

  const playMoveAudio = () => {
    moveAudio?.play();
  };

  return {
    playMoveAudio,
  };
};

export default useAudio;
