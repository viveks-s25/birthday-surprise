import { useState, useCallback } from "react";
import { GIRLFRIEND_NAME } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";
import useSoundEffects from "../hooks/useSoundEffects";

export default function CakeScene({ goToNext }) {
  const [blown, setBlown] = useState(false);
  const [showWish, setShowWish] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [darkened, setDarkened] = useState(false);
  const { play: playSfx } = useSoundEffects();

  const handleBlow = useCallback(() => {
    if (blown) return;
    setBlown(true);
    playSfx("candleBlow");

    // Step 1-2: Smoke rises immediately
    // Step 3: Gradual darkening
    setTimeout(() => setDarkened(true), 600);
    // Step 4: Show wish message after darkening
    setTimeout(() => setShowWish(true), 1800);
    // Step 5: Show continue button
    setTimeout(() => setShowNext(true), 4000);
  }, [blown, playSfx]);

  return (
    <SceneWrapper>
      <FloatingHearts count={10} />
      <Sparkles count={8} />

      {/* Darkening overlay */}
      <div className={`darken-overlay ${darkened ? "dark" : ""}`} />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm px-4 py-10 pb-safe">
        {/* Title */}
        <h2 className="heading-pink text-2xl sm:text-3xl text-center animate-fade-in-up">
          One more little thing... 🎂❤️
        </h2>

        {/* Cake */}
        <div className="relative animate-bounce-in" style={{ marginTop: "8px" }}>
          <svg width="180" height="200" viewBox="0 0 180 200" className="drop-shadow-lg">
            {/* Cake base - bottom tier */}
            <rect x="25" y="130" width="130" height="45" rx="10" fill="#fda4af" />
            <rect x="25" y="130" width="130" height="12" rx="10" fill="#fb7185" />
            {/* Cake middle tier */}
            <rect x="40" y="90" width="100" height="45" rx="8" fill="#fecdd3" />
            <rect x="40" y="90" width="100" height="10" rx="8" fill="#fda4af" />
            {/* Cake top tier */}
            <rect x="55" y="55" width="70" height="40" rx="6" fill="#fff0f3" />
            <rect x="55" y="55" width="70" height="8" rx="6" fill="#ffc2d1" />
            {/* Frosting drips */}
            <ellipse cx="50" cy="92" rx="6" ry="5" fill="#fff0f3" />
            <ellipse cx="75" cy="90" rx="5" ry="6" fill="#fff0f3" />
            <ellipse cx="100" cy="91" rx="6" ry="5" fill="#fff0f3" />
            <ellipse cx="125" cy="92" rx="5" ry="6" fill="#fff0f3" />
            {/* Decorations */}
            <text x="60" y="115" fontSize="10" fill="#ff6b8a">♥</text>
            <text x="85" y="118" fontSize="8" fill="#fb7185">♥</text>
            <text x="105" y="114" fontSize="10" fill="#ff6b8a">♥</text>
            {/* Sprinkles */}
            <rect x="65" y="62" width="8" height="2" rx="1" fill="#fb7185" transform="rotate(-20 69 63)" />
            <rect x="85" y="60" width="8" height="2" rx="1" fill="#c4b5fd" transform="rotate(15 89 61)" />
            <rect x="100" y="63" width="8" height="2" rx="1" fill="#fda4af" transform="rotate(-10 104 64)" />
            <rect x="75" y="65" width="6" height="2" rx="1" fill="#ffc2d1" transform="rotate(25 78 66)" />
            {/* Candle stick */}
            <rect x="86" y="28" width="8" height="30" rx="2" fill="#ffc2d1" />
            <rect x="86" y="28" width="8" height="5" rx="2" fill="#fda4af" />
            <rect x="86" y="34" width="8" height="2" fill="#fb7185" opacity="0.5" />
            <rect x="86" y="40" width="8" height="2" fill="#fb7185" opacity="0.5" />
            <rect x="86" y="46" width="8" height="2" fill="#fb7185" opacity="0.5" />
            {/* Flame */}
            {!blown && (
              <g className="animate-flame-flicker animate-flame-glow" style={{ transformOrigin: "90px 22px" }}>
                <ellipse cx="90" cy="18" rx="7" ry="12" fill="#ffb347" />
                <ellipse cx="90" cy="17" rx="4" ry="8" fill="#ffe066" />
                <ellipse cx="90" cy="16" rx="2" ry="4" fill="#fff8dc" />
              </g>
            )}
            {/* Smoke particles after blow */}
            {blown && (
              <g>
                <circle cx="88" cy="22" r="3" fill="#d4a0b0" className="animate-smoke" style={{ animationDelay: "0s" }} />
                <circle cx="92" cy="20" r="2.5" fill="#c9a0b0" className="animate-smoke" style={{ animationDelay: "0.15s" }} />
                <circle cx="90" cy="24" r="2" fill="#d4a0b0" className="animate-smoke" style={{ animationDelay: "0.3s" }} />
                <circle cx="86" cy="21" r="2" fill="#c9a0b0" className="animate-smoke" style={{ animationDelay: "0.2s" }} />
                <circle cx="94" cy="23" r="1.5" fill="#d4a0b0" className="animate-smoke" style={{ animationDelay: "0.4s" }} />
              </g>
            )}
            {/* Plate */}
            <ellipse cx="90" cy="178" rx="80" ry="8" fill="#ffe0e6" />
            <ellipse cx="90" cy="176" rx="75" ry="6" fill="#fff0f3" />
          </svg>

          {/* Soft glow behind cake */}
          <div
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(253,164,175,0.3) 0%, transparent 70%)",
              transform: "scale(1.5)",
            }}
          />
        </div>

        {/* Blow button */}
        {!blown && (
          <button
            onClick={handleBlow}
            className="btn-primary animate-bounce-in"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            Tap to blow the candle 🕯️
          </button>
        )}

        {/* Wish message after candle blown */}
        {showWish && !showNext && (
          <div className="flex flex-col items-center gap-2 animate-bounce-in">
            <p className="text-xl sm:text-2xl text-pink-500 font-bold text-center" style={{ fontFamily: "var(--font-heading)" }}>
              ✨ Make a wish, {GIRLFRIEND_NAME}... ✨
            </p>
            <p className="text-sm text-pink-400 font-medium text-center animate-fade-in-up">
              Your wish deserves to come true. ❤️
            </p>
          </div>
        )}

        {/* Continue to next scene */}
        {showNext && (
          <div className="flex flex-col items-center gap-3 animate-bounce-in">
            <p className="text-base text-pink-400 font-semibold text-center">
              ✨ Your wish is beautiful 🌹
            </p>
            <button onClick={goToNext} className="btn-primary">
              Continue 💗
            </button>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
