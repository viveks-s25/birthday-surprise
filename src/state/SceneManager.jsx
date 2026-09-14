import { useState, useCallback } from "react";
import { SCENES } from "../config";
import PrivateAccess from "../scenes/PrivateAccess";
import Welcome from "../scenes/Welcome";
import YesNo from "../scenes/YesNo";
import BalloonScene from "../scenes/BalloonScene";
import CakeScene from "../scenes/CakeScene";
import BouquetScene from "../scenes/BouquetScene";
import EnvelopeScene from "../scenes/EnvelopeScene";
import LoveLetterScene from "../scenes/LoveLetterScene";
import PhotoMemories from "../scenes/PhotoMemories";
import FinalGiftScene from "../scenes/FinalGiftScene";

// Full journey including access gate
const FULL_ORDER = [
  SCENES.PRIVATE_ACCESS,
  SCENES.WELCOME,
  SCENES.YES_NO,
  SCENES.BALLOON,
  SCENES.CAKE,
  SCENES.BOUQUET,
  SCENES.ENVELOPE,
  SCENES.LOVE_LETTER,
  SCENES.PHOTO_MEMORIES,
  SCENES.FINAL_GIFT,
];

// Replay journey (skip access gate)
const REPLAY_ORDER = [
  SCENES.WELCOME,
  SCENES.YES_NO,
  SCENES.BALLOON,
  SCENES.CAKE,
  SCENES.BOUQUET,
  SCENES.ENVELOPE,
  SCENES.LOVE_LETTER,
  SCENES.PHOTO_MEMORIES,
  SCENES.FINAL_GIFT,
];

const SCENE_COMPONENTS = {
  [SCENES.PRIVATE_ACCESS]: PrivateAccess,
  [SCENES.WELCOME]: Welcome,
  [SCENES.YES_NO]: YesNo,
  [SCENES.BALLOON]: BalloonScene,
  [SCENES.CAKE]: CakeScene,
  [SCENES.BOUQUET]: BouquetScene,
  [SCENES.ENVELOPE]: EnvelopeScene,
  [SCENES.LOVE_LETTER]: LoveLetterScene,
  [SCENES.PHOTO_MEMORIES]: PhotoMemories,
  [SCENES.FINAL_GIFT]: FinalGiftScene,
};

export default function SceneManager() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [sceneOrder, setSceneOrder] = useState(FULL_ORDER);
  // sceneKey increments on restart to force full remount of all scenes
  const [sceneKey, setSceneKey] = useState(0);

  const goToNext = useCallback(() => {
    if (currentIndex < sceneOrder.length - 1 && !transitioning) {
      setTransitioning(true);
      window.scrollTo({ top: 0, behavior: "instant" });
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setTransitioning(false);
      }, 400);
    }
  }, [currentIndex, transitioning, sceneOrder.length]);

  const goToScene = useCallback(
    (sceneId) => {
      const idx = sceneOrder.indexOf(sceneId);
      if (idx !== -1 && !transitioning) {
        setTransitioning(true);
        window.scrollTo({ top: 0, behavior: "instant" });
        setTimeout(() => {
          setCurrentIndex(idx);
          setTransitioning(false);
        }, 400);
      }
    },
    [transitioning, sceneOrder]
  );

  // Replay: skip access gate, force remount of all scenes to reset state
  const restart = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    // Reset index immediately so sceneOrder[currentIndex] stays valid
    // when sceneOrder switches from FULL_ORDER (10 items) to REPLAY_ORDER (9 items)
    setCurrentIndex(0);
    setSceneOrder(REPLAY_ORDER);
    setTimeout(() => {
      setSceneKey((k) => k + 1);
      setTransitioning(false);
    }, 400);
  }, [transitioning]);

  const currentSceneId = sceneOrder[currentIndex];
  const SceneComponent = SCENE_COMPONENTS[currentSceneId];

  return (
    <div className="relative w-full min-h-dvh">
      <div
        className={`transition-all duration-400 ease-in-out ${
          transitioning
            ? "opacity-0 scale-[0.97]"
            : "opacity-100 scale-100"
        }`}
        style={{ minHeight: "100dvh" }}
      >
        <SceneComponent
          key={`${currentSceneId}-${sceneKey}`}
          goToNext={goToNext}
          goToScene={goToScene}
          restart={restart}
        />
      </div>
    </div>
  );
}
