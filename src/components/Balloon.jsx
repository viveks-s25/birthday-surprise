import { useState } from "react";

const POP_COLORS = ["#fda4af", "#c4b5fd", "#fecdd3", "#fb7185", "#fff0f3", "#ffe4e6"];

function PopParticle({ index, color }) {
  const angle = (index / 8) * Math.PI * 2;
  const dist = 30 + Math.random() * 40;
  const tx = Math.cos(angle) * dist;
  const ty = Math.sin(angle) * dist;

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: `${6 + Math.random() * 6}px`,
        height: `${6 + Math.random() * 6}px`,
        backgroundColor: color,
        left: "50%",
        top: "50%",
        marginLeft: "-3px",
        marginTop: "-3px",
        "--tx": `${tx}px`,
        "--ty": `${ty}px`,
        animation: "pop-particle 0.5s ease-out forwards",
      }}
    />
  );
}

export default function Balloon({ data, onPop, isPopped, delay = 0 }) {
  const [showParticles, setShowParticles] = useState(false);

  const handlePop = () => {
    if (isPopped) return;
    setShowParticles(true);
    setTimeout(() => onPop(data.id), 350);
  };

  const floatClass = `animate-balloon-float-${((data.id - 1) % 4) + 1}`;

  if (isPopped && !showParticles) return null;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{
        opacity: 0,
        animation: `bounce-in 0.6s cubic-bezier(0.68,-0.55,0.265,1.55) ${delay}s forwards`,
      }}
    >
      {/* Pop particles */}
      {showParticles && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <PopParticle
              key={i}
              index={i}
              color={POP_COLORS[i % POP_COLORS.length]}
            />
          ))}
        </div>
      )}

      {/* Balloon body */}
      <button
        onClick={handlePop}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePop();
        }}
        className={`relative cursor-pointer select-none -webkit-tap-highlight-color-transparent focus:outline-none ${
          showParticles ? "animate-balloon-pop" : floatClass
        }`}
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
        aria-label={`Balloon ${data.id}`}
      >
        <div className="relative">
          <svg
            width="90"
            height="110"
            viewBox="0 0 90 110"
            className="drop-shadow-lg"
          >
            <defs>
              <radialGradient id={`balloon-grad-${data.id}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                <stop offset="100%" stopColor={data.colorAlt} stopOpacity="1" />
              </radialGradient>
            </defs>
            <ellipse cx="45" cy="42" rx="38" ry="40" fill={`url(#balloon-grad-${data.id})`} />
            <ellipse cx="32" cy="30" rx="12" ry="14" fill="white" opacity="0.25" />
            <polygon points="45,82 41,88 49,88" fill={data.colorAlt} />
            <path d="M45,88 Q42,98 45,108" stroke="#d4a0b0" strokeWidth="1.5" fill="none" />
          </svg>
          <span
            className="absolute text-xl select-none pointer-events-none"
            style={{ top: "30px", left: "50%", transform: "translateX(-50%)" }}
          >
            {data.emoji}
          </span>
        </div>
      </button>

      {/* "Tap me" hint */}
      {!isPopped && !showParticles && (
        <p
          className="text-xs text-pink-400 mt-1 animate-pulse font-bold"
          style={{ opacity: 0, animation: `fade-in-up 0.5s ease-out ${delay + 0.4}s forwards` }}
        >
          tap me! 🎈
        </p>
      )}
    </div>
  );
}
