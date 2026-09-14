import { useRef, useCallback } from "react";
import { AUDIO } from "../config";

const audioCache = {};

function getAudio(src) {
  if (!src || src === "") return null;
  if (audioCache[src]) return audioCache[src];
  try {
    const audio = new Audio(src);
    audio.preload = "auto";
    audioCache[src] = audio;
    return audio;
  } catch {
    return null;
  }
}

export default function useSoundEffects() {
  const enabledRef = useRef(true);

  const play = useCallback((key) => {
    if (!enabledRef.current) return;
    const src = AUDIO[key];
    if (!src) return;
    const audio = getAudio(src);
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, []);

  const setEnabled = useCallback((val) => {
    enabledRef.current = val;
  }, []);

  return { play, setEnabled };
}
