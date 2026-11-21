import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { WELCOME_MESSAGES } from '../config/messages';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { RadiantSun, FluffyCloud, PawPrint, AnimatedEnvelope, ButterflySVG } from '../assets/SceneDecorations';
import { FloatingPetals } from '../animations/FloatingPetals';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { SoundToggle } from './SoundToggle';
import { soundEngine } from '../utils/soundEngine';

export function WelcomeScreen({ isEntered, onOpenSurprise, soundEnabled, onToggleSound }) {
  const [opening, setOpening] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setBurstKey((k) => k + 1);
    soundEngine.playEnvelope();

    setTimeout(() => {
      onOpenSurprise();
      setTimeout(() => {
        const noteEl = document.getElementById('little-note');
        if (noteEl) {
          noteEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    }, 850);
  };

  return (
    <section
      id="home"
      className="relative min-h-[94vh] flex flex-col items-center justify-center overflow-hidden px-4 py-12 bg-gradient-to-b from-[#A9DDF5] via-[#D9F0FF] to-[#FFF3B0]"
    >
      {/* Floating Chafa Petals */}
      <FloatingPetals count={14} />

      {/* Top right sound toggle when on initial welcome overlay */}
      {!isEntered && (
        <div className="absolute top-4 right-4 z-30">
          <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
        </div>
      )}

      {/* Radiant Sun & Fluffy Clouds */}
      <div className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-14 z-10">
        <RadiantSun className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-sm" />
      </div>

      <div className="pointer-events-none absolute top-10 right-8 sm:right-20 animate-cloud-drift z-10">
        <FluffyCloud className="w-28 sm:w-40 h-auto" />
      </div>
      <div
        className="pointer-events-none absolute top-32 left-[14%] hidden md:block animate-cloud-drift z-10"
        style={{ animationDelay: '-6s' }}
      >
        <FluffyCloud className="w-32 h-auto" opacity={0.8} />
      </div>

      {/* Tiny Animated Paw Prints walking across the sky corner */}
      <div className="pointer-events-none absolute bottom-10 left-6 sm:left-16 flex items-center gap-4 opacity-70 z-10" aria-hidden="true">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="animate-paw-step"
            style={{
              animationDelay: `${idx * 0.45}s`,
              transform: `translateY(${idx % 2 === 0 ? '-6px' : '6px'})`,
            }}
          >
            <PawPrint className="w-6 h-6" color="#E6B84A" rotate={25} />
          </div>
        ))}
      </div>

      {/* Fluttering butterfly */}
      <div className="pointer-events-none absolute top-28 right-12 sm:right-32 z-10 hidden sm:block">
        <ButterflySVG className="w-12 h-12" variant={0} />
      </div>

      {/* Main Welcome Storybook Card */}
      <div className="relative z-20 max-w-2xl w-full bg-[#FFFDF3]/92 backdrop-blur-sm rounded-[2rem] border-2 border-[#FFFFFF] shadow-xl p-6 sm:p-10 text-center">
        <CelebrationBurst active={opening} burstKey={burstKey} />

        {/* Scene: Cute Animated Cat sitting beside a Yellow Chafa Flower */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 mb-5">
          <div className="transform -translate-y-1">
            <ChafaFlower size={74} variant={1} />
          </div>
          <div className={opening ? 'animate-cat-jump' : 'animate-float-slow'}>
            <CatIllustration type="waving" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm" />
          </div>
          <div className="transform -translate-y-1 hidden sm:block">
            <ChafaFlower size={66} variant={2} />
          </div>
        </div>

        <h1 className="font-storybook text-4xl sm:text-5xl md:text-6xl font-bold text-[#2A3B4C] tracking-tight mb-4">
          {WELCOME_MESSAGES.heading}
        </h1>

        <p className="text-lg sm:text-xl font-bold text-[#32526B] leading-relaxed mb-2">
          {WELCOME_MESSAGES.subtitle}
        </p>

        <p className="text-base sm:text-lg text-[#536A7E] font-semibold mb-7">
          {WELCOME_MESSAGES.prompt}
        </p>

        {/* Interactive Animated Envelope */}
        <div className="flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open animated surprise envelope"
            className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] rounded-2xl p-1 transition-transform hover:scale-105 active:scale-95"
          >
            <AnimatedEnvelope isOpen={opening || isEntered} className="w-44 sm:w-52 h-auto drop-shadow-md" />
          </button>

          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] active:scale-95 text-[#2A3B4C] font-storybook text-lg font-bold border-2 border-[#E6B84A] shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A7CA5]"
          >
            <Sparkles className="w-5 h-5 text-[#9A6F14]" />
            <span>{WELCOME_MESSAGES.buttonText}</span>
          </button>

          {isEntered && (
            <button
              type="button"
              onClick={() => document.getElementById('little-note')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#3A7CA5] hover:text-[#2A3B4C] transition-colors cursor-pointer"
            >
              <span>Scroll down to explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          )}
        </div>
      </div>

      {/* Soft rolling golden-cream hillside wave at bottom */}
      <svg
        viewBox="0 0 1440 90"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-14 sm:h-20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,42 C320,96 720,0 1080,48 C1260,72 1380,58 1440,42 L1440,90 L0,90 Z"
          fill="#FFFDF3"
        />
      </svg>
    </section>
  );
}
