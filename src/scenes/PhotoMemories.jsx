import { useState, useEffect, useCallback } from "react";
import {
  PHOTO_MEMORIES,
  PHOTO_MESSAGES,
  SPECIAL_PHOTO_INDEX,
} from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import Lightbox from "../components/Lightbox";
import SceneWrapper from "../components/SceneWrapper";

const ROTATIONS = [-3, 2, -2, 3, -1.5, 2.5, -2, 1.5];
const ENTRY_ANIMATIONS = [
  "animate-scrapbook-1",
  "animate-scrapbook-2",
  "animate-scrapbook-3",
  "animate-scrapbook-4",
  "animate-scrapbook-5",
  "animate-scrapbook-1",
  "animate-scrapbook-2",
  "animate-scrapbook-3",
];

const TAPE_COLORS = [
  "rgba(255,194,209,0.6)",
  "rgba(253,164,175,0.5)",
  "rgba(251,113,133,0.4)",
  "rgba(255,224,230,0.6)",
];

function TapeDecoration({ position }) {
  const color = TAPE_COLORS[position % TAPE_COLORS.length];
  const rotate = position % 2 === 0 ? -5 : 5;
  const left = position % 2 === 0 ? "10%" : "75%";

  return (
    <div
      className="absolute -top-2 z-10"
      style={{
        left,
        width: "40px",
        height: "14px",
        background: color,
        borderRadius: "2px",
        transform: `rotate(${rotate}deg)`,
        opacity: 0,
        animation: `tape-appear 0.4s ease-out ${0.3 + position * 0.1}s forwards`,
      }}
    />
  );
}

function PhotoCard({ photo, index, onOpen }) {
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const entryAnim = ENTRY_ANIMATIONS[index % ENTRY_ANIMATIONS.length];
  const isSpecial = index === SPECIAL_PHOTO_INDEX;

  return (
    <div
      className={`relative ${entryAnim}`}
      style={{
        opacity: 0,
        animationDelay: `${0.2 + index * 0.15}s`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {!isSpecial && <TapeDecoration position={index} />}
      <div
        onClick={() => onOpen(photo)}
        onTouchEnd={(e) => {
          e.preventDefault();
          onOpen(photo);
        }}
        className={`relative bg-white rounded-xl cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${
          isSpecial ? "animate-special-glow" : ""
        }`}
        style={{
          padding: "10px 10px 44px 10px",
          boxShadow: isSpecial
            ? "0 8px 32px rgba(255,107,138,0.25)"
            : "0 4px 20px rgba(0,0,0,0.08), 0 2px 8px rgba(255,107,138,0.1)",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <div className="w-full bg-pink-50 rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <p
          className="absolute bottom-3 left-0 right-0 text-center text-xs sm:text-sm font-semibold text-pink-400 px-2"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 600, transform: `rotate(${rotation * 0.3}deg)` }}
        >
          {photo.caption}
        </p>
        <div
          className="absolute text-sm"
          style={{ top: "-6px", right: isSpecial ? "-6px" : "8px", transform: `rotate(${15 + index * 10}deg)` }}
        >
          {index % 3 === 0 ? "💗" : index % 3 === 1 ? "💕" : "🩷"}
        </div>
      </div>
    </div>
  );
}

function InterMessage({ message, index }) {
  return (
    <div
      className="animate-photo-msg-in text-center py-2 px-4 col-span-2"
      style={{ opacity: 0, animationDelay: `${0.3 + index * 0.1}s` }}
    >
      <p className="text-sm sm:text-base text-pink-400 font-bold italic">{message}</p>
    </div>
  );
}

export default function PhotoMemories({ goToNext }) {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= PHOTO_MEMORIES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const openLightbox = useCallback((photo) => setLightboxPhoto(photo), []);
  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  const renderItems = [];
  let msgIdx = 0;
  PHOTO_MEMORIES.forEach((photo, i) => {
    renderItems.push({ type: "photo", photo, index: i });
    const matchingMsg = PHOTO_MESSAGES.find((m) => m.afterIndex === i);
    if (matchingMsg) {
      renderItems.push({ type: "message", message: matchingMsg.text, index: msgIdx++ });
    }
  });

  return (
    <SceneWrapper scrollable>
      <FloatingHearts count={8} />
      <Sparkles count={6} />

      <div className="relative z-10 w-full max-w-[min(92%,900px)] mx-auto px-4 py-10 pb-safe">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h2 className="heading-pink text-2xl sm:text-3xl mb-3">Little Moments With You ❤️</h2>
          <p className="text-body text-sm sm:text-base text-pink-400 leading-relaxed">
            Some of my favorite things are the moments that have you in them. 🥰
          </p>
        </div>

        {/* 2-Column Photo Grid */}
        <div className="photo-grid">
          {renderItems.map((item, i) => {
            if (item.type === "message") {
              return <InterMessage key={`msg-${i}`} message={item.message} index={item.index} />;
            }
            const isVisible = item.index < visibleCount;
            if (!isVisible) return <div key={`placeholder-${item.index}`} className="aspect-[3/4]" />;
            return (
              <div key={`photo-${item.index}`}>
                <PhotoCard photo={item.photo} index={item.index} onOpen={openLightbox} />
              </div>
            );
          })}
        </div>

        {visibleCount >= PHOTO_MEMORIES.length && (
          <div className="mt-10 text-center animate-fade-in-up">
            <p className="text-sm text-pink-400 font-semibold mb-4">Okay... last few memories before the final surprise. ❤️</p>
            <p className="text-lg text-pink-500 font-bold mb-5">Ready? 👀🎁</p>
            <button onClick={goToNext} className="btn-primary">Show Me ❤️</button>
          </div>
        )}
      </div>

      {lightboxPhoto && <Lightbox photo={lightboxPhoto} onClose={closeLightbox} />}
    </SceneWrapper>
  );
}
