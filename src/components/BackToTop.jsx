import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#FFD95A] hover:bg-[#FFE480] text-[#2A3B4C] border-2 border-[#E6B84A] shadow-lg flex items-center justify-center transition-transform hover:-translate-y-1 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5]"
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
