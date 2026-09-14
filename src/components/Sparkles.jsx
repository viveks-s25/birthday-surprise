import { useEffect, useState } from "react";

export default function Sparkles({ count = 8 }) {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 95 + 2,
      top: Math.random() * 95 + 2,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
    }));
    setSparkles(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute animate-sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="rgba(255, 182, 193, 0.8)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
