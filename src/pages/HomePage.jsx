import React, { useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../config/settings';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { soundEngine } from '../utils/soundEngine';
import { Navbar } from '../components/Navbar';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { LetterSection } from '../components/LetterSection';
import { InteractiveCards } from '../components/InteractiveCards';
import { CatUniverse } from '../components/CatUniverse';
import { ChafaGarden } from '../components/ChafaGarden';
import { ColorPopGame } from '../components/ColorPopGame';
import { ColorConnectGame } from '../components/ColorConnectGame';
import { SurpriseGenerator } from '../components/SurpriseGenerator';
import { FinalScreen } from '../components/FinalScreen';
import { BackToTop } from '../components/BackToTop';

export function HomePage() {
  const [isEntered, setIsEntered] = useState(() =>
    loadFromStorage(STORAGE_KEYS.WELCOME_OPENED, false)
  );
  // Sound is ALWAYS disabled by default on fresh visits
  const [soundEnabled, setSoundEnabled] = useState(DEFAULT_SETTINGS.soundEnabled);

  useEffect(() => {
    soundEngine.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEngine.setEnabled(next);
      if (next) soundEngine.playSoftClick();
      return next;
    });
  };

  const handleOpenSurprise = () => {
    setIsEntered(true);
    saveToStorage(STORAGE_KEYS.WELCOME_OPENED, true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF3] text-[#2A3B4C]">
      {isEntered && (
        <Navbar
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      <main className="flex-1">
        <WelcomeScreen
          isEntered={isEntered}
          onOpenSurprise={handleOpenSurprise}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />

        {isEntered && (
          <>
            <LetterSection />
            <InteractiveCards />
            <CatUniverse />
            <ChafaGarden />
            <ColorPopGame />
            <ColorConnectGame />
            <SurpriseGenerator />
            <FinalScreen />
          </>
        )}
      </main>

      {isEntered && <BackToTop />}
    </div>
  );
}
