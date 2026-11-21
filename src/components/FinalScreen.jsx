import React, { useState } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { FINAL_SCREEN_CONTENT } from '../config/messages';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { RadiantSun, FluffyCloud, ButterflySVG } from '../assets/SceneDecorations';
import { FloatingPetals } from '../animations/FloatingPetals';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { soundEngine } from '../utils/soundEngine';

export function FinalScreen() {
  const [celebrated, setCelebrated] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const handleStudyPromise = () => {
    setCelebrated(true);
    setBurstKey((k) => k + 1);
    soundEngine.playCelebration();
  };

  return (
    <section
      id="final-screen"
      className="relative overflow-hidden pt-20 pb-20 px-4 bg-gradient-to-b from-[#A9DDF5] via-[#D9F0FF] to-[#FFF3B0]"
    >
      {/* Floating yellow Chafa petals */}
      <FloatingPetals count={celebrated ? 24 : 12} />

      {/* Top curved transition from cream */}
      <svg
        viewBox="0 0 1440 80"
        className="pointer-events-none absolute top-0 left-0 w-full h-12 sm:h-16"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,34 C1120,86 720,4 360,52 C180,74 70,56 0,34 Z"
          fill="#FFFDF3"
        />
      </svg>

      {/* Radiant Sunshine & Clouds */}
      <div className="pointer-events-none absolute top-14 right-6 sm:right-16">
        <RadiantSun className="w-20 h-20 sm:w-28 sm:h-28 drop-shadow-sm" />
      </div>
      <div className="pointer-events-none absolute top-16 left-6 sm:left-16 animate-cloud-drift">
        <FluffyCloud className="w-28 sm:w-36 h-auto" />
      </div>
      <div className="pointer-events-none absolute top-44 left-[12%] hidden md:block">
        <ButterflySVG className="w-11 h-11" variant={0} />
      </div>

      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <CelebrationBurst active={celebrated} burstKey={burstKey} />

        {/* Scene: Cute cat sitting beside a stack of books + Yellow Chafa flowers */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-6">
          <ChafaFlower size={68} variant={0} />
          <div className={celebrated ? 'animate-cat-jump' : 'animate-float-slow'}>
            <CatIllustration type="books" className="w-36 h-28 sm:w-44 sm:h-34 drop-shadow-sm" />
          </div>
          <ChafaFlower size={64} variant={2} />
        </div>

        {/* Intro Text */}
        <h2 className="font-storybook text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A3B4C] mb-3">
          {FINAL_SCREEN_CONTENT.introHeading}
        </h2>
        <p className="text-lg sm:text-xl font-bold text-[#32526B] mb-9 max-w-xl mx-auto">
          {FINAL_SCREEN_CONTENT.introSubtitle}
        </p>

        {/* Prominent Yellow Highlighted Study Reminder Card */}
        <div className="relative bg-[#FFD95A] rounded-[2.2rem] border-4 border-white shadow-xl p-6 sm:p-10 mb-8">
          <div className="pointer-events-none absolute -top-5 -left-4 hidden sm:block">
            <ChafaFlower size={62} withStem={false} sway={false} />
          </div>
          <div className="pointer-events-none absolute -bottom-5 -right-4 hidden sm:block">
            <ChafaFlower size={62} withStem={false} sway={false} />
          </div>

          <h2 className="font-storybook text-3xl sm:text-5xl font-extrabold text-[#2A3B4C] tracking-tight mb-5">
            {FINAL_SCREEN_CONTENT.reminderTitle}
          </h2>

          {/* Funny animated cat sitting on top of an open textbook */}
          <div className="flex justify-center mb-4">
            <div className={celebrated ? 'animate-cat-jump' : ''}>
              <CatIllustration type="textbook" className="w-44 h-36 sm:w-52 sm:h-40 drop-shadow-sm" />
            </div>
          </div>

          <p className="font-storybook text-xl sm:text-2xl font-bold text-[#2F5270] mb-7">
            {FINAL_SCREEN_CONTENT.reminderSubtext}
          </p>

          <button
            type="button"
            onClick={handleStudyPromise}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#FFFDF3] active:scale-95 text-[#2A3B4C] font-storybook text-xl font-bold border-2 border-[#E6B84A] shadow-lg hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
          >
            <BookOpen className="w-5 h-5 text-[#3A7CA5]" />
            <span>{FINAL_SCREEN_CONTENT.buttonText}</span>
          </button>

          {/* Celebration reaction */}
          {celebrated && (
            <div className="mt-7 pt-6 border-t-2 border-dashed border-[#E6B84A] animate-bloom">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="animate-cat-jump">
                  <CatIllustration type="cheering" className="w-18 h-18 sm:w-22 sm:h-22" />
                </div>
                <div className="animate-cat-jump" style={{ animationDelay: '0.12s' }}>
                  <CatIllustration type="playful" className="w-18 h-18 sm:w-22 sm:h-22" />
                </div>
                <div className="animate-cat-jump" style={{ animationDelay: '0.24s' }}>
                  <CatIllustration type="waving" className="w-18 h-18 sm:w-22 sm:h-22" />
                </div>
              </div>
              <p className="font-storybook text-lg sm:text-xl font-bold text-[#2A3B4C] inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3A7CA5]" />
                <span>{FINAL_SCREEN_CONTENT.celebrationMessage}</span>
                <Sparkles className="w-5 h-5 text-[#3A7CA5]" />
              </p>
            </div>
          )}
        </div>

        {/* Final Personal Signature — absolute final visible text on the entire website */}
        {celebrated && (
          <div className="mt-10 pt-4 animate-signature" style={{ animationDelay: '0.35s', opacity: 0 }}>
            <p className="font-handwritten text-4xl sm:text-5xl font-bold text-[#2A3B4C] tracking-wide">
              {FINAL_SCREEN_CONTENT.signature}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
