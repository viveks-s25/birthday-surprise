import { useState, useEffect } from "react";
import { FINAL_GIFT_HEADING, FINAL_GIFT_MESSAGES } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import ConfettiBurst from "../components/ConfettiBurst";
import SceneWrapper from "../components/SceneWrapper";
import useSoundEffects from "../hooks/useSoundEffects";

function GiftBox() {
  return (
    <svg width="80" height="70" viewBox="0 0 80 70" className="drop-shadow-md">
      <rect x="8" y="28" width="64" height="38" rx="6" fill="#ff6b8a" />
      <rect x="8" y="28" width="64" height="10" rx="6" fill="#ff3d6e" />
      <rect x="35" y="28" width="10" height="38" fill="#ffc2d1" />
      <rect x="8" y="42" width="64" height="8" fill="#ffc2d1" />
      <rect x="4" y="20" width="72" height="12" rx="5" fill="#ff3d6e" />
      <ellipse cx="35" cy="18" rx="10" ry="8" fill="#ffc2d1" />
      <ellipse cx="45" cy="18" rx="10" ry="8" fill="#ffc2d1" />
      <circle cx="40" cy="20" r="4" fill="#ff6b8a" />
    </svg>
  );
}

function BearFemale() {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" className="drop-shadow-sm">
      <circle cx="18" cy="18" r="14" fill="#c9a0b0" />
      <circle cx="18" cy="18" r="8" fill="#fda4af" />
      <circle cx="62" cy="18" r="14" fill="#c9a0b0" />
      <circle cx="62" cy="18" r="8" fill="#fda4af" />
      <circle cx="40" cy="38" r="28" fill="#f5d0c5" />
      <ellipse cx="22" cy="42" rx="7" ry="4" fill="#fda4af" opacity="0.5" />
      <ellipse cx="58" cy="42" rx="7" ry="4" fill="#fda4af" opacity="0.5" />
      <circle cx="30" cy="35" r="3.5" fill="#5a3d5c" />
      <circle cx="50" cy="35" r="3.5" fill="#5a3d5c" />
      <circle cx="31.5" cy="33.5" r="1.2" fill="white" />
      <circle cx="51.5" cy="33.5" r="1.2" fill="white" />
      <ellipse cx="40" cy="42" rx="4" ry="3" fill="#c9a0b0" />
      <path d="M36,46 Q40,50 44,46" stroke="#c9a0b0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="58" cy="14" rx="7" ry="5" fill="#ff6b8a" transform="rotate(-20 58 14)" />
      <ellipse cx="66" cy="12" rx="7" ry="5" fill="#ff6b8a" transform="rotate(15 66 12)" />
      <circle cx="62" cy="13" r="3" fill="#ff3d6e" />
      <ellipse cx="40" cy="75" rx="22" ry="16" fill="#f5d0c5" />
      <text x="40" y="79" textAnchor="middle" fontSize="14" fill="#ff6b8a">♥</text>
    </svg>
  );
}

function BearMale() {
  return (
    <svg width="80" height="90" viewBox="0 0 80 90" className="drop-shadow-sm">
      <circle cx="18" cy="18" r="14" fill="#b08a95" />
      <circle cx="18" cy="18" r="8" fill="#d4a0b0" />
      <circle cx="62" cy="18" r="14" fill="#b08a95" />
      <circle cx="62" cy="18" r="8" fill="#d4a0b0" />
      <circle cx="40" cy="38" r="28" fill="#e8c8b8" />
      <ellipse cx="22" cy="42" rx="7" ry="4" fill="#fda4af" opacity="0.4" />
      <ellipse cx="58" cy="42" rx="7" ry="4" fill="#fda4af" opacity="0.4" />
      <circle cx="30" cy="35" r="3.5" fill="#5a3d5c" />
      <circle cx="50" cy="35" r="3.5" fill="#5a3d5c" />
      <circle cx="31.5" cy="33.5" r="1.2" fill="white" />
      <circle cx="51.5" cy="33.5" r="1.2" fill="white" />
      <ellipse cx="40" cy="42" rx="4" ry="3" fill="#b08a95" />
      <path d="M36,46 Q40,50 44,46" stroke="#b08a95" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="40" cy="75" rx="22" ry="16" fill="#e8c8b8" />
      <polygon points="34,66 40,70 46,66 40,74" fill="#ff6b8a" />
      <circle cx="40" cy="70" r="2.5" fill="#ff3d6e" />
    </svg>
  );
}

function MiniCake() {
  return (
    <svg width="60" height="55" viewBox="0 0 60 55" className="drop-shadow-sm">
      <rect x="5" y="30" width="50" height="20" rx="5" fill="#fda4af" />
      <rect x="5" y="30" width="50" height="6" rx="5" fill="#fb7185" />
      <rect x="15" y="15" width="30" height="18" rx="4" fill="#fecdd3" />
      <rect x="15" y="15" width="30" height="5" rx="4" fill="#fda4af" />
      <rect x="27" y="4" width="6" height="13" rx="2" fill="#ffc2d1" />
      <ellipse cx="30" cy="2" rx="4" ry="6" fill="#ffb347" />
      <ellipse cx="30" cy="1.5" rx="2.5" ry="4" fill="#ffe066" />
      <ellipse cx="30" cy="1" rx="1" ry="2" fill="#fff8dc" />
      <text x="15" y="42" fontSize="6" fill="#ff6b8a">♥</text>
      <text x="40" y="44" fontSize="5" fill="#fb7185">♥</text>
      <ellipse cx="30" cy="52" rx="28" ry="4" fill="#ffe0e6" />
    </svg>
  );
}

export default function FinalGiftScene({ restart }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const { play: playSfx } = useSoundEffects();

  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowConfetti(true);
      playSfx("celebration");
    }, 500);

    const timers = FINAL_GIFT_MESSAGES.map((_, i) =>
      setTimeout(() => setVisibleMsgs(i + 1), 1200 + i * 1000)
    );

    return () => {
      clearTimeout(t1);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <SceneWrapper scrollable>
      <FloatingHearts count={16} />
      <Sparkles count={12} />
      <ConfettiBurst active={showConfetti} />

      <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[min(92vw,700px)] mx-auto px-4 py-10">
        {/* Heading */}
        <h2 className="heading-pink text-xl sm:text-2xl text-center animate-bounce-in">
          {FINAL_GIFT_HEADING}
        </h2>

        {/* Bears + Cake + Gift illustration */}
        <div
          className="relative flex items-end justify-center gap-1 mt-2 animate-fade-in-up"
          style={{ opacity: 0, animationDelay: "0.3s" }}
        >
          <div className="animate-bounce-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
            <BearMale />
          </div>
          <div className="flex flex-col items-center mx-2">
            <div className="animate-bounce-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
              <MiniCake />
            </div>
            <div className="animate-bounce-in -mt-2" style={{ animationDelay: "0.9s", opacity: 0 }}>
              <GiftBox />
            </div>
          </div>
          <div className="animate-bounce-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <BearFemale />
          </div>
        </div>

        {/* Decorative hearts */}
        <div className="flex justify-center gap-3 -mt-2 text-lg">
          <span className="animate-heart-beat" style={{ animationDelay: "1s" }}>💗</span>
          <span className="animate-heart-beat" style={{ animationDelay: "1.2s" }}>💕</span>
          <span className="animate-heart-beat" style={{ animationDelay: "1.4s" }}>💗</span>
        </div>

        {/* Messages - content-aware sizing */}
        <div className="flex flex-col items-center gap-3 w-full mt-2">
          {FINAL_GIFT_MESSAGES.slice(0, visibleMsgs).map((msg, i) => (
            <div
              key={i}
              className="glass-card px-7 py-5 text-center animate-bounce-in"
              style={{
                width: "fit-content",
                maxWidth: "min(90vw, 600px)",
              }}
            >
              <p className="text-sm sm:text-base text-pink-500 font-bold leading-relaxed">{msg}</p>
            </div>
          ))}
        </div>

        {/* Birthday decorations + Replay */}
        {visibleMsgs >= FINAL_GIFT_MESSAGES.length && (
          <div className="flex flex-col items-center gap-4 mt-4 animate-bounce-in">
            <div className="flex gap-4 text-2xl">
              <span className="animate-wiggle">🎂</span>
              <span className="animate-wiggle" style={{ animationDelay: "0.2s" }}>🎈</span>
              <span className="animate-wiggle" style={{ animationDelay: "0.4s" }}>🎁</span>
              <span className="animate-wiggle" style={{ animationDelay: "0.6s" }}>🎀</span>
            </div>
            <button
              onClick={restart}
              className="btn-secondary mt-4 mb-8"
              style={{ position: "relative", zIndex: 30 }}
            >
              ↻ Replay From Beginning
            </button>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
