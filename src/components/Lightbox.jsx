import { useState, useEffect } from "react";

export default function Lightbox({ photo, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  if (!photo) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-4 ${
        closing ? "animate-lightbox-img-out" : "animate-lightbox-in"
      }`}
      style={{ background: "rgba(90, 61, 92, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={handleClose}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-5 right-5 text-white/80 text-3xl z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        style={{ touchAction: "manipulation" }}
      >
        ✕
      </button>

      {/* Photo container */}
      <div
        className={`relative max-w-full max-h-[80vh] ${
          closing ? "" : "animate-lightbox-img-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Polaroid frame */}
        <div
          className="bg-white rounded-xl p-3 pb-14 shadow-2xl"
          style={{
            boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 80px rgba(255,107,138,0.15)",
          }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="max-w-[85vw] max-h-[65vh] object-contain rounded-lg"
          />
          <p
            className="absolute bottom-4 left-0 right-0 text-center text-sm font-semibold text-pink-400 px-4"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
          >
            {photo.caption}
          </p>
        </div>

        {/* Decorative hearts */}
        <div className="absolute -top-4 -left-4 text-xl animate-heart-beat">💗</div>
        <div className="absolute -top-3 -right-3 text-lg animate-sparkle" style={{ animationDelay: "0.3s" }}>✨</div>
        <div className="absolute -bottom-3 -left-2 text-sm animate-sparkle" style={{ animationDelay: "0.6s" }}>💕</div>
      </div>
    </div>
  );
}
