import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Smile, FastForward, RotateCcw } from 'lucide-react';
import { LETTER_CONTENT } from '../config/messages';
import { DEFAULT_SETTINGS } from '../config/settings';
import { ChampakFlower } from '../assets/ChampakFlowerSVG';
import { PawPrint } from '../assets/SceneDecorations';
import { CatIllustration } from '../assets/CatIllustrations';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { soundEngine } from '../utils/soundEngine';

export function LetterSection() {
  const fullText = useMemo(() => {
    return [LETTER_CONTENT.greeting, ...LETTER_CONTENT.paragraphs].join('\n\n');
  }, []);

  const [charIndex, setCharIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [smiled, setSmiled] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const sectionRef = useRef(null);

  // Start typing when scrolled into view (or immediately if reduced motion)
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setHasStarted(true);
      setCharIndex(fullText.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [fullText.length]);

  useEffect(() => {
    if (!hasStarted || charIndex >= fullText.length) return;
    const timer = setTimeout(() => {
      setCharIndex((prev) => Math.min(fullText.length, prev + 2));
    }, DEFAULT_SETTINGS.letterTypingSpeedMs);
    return () => clearTimeout(timer);
  }, [hasStarted, charIndex, fullText.length]);

  const isTypingDone = charIndex >= fullText.length;
  const visibleText = fullText.slice(0, charIndex);

  const handleSmileClick = () => {
    setSmiled(true);
    setBurstKey((k) => k + 1);
    soundEngine.playBloom();
  };

  const handleReplay = () => {
    setCharIndex(0);
    setHasStarted(true);
    soundEngine.playSoftClick();
  };

  return (
    <section
      id="little-note"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 bg-[#FFFDF3]"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D9F0FF] text-[#2F6F97] text-xs font-extrabold uppercase tracking-wider mb-3">
            A Warm Reminder
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C]">
            {LETTER_CONTENT.title}
          </h2>
        </div>

        {/* Storybook Letter Stationery */}
        <div className="relative bg-white rounded-[2rem] border-2 border-[#FFF3B0] shadow-lg p-6 sm:p-10 md:p-12 overflow-hidden">
          <CelebrationBurst active={smiled} burstKey={burstKey} />

          {/* Corner floral & paw accents */}
          <div className="pointer-events-none absolute -top-3 -right-3 opacity-85">
            <ChampakFlower size={68} withStem={false} sway={false} />
          </div>
          <div className="pointer-events-none absolute bottom-4 left-4 opacity-35">
            <PawPrint className="w-10 h-10" color="#A9DDF5" rotate={-18} />
          </div>

          {/* Stationery top ribbon */}
          <div className="flex items-center justify-between border-b border-dashed border-[#A9DDF5] pb-4 mb-6 pr-12">
            <div className="flex items-center gap-2 text-sm font-bold text-[#536A7E]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD95A]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#A9DDF5]" />
              <span>Written just for MM</span>
            </div>
            <div className="flex items-center gap-2">
              {!isTypingDone ? (
                <button
                  type="button"
                  onClick={() => setCharIndex(fullText.length)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#3A7CA5] hover:text-[#2A3B4C] px-2.5 py-1 rounded-full bg-[#D9F0FF]/60 cursor-pointer"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Show all</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#536A7E] hover:text-[#2A3B4C] px-2.5 py-1 rounded-full bg-[#FFF3B0]/70 cursor-pointer"
                  aria-label="Replay letter typing animation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay</span>
                </button>
              )}
            </div>
          </div>

          {/* Typed Letter Body */}
          <div
            className="min-h-[250px] sm:min-h-[230px] text-base sm:text-lg leading-relaxed text-[#2A3B4C] font-semibold whitespace-pre-line relative z-10"
            aria-live="polite"
          >
            {visibleText}
            {!isTypingDone && (
              <span className="inline-block w-0.5 h-5 bg-[#E6B84A] ml-1 align-middle animate-pulse" />
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-dashed border-[#FFF3B0] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className={smiled ? 'animate-cat-jump' : ''}>
                <CatIllustration type={smiled ? 'cheering' : 'sleeping'} className="w-16 h-16" />
              </div>
              {smiled && (
                <p className="text-sm sm:text-base font-bold text-[#2F6F97] animate-signature">
                  {LETTER_CONTENT.buttonAfterText}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSmileClick}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-storybook font-bold text-base transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] ${
                smiled
                  ? 'bg-[#D9F0FF] text-[#2A3B4C] border-2 border-[#A9DDF5]'
                  : 'bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] border-2 border-[#E6B84A] shadow-md hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              <Smile className="w-5 h-5 text-[#8A6112]" />
              <span>{LETTER_CONTENT.buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
