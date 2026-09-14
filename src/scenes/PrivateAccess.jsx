import { useState, useRef } from "react";
import { SECRET_CODE, SECRET_CLUE, WRONG_CODE_MESSAGES } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";

export default function PrivateAccess({ goToNext }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === SECRET_CODE) {
      setSuccess(true);
      setError("");
    } else {
      const msg =
        WRONG_CODE_MESSAGES[Math.floor(Math.random() * WRONG_CODE_MESSAGES.length)];
      setError(msg);
      setShaking(true);
      setCode("");
      setTimeout(() => setShaking(false), 500);
      inputRef.current?.focus();
    }
  };

  return (
    <SceneWrapper>
      <FloatingHearts count={10} />
      <Sparkles count={6} />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full animate-fade-in-up">
        {/* Lock Icon */}
        <div className="text-6xl mb-2 animate-bounce-in">🔒</div>

        {/* Title */}
        <h1 className="heading-pink text-2xl sm:text-3xl text-center">
          A Little Surprise For You 💗
        </h1>

        {/* Subtitle */}
        <p className="text-body text-base sm:text-lg text-center text-pink-400">
          Only one special girl is allowed to enter... 🥰
        </p>

        {/* Clue Card - LARGER and more prominent */}
        <div className="glass-card px-7 py-6 w-full text-center">
          <p className="text-base sm:text-lg text-pink-500 font-bold mb-3">
            Do you know the secret code? 👀
          </p>
          <p className="text-sm sm:text-base text-pink-400 leading-relaxed font-medium" style={{ lineHeight: "1.7" }}>
            {SECRET_CLUE}
          </p>
        </div>

        {/* Input Form */}
        {!success ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="w-full flex justify-center">
              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={code}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setCode(val);
                  setError("");
                }}
                placeholder="Enter code..."
                className={`input-cute ${shaking ? "animate-[wiggle_0.3s_ease-in-out]" : ""}`}
                autoFocus
                autoComplete="off"
              />
            </div>

            {error && (
              <p className="text-sm text-rose-500 font-semibold animate-bounce-in text-center px-4">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary animate-bounce-in mt-2">
              Unlock 💗
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 animate-bounce-in">
            <p className="text-lg text-pink-500 font-bold">
              Yesss! You got it! 🥰❤️
            </p>
            <p className="text-sm text-pink-400 font-medium animate-pulse">
              Your little surprise is ready...
            </p>
            <button onClick={goToNext} className="btn-primary mt-3">
              Open My Surprise 💗
            </button>
          </div>
        )}
      </div>
    </SceneWrapper>
  );
}
