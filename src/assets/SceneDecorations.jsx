import React from 'react';

export function RadiantSun({ className = 'w-20 h-20' }) {
  return (
    <svg viewBox="0 0 120 120" className={`animate-sun ${className}`} aria-hidden="true">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="60"
          y1="10"
          x2="60"
          y2="24"
          stroke="#FFD95A"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${angle} 60 60)`}
        />
      ))}
      <circle cx="60" cy="60" r="30" fill="#FFD95A" stroke="#E6B84A" strokeWidth="3" />
      <circle cx="60" cy="60" r="22" fill="#FFF3B0" opacity="0.65" />
      {/* Gentle cheerful smile */}
      <circle cx="51" cy="56" r="2.6" fill="#7A5610" />
      <circle cx="69" cy="56" r="2.6" fill="#7A5610" />
      <path d="M52 65 Q60 72 68 65" fill="none" stroke="#7A5610" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function FluffyCloud({ className = 'w-28 h-16', opacity = 0.92 }) {
  return (
    <svg viewBox="0 0 140 76" className={className} style={{ opacity }} aria-hidden="true">
      <path
        d="M32 62 H108 C122 62 132 52 132 40 C132 29 123 20 112 19 C108 8 96 2 84 6 C76 1 62 2 54 11 C40 9 28 19 27 32 C16 34 8 43 8 52 C8 58 18 62 32 62 Z"
        fill="#FFFFFF"
        stroke="#D9F0FF"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function PawPrint({ className = 'w-7 h-7', color = '#E6B84A', rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <ellipse cx="24" cy="31" rx="10" ry="8.5" fill={color} />
      <ellipse cx="12" cy="20" rx="4.2" ry="5.5" transform="rotate(-18 12 20)" fill={color} />
      <ellipse cx="20" cy="14" rx="4.2" ry="5.8" transform="rotate(-6 20 14)" fill={color} />
      <ellipse cx="29" cy="14" rx="4.2" ry="5.8" transform="rotate(6 29 14)" fill={color} />
      <ellipse cx="37" cy="20" rx="4.2" ry="5.5" transform="rotate(18 37 20)" fill={color} />
    </svg>
  );
}

export function ButterflySVG({ className = 'w-10 h-10', variant = 0 }) {
  const wingA = variant % 2 === 0 ? '#FFD95A' : '#A9DDF5';
  const wingB = variant % 2 === 0 ? '#A9DDF5' : '#FFD95A';
  return (
    <svg viewBox="0 0 64 56" className={`animate-butterfly ${className}`} aria-hidden="true">
      <ellipse cx="20" cy="20" rx="14" ry="11" fill={wingA} stroke="#3A7CA5" strokeWidth="1.5" transform="rotate(-22 20 20)" />
      <ellipse cx="44" cy="20" rx="14" ry="11" fill={wingA} stroke="#3A7CA5" strokeWidth="1.5" transform="rotate(22 44 20)" />
      <ellipse cx="22" cy="36" rx="10" ry="8" fill={wingB} stroke="#C48F1D" strokeWidth="1.4" transform="rotate(14 22 36)" />
      <ellipse cx="42" cy="36" rx="10" ry="8" fill={wingB} stroke="#C48F1D" strokeWidth="1.4" transform="rotate(-14 42 36)" />
      <rect x="30" y="14" width="4" height="28" rx="2" fill="#2A3B4C" />
      <path d="M31 15 Q26 7 22 9 M33 15 Q38 7 42 9" fill="none" stroke="#2A3B4C" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function FishTreatSVG({ className = 'w-9 h-6' }) {
  return (
    <svg viewBox="0 0 64 38" className={className} aria-hidden="true">
      <path d="M14 19 C22 6, 44 6, 56 19 C44 32, 22 32, 14 19 Z" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="2.2" />
      <polygon points="16,19 4,9 4,29" fill="#FFD95A" stroke="#C48F1D" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="44" cy="16" r="2.5" fill="#2A3B4C" />
      <path d="M30 13 Q34 19 30 25" fill="none" stroke="#3A7CA5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AnimatedEnvelope({ isOpen = false, className = 'w-48 h-36' }) {
  return (
    <svg viewBox="0 0 220 164" className={className} aria-hidden="true">
      {/* Envelope shadow */}
      <ellipse cx="110" cy="154" rx="84" ry="8" fill="#89C2E0" opacity="0.35" />

      {/* Back body */}
      <rect x="20" y="48" width="180" height="100" rx="12" fill="#FFF3B0" stroke="#E6B84A" strokeWidth="3" />

      {/* Sliding letter inside */}
      <g
        style={{
          transform: isOpen ? 'translateY(-36px)' : 'translateY(6px)',
          transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <rect x="34" y="54" width="152" height="82" rx="8" fill="#FFFDF3" stroke="#A9DDF5" strokeWidth="2.5" />
        <text x="110" y="84" textAnchor="middle" fill="#2A3B4C" fontSize="15" fontWeight="700" fontFamily="Fredoka, sans-serif">
          For MM
        </text>
        <line x1="60" y1="98" x2="160" y2="98" stroke="#D9F0FF" strokeWidth="4" strokeLinecap="round" />
        <line x1="74" y1="110" x2="146" y2="110" stroke="#FFF3B0" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* Envelope front pocket */}
      <path d="M20 58 L110 112 L200 58 L200 138 Q200 148 190 148 L30 148 Q20 148 20 138 Z" fill="#FFFDF3" stroke="#E6B84A" strokeWidth="3" />
      <path d="M24 144 L86 98 M196 144 L134 98" stroke="#F0D075" strokeWidth="2" />

      {/* Animated top flap */}
      <g
        style={{
          transformOrigin: '110px 48px',
          transform: isOpen ? 'rotateX(175deg)' : 'rotateX(0deg)',
          transition: 'transform 0.55s ease-in-out',
        }}
      >
        <path
          d="M22 50 Q22 48 32 48 L188 48 Q198 48 198 50 L110 106 Z"
          fill="#FFD95A"
          stroke="#E6B84A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Golden Chafa seal */}
      <g
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? 'scale(0.5)' : 'scale(1)',
          transformOrigin: '110px 102px',
          transition: 'all 0.35s ease',
        }}
      >
        <circle cx="110" cy="102" r="16" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="2.2" />
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="110" cy="95" rx="3" ry="7.5" fill="#FFD95A" transform={`rotate(${a} 110 102)`} />
        ))}
        <circle cx="110" cy="102" r="3.5" fill="#E6B84A" />
      </g>
    </svg>
  );
}
