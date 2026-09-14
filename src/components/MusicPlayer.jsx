import { useState, useRef, useEffect, useCallback } from "react";
import { AUDIO } from "../config";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!AUDIO.music) return;
    const audio = new Audio(AUDIO.music);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!started) {
      audio.play().then(() => {
        setPlaying(true);
        setStarted(true);
      }).catch(() => {});
      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing, started]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(14px)",
        border: "1.5px solid rgba(255,194,209,0.6)",
        boxShadow: "0 4px 20px rgba(255,107,138,0.2)",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
      }}
      aria-label={playing ? "Mute music" : "Play music"}
    >
      {playing ? "🔊" : "🔇"}
    </button>
  );
}
