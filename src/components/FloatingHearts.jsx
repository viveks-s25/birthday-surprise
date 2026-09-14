import { useEffect, useState } from "react";

function Heart({ style }) {
  return (
    <div
      className="absolute pointer-events-none select-none animate-float-up"
      style={{
        left: `${style.left}%`,
        fontSize: `${style.size}px`,
        animationDuration: `${style.duration}s`,
        animationDelay: `${style.delay}s`,
        opacity: 0,
      }}
    >
      {style.emoji}
    </div>
  );
}

const EMOJIS = ["💗", "💖", "💕", "🤍", "❤️", "💓", "💝", "🩷"];

export default function FloatingHearts({ count = 12 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      size: Math.random() * 18 + 14,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 8,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setHearts(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <Heart key={h.id} style={h} />
      ))}
    </div>
  );
}
