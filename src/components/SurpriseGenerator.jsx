import React, { useState, useRef } from 'react';
import { Sparkles, Gift } from 'lucide-react';
import { SURPRISE_ITEMS } from '../config/messages';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { RadiantSun, ButterflySVG, PawPrint } from '../assets/SceneDecorations';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { soundEngine } from '../utils/soundEngine';

const SURPRISE_TYPES = [
  'cat',
  'quote',
  'chafa',
  'joke',
  'sunshine',
  'catFact',
  'butterfly',
  'pawPrints',
];

const RANDOM_CAT_TYPES = ['playful', 'waving', 'box', 'orange', 'white', 'yarn'];

export function SurpriseGenerator() {
  const [currentSurprise, setCurrentSurprise] = useState(null);
  const [count, setCount] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const deckRef = useRef([]);

  const drawNextType = () => {
    if (deckRef.current.length === 0) {
      // Shuffled bag so MM sees all 8 surprise types without immediate repeats!
      const fresh = [...SURPRISE_TYPES];
      for (let i = fresh.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [fresh[i], fresh[j]] = [fresh[j], fresh[i]];
      }
      deckRef.current = fresh;
    }
    return deckRef.current.pop();
  };

  const generateSurprise = () => {
    const type = drawNextType();
    const id = Date.now();
    let payload = {};

    switch (type) {
      case 'cat': {
        const catType = RANDOM_CAT_TYPES[Math.floor(Math.random() * RANDOM_CAT_TYPES.length)];
        payload = {
          badge: 'Cute Cat Surprise',
          catType,
          title: 'A tiny cat popped in to say hi, MM!',
          body: 'Sending 100% pure wholesome fluff energy your way right now.',
        };
        soundEngine.playCatChirp();
        break;
      }
      case 'quote': {
        const quote = SURPRISE_ITEMS.quotes[Math.floor(Math.random() * SURPRISE_ITEMS.quotes.length)];
        payload = {
          badge: 'Cheerful Quote',
          title: quote,
          body: 'Pocket this thought for whenever you need a quick boost, MM.',
        };
        soundEngine.playBloom();
        break;
      }
      case 'chafa': {
        payload = {
          badge: 'Blooming Chafa',
          variant: Math.floor(Math.random() * 3),
          title: 'A fresh yellow Chafa just opened for MM!',
          body: 'Imagine that warm golden fragrance drifting on a sunny afternoon breeze.',
        };
        soundEngine.playBloom();
        break;
      }
      case 'joke': {
        const joke = SURPRISE_ITEMS.jokes[Math.floor(Math.random() * SURPRISE_ITEMS.jokes.length)];
        payload = {
          badge: 'Quick Giggle',
          title: joke.setup,
          body: joke.punchline,
        };
        soundEngine.playPop(4);
        break;
      }
      case 'sunshine': {
        payload = {
          badge: 'Animated Sunshine',
          title: 'Emergency Pocket Sunshine Delivered!',
          body: 'Even if today felt cloudy for a bit, here is a bright golden beam just for MM.',
        };
        soundEngine.playBloom();
        break;
      }
      case 'catFact': {
        const fact = SURPRISE_ITEMS.catFacts[Math.floor(Math.random() * SURPRISE_ITEMS.catFacts.length)];
        payload = {
          badge: 'Random Cat Fact',
          title: 'Did you know, MM?',
          body: fact,
        };
        soundEngine.playCatChirp();
        break;
      }
      case 'butterfly': {
        payload = {
          badge: 'Floating Butterflies',
          title: 'A pair of sunny-blue butterflies fluttered by!',
          body: 'Watch them dance for a moment — tiny reminders that calm moments are everywhere.',
        };
        soundEngine.playSoftClick();
        break;
      }
      case 'pawPrints':
      default: {
        payload = {
          badge: 'Playful Paw Trail',
          title: 'Tip-tap, tip-tap... someone walked across the page!',
          body: 'Tiny invisible kittens left golden paw prints across MM’s surprise box.',
        };
        soundEngine.playPop(2);
        break;
      }
    }

    setCurrentSurprise({ id, type, ...payload });
    setCount((c) => c + 1);
    setBurstKey((k) => k + 1);
  };

  return (
    <section
      id="surprises"
      className="relative py-16 sm:py-24 px-4 bg-[#FFFDF3]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-[#D9F0FF] text-[#2F6F97] text-xs font-extrabold uppercase tracking-wider mb-3">
          Mystery Pocket
        </span>
        <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-3">
          {SURPRISE_ITEMS.heading}
        </h2>
        <p className="text-base sm:text-lg text-[#536A7E] font-semibold mb-8">
          {SURPRISE_ITEMS.subheading}
        </p>

        {/* Surprise Stage */}
        <div className="relative rounded-[2.2rem] bg-gradient-to-br from-[#D9F0FF]/55 via-white to-[#FFF3B0]/60 border-2 border-[#A9DDF5] shadow-lg p-6 sm:p-10 min-h-[290px] flex flex-col items-center justify-center overflow-hidden mb-7">
          <CelebrationBurst active={count > 0} burstKey={burstKey} />

          {!currentSurprise ? (
            <div className="animate-float-slow">
              <div className="w-20 h-20 rounded-3xl bg-[#FFD95A] border-2 border-[#E6B84A] flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Gift className="w-10 h-10 text-[#2A3B4C]" />
              </div>
              <p className="font-storybook text-xl font-bold text-[#2A3B4C]">
                Ready for a tiny surprise, MM?
              </p>
              <p className="text-sm font-semibold text-[#536A7E] mt-1">
                Cats, blooming Chafa flowers, jokes, butterflies, sunshine & more!
              </p>
            </div>
          ) : (
            <div key={currentSurprise.id} className="relative z-10 w-full max-w-xl animate-bloom">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD95A] text-[#5C410A] text-xs font-extrabold uppercase tracking-wide mb-4">
                {currentSurprise.badge} #{count}
              </span>

              {/* Visual centerpiece per surprise type */}
              <div className="flex items-center justify-center min-h-[116px] mb-4">
                {currentSurprise.type === 'cat' && (
                  <div className="animate-cat-jump">
                    <CatIllustration type={currentSurprise.catType} className="w-30 h-30" />
                  </div>
                )}

                {currentSurprise.type === 'chafa' && (
                  <div className="animate-bloom">
                    <ChafaFlower size={102} variant={currentSurprise.variant} />
                  </div>
                )}

                {currentSurprise.type === 'sunshine' && (
                  <RadiantSun className="w-28 h-28 drop-shadow-sm" />
                )}

                {currentSurprise.type === 'butterfly' && (
                  <div className="flex items-center gap-6">
                    <ButterflySVG className="w-16 h-16" variant={0} />
                    <ButterflySVG className="w-14 h-14" variant={1} />
                  </div>
                )}

                {currentSurprise.type === 'pawPrints' && (
                  <div className="flex items-center gap-4 sm:gap-6">
                    {[0, 1, 2, 3, 4].map((idx) => (
                      <div
                        key={idx}
                        className="animate-paw-step"
                        style={{
                          animationDelay: `${idx * 0.28}s`,
                          transform: `translateY(${idx % 2 === 0 ? '-10px' : '10px'})`,
                        }}
                      >
                        <PawPrint
                          className="w-9 h-9 sm:w-11 sm:h-11"
                          color={idx % 2 === 0 ? '#E6B84A' : '#5FA8D3'}
                          rotate={idx % 2 === 0 ? 20 : -15}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {(currentSurprise.type === 'quote' ||
                  currentSurprise.type === 'joke' ||
                  currentSurprise.type === 'catFact') && (
                  <div className="flex items-center gap-3">
                    <ChafaFlower size={54} withStem={false} sway={false} />
                    <CatIllustration
                      type={currentSurprise.type === 'joke' ? 'mischievous' : 'waving'}
                      className="w-24 h-24"
                    />
                  </div>
                )}
              </div>

              <h3 className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C] mb-2">
                {currentSurprise.title}
              </h3>
              <p className="text-base sm:text-lg font-bold text-[#3A7CA5]">
                {currentSurprise.body}
              </p>
            </div>
          )}
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={generateSurprise}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] active:scale-95 text-[#2A3B4C] font-storybook text-xl font-bold border-2 border-[#E6B84A] shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
        >
          <Sparkles className="w-5 h-5 text-[#8A6112]" />
          <span>{SURPRISE_ITEMS.buttonText}</span>
        </button>
      </div>
    </section>
  );
}
