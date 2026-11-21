import React, { useMemo } from 'react';
import { ChafaPetal } from '../assets/ChafaFlowerSVG';

export function FloatingPetals({ count = 12, className = '' }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + ((i * 17) % 7)}%`,
      delay: `${(i * 1.15) % 9}s`,
      duration: `${9 + (i % 6) * 2.2}s`,
      size: i % 3 === 0 ? 'w-4 h-6' : i % 3 === 1 ? 'w-3.5 h-5' : 'w-5 h-7',
      rotate: (i * 47) % 360,
    }));
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-10"
          style={{
            left: petal.left,
            animation: `petalFall ${petal.duration} linear ${petal.delay} infinite`,
          }}
        >
          <ChafaPetal className={petal.size} rotate={petal.rotate} />
        </div>
      ))}
    </div>
  );
}
