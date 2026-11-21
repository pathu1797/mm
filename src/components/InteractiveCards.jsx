import React, { useState, useEffect } from 'react';
import { Smile, Wind, Cat, Sun, RefreshCw, Play, Pause, Sparkles, ArrowDown } from 'lucide-react';
import { NEED_RIGHT_NOW } from '../config/messages';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { FluffyCloud, ButterflySVG, RadiantSun } from '../assets/SceneDecorations';
import { soundEngine } from '../utils/soundEngine';

const BREATH_PHASES = [
  { label: 'Breathe In...', duration: 4, scale: 1.28, hint: 'Fill your lungs slowly with sunshine' },
  { label: 'Hold Gently...', duration: 4, scale: 1.28, hint: 'Pause in the quiet blue sky' },
  { label: 'Breathe Out...', duration: 4, scale: 0.78, hint: 'Let all tension drift away like clouds' },
];

const MINI_ZONE_CATS = [
  { type: 'sleeping', name: 'Mochi', msg: 'Slow blink... nap mode approved, MM!' },
  { type: 'playful', name: 'Pip', msg: 'Pounce! Ready for a fun little break!' },
  { type: 'white', name: 'Cloud', msg: 'Fluff level: 1000%. Sending cozy vibes!' },
  { type: 'orange', name: 'Marmalade', msg: 'Mrrrow! Orange cats declare today a happy day!' },
  { type: 'mischievous', name: 'Noodle', msg: 'Hehe! Bet I made you grin, MM!' },
  { type: 'butterfly', name: 'Sunny', msg: 'Chasing butterflies in the Chafa breeze!' },
  { type: 'yarn', name: 'Tangle', msg: 'Look! I tied a blue yarn bow for MM!' },
];

export function InteractiveCards() {
  // Card 1: I Need a Smile
  const [smileIdx, setSmileIdx] = useState(0);
  const [smileBounce, setSmileBounce] = useState(false);

  // Card 2: I Need Some Calm
  const [breathing, setBreathing] = useState(false);
  const [breathTick, setBreathTick] = useState(0);
  const [calmMsgIdx, setCalmMsgIdx] = useState(0);

  // Card 3: Enter the Cat Zone
  const [activeZoneCat, setActiveZoneCat] = useState(MINI_ZONE_CATS[1]);
  const [zoneFactIdx, setZoneFactIdx] = useState(0);
  const [jumpingCatType, setJumpingCatType] = useState(null);

  // Card 4: A Little Sunshine
  const [sunshineIdx, setSunshineIdx] = useState(0);
  const [sunshineAnimKey, setSunshineAnimKey] = useState(0);

  const phaseIdx = Math.floor(breathTick / 4) % BREATH_PHASES.length;
  const secondsLeft = 4 - (breathTick % 4);

  // StrictMode-safe breathing timer
  useEffect(() => {
    if (!breathing) return;
    const interval = setInterval(() => {
      setBreathTick((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [breathing]);

  useEffect(() => {
    if (breathing && breathTick > 0 && breathTick % 12 === 0) {
      setCalmMsgIdx((m) => (m + 1) % NEED_RIGHT_NOW.calmMessages.length);
    }
  }, [breathing, breathTick]);

  const currentSmile = NEED_RIGHT_NOW.smileMemes[smileIdx];
  const currentPhase = BREATH_PHASES[phaseIdx];

  const nextSmile = () => {
    setSmileIdx((prev) => (prev + 1) % NEED_RIGHT_NOW.smileMemes.length);
    setSmileBounce(true);
    soundEngine.playCatChirp();
    setTimeout(() => setSmileBounce(false), 550);
  };

  const handleZoneCatClick = (cat) => {
    setActiveZoneCat(cat);
    setJumpingCatType(cat.type);
    setZoneFactIdx((prev) => (prev + 1) % NEED_RIGHT_NOW.catZoneFacts.length);
    soundEngine.playCatChirp();
    setTimeout(() => setJumpingCatType(null), 600);
  };

  const nextSunshine = () => {
    setSunshineIdx((prev) => (prev + 1) % NEED_RIGHT_NOW.sunshineCompliments.length);
    setSunshineAnimKey((k) => k + 1);
    soundEngine.playBloom();
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFFDF3] via-[#D9F0FF]/35 to-[#FFFDF3]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#FFF3B0] text-[#7D5810] text-xs font-extrabold uppercase tracking-wider mb-3">
            Pick Your Mood Boost
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-3">
            {NEED_RIGHT_NOW.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#536A7E] font-semibold">
            {NEED_RIGHT_NOW.subheading}
          </p>
        </div>

        {/* 4 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* CARD 1: I Need a Smile */}
          <article className="bg-white rounded-[2rem] border-2 border-[#FFF3B0] shadow-md hover:shadow-xl transition-shadow p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#FFD95A] flex items-center justify-center text-[#2A3B4C] shadow-xs">
                    <Smile className="w-5 h-5" />
                  </span>
                  <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C]">
                    I Need a Smile
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF3B0] text-[#7D5810]">
                  #{smileIdx + 1} / {NEED_RIGHT_NOW.smileMemes.length}
                </span>
              </div>

              {/* Cat Meme Frame */}
              <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF3] to-[#FFF3B0]/65 border border-[#FFD95A]/60 p-5 text-center mb-4">
                <div className={`inline-block mb-2 ${smileBounce ? 'animate-cat-wiggle' : ''}`}>
                  <CatIllustration type={currentSmile.catType} className="w-32 h-32 mx-auto" />
                </div>
                <p className="font-storybook text-lg font-bold text-[#2A3B4C] mb-2">
                  “{currentSmile.caption}”
                </p>
                <p className="text-sm font-bold text-[#3A7CA5] bg-white/80 rounded-xl px-3 py-1.5 inline-block">
                  {currentSmile.oneLiner}
                </p>
              </div>

              <p className="text-sm font-semibold text-[#536A7E] text-center mb-5">
                {currentSmile.cheer}
              </p>
            </div>

            <button
              type="button"
              onClick={nextSmile}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Give me another smile!</span>
            </button>
          </article>

          {/* CARD 2: I Need Some Calm */}
          <article className="relative overflow-hidden rounded-[2rem] border-2 border-[#A9DDF5] shadow-md hover:shadow-xl transition-shadow p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-[#A9DDF5]/70 via-[#D9F0FF]/80 to-[#FFFDF3]">
            {/* Drifting background clouds */}
            <div className="pointer-events-none absolute top-4 right-4 animate-cloud-drift opacity-80">
              <FluffyCloud className="w-24 h-auto" />
            </div>
            <div
              className="pointer-events-none absolute top-16 left-4 animate-cloud-drift opacity-65"
              style={{ animationDelay: '-7s' }}
            >
              <FluffyCloud className="w-20 h-auto" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-10 h-10 rounded-2xl bg-white/90 flex items-center justify-center text-[#2F6F97] shadow-xs">
                  <Wind className="w-5 h-5" />
                </span>
                <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C]">
                  I Need Some Calm
                </h3>
              </div>

              {/* Breathing Exercise Circle */}
              <div className="flex flex-col items-center justify-center py-5">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFF3B0] via-[#FFD95A] to-[#A9DDF5] border-4 border-white shadow-lg flex flex-col items-center justify-center text-center"
                    style={{
                      transform: breathing ? `scale(${currentPhase.scale})` : 'scale(1)',
                      transition: 'transform 3.8s ease-in-out',
                    }}
                  >
                    <span className="font-storybook text-xs font-bold text-[#2A3B4C] px-1">
                      {breathing ? currentPhase.label : 'Ready, MM?'}
                    </span>
                    {breathing && (
                      <span className="text-lg font-extrabold text-[#2F6F97]">{secondsLeft}s</span>
                    )}
                  </div>
                </div>
                <p className="text-xs font-bold text-[#2F6F97] mt-3 min-h-[1.25rem]">
                  {breathing ? currentPhase.hint : 'Tap start for a gentle 4-4-4 breathing pause'}
                </p>
              </div>

              {/* Calming Message */}
              <div className="bg-white/85 backdrop-blur-xs rounded-2xl p-3.5 text-center border border-[#A9DDF5]/60 mb-4">
                <p className="text-sm font-bold text-[#2A3B4C]">
                  {NEED_RIGHT_NOW.calmMessages[calmMsgIdx]}
                </p>
              </div>
            </div>

            {/* Peaceful mini Chafa garden silhouette along bottom + controls */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <div className="flex items-end gap-1 pointer-events-none" aria-hidden="true">
                <ChafaFlower size={34} variant={0} />
                <ChafaFlower size={28} variant={2} />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    setCalmMsgIdx((m) => (m + 1) % NEED_RIGHT_NOW.calmMessages.length);
                  }}
                  className="px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#2F6F97] text-xs font-bold border border-[#A9DDF5] cursor-pointer"
                >
                  New thought
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSoftClick();
                    if (!breathing) {
                      setBreathTick(0);
                    }
                    setBreathing((b) => !b);
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#3A7CA5] hover:bg-[#2F688B] text-white font-storybook font-bold text-sm shadow-sm cursor-pointer transition-colors"
                >
                  {breathing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{breathing ? 'Pause' : 'Start Breathing'}</span>
                </button>
              </div>
            </div>
          </article>

          {/* CARD 3: Enter the Cat Zone */}
          <article className="bg-white rounded-[2rem] border-2 border-[#A9DDF5] shadow-md hover:shadow-xl transition-shadow p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#D9F0FF] flex items-center justify-center text-[#2F6F97] shadow-xs">
                    <Cat className="w-5 h-5" />
                  </span>
                  <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C]">
                    Enter the Cat Zone
                  </h3>
                </div>
                <ButterflySVG className="w-9 h-9" variant={1} />
              </div>

              {/* Interactive Mini Cat Playground */}
              <div className="rounded-3xl bg-gradient-to-b from-[#D9F0FF]/55 to-[#FFF3B0]/45 border border-[#A9DDF5]/60 p-4 mb-4">
                <p className="text-xs font-bold text-[#3A7CA5] text-center mb-3">
                  Tap any cat below to play & hear a random cat fact!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {MINI_ZONE_CATS.map((cat) => {
                    const isSelected = activeZoneCat.type === cat.type;
                    const isJumping = jumpingCatType === cat.type;
                    return (
                      <button
                        key={cat.type}
                        type="button"
                        onClick={() => handleZoneCatClick(cat)}
                        aria-label={`Pet ${cat.name} the cat`}
                        className={`p-1.5 rounded-2xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] ${
                          isSelected
                            ? 'bg-white ring-2 ring-[#FFD95A] shadow-sm scale-105'
                            : 'bg-white/60 hover:bg-white'
                        } ${isJumping ? 'animate-cat-jump' : ''}`}
                      >
                        <CatIllustration type={cat.type} className="w-14 h-14 sm:w-16 sm:h-16" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reaction & Fact Box */}
              <div className="rounded-2xl bg-[#FFFDF3] border border-[#FFF3B0] p-3.5 mb-5">
                <p className="font-storybook text-sm font-bold text-[#2A3B4C] mb-1">
                  {activeZoneCat.name}: “{activeZoneCat.msg}”
                </p>
                <p className="text-xs sm:text-sm font-semibold text-[#536A7E]">
                  <span className="text-[#9A6F14] font-extrabold">Cat Fact:</span>{' '}
                  {NEED_RIGHT_NOW.catZoneFacts[zoneFactIdx]}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playSoftClick();
                document.getElementById('cat-universe')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#D9F0FF] hover:bg-[#A9DDF5] text-[#2A3B4C] font-storybook font-bold border-2 border-[#A9DDF5] transition-colors cursor-pointer"
            >
              <span>Visit Full Cat Universe (10 Cats!)</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </article>

          {/* CARD 4: A Little Sunshine */}
          <article className="relative overflow-hidden rounded-[2rem] border-2 border-[#FFD95A] shadow-md hover:shadow-xl transition-shadow p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br from-[#FFFDF3] via-[#FFF3B0]/55 to-[#FFD95A]/30">
            <div className="pointer-events-none absolute -top-5 -right-5 opacity-75">
              <RadiantSun className="w-24 h-24" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-2xl bg-[#FFD95A] flex items-center justify-center text-[#7D5810] shadow-xs">
                    <Sun className="w-5 h-5" />
                  </span>
                  <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C]">
                    A Little Sunshine
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-[#7D5810] border border-[#E6B84A]/50">
                  Ray {sunshineIdx + 1} / {NEED_RIGHT_NOW.sunshineCompliments.length}
                </span>
              </div>

              {/* Illuminated Compliment Display with Yellow Chafa */}
              <div
                key={sunshineAnimKey}
                className="rounded-3xl bg-white/90 border border-[#FFD95A] p-6 text-center shadow-xs mb-6 animate-bloom"
              >
                <div className="flex justify-center mb-3">
                  <ChafaFlower size={62} variant={sunshineIdx % 3} withStem={false} />
                </div>
                <p className="font-storybook text-lg sm:text-xl font-bold text-[#2A3B4C] leading-relaxed">
                  {NEED_RIGHT_NOW.sunshineCompliments[sunshineIdx]}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={nextSunshine}
              className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-sm active:scale-98 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#8A6112]" />
              <span>Reveal another sunshine note</span>
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
