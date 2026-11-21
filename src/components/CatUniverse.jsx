import React, { useState, useEffect } from 'react';
import { Fish, Sparkles } from 'lucide-react';
import { CAT_UNIVERSE_DATA } from '../config/messages';
import { CatIllustration } from '../assets/CatIllustrations';
import { FishTreatSVG, PawPrint } from '../assets/SceneDecorations';
import { soundEngine } from '../utils/soundEngine';

export function CatUniverse() {
  const [selectedCat, setSelectedCat] = useState(CAT_UNIVERSE_DATA.cats[0]);
  const [animatingIds, setAnimatingIds] = useState({});
  const [treatTime, setTreatTime] = useState(false);
  const [treatCount, setTreatCount] = useState(0);
  const [floatingFishes, setFloatingFishes] = useState([]);
  const [pawTrails, setPawTrails] = useState([]);

  // Subtle autonomous idle animation: a random cat does a tiny happy hop every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      const cats = CAT_UNIVERSE_DATA.cats;
      const randomCat = cats[Math.floor(Math.random() * cats.length)];
      setAnimatingIds((prev) => ({ ...prev, [randomCat.id]: 'wiggle' }));
      setTimeout(() => {
        setAnimatingIds((prev) => {
          const next = { ...prev };
          delete next[randomCat.id];
          return next;
        });
      }, 600);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleCatClick = (cat) => {
    setSelectedCat(cat);
    const animType = cat.id === 'sleeping' || cat.id === 'tree' ? 'wiggle' : 'jump';
    setAnimatingIds((prev) => ({ ...prev, [cat.id]: animType }));
    soundEngine.playCatChirp();

    // Add interactive paw print pop
    const pawId = `paw-${Date.now()}-${Math.random()}`;
    setPawTrails((prev) => [
      ...prev.slice(-6),
      {
        id: pawId,
        left: `${12 + Math.random() * 76}%`,
        top: `${15 + Math.random() * 65}%`,
        rotate: Math.round(-30 + Math.random() * 60),
      },
    ]);

    setTimeout(() => {
      setAnimatingIds((prev) => {
        const next = { ...prev };
        delete next[cat.id];
        return next;
      });
    }, 650);
  };

  const handleGiveTreats = () => {
    setTreatTime(true);
    setTreatCount((c) => c + 1);
    soundEngine.playCelebration();

    // Make all 10 cats jump happily!
    const allJumping = {};
    CAT_UNIVERSE_DATA.cats.forEach((c) => {
      allJumping[c.id] = 'jump';
    });
    setAnimatingIds(allJumping);

    // Spawn floating fish treats
    const fishes = Array.from({ length: 10 }, (_, idx) => ({
      id: `fish-${Date.now()}-${idx}`,
      left: `${8 + idx * 9}%`,
      delay: `${idx * 0.08}s`,
    }));
    setFloatingFishes(fishes);

    setTimeout(() => {
      setAnimatingIds({});
    }, 850);

    setTimeout(() => {
      setTreatTime(false);
    }, 4200);
  };

  return (
    <section
      id="cat-universe"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFFDF3] via-[#D9F0FF]/45 to-[#FFFDF3] overflow-hidden"
    >
      {/* Interactive paw prints drifting softly */}
      {pawTrails.map((p) => (
        <div
          key={p.id}
          className="pointer-events-none absolute z-10 opacity-40 animate-signature"
          style={{ left: p.left, top: p.top }}
          aria-hidden="true"
        >
          <PawPrint className="w-8 h-8" color="#E6B84A" rotate={p.rotate} />
        </div>
      ))}

      <div className="max-w-6xl mx-auto relative z-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-[#D9F0FF] text-[#2F6F97] text-xs font-extrabold uppercase tracking-wider mb-3">
            10 Custom Cartoon Cats
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-3">
            {CAT_UNIVERSE_DATA.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#536A7E] font-semibold">
            {CAT_UNIVERSE_DATA.subheading}
          </p>
        </div>

        {/* Treats Action Bar & Gathering Banner */}
        <div className="relative bg-white rounded-[2rem] border-2 border-[#A9DDF5] shadow-md p-5 sm:p-6 mb-8 overflow-hidden">
          {/* Floating Fish Treats Animation */}
          {floatingFishes.map((f) => (
            <div
              key={f.id}
              className="pointer-events-none absolute bottom-4 z-30 animate-fish-float"
              style={{ left: f.left, animationDelay: f.delay }}
              aria-hidden="true"
            >
              <FishTreatSVG className="w-10 h-6" />
            </div>
          ))}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Selected Cat Spotlight */}
            <div className="flex items-center gap-4 text-left w-full md:w-auto">
              <div className="shrink-0 w-18 h-18 rounded-2xl bg-[#FFF3B0]/70 border border-[#FFD95A] flex items-center justify-center p-1">
                <CatIllustration type={selectedCat.id} className="w-16 h-16" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="font-storybook text-lg font-bold text-[#2A3B4C]">
                    {selectedCat.name}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D9F0FF] text-[#2F6F97]">
                    {selectedCat.role}
                  </span>
                </div>
                <p className="text-sm font-bold text-[#3A7CA5]">
                  “{treatTime ? 'CRUNCH CRUNCH! Thank you for the treats, MM!!' : selectedCat.reaction}”
                </p>
                <p className="text-xs font-semibold text-[#536A7E] mt-0.5">
                  {selectedCat.personality} • <span className="text-[#8A6112]">{selectedCat.fact}</span>
                </p>
              </div>
            </div>

            {/* Give Treats Button */}
            <button
              type="button"
              onClick={handleGiveTreats}
              className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] active:scale-95 text-[#2A3B4C] font-storybook text-base font-bold border-2 border-[#E6B84A] shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
            >
              <Fish className="w-5 h-5 text-[#2F6F97]" />
              <span>{CAT_UNIVERSE_DATA.treatsButton}</span>
            </button>
          </div>

          {/* Treat Gathering Celebration Strip */}
          {treatTime && (
            <div className="mt-5 pt-4 border-t border-dashed border-[#A9DDF5] bg-gradient-to-r from-[#FFF3B0]/60 via-[#D9F0FF]/60 to-[#FFF3B0]/60 rounded-2xl p-4 text-center animate-bloom">
              <p className="font-storybook text-base font-bold text-[#2A3B4C] mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C48F1D]" />
                <span>All 10 cats gathered around the treat bowl for MM! (Treats served: {treatCount})</span>
                <Sparkles className="w-4 h-4 text-[#C48F1D]" />
              </p>
              <div className="flex items-center justify-center flex-wrap gap-1">
                {CAT_UNIVERSE_DATA.cats.map((c) => (
                  <div key={`gather-${c.id}`} className="animate-cat-jump">
                    <CatIllustration type={c.id} className="w-11 h-11 sm:w-13 sm:h-13" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* All 10 Custom Cats Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CAT_UNIVERSE_DATA.cats.map((cat) => {
            const isSelected = selectedCat.id === cat.id;
            const anim = animatingIds[cat.id];
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCatClick(cat)}
                aria-label={`Interact with ${cat.name}, ${cat.role}`}
                className={`group relative rounded-3xl p-4 text-center transition-all duration-200 border-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] ${
                  isSelected
                    ? 'bg-[#FFFDF3] border-[#FFD95A] shadow-lg -translate-y-1'
                    : 'bg-white/95 border-[#D9F0FF] hover:border-[#A9DDF5] hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Speech bubble on select or treat time */}
                {(isSelected || treatTime) && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#FFD95A] text-[#2A3B4C] text-[11px] font-extrabold shadow-xs z-10">
                    {treatTime ? 'Yum! 🐟' : 'Purr!'}
                  </span>
                )}

                <div
                  className={`mx-auto mb-2 flex items-center justify-center h-28 ${
                    anim === 'jump'
                      ? 'animate-cat-jump'
                      : anim === 'wiggle'
                      ? 'animate-cat-wiggle'
                      : 'group-hover:scale-105 transition-transform'
                  }`}
                >
                  <CatIllustration type={cat.id} className="w-24 h-24 sm:w-28 sm:h-28" />
                </div>

                <h3 className="font-storybook text-base sm:text-lg font-bold text-[#2A3B4C]">
                  {cat.name}
                </h3>
                <p className="text-xs font-bold text-[#3A7CA5] leading-snug mt-0.5">
                  {cat.role}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
