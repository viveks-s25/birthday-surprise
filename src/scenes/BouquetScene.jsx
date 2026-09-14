import { useState, useEffect, useCallback, useRef } from "react";
import { ROMANTIC_MESSAGES } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";

function RosePetal({ style }) {
  return (
    <div
      className="absolute pointer-events-none animate-petal-fall"
      style={{
        left: `${style.left}%`,
        top: "-20px",
        fontSize: `${style.size}px`,
        animationDuration: `${style.duration}s`,
        animationDelay: `${style.delay}s`,
        "--drift": `${style.drift}px`,
        opacity: 0,
      }}
    >
      {style.emoji}
    </div>
  );
}

const PETAL_EMOJIS = ["🌹", "🌸", "🌺", "💮", "🩷", "❤️"];

function generatePetals(count = 14) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 95 + 2,
    size: Math.random() * 12 + 14,
    duration: Math.random() * 5 + 5,
    delay: Math.random() * 6,
    drift: (Math.random() - 0.5) * 100,
    emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)],
  }));
}

export default function BouquetScene({ goToNext }) {
  const [visibleCards, setVisibleCards] = useState(0);
  const [showContinue, setShowContinue] = useState(false);
  const [petals] = useState(() => generatePetals());
  const timerRef = useRef(null);
  const indexRef = useRef(0);

  const showNextCard = useCallback(() => {
    indexRef.current += 1;
    if (indexRef.current <= ROMANTIC_MESSAGES.length) {
      setVisibleCards(indexRef.current);
      timerRef.current = setTimeout(showNextCard, 1200);
    } else {
      setTimeout(() => setShowContinue(true), 600);
    }
  }, []);

  useEffect(() => {
    const startTimer = setTimeout(showNextCard, 1000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timerRef.current);
    };
  }, [showNextCard]);

  return (
    <SceneWrapper>
      <FloatingHearts count={8} />
      <Sparkles count={10} />

      {/* Falling petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {petals.map((p) => (
          <RosePetal key={p.id} style={p} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-md px-4 py-10 pb-safe">
        {/* Title */}
        <h2 className="heading-pink text-2xl sm:text-3xl text-center animate-fade-in-up mb-1">
          These are for you, my love 🌹
        </h2>

        {/* Bouquet */}
        <div
          className="animate-bouquet-in animate-bouquet-float relative"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <svg width="160" height="180" viewBox="0 0 160 180" className="drop-shadow-lg">
            <path d="M50,95 L80,170 L110,95" fill="#ffe0e6" stroke="#fda4af" strokeWidth="2" />
            <path d="M55,100 L80,165 L60,100" fill="#fff0f3" opacity="0.6" />
            <path d="M105,100 L80,165 L100,100" fill="#ffc2d1" opacity="0.4" />
            <ellipse cx="80" cy="98" rx="18" ry="6" fill="#ff6b8a" />
            <path d="M65,98 Q55,110 50,120 M95,98 Q105,110 110,120" stroke="#ff6b8a" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="80" cy="70" r="18" fill="#fb7185" />
            <circle cx="80" cy="70" r="13" fill="#ff6b8a" />
            <circle cx="80" cy="70" r="8" fill="#fda4af" />
            <circle cx="80" cy="70" r="4" fill="#fff0f3" />
            <circle cx="58" cy="78" r="15" fill="#f43f5e" />
            <circle cx="58" cy="78" r="10" fill="#fb7185" />
            <circle cx="58" cy="78" r="6" fill="#fda4af" />
            <circle cx="102" cy="78" r="15" fill="#f43f5e" />
            <circle cx="102" cy="78" r="10" fill="#fb7185" />
            <circle cx="102" cy="78" r="6" fill="#fda4af" />
            <circle cx="65" cy="55" r="14" fill="#ff6b8a" />
            <circle cx="65" cy="55" r="9" fill="#fda4af" />
            <circle cx="65" cy="55" r="5" fill="#fff0f3" />
            <circle cx="95" cy="55" r="14" fill="#ff6b8a" />
            <circle cx="95" cy="55" r="9" fill="#fda4af" />
            <circle cx="95" cy="55" r="5" fill="#fff0f3" />
            <circle cx="80" cy="48" r="13" fill="#fb7185" />
            <circle cx="80" cy="48" r="8" fill="#fda4af" />
            <circle cx="80" cy="48" r="4" fill="#fff0f3" />
            <ellipse cx="45" cy="85" rx="8" ry="4" fill="#86efac" transform="rotate(-30 45 85)" />
            <ellipse cx="115" cy="85" rx="8" ry="4" fill="#86efac" transform="rotate(30 115 85)" />
            <ellipse cx="55" cy="60" rx="7" ry="3" fill="#86efac" transform="rotate(-45 55 60)" />
            <ellipse cx="105" cy="60" rx="7" ry="3" fill="#86efac" transform="rotate(45 105 60)" />
          </svg>
        </div>

        {/* Message Cards - 2 per row grid */}
        <div className="w-full mt-2">
          <div className="grid grid-cols-2 gap-3">
            {ROMANTIC_MESSAGES.slice(0, visibleCards).map((msg, i) => (
              <div
                key={i}
                className={`message-card animate-msg-pop text-center ${
                  visibleCards % 2 === 1 && i === visibleCards - 1 ? "col-span-2 max-w-[49%] justify-self-center" : ""
                }`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  animationFillMode: "forwards",
                }}
              >
                <p className="text-sm sm:text-base text-pink-500 font-bold leading-relaxed">
                  {msg}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue */}
        {showContinue && (
          <div className="flex flex-col items-center gap-3 mt-4 animate-bounce-in">
            <button onClick={goToNext} className="btn-primary">
              Continue 💗
            </button>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
