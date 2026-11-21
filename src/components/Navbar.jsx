import React, { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { NAV_SECTIONS } from '../config/settings';
import { SoundToggle } from './SoundToggle';
import { ChampakFlower } from '../assets/ChampakFlowerSVG';

export function Navbar({ soundEnabled, onToggleSound, onGoHome }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);

      // Determine active section
      const offsets = NAV_SECTIONS.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return { id: sec.id, top: Infinity };
        return { id: sec.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0]) setActiveId(offsets[0].id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (id === 'home') {
      onGoHome?.();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFFDF3]/90 border-b border-[#A9DDF5]/60 shadow-sm">
      <nav
        aria-label="Primary Navigation"
        className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2"
      >
        {/* Brand / Home button */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] rounded-xl px-1.5 py-1"
          aria-label="Go to Home - A Little Place for MM"
        >
          <ChampakFlower size={30} withStem={false} sway={false} className="transition-transform group-hover:rotate-12" />
          <div className="leading-tight">
            <span className="font-storybook text-base sm:text-lg font-bold text-[#2A3B4C] block">
              A Little Place for MM
            </span>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeId === sec.id;
            return (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] ${
                    isActive
                      ? 'bg-[#FFD95A] text-[#2A3B4C] shadow-xs'
                      : 'text-[#3C546B] hover:bg-[#D9F0FF]/70 hover:text-[#2A3B4C]'
                  }`}
                >
                  {sec.id === 'home' ? (
                    <span className="inline-flex items-center gap-1">
                      <Home className="w-3.5 h-3.5" />
                      {sec.label}
                    </span>
                  ) : (
                    sec.label
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <SoundToggle enabled={soundEnabled} onToggle={onToggleSound} />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-xl bg-[#D9F0FF]/70 text-[#2A3B4C] hover:bg-[#FFD95A] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Subtle scroll progress bar */}
      <div className="h-1 w-full bg-[#D9F0FF]/60 overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-[#A9DDF5] via-[#FFD95A] to-[#E6B84A] transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Collapsible mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFFDF3] border-b border-[#A9DDF5] px-4 py-3 shadow-md">
          <ul className="grid grid-cols-2 gap-2">
            {NAV_SECTIONS.map((sec) => (
              <li key={sec.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(sec.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-sm font-bold transition-colors cursor-pointer ${
                    activeId === sec.id
                      ? 'bg-[#FFD95A] text-[#2A3B4C]'
                      : 'bg-[#D9F0FF]/45 text-[#2A3B4C] hover:bg-[#FFF3B0]'
                  }`}
                >
                  {sec.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
