import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle({ enabled, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={enabled ? 'Mute subtle sound effects' : 'Enable subtle sound effects'}
      aria-pressed={enabled}
      title={enabled ? 'Sound On' : 'Sound Off (Muted by default)'}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3A7CA5] ${
        enabled
          ? 'bg-[#FFD95A] text-[#2A3B4C] border-[#E6B84A] shadow-sm'
          : 'bg-white/85 text-[#536A7E] border-[#A9DDF5] hover:bg-[#D9F0FF]/70'
      } ${className}`}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      <span className="hidden sm:inline">{enabled ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
}
