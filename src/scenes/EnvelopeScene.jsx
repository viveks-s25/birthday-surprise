import { useState, useCallback } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";
import useSoundEffects from "../hooks/useSoundEffects";

export default function EnvelopeScene({ goToNext }) {
  const [phase, setPhase] = useState("sealed"); // sealed -> opening -> letter -> transition
  const [tapped, setTapped] = useState(false);
  const { play: playSfx } = useSoundEffects();

  const handleTap = useCallback(() => {
    if (phase !== "sealed") return;
    setTapped(true);
    setPhase("opening");
    playSfx("envelopeOpen");

    // Flap opens, then letter slides up
    setTimeout(() => setPhase("letter"), 1000);
    // Show continue after letter is visible
    setTimeout(() => setPhase("transition"), 2200);
  }, [phase, playSfx]);

  return (
    <SceneWrapper>
      <FloatingHearts count={10} />
      <Sparkles count={8} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 w-full max-w-sm px-6 py-8 min-h-0 flex-1 pb-safe">
        {/* Envelope Container - centered */}
        <div
          className="relative cursor-pointer select-none flex flex-col items-center"
          onClick={handleTap}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleTap();
          }}
          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        >
          <svg
            width="220"
            height="170"
            viewBox="0 0 220 170"
            className={`drop-shadow-lg ${
              phase === "sealed"
                ? "animate-envelope-float"
                : tapped
                ? "animate-envelope-tap"
                : ""
            }`}
          >
            {/* Envelope body */}
            <rect x="10" y="50" width="200" height="110" rx="8" fill="#fff5f7" stroke="#ffc2d1" strokeWidth="2" />
            <rect x="10" y="50" width="200" height="110" rx="8" fill="url(#envTexture)" opacity="0.3" />

            {/* Envelope back flap (triangle) */}
            <polygon
              points="10,50 110,0 210,50"
              fill="#ffe0e6"
              stroke="#ffc2d1"
              strokeWidth="2"
              className={
                phase === "opening" || phase === "letter" || phase === "transition"
                  ? "animate-flap-open"
                  : ""
              }
              style={{ transformOrigin: "110px 50px" }}
            />

            {/* Inner flap shadow */}
            <polygon
              points="30,50 110,15 190,50"
              fill="#ffc2d1"
              opacity="0.3"
              className={
                phase === "opening" || phase === "letter" || phase === "transition"
                  ? "animate-flap-open"
                  : ""
              }
              style={{ transformOrigin: "110px 50px" }}
            />

            {/* Bottom decorative folds */}
            <polygon points="10,160 110,100 210,160" fill="#ffe0e6" opacity="0.4" />
            <polygon points="40,160 110,110 180,160" fill="#fff0f3" opacity="0.3" />

            {/* Heart seal - only visible when sealed */}
            {phase === "sealed" && (
              <g
                className={tapped ? "animate-seal-break" : ""}
                style={{ transformOrigin: "110px 45px" }}
              >
                <circle cx="110" cy="45" r="18" fill="#ff6b8a" />
                <text x="110" y="52" textAnchor="middle" fontSize="22" fill="white">♥</text>
              </g>
            )}

            {/* Small hearts on envelope */}
            <text x="30" y="85" fontSize="10" fill="#fda4af" opacity="0.6">♥</text>
            <text x="180" y="95" fontSize="8" fill="#fb7185" opacity="0.5">♥</text>
            <text x="60" y="140" fontSize="9" fill="#fda4af" opacity="0.4">♥</text>
            <text x="155" y="135" fontSize="10" fill="#ffc2d1" opacity="0.5">♥</text>

            <defs>
              <linearGradient id="envTexture" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                <stop offset="50%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Letter peeking out */}
          {(phase === "letter" || phase === "transition") && (
            <div
              className="absolute left-1/2 -translate-x-1/2 animate-letter-slide-up"
              style={{ top: "-30px" }}
            >
              <div
                className="w-40 h-24 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, #fffdf7, #fff5f0)",
                  boxShadow: "0 4px 20px rgba(255,107,138,0.2)",
                  border: "1px solid #ffe0e6",
                }}
              >
                <div className="p-3 flex flex-col gap-1.5">
                  <div className="h-1.5 w-16 bg-pink-200 rounded-full opacity-60" />
                  <div className="h-1.5 w-20 bg-pink-200 rounded-full opacity-40" />
                  <div className="h-1.5 w-12 bg-pink-200 rounded-full opacity-30" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Title above envelope - shown when sealed */}
        {phase === "sealed" && (
          <h2 className="heading-pink text-2xl sm:text-3xl text-center animate-fade-in-up">
            💌 A Message From My Heart
          </h2>
        )}

        {/* Tap instruction when sealed */}
        {phase === "sealed" && (
          <p
            className="text-base text-pink-400 font-bold animate-pulse text-center"
            style={{
              opacity: 0,
              animation: "fade-in-up 0.6s ease-out 0.5s forwards, pulse 2s ease-in-out 1.1s infinite",
            }}
          >
            Tap to open ❤️
          </p>
        )}

        {/* Letter revealed message */}
        {(phase === "letter" || phase === "transition") && (
          <>
            <h2 className="heading-pink text-2xl sm:text-3xl text-center animate-fade-in-up">
              💌 A Message From My Heart
            </h2>
            <p className="text-sm text-pink-400 font-semibold text-center animate-bounce-in">
              A letter just for you... 💌
            </p>
          </>
        )}

        {/* Continue to love letter */}
        {phase === "transition" && (
          <button
            onClick={goToNext}
            className="btn-primary animate-bounce-in mt-2"
          >
            Read It 💌
          </button>
        )}
      </div>
    </SceneWrapper>
  );
}
