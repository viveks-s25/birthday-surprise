import { useState, useCallback } from "react";
import { BALLOONS, EARLY_PHOTOS, PHOTO_REVEAL_AFTER } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import Balloon from "../components/Balloon";
import PolaroidPhoto from "../components/PolaroidPhoto";
import SceneWrapper from "../components/SceneWrapper";
import useSoundEffects from "../hooks/useSoundEffects";

export default function BalloonScene({ goToNext }) {
  const [poppedIds, setPoppedIds] = useState(new Set());
  const [showContinue, setShowContinue] = useState(false);
  const [showPhoto1, setShowPhoto1] = useState(false);
  const [showPhoto2, setShowPhoto2] = useState(false);
  const [allRevealed, setAllRevealed] = useState(false);
  const { play: playSfx } = useSoundEffects();

  const poppedCount = poppedIds.size;

  // Sort popped balloon IDs to get words in correct sentence order
  const sortedRevealed = BALLOONS.filter((b) => poppedIds.has(b.id));

  const handlePop = useCallback(
    (id) => {
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });

      playSfx("balloonPop");

      const newCount = poppedIds.size + 1;

      // First photo reveal after PHOTO_REVEAL_AFTER balloons
      if (newCount === PHOTO_REVEAL_AFTER + 1 && EARLY_PHOTOS[0]) {
        setTimeout(() => setShowPhoto1(true), 800);
      }

      // Second photo after final balloon
      if (newCount === BALLOONS.length && EARLY_PHOTOS[1]) {
        setTimeout(() => setShowPhoto2(true), 1200);
      }

      // Show continue after all popped
      if (newCount === BALLOONS.length) {
        setAllRevealed(true);
        const delay = EARLY_PHOTOS[1] ? 3000 : 1500;
        setTimeout(() => setShowContinue(true), delay);
      }
    },
    [poppedIds]
  );

  return (
    <SceneWrapper scrollable>
      <FloatingHearts count={10} />
      <Sparkles count={8} />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-lg px-4 py-10 pb-safe">
        {/* Title */}
        <h2 className="heading-pink text-2xl sm:text-3xl text-center animate-fade-in-up">
          There's something I want to tell you... 🎈❤️
        </h2>

        {/* Progress hint */}
        {!allRevealed && (
          <p className="text-xs text-pink-300 font-semibold animate-fade-in-up">
            {poppedCount === 0
              ? "Tap each balloon to unwrap a word!"
              : `${poppedCount} of ${BALLOONS.length} opened 💗`}
          </p>
        )}

        {/* Balloons Grid */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-7 mt-2">
          {BALLOONS.map((balloon, i) => (
            <Balloon
              key={balloon.id}
              data={balloon}
              isPopped={poppedIds.has(balloon.id)}
              onPop={handlePop}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* Revealed Sentence - sorted by balloon ID for correct word order */}
        <div className="min-h-[80px] flex items-center justify-center w-full mt-2">
          {sortedRevealed.length > 0 && (
            <div className="glass-card px-6 py-5 w-full text-center">
              <p className="text-xl sm:text-2xl text-pink-500 font-bold leading-relaxed" style={{ fontFamily: "var(--font-heading)" }}>
                {sortedRevealed.map((b, i) => (
                  <span key={b.id}>
                    <span className="inline-block animate-word-reveal">
                      {b.word}
                    </span>
                    {i < sortedRevealed.length - 1 && " "}
                  </span>
                ))}
                {allRevealed && (
                  <span className="inline-block animate-heart-beat ml-1">❤️</span>
                )}
              </p>
              {allRevealed && (
                <div className="mt-3 animate-bounce-in">
                  <p className="text-sm text-pink-400 font-medium">✨ This is how I feel about you ✨</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Early Photo Surprise 1 */}
        {showPhoto1 && EARLY_PHOTOS[0] && (
          <div className="flex flex-col items-center gap-3 mt-2">
            <p className="text-sm text-pink-400 text-center animate-fade-in-up font-semibold">
              Wait... I couldn't keep this picture hidden until later 🥺❤️
            </p>
            <PolaroidPhoto photo={EARLY_PHOTOS[0]} delay={0.3} />
          </div>
        )}

        {/* Early Photo Surprise 2 (after final balloon) */}
        {showPhoto2 && EARLY_PHOTOS[1] && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <p className="text-sm text-pink-400 text-center animate-fade-in-up font-semibold">
              And here's another one... because I couldn't resist 🥰
            </p>
            <PolaroidPhoto photo={EARLY_PHOTOS[1]} delay={0.3} />
          </div>
        )}

        {/* Continue Button */}
        {showContinue && (
          <div className="flex flex-col items-center gap-3 mt-4 animate-bounce-in">
            <p className="text-base text-pink-500 font-bold text-center">
              Ready for the next surprise? 🥰
            </p>
            <button onClick={goToNext} className="btn-primary">
              Next Surprise 💗
            </button>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
