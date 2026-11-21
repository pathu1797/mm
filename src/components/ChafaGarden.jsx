import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { CHAFA_GARDEN_MESSAGES } from '../config/messages';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../config/settings';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { CatIllustration } from '../assets/CatIllustrations';
import { RadiantSun, FluffyCloud, ButterflySVG } from '../assets/SceneDecorations';
import { FloatingPetals } from '../animations/FloatingPetals';
import { soundEngine } from '../utils/soundEngine';

// Pre-crafted scenic meadow spots so flowers spread organically across foreground & midground
const GARDEN_SPOTS = [
  { x: 14, y: 66, scale: 0.92 }, { x: 82, y: 64, scale: 0.9 }, { x: 48, y: 58, scale: 0.85 },
  { x: 28, y: 74, scale: 1.0 }, { x: 68, y: 72, scale: 1.0 }, { x: 10, y: 80, scale: 1.06 },
  { x: 90, y: 78, scale: 1.04 }, { x: 38, y: 64, scale: 0.88 }, { x: 58, y: 62, scale: 0.86 },
  { x: 20, y: 56, scale: 0.8 }, { x: 76, y: 55, scale: 0.8 }, { x: 46, y: 78, scale: 1.08 },
  { x: 62, y: 82, scale: 1.1 }, { x: 32, y: 54, scale: 0.78 }, { x: 66, y: 53, scale: 0.78 },
  { x: 18, y: 86, scale: 1.12 }, { x: 82, y: 86, scale: 1.1 }, { x: 52, y: 68, scale: 0.95 },
  { x: 8, y: 68, scale: 0.88 }, { x: 92, y: 66, scale: 0.88 }, { x: 40, y: 85, scale: 1.1 },
  { x: 74, y: 80, scale: 1.04 }, { x: 26, y: 62, scale: 0.85 }, { x: 86, y: 56, scale: 0.82 },
  { x: 12, y: 54, scale: 0.76 }, { x: 54, y: 52, scale: 0.76 }, { x: 36, y: 72, scale: 0.98 },
  { x: 60, y: 74, scale: 1.0 }, { x: 44, y: 54, scale: 0.79 }, { x: 70, y: 62, scale: 0.88 },
  { x: 22, y: 78, scale: 1.04 }, { x: 78, y: 70, scale: 0.96 }, { x: 50, y: 86, scale: 1.12 },
  { x: 30, y: 84, scale: 1.08 }, { x: 66, y: 86, scale: 1.1 }, { x: 94, y: 84, scale: 1.06 },
];

export function ChafaGarden() {
  const [flowers, setFlowers] = useState(() =>
    loadFromStorage(STORAGE_KEYS.GARDEN_FLOWERS, [])
  );
  const [activeNote, setActiveNote] = useState(CHAFA_GARDEN_MESSAGES.initialQuote);
  const [noteKey, setNoteKey] = useState(0);
  const [pettingCat, setPettingCat] = useState(null);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GARDEN_FLOWERS, flowers);
  }, [flowers]);

  const plantFlower = () => {
    if (flowers.length >= DEFAULT_SETTINGS.maxGardenFlowers) {
      setActiveNote(
        'Your Chafa meadow is in full golden bloom, MM! Tap any flower to read its cheerful note.'
      );
      setNoteKey((k) => k + 1);
      soundEngine.playBloom();
      return;
    }

    const spot = GARDEN_SPOTS[flowers.length % GARDEN_SPOTS.length];
    const message =
      CHAFA_GARDEN_MESSAGES.flowerNotes[
        flowers.length % CHAFA_GARDEN_MESSAGES.flowerNotes.length
      ];

    const newFlower = {
      id: `flower-${Date.now()}-${flowers.length}`,
      x: spot.x,
      y: spot.y,
      scale: spot.scale,
      variant: flowers.length % 3,
      message,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setActiveNote(message);
    setNoteKey((k) => k + 1);
    soundEngine.playBloom();
  };

  const handleFlowerTap = (flower) => {
    setActiveNote(flower.message);
    setNoteKey((k) => k + 1);
    soundEngine.playSoftClick();
  };

  const handleResetGarden = () => {
    setFlowers([]);
    setActiveNote(CHAFA_GARDEN_MESSAGES.initialQuote);
    setNoteKey((k) => k + 1);
    soundEngine.playSoftClick();
  };

  const handleGardenCatTap = (catId, msg) => {
    setPettingCat(catId);
    setActiveNote(msg);
    setNoteKey((k) => k + 1);
    soundEngine.playCatChirp();
    setTimeout(() => setPettingCat(null), 650);
  };

  // Sort flowers by vertical position for realistic depth layering
  const sortedFlowers = [...flowers].sort((a, b) => a.y - b.y);

  return (
    <section
      id="flower-garden"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFFDF3] via-[#FFF3B0]/35 to-[#FFFDF3]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-[#FFD95A] text-[#5C410A] text-xs font-extrabold uppercase tracking-wider mb-3">
            Interactive Meadow
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-3">
            {CHAFA_GARDEN_MESSAGES.heading}
          </h2>
          <p className="text-base sm:text-lg font-bold text-[#3A7CA5]">
            “{CHAFA_GARDEN_MESSAGES.initialQuote}”
          </p>
        </div>

        {/* Positive Message Ribbon */}
        <div
          key={noteKey}
          className="max-w-2xl mx-auto mb-6 rounded-2xl bg-white border-2 border-[#FFD95A] px-5 py-3.5 shadow-sm text-center animate-signature"
          aria-live="polite"
        >
          <p className="font-storybook text-base sm:text-lg font-bold text-[#2A3B4C]">
            {activeNote}
          </p>
        </div>

        {/* Interactive Chafa Garden Canvas */}
        <div className="relative rounded-[2.2rem] overflow-hidden border-4 border-white shadow-xl bg-gradient-to-b from-[#A9DDF5] via-[#D9F0FF] to-[#E6F4D7] min-h-[400px] sm:min-h-[470px] select-none">
          {/* Drifting petals */}
          <FloatingPetals count={flowers.length > 0 ? Math.min(18, 6 + flowers.length) : 5} />

          {/* Sun & Clouds */}
          <div className="pointer-events-none absolute top-4 right-5 sm:top-6 sm:right-10">
            <RadiantSun className="w-16 h-16 sm:w-22 sm:h-22" />
          </div>
          <div className="pointer-events-none absolute top-6 left-6 animate-cloud-drift">
            <FluffyCloud className="w-24 sm:w-32 h-auto" />
          </div>
          <div
            className="pointer-events-none absolute top-14 left-[42%] animate-cloud-drift hidden sm:block"
            style={{ animationDelay: '-8s' }}
          >
            <FluffyCloud className="w-28 h-auto" opacity={0.85} />
          </div>

          {/* Fluttering butterflies once flowers start blooming */}
          {flowers.length >= 2 && (
            <div className="pointer-events-none absolute top-24 left-[22%] z-20">
              <ButterflySVG className="w-10 h-10" variant={0} />
            </div>
          )}
          {flowers.length >= 6 && (
            <div className="pointer-events-none absolute top-28 right-[24%] z-20">
              <ButterflySVG className="w-9 h-9" variant={1} />
            </div>
          )}

          {/* Soft Rolling Hills */}
          <svg
            viewBox="0 0 1200 320"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-0 left-0 w-full h-[62%]"
            aria-hidden="true"
          >
            <path d="M0,110 Q280,35 600,95 T1200,80 L1200,320 L0,320 Z" fill="#C7E8B6" />
            <path d="M0,155 Q340,95 720,150 T1200,130 L1200,320 L0,320 Z" fill="#AEDD9B" />
            <path d="M0,215 Q420,175 840,215 T1200,200 L1200,320 L0,320 Z" fill="#99D186" />
          </svg>

          {/* Almost-empty garden starter invitation */}
          {flowers.length === 0 && (
            <div className="absolute inset-x-0 top-[44%] flex justify-center z-20 px-4">
              <div className="bg-[#FFFDF3]/92 backdrop-blur-xs border-2 border-[#FFF3B0] rounded-2xl px-5 py-3 shadow-sm text-center max-w-sm">
                <p className="font-storybook text-sm sm:text-base font-bold text-[#2A3B4C]">
                  This quiet meadow is waiting for its very first golden Chafa bloom, MM!
                </p>
              </div>
            </div>
          )}

          {/* Garden Cats sitting, sleeping, and playing among the flowers */}
          {/* Cat 1: Always peacefully resting in the meadow */}
          <button
            type="button"
            onClick={() =>
              handleGardenCatTap('cat-sleep', 'Mochi enjoys napping in the warm Chafa sunshine!')
            }
            aria-label="Pet sleeping cat in the garden"
            className={`absolute bottom-[10%] left-[6%] sm:left-[8%] z-20 cursor-pointer focus:outline-none ${
              pettingCat === 'cat-sleep' ? 'animate-cat-jump' : ''
            }`}
          >
            <CatIllustration type="sleeping" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm" />
          </button>

          {/* Cat 2: Appears after 3 flowers */}
          {flowers.length >= 3 && (
            <button
              type="button"
              onClick={() =>
                handleGardenCatTap('cat-butter', 'Sunny spotted a butterfly dancing above your Chafa flowers!')
              }
              aria-label="Pet butterfly-chasing cat in the garden"
              className={`absolute bottom-[14%] right-[7%] sm:right-[10%] z-20 cursor-pointer focus:outline-none animate-bloom ${
                pettingCat === 'cat-butter' ? 'animate-cat-jump' : ''
              }`}
            >
              <CatIllustration type="butterfly" className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-sm" />
            </button>
          )}

          {/* Cat 3: Appears after 7 flowers */}
          {flowers.length >= 7 && (
            <button
              type="button"
              onClick={() =>
                handleGardenCatTap('cat-play', 'Pip is doing tiny happy hops between the golden blooms!')
              }
              aria-label="Pet playful kitten in the garden"
              className={`absolute bottom-[24%] left-[44%] z-15 cursor-pointer focus:outline-none animate-bloom ${
                pettingCat === 'cat-play' ? 'animate-cat-jump' : ''
              }`}
            >
              <CatIllustration type="playful" className="w-18 h-18 sm:w-22 sm:h-22 drop-shadow-sm" />
            </button>
          )}

          {/* Planted Yellow Chafa Flowers */}
          {sortedFlowers.map((flower) => (
            <button
              key={flower.id}
              type="button"
              onClick={() => handleFlowerTap(flower)}
              aria-label={`Chafa flower: ${flower.message}`}
              title="Tap to read this flower's note"
              className="absolute -translate-x-1/2 -translate-y-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] rounded-full"
              style={{
                left: `${flower.x}%`,
                top: `${flower.y}%`,
                zIndex: Math.round(flower.y),
              }}
            >
              <div className="animate-bloom">
                <ChafaFlower
                  size={Math.round(62 * flower.scale)}
                  variant={flower.variant}
                  sway
                  className="transition-transform group-hover:scale-110"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Garden Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl border-2 border-[#FFF3B0] p-4 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ChafaFlower size={36} withStem={false} sway={false} />
            <div className="text-left">
              <p className="font-storybook text-base font-bold text-[#2A3B4C]">
                {flowers.length}{' '}
                {flowers.length === 1 ? 'Chafa Flower' : 'Chafa Flowers'} Planted
              </p>
              <p className="text-xs font-semibold text-[#536A7E]">
                Saved automatically for your next visit, MM!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
            {flowers.length > 0 && (
              <button
                type="button"
                onClick={handleResetGarden}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#D9F0FF]/70 hover:bg-[#D9F0FF] text-[#2F6F97] text-sm font-bold transition-colors cursor-pointer"
                aria-label="Clear garden and plant fresh flowers"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replant</span>
              </button>
            )}

            <button
              type="button"
              onClick={plantFlower}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] active:scale-95 text-[#2A3B4C] font-storybook text-lg font-bold border-2 border-[#E6B84A] shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
            >
              <Sparkles className="w-5 h-5 text-[#8A6112]" />
              <span>{CHAFA_GARDEN_MESSAGES.buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
