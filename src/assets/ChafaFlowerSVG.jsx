import React from 'react';

/**
 * Custom SVG illustrations of Yellow Chafa (Magnolia champaca)
 * Features characteristic elongated, gently curved golden-yellow tepals & lush dark-green leaves.
 */

export function ChafaPetal({ className = 'w-5 h-5', rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 28 52"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chafaPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="55%" stopColor="#FFD95A" />
          <stop offset="100%" stopColor="#E6B84A" />
        </linearGradient>
      </defs>
      <path
        d="M14 2 C22 14, 24 34, 14 50 C4 34, 6 14, 14 2 Z"
        fill="url(#chafaPetalGrad)"
        stroke="#D4A22C"
        strokeWidth="1"
      />
      <path d="M14 8 C15 20, 15 34, 14 45" stroke="#FFF9D6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

export function ChafaFlower({
  size = 84,
  variant = 0,
  withStem = true,
  sway = true,
  className = '',
}) {
  const uid = `chafa-${variant}-${size}`;
  const tilt = variant % 3 === 0 ? 0 : variant % 3 === 1 ? -6 : 6;

  return (
    <svg
      width={size}
      height={withStem ? size * 1.25 : size}
      viewBox={withStem ? '0 0 120 150' : '0 0 120 120'}
      className={`${sway ? 'animate-sway' : ''} ${className}`}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-outer`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF5B8" />
          <stop offset="50%" stopColor="#FFD95A" />
          <stop offset="100%" stopColor="#E0A92E" />
        </linearGradient>
        <linearGradient id={`${uid}-inner`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE680" />
          <stop offset="65%" stopColor="#F5BD38" />
          <stop offset="100%" stopColor="#C98A18" />
        </linearGradient>
        <linearGradient id={`${uid}-leaf`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DBE7E" />
          <stop offset="100%" stopColor="#468550" />
        </linearGradient>
      </defs>

      {withStem && (
        <g>
          {/* Graceful stem */}
          <path
            d="M60 72 Q58 108 60 146"
            stroke="#4E8A55"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Elongated glossy Chafa leaves */}
          <path
            d="M59 114 C34 102, 18 112, 14 128 C30 132, 46 126, 59 116 Z"
            fill={`url(#${uid}-leaf)`}
            stroke="#396E41"
            strokeWidth="1.2"
          />
          <path d="M56 115 Q38 118 22 125" stroke="#A6DDA7" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          <path
            d="M61 102 C86 88, 104 98, 108 114 C92 120, 75 114, 61 105 Z"
            fill={`url(#${uid}-leaf)`}
            stroke="#396E41"
            strokeWidth="1.2"
          />
          <path d="M64 103 Q82 104 100 111" stroke="#A6DDA7" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      )}

      {/* Magnolia champaca blossom: layered elongated star-like golden tepals */}
      <g transform={`translate(60, 56) rotate(${tilt})`}>
        {/* Outer spreading elongated petals (7 tepals) */}
        {[0, 51, 102, 154, 205, 257, 308].map((angle, i) => (
          <g key={`outer-${i}`} transform={`rotate(${angle})`}>
            <path
              d="M0 -5 C9 -18, 10 -38, 0 -52 C-10 -38, -9 -18, 0 -5 Z"
              fill={`url(#${uid}-outer)`}
              stroke="#D8A328"
              strokeWidth="1.1"
            />
            <path
              d="M0 -10 C2 -22, 2 -34, 0 -46"
              stroke="#FFFBE0"
              strokeWidth="1.1"
              opacity="0.7"
              fill="none"
            />
          </g>
        ))}

        {/* Inner cupped elongated petals (6 tepals, offset) */}
        {[25, 85, 145, 205, 265, 325].map((angle, i) => (
          <g key={`inner-${i}`} transform={`rotate(${angle})`}>
            <path
              d="M0 -3 C7 -14, 7 -29, 0 -38 C-7 -29, -7 -14, 0 -3 Z"
              fill={`url(#${uid}-inner)`}
              stroke="#C9911E"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Warm golden center cone (distinctive Chafa carpel bud) */}
        <circle cx="0" cy="0" r="8.5" fill="#E6A922" stroke="#B87D14" strokeWidth="1" />
        <ellipse cx="0" cy="-2" rx="4.5" ry="6" fill="#FFE680" opacity="0.9" />
        <circle cx="-2.5" cy="1.5" r="1.4" fill="#FFFDF3" />
        <circle cx="2.5" cy="1" r="1.2" fill="#FFFDF3" />
        <circle cx="0" cy="-3" r="1.4" fill="#C48616" />
      </g>
    </svg>
  );
}

export function ChafaTree({ className = 'w-44 h-44' }) {
  return (
    <svg viewBox="0 0 220 210" className={className} aria-hidden="true">
      {/* Trunk & branches */}
      <path
        d="M102 198 Q106 150 100 112 Q95 92 78 78 M118 198 Q114 148 122 110 Q128 92 146 76"
        stroke="#8B6B4A"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M96 198 L124 198 L118 115 L102 115 Z" fill="#8B6B4A" />
      {/* Canopy */}
      <circle cx="72" cy="84" r="42" fill="#63A86A" />
      <circle cx="148" cy="84" r="40" fill="#589C60" />
      <circle cx="110" cy="58" r="48" fill="#74B97B" />
      <circle cx="110" cy="86" r="38" fill="#67AD6E" />
      {/* Mini golden Chafa blossoms in canopy */}
      {[
        { x: 64, y: 74, s: 0.24 },
        { x: 105, y: 42, s: 0.26 },
        { x: 146, y: 70, s: 0.23 },
        { x: 86, y: 92, s: 0.22 },
        { x: 132, y: 96, s: 0.22 },
        { x: 122, y: 62, s: 0.2 },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x}, ${b.y}) scale(${b.s})`}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              rx="10"
              ry="34"
              fill="#FFD95A"
              stroke="#E6B84A"
              strokeWidth="2"
              transform={`rotate(${a}) translate(0 -16)`}
            />
          ))}
          <circle r="10" fill="#E6B84A" />
        </g>
      ))}
    </svg>
  );
}
