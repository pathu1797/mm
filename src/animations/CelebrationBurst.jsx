import React, { useMemo } from 'react';
import { ChampakPetal } from '../assets/ChampakFlowerSVG';

export function CelebrationBurst({ active, burstKey = 0 }) {
  const particles = useMemo(() => {
    if (!active) return [];
    return Array.from({ length: 28 }, (_, i) => {
      const angle = (i / 28) * Math.PI * 2;
      const dist = 90 + (i % 5) * 42;
      return {
        id: `${burstKey}-${i}`,
        tx: `${Math.round(Math.cos(angle) * dist)}px`,
        ty: `${Math.round(Math.sin(angle) * dist - 60)}px`,
        rot: `${Math.round(((i % 2 === 0 ? 1 : -1) * (140 + i * 18)))}deg`,
        delay: `${(i % 7) * 0.04}s`,
        isPetal: i % 2 === 0,
        color: i % 3 === 0 ? '#FFD95A' : i % 3 === 1 ? '#A9DDF5' : '#E6B84A',
      };
    });
  }, [active, burstKey]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-20" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            '--tx': p.tx,
            '--ty': p.ty,
            '--rot': p.rot,
            animation: `celebrateFly 1.35s cubic-bezier(0.22, 1, 0.36, 1) ${p.delay} forwards`,
          }}
        >
          {p.isPetal ? (
            <ChampakPetal className="w-5 h-7" />
          ) : (
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                fill={p.color}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
