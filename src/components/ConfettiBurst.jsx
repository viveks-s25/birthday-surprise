import { useEffect, useState } from "react";

const CONFETTI_COLORS = ["#ff6b8a", "#ff3d6e", "#ffc2d1", "#ffa0b4", "#ff8fab", "#ffb3c6"];
const SHAPES = ["circle", "square", "heart"];

function ConfettiPiece({ piece }) {
  const isCircle = piece.shape === "circle";
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${piece.x}%`,
        top: "-5%",
        width: `${piece.size}px`,
        height: isCircle ? `${piece.size}px` : `${piece.size * 1.5}px`,
        backgroundColor: piece.color,
        borderRadius: isCircle ? "50%" : piece.shape === "heart" ? "2px" : "3px",
        animation: `confetti-fall ${piece.duration}s ease-in ${piece.delay}s forwards`,
        opacity: 0,
      }}
    />
  );
}

export default function ConfettiBurst({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      const generated = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 8 + 5,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 0.5,
      }));
      setPieces(generated);
    }
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <ConfettiPiece key={p.id} piece={p} />
      ))}
    </div>
  );
}
