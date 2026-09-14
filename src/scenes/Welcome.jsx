import { GIRLFRIEND_NAME } from "../config";
import FloatingHearts from "../components/FloatingHearts";
import Sparkles from "../components/Sparkles";
import SceneWrapper from "../components/SceneWrapper";

export default function Welcome({ goToNext }) {
  return (
    <SceneWrapper>
      <FloatingHearts count={14} />
      <Sparkles count={10} />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm w-full px-4 animate-fade-in-up">
        {/* Cute Illustration */}
        <div className="text-7xl mb-2 animate-bounce-in">🧸</div>

        {/* Name */}
        <h1 className="heading-pink text-3xl sm:text-4xl text-center animate-heart-beat">
          Hey {GIRLFRIEND_NAME} ❤️
        </h1>

        {/* Subtitle */}
        <p className="text-body text-base sm:text-lg text-pink-400 text-center animate-fade-in-up">
          Someone made something special for you...
        </p>

        {/* Ready prompt - compact pill shape */}
        <div
          className="glass-card text-center animate-slide-in"
          style={{ width: "fit-content", padding: "10px 22px" }}
        >
          <p className="text-lg sm:text-xl text-pink-500 font-bold">
            Are you ready? 🥰
          </p>
        </div>

        {/* Begin Button */}
        <button
          onClick={goToNext}
          className="btn-primary animate-bounce-in mt-2"
        >
          Let's Begin 💗
        </button>
      </div>
    </SceneWrapper>
  );
}
