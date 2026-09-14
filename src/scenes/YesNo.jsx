import { useState, useRef, useCallback } from "react";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import ConfettiBurst from "../components/ConfettiBurst";
import SceneWrapper from "../components/SceneWrapper";

const PLAYFUL_MESSAGES = [
  "Nice try 😝",
  "Nopeee 😂",
  "You can't escape ❤️",
  "Try YES instead 🥰",
  "Haha nice one 🙈",
  "So sneaky 😜",
  "Nop nope nope 💗",
  "Almost got it 🤭",
];

export default function YesNo({ goToNext }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [noPos, setNoPos] = useState(null);
  const [message, setMessage] = useState("");
  const [tapCount, setTapCount] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const containerRef = useRef(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const getRandomPosition = useCallback(() => {
    if (!containerRef.current) return { x: 100, y: 100 };
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 20;
    const btnW = 150;
    const btnH = 56;

    const maxX = Math.max(rect.width - btnW - padding, padding);
    const maxY = Math.max(rect.height - btnH - padding, padding);

    let x, y;
    let attempts = 0;
    do {
      x = padding + Math.random() * (maxX - padding);
      y = padding + Math.random() * (maxY - padding);
      attempts++;
    } while (
      attempts < 50 &&
      Math.abs(x - lastPosRef.current.x) < 90 &&
      Math.abs(y - lastPosRef.current.y) < 60
    );

    return { x, y };
  }, []);

  const moveNoButton = useCallback(() => {
    const pos = getRandomPosition();
    setNoPos(pos);
    lastPosRef.current = pos;
    setHasMoved(true);

    const msg =
      PLAYFUL_MESSAGES[Math.floor(Math.random() * PLAYFUL_MESSAGES.length)];
    setMessage(msg);
    setTapCount((c) => c + 1);

    setTimeout(() => setMessage(""), 1500);
  }, [getRandomPosition]);

  const handleNoClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveNoButton();
    },
    [moveNoButton]
  );

  const handleYes = useCallback(() => {
    setShowConfetti(true);
    setTransitioning(true);
    setTimeout(() => goToNext(), 1500);
  }, [goToNext]);

  return (
    <SceneWrapper>
      <FloatingHearts count={8} />
      <Sparkles count={6} />
      <ConfettiBurst active={showConfetti} />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-4 py-10 animate-fade-in-up">
        {/* Question */}
        <div className="text-5xl mb-2 animate-bounce-in">🎂</div>

        <h2 className="heading-pink text-2xl sm:text-3xl text-center">
          Are you ready for your birthday surprise? 🥺❤️
        </h2>

        {/* Buttons Container */}
        <div
          ref={containerRef}
          className="relative w-full mt-4"
          style={{ minHeight: "220px" }}
        >
          {/* YES Button */}
          <button
            onClick={handleYes}
            disabled={transitioning}
            className="yes-no-btn absolute z-20"
            style={{
              left: "calc(50% - 160px)",
              top: "0",
              background: "linear-gradient(135deg, #ff6b8a, #ff3d6e)",
              color: "white",
              boxShadow: "0 8px 25px rgba(255, 61, 110, 0.35)",
              animationDelay: "0.3s",
              opacity: 0,
              animation: "bounce-in 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) 0.3s forwards",
            }}
          >
            YES 💗
          </button>

          {/* NO Button */}
          <button
            onPointerDown={handleNoClick}
            className="yes-no-btn absolute z-10"
            style={{
              left: hasMoved ? noPos?.x : "calc(50% + 10px)",
              top: hasMoved ? noPos?.y : "0",
              background: "rgba(255, 255, 255, 0.85)",
              color: "#ff6b8a",
              border: "2px solid rgba(255, 194, 209, 0.6)",
              boxShadow: "0 4px 16px rgba(255, 107, 138, 0.12)",
              animation: !hasMoved
                ? "bounce-in 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) 0.5s forwards"
                : "none",
              opacity: hasMoved ? 1 : 0,
              transition: hasMoved
                ? "left 0.4s cubic-bezier(0.34,1.56,0.64,1), top 0.4s cubic-bezier(0.34,1.56,0.64,1)"
                : "none",
            }}
          >
            NO 🙈
          </button>
        </div>

        {/* Playful Message */}
        <div className="h-8 flex items-center justify-center">
          {message && (
            <p
              key={message + tapCount}
              className="text-base text-pink-400 font-bold animate-bounce-in text-center"
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
}
