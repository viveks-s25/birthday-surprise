import { useState } from "react";

export default function PolaroidPhoto({ photo, delay = 0, onReady }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
    onReady?.();
  };

  const handleError = () => {
    setError(true);
  };

  if (error) return null;

  return (
    <div
      className="animate-polaroid-in animate-gentle-sway"
      style={{
        animationDelay: `${delay}s`,
        opacity: 0,
        animation: `polaroid-in 0.8s cubic-bezier(0.34,1.56,0.64,1) ${delay}s forwards, gentle-sway 4s ease-in-out ${delay + 0.8}s infinite`,
      }}
    >
      <div className="relative inline-block">
        {/* Sparkles around photo */}
        <div className="absolute -top-3 -left-3 text-sm animate-sparkle" style={{ animationDelay: "0.2s" }}>✨</div>
        <div className="absolute -top-2 -right-3 text-sm animate-sparkle" style={{ animationDelay: "0.6s" }}>💖</div>
        <div className="absolute -bottom-2 -left-2 text-xs animate-sparkle" style={{ animationDelay: "1s" }}>💕</div>

        {/* Polaroid frame */}
        <div
          className="bg-white rounded-xl p-3 pb-12 shadow-xl"
          style={{
            boxShadow: "0 8px 32px rgba(255,107,138,0.25), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Photo */}
          <div className="relative w-48 h-56 sm:w-56 sm:h-64 bg-pink-50 rounded-lg overflow-hidden">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl animate-pulse">💗</div>
              </div>
            )}
            <img
              src={photo.src}
              alt={photo.caption}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleLoad}
              onError={handleError}
            />
          </div>

          {/* Caption */}
          <p
            className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-pink-400 px-3"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
