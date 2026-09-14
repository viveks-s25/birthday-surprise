import { useState, useEffect } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";

export default function WishScene({ goToNext }) {
  const [phase, setPhase] = useState("close"); // close -> 2 -> 1 -> wish -> done

  useEffect(() => {
    const timers = [];

    // "Close your eyes..." shows for 2.5s
    timers.push(setTimeout(() => setPhase("2"), 2500));
    // "2..." for 1.2s
    timers.push(setTimeout(() => setPhase("1"), 3700));
    // "1..." for 1.2s
    timers.push(setTimeout(() => setPhase("wish"), 4900));
    // "Make your wish" for 2s then transition
    timers.push(setTimeout(() => setPhase("done"), 6900));
    // Transition to next
    timers.push(setTimeout(() => goToNext(), 7800));

    return () => timers.forEach(clearTimeout);
  }, [goToNext]);

  return (
    <SceneWrapper>
      <FloatingHearts count={8} />
      <Sparkles count={10} />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full px-4">
        {/* Close your eyes */}
        {phase === "close" && (
          <div key="close" className="flex flex-col items-center gap-4 animate-bounce-in">
            <div className="text-6xl">🥺</div>
            <p className="heading-pink text-xl sm:text-2xl text-center">
              Close your eyes for 2 seconds... ❤️
            </p>
          </div>
        )}

        {/* 2 */}
        {phase === "2" && (
          <div key="two" className="flex flex-col items-center gap-4">
            <p className="text-8xl font-bold text-pink-400 animate-countdown-pulse" style={{ fontFamily: "var(--font-heading)" }}>
              2...
            </p>
          </div>
        )}

        {/* 1 */}
        {phase === "1" && (
          <div key="one" className="flex flex-col items-center gap-4">
            <p className="text-8xl font-bold text-pink-400 animate-countdown-pulse" style={{ fontFamily: "var(--font-heading)" }}>
              1...
            </p>
          </div>
        )}

        {/* Make your wish */}
        {phase === "wish" && (
          <div key="wish" className="flex flex-col items-center gap-4 animate-bounce-in">
            <div className="text-6xl">✨</div>
            <p className="heading-pink text-2xl sm:text-3xl text-center">
              Make your wish ✨
            </p>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
