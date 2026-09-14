import { useState, useEffect, useRef, useCallback } from "react";
import { GIRLFRIEND_NAME, LOVE_LETTER_PARAGRAPHS, TYPING_SPEED, PARAGRAPH_PAUSE } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";

export default function LoveLetterScene({ goToNext }) {
  const [displayedText, setDisplayedText] = useState([]);
  const [currentPara, setCurrentPara] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  const skipToEnd = useCallback(() => {
    setIsSkipping(true);
    clearTimeout(timerRef.current);
    setDisplayedText(LOVE_LETTER_PARAGRAPHS);
    setCurrentPara(LOVE_LETTER_PARAGRAPHS.length);
    setIsComplete(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (isSkipping || isComplete) return;
    if (currentPara >= LOVE_LETTER_PARAGRAPHS.length) {
      setIsComplete(true);
      return;
    }

    const paragraph = LOVE_LETTER_PARAGRAPHS[currentPara];

    if (currentChar < paragraph.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedText((prev) => {
          const updated = [...prev];
          updated[currentPara] = paragraph.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, TYPING_SPEED);
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentPara((p) => p + 1);
        setCurrentChar(0);
      }, PARAGRAPH_PAUSE);
    }

    return () => clearTimeout(timerRef.current);
  }, [currentPara, currentChar, isSkipping, isComplete]);

  // Auto-scroll to bottom of letter
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText, currentChar]);

  return (
    <SceneWrapper scrollable>
      <FloatingHearts count={6} />
      <Sparkles count={6} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full max-w-[min(92vw,700px)] mx-auto px-4 sm:px-6 py-10 pb-safe" style={{ minHeight: "100dvh" }}>
        {/* Letter Card */}
        <div
          className="w-full animate-letter-slide-up"
          style={{
            background: "linear-gradient(135deg, #fffdf7 0%, #fff5f0 50%, #fff8f3 100%)",
            borderRadius: "20px",
            boxShadow: "0 8px 40px rgba(255,107,138,0.15), 0 2px 10px rgba(0,0,0,0.05)",
            border: "1px solid rgba(255,224,230,0.6)",
          }}
        >
          {/* Letter Header */}
          <div className="px-6 sm:px-10 pt-6 sm:pt-8 pb-4 sm:pb-5 border-b border-pink-100">
            <div className="flex justify-center gap-2 mb-2 text-sm opacity-50">
              <span>💕</span>
              <span>💗</span>
              <span>💕</span>
            </div>
            <h3 className="heading-pink text-xl sm:text-2xl text-center">
              Dear {GIRLFRIEND_NAME}, ❤️
            </h3>
          </div>

          {/* Letter Body - proper padding */}
          <div
            ref={scrollRef}
            className="px-6 sm:px-10 py-6 sm:py-7 overflow-y-auto"
            style={{ maxHeight: "55dvh", minHeight: "200px" }}
          >
            {displayedText.map((text, i) => (
              <div key={i} className="mb-4">
                <p
                  className="text-sm sm:text-base leading-relaxed text-gray-700 font-medium"
                  style={{ fontFamily: "var(--font-cute)", lineHeight: "1.8" }}
                >
                  {text}
                  {i === currentPara && !isComplete && !isSkipping && (
                    <span className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle animate-cursor-blink" />
                  )}
                </p>
              </div>
            ))}

            {isComplete && !isSkipping && (
              <div className="flex justify-center mt-2">
                <span className="text-pink-300 text-lg animate-heart-beat">❤️</span>
              </div>
            )}
          </div>

          {/* Letter Footer */}
          <div className="px-6 sm:px-10 pb-6 sm:pb-8 pt-3 sm:pt-4 border-t border-pink-100">
            <div className="flex justify-center gap-2 text-sm opacity-50">
              <span>💗</span>
              <span>💕</span>
              <span>💗</span>
            </div>
          </div>
        </div>

        {/* Skip / Continue */}
        <div className="flex flex-col items-center gap-3 mt-2">
          {!isComplete && (
            <button
              onClick={skipToEnd}
              className="text-sm text-pink-300 font-bold underline underline-offset-2 hover:text-pink-400 transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              Skip animation ✨
            </button>
          )}

          {isComplete && (
            <div className="flex flex-col items-center gap-3 animate-bounce-in">
              <p className="text-lg text-pink-500 font-bold text-center">
                One Last Surprise 🎁
              </p>
              <button onClick={goToNext} className="btn-primary">
                Continue ❤️
              </button>
            </div>
          )}
        </div>
      </div>
    </SceneWrapper>
  );
}
