import React from 'react';

/**
 * 13 Distinct Custom Illustrated Cartoon Cats for MM
 * Wholesome storybook style in warm creams, golden oranges, snowy whites, soft slate-blues, and sunshine yellows.
 * Strictly zero red or pink hues — inner ears & noses use warm honey-apricot and golden tones.
 */

export function CatIllustration({ type = 'waving', className = 'w-28 h-28', animate = true }) {
  switch (type) {
    case 'sleeping':
      return <SleepingCat className={className} animate={animate} />;
    case 'playful':
      return <PlayfulKitten className={className} animate={animate} />;
    case 'white':
      return <FluffyWhiteCat className={className} animate={animate} />;
    case 'orange':
      return <OrangeCat className={className} animate={animate} />;
    case 'box':
      return <BoxCat className={className} animate={animate} />;
    case 'butterfly':
      return <ButterflyCat className={className} animate={animate} />;
    case 'yarn':
      return <YarnCat className={className} animate={animate} />;
    case 'tree':
      return <TreeNapCat className={className} animate={animate} />;
    case 'waving':
      return <WavingCat className={className} animate={animate} />;
    case 'mischievous':
      return <MischievousCat className={className} animate={animate} />;
    case 'textbook':
      return <TextbookCat className={className} animate={animate} />;
    case 'books':
      return <BooksCat className={className} animate={animate} />;
    case 'cheering':
      return <CheeringCat className={className} animate={animate} />;
    default:
      return <WavingCat className={className} animate={animate} />;
  }
}

// 1. Sleeping Cat (Mochi)
function SleepingCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 120" className={className} aria-hidden="true">
      {/* Cozy cushion */}
      <ellipse cx="70" cy="96" rx="54" ry="16" fill="#D9F0FF" stroke="#A9DDF5" strokeWidth="2.5" />
      {/* Curled body */}
      <ellipse cx="72" cy="80" rx="40" ry="24" fill="#FFF4D2" stroke="#D4B475" strokeWidth="2.5" />
      {/* Tail curled around */}
      <path d="M108 82 Q122 92 98 98 Q82 101 66 96" fill="none" stroke="#E6C37A" strokeWidth="9" strokeLinecap="round" />
      {/* Head resting */}
      <circle cx="48" cy="72" r="21" fill="#FFF8E3" stroke="#D4B475" strokeWidth="2.5" />
      {/* Ears */}
      <path d="M32 58 L28 40 L44 52 Z" fill="#FFF8E3" stroke="#D4B475" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M56 52 L66 38 L67 57 Z" fill="#FFF8E3" stroke="#D4B475" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M33 54 L31 45 L40 52 Z" fill="#F5C97B" />
      <path d="M58 52 L64 43 L64 54 Z" fill="#F5C97B" />
      {/* Happy closed eyes */}
      <path d="M37 73 Q42 78 46 73" fill="none" stroke="#2A3B4C" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M51 73 Q56 78 60 73" fill="none" stroke="#2A3B4C" strokeWidth="2.3" strokeLinecap="round" />
      {/* Tiny nose & smile */}
      <polygon points="48,77 45.5,79.5 50.5,79.5" fill="#E6A940" />
      <path d="M44 82 Q48 85 52 82" fill="none" stroke="#2A3B4C" strokeWidth="1.8" strokeLinecap="round" />
      {/* Floating Zzz */}
      <g className={animate ? 'animate-float-slow' : ''}>
        <text x="84" y="48" fill="#3A7CA5" fontSize="14" fontWeight="800" fontFamily="Fredoka, sans-serif">z</text>
        <text x="95" y="37" fill="#5FA8D3" fontSize="17" fontWeight="800" fontFamily="Fredoka, sans-serif">z</text>
        <text x="108" y="25" fill="#E6B84A" fontSize="20" fontWeight="800" fontFamily="Fredoka, sans-serif">Z</text>
      </g>
    </svg>
  );
}

// 2. Playful Kitten (Pip)
function PlayfulKitten({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <ellipse cx="70" cy="116" rx="34" ry="8" fill="#A9DDF5" opacity="0.45" />
      {/* Tail */}
      <path
        d="M96 86 Q120 70 116 48"
        fill="none"
        stroke="#F6C86E"
        strokeWidth="9"
        strokeLinecap="round"
        className={animate ? 'animate-tail' : ''}
      />
      {/* Body */}
      <ellipse cx="70" cy="86" rx="28" ry="26" fill="#FFE699" stroke="#D9A73E" strokeWidth="2.5" />
      {/* Belly */}
      <ellipse cx="70" cy="91" rx="16" ry="15" fill="#FFFDF3" />
      {/* Head */}
      <circle cx="70" cy="52" r="24" fill="#FFE699" stroke="#D9A73E" strokeWidth="2.5" />
      {/* Ears */}
      <path d="M49 39 L44 18 L63 31 Z" fill="#FFE699" stroke="#D9A73E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M91 39 L96 18 L77 31 Z" fill="#FFE699" stroke="#D9A73E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M51 35 L48 24 L59 31 Z" fill="#F2B852" />
      <path d="M89 35 L92 24 L81 31 Z" fill="#F2B852" />
      {/* Big sparkling kitten eyes */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="60" cy="51" r="5" fill="#2A3B4C" />
        <circle cx="80" cy="51" r="5" fill="#2A3B4C" />
        <circle cx="58.5" cy="49" r="1.8" fill="#FFFFFF" />
        <circle cx="78.5" cy="49" r="1.8" fill="#FFFFFF" />
      </g>
      {/* Cute smile */}
      <polygon points="70,56 67.5,58.5 72.5,58.5" fill="#D98B2B" />
      <path d="M64 61 Q70 66 76 61" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Raised playful paws */}
      <ellipse cx="44" cy="76" rx="8" ry="10" transform="rotate(-30 44 76)" fill="#FFFDF3" stroke="#D9A73E" strokeWidth="2.2" />
      <ellipse cx="96" cy="76" rx="8" ry="10" transform="rotate(30 96 76)" fill="#FFFDF3" stroke="#D9A73E" strokeWidth="2.2" />
      {/* Sparkles */}
      <path d="M24 34 L27 26 L30 34 L38 37 L30 40 L27 48 L24 40 L16 37 Z" fill="#FFD95A" />
      <circle cx="114" cy="28" r="3.5" fill="#A9DDF5" />
    </svg>
  );
}

// 3. Fluffy White Cat (Cloud)
function FluffyWhiteCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <ellipse cx="70" cy="115" rx="40" ry="9" fill="#A9DDF5" opacity="0.45" />
      {/* Super fluffy tail */}
      <path
        d="M98 92 Q126 84 122 58 Q118 46 108 54"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="14"
        strokeLinecap="round"
        className={animate ? 'animate-tail' : ''}
      />
      <path
        d="M98 92 Q126 84 122 58 Q118 46 108 54"
        fill="none"
        stroke="#B8D8EB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Cloud-fluff body */}
      <circle cx="52" cy="90" r="20" fill="#FFFFFF" stroke="#B8D8EB" strokeWidth="2.3" />
      <circle cx="88" cy="90" r="20" fill="#FFFFFF" stroke="#B8D8EB" strokeWidth="2.3" />
      <circle cx="70" cy="86" r="26" fill="#FFFFFF" />
      <path d="M44 106 Q70 116 96 106" fill="none" stroke="#B8D8EB" strokeWidth="2.3" />
      {/* Fluffy head */}
      <circle cx="70" cy="52" r="25" fill="#FFFFFF" stroke="#B8D8EB" strokeWidth="2.5" />
      <circle cx="50" cy="58" r="10" fill="#FFFFFF" />
      <circle cx="90" cy="58" r="10" fill="#FFFFFF" />
      {/* Ears */}
      <path d="M49 36 L45 16 L64 29 Z" fill="#FFFFFF" stroke="#B8D8EB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M91 36 L95 16 L76 29 Z" fill="#FFFFFF" stroke="#B8D8EB" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M51 33 L49 22 L60 29 Z" fill="#FFF3B0" />
      <path d="M89 33 L91 22 L80 29 Z" fill="#FFF3B0" />
      {/* Sky blue bow collar */}
      <path d="M56 75 L70 80 L56 85 Z" fill="#A9DDF5" stroke="#5FA8D3" strokeWidth="1.6" />
      <path d="M84 75 L70 80 L84 85 Z" fill="#A9DDF5" stroke="#5FA8D3" strokeWidth="1.6" />
      <circle cx="70" cy="80" r="4" fill="#FFD95A" stroke="#D9A73E" strokeWidth="1.4" />
      {/* Eyes */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="60" cy="51" r="4.3" fill="#2F6F97" />
        <circle cx="80" cy="51" r="4.3" fill="#2F6F97" />
        <circle cx="58.7" cy="49.5" r="1.5" fill="#FFFFFF" />
        <circle cx="78.7" cy="49.5" r="1.5" fill="#FFFFFF" />
      </g>
      <polygon points="70,56 67.5,58.5 72.5,58.5" fill="#E6B84A" />
      <path d="M64 61 Q70 65 76 61" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 4. Orange Cat (Marmalade)
function OrangeCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <ellipse cx="70" cy="115" rx="38" ry="8" fill="#FFD95A" opacity="0.45" />
      <path
        d="M100 94 Q124 88 120 62"
        fill="none"
        stroke="#F4A236"
        strokeWidth="10"
        strokeLinecap="round"
        className={animate ? 'animate-tail' : ''}
      />
      {/* Chonky round body */}
      <ellipse cx="70" cy="88" rx="34" ry="27" fill="#FFB84D" stroke="#CC7A19" strokeWidth="2.5" />
      {/* Tabby belly & stripes */}
      <ellipse cx="70" cy="94" rx="18" ry="15" fill="#FFF3CC" />
      <path d="M40 82 Q47 84 42 90" stroke="#CC7A19" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M100 82 Q93 84 98 90" stroke="#CC7A19" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Head */}
      <circle cx="70" cy="50" r="26" fill="#FFB84D" stroke="#CC7A19" strokeWidth="2.5" />
      {/* Forehead M tabby stripes */}
      <path d="M63 29 L65 37 M70 27 L70 38 M77 29 L75 37" stroke="#CC7A19" strokeWidth="2.6" strokeLinecap="round" />
      {/* Ears */}
      <path d="M48 37 L44 16 L63 29 Z" fill="#FFB84D" stroke="#CC7A19" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M92 37 L96 16 L77 29 Z" fill="#FFB84D" stroke="#CC7A19" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M51 33 L48 22 L59 29 Z" fill="#FFE099" />
      <path d="M89 33 L92 22 L81 29 Z" fill="#FFE099" />
      {/* Goofy happy face */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="59" cy="51" r="4.5" fill="#2A3B4C" />
        <circle cx="81" cy="51" r="4.5" fill="#2A3B4C" />
        <circle cx="57.5" cy="49.5" r="1.5" fill="#FFFFFF" />
        <circle cx="79.5" cy="49.5" r="1.5" fill="#FFFFFF" />
      </g>
      <polygon points="70,56 67,59 73,59" fill="#B5651D" />
      <path d="M63 62 Q67 66 70 62 Q73 66 77 62" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="55" cy="110" rx="9" ry="6" fill="#FFF3CC" stroke="#CC7A19" strokeWidth="2" />
      <ellipse cx="85" cy="110" rx="9" ry="6" fill="#FFF3CC" stroke="#CC7A19" strokeWidth="2" />
    </svg>
  );
}

// 5. Cat Sitting Inside Cardboard Box (Biscuit)
function BoxCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      {/* Cat head peeking out */}
      <circle cx="70" cy="54" r="23" fill="#F2D7B6" stroke="#B58E63" strokeWidth="2.5" />
      <path d="M50 42 L46 21 L64 34 Z" fill="#F2D7B6" stroke="#B58E63" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M90 42 L94 21 L76 34 Z" fill="#F2D7B6" stroke="#B58E63" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 38 L50 27 L60 34 Z" fill="#FFE699" />
      <path d="M88 38 L90 27 L80 34 Z" fill="#FFE699" />
      {/* Eyes */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="60" cy="52" r="4.3" fill="#2A3B4C" />
        <circle cx="80" cy="52" r="4.3" fill="#2A3B4C" />
        <circle cx="58.7" cy="50.5" r="1.5" fill="#FFFFFF" />
        <circle cx="78.7" cy="50.5" r="1.5" fill="#FFFFFF" />
      </g>
      <polygon points="70,57 67.5,59.5 72.5,59.5" fill="#C48F4A" />
      <path d="M65 62 Q70 65 75 62" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Cardboard box */}
      <path d="M24 72 L36 62 L104 62 L116 72 Z" fill="#C49A6C" stroke="#8C6740" strokeWidth="2.2" />
      <rect x="24" y="72" width="92" height="44" rx="4" fill="#DDA974" stroke="#8C6740" strokeWidth="2.5" />
      {/* Box flaps */}
      <path d="M24 72 L12 82 L24 86 Z" fill="#C49A6C" stroke="#8C6740" strokeWidth="2" />
      <path d="M116 72 L128 82 L116 86 Z" fill="#C49A6C" stroke="#8C6740" strokeWidth="2" />
      {/* Label on box */}
      <rect x="46" y="84" width="48" height="20" rx="3" fill="#FFFDF3" stroke="#B58E63" strokeWidth="1.5" />
      <text x="70" y="98" textAnchor="middle" fill="#6E4E2E" fontSize="10" fontWeight="800" fontFamily="Fredoka, sans-serif">FOR MM</text>
      {/* Cute paws resting on rim */}
      <ellipse cx="48" cy="72" rx="9" ry="6" fill="#FFFDF3" stroke="#B58E63" strokeWidth="2.2" />
      <ellipse cx="92" cy="72" rx="9" ry="6" fill="#FFFDF3" stroke="#B58E63" strokeWidth="2.2" />
    </svg>
  );
}

// 6. Cat Chasing Butterflies (Sunny)
function ButterflyCat({ className, animate }) {
  return (
    <svg viewBox="0 0 150 130" className={className} aria-hidden="true">
      {/* Fluttering butterfly */}
      <g className={animate ? 'animate-butterfly' : ''} transform="translate(102, 22)">
        <ellipse cx="-8" cy="0" rx="9" ry="7" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="1.5" transform="rotate(-20 -8 0)" />
        <ellipse cx="8" cy="0" rx="9" ry="7" fill="#FFD95A" stroke="#D4A024" strokeWidth="1.5" transform="rotate(20 8 0)" />
        <ellipse cx="-6" cy="8" rx="6" ry="5" fill="#FFD95A" stroke="#D4A024" strokeWidth="1.3" />
        <ellipse cx="6" cy="8" rx="6" ry="5" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="1.3" />
        <rect x="-1.5" y="-4" width="3" height="15" rx="1.5" fill="#2A3B4C" />
      </g>
      {/* Cat reaching playfully */}
      <path d="M32 96 Q12 80 18 58" fill="none" stroke="#9EC4DC" strokeWidth="9" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      <ellipse cx="56" cy="92" rx="28" ry="22" transform="rotate(-12 56 92)" fill="#D9ECFA" stroke="#6E9BB8" strokeWidth="2.5" />
      <circle cx="62" cy="58" r="22" fill="#D9ECFA" stroke="#6E9BB8" strokeWidth="2.5" />
      <path d="M44 45 L40 26 L56 38 Z" fill="#D9ECFA" stroke="#6E9BB8" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80 45 L84 26 L68 38 Z" fill="#D9ECFA" stroke="#6E9BB8" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Excited eyes looking up at butterfly */}
      <circle cx="56" cy="54" r="4" fill="#2A3B4C" />
      <circle cx="72" cy="54" r="4" fill="#2A3B4C" />
      <circle cx="57.5" cy="52.5" r="1.4" fill="#FFFFFF" />
      <circle cx="73.5" cy="52.5" r="1.4" fill="#FFFFFF" />
      <path d="M60 64 Q64 67 68 64" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Reaching paw */}
      <ellipse cx="94" cy="64" rx="11" ry="7" transform="rotate(-35 94 64)" fill="#FFFFFF" stroke="#6E9BB8" strokeWidth="2.2" />
      <ellipse cx="46" cy="112" rx="9" ry="6" fill="#FFFFFF" stroke="#6E9BB8" strokeWidth="2" />
      <ellipse cx="74" cy="110" rx="9" ry="6" fill="#FFFFFF" stroke="#6E9BB8" strokeWidth="2" />
    </svg>
  );
}

// 7. Cat Playing with a Ball of Yarn (Tangle)
function YarnCat({ className, animate }) {
  return (
    <svg viewBox="0 0 150 130" className={className} aria-hidden="true">
      {/* Trailing yarn string */}
      <path d="M18 106 Q36 96 52 108 Q72 118 96 102" fill="none" stroke="#5FA8D3" strokeWidth="3" strokeLinecap="round" />
      {/* Yarn ball */}
      <g transform="translate(106, 94)">
        <circle cx="0" cy="0" r="18" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="2.4" />
        <path d="M-14 -6 Q0 -12 14 -4 M-16 4 Q0 -2 15 8 M-10 14 Q2 8 10 -12" fill="none" stroke="#3A7CA5" strokeWidth="2" />
      </g>
      {/* Cat crouching playfully */}
      <path d="M26 78 Q10 62 20 44" fill="none" stroke="#F4D37C" strokeWidth="8.5" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      <ellipse cx="54" cy="88" rx="28" ry="20" fill="#FFF2B8" stroke="#C99C3B" strokeWidth="2.5" />
      <circle cx="62" cy="58" r="22" fill="#FFF2B8" stroke="#C99C3B" strokeWidth="2.5" />
      <path d="M44 46 L42 26 L58 38 Z" fill="#FFF2B8" stroke="#C99C3B" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80 46 L84 26 L68 38 Z" fill="#FFF2B8" stroke="#C99C3B" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Eyes focused on yarn */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="55" cy="58" r="4.2" fill="#2A3B4C" />
        <circle cx="71" cy="58" r="4.2" fill="#2A3B4C" />
        <circle cx="56" cy="57" r="1.4" fill="#FFFFFF" />
        <circle cx="72" cy="57" r="1.4" fill="#FFFFFF" />
      </g>
      <path d="M58 66 Q63 70 68 66" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Paw batting the yarn */}
      <ellipse cx="86" cy="86" rx="11" ry="6.5" transform="rotate(15 86 86)" fill="#FFFDF3" stroke="#C99C3B" strokeWidth="2.2" />
      <ellipse cx="42" cy="106" rx="9" ry="5.5" fill="#FFFDF3" stroke="#C99C3B" strokeWidth="2" />
    </svg>
  );
}

// 8. Cat Sleeping Under a Champak Tree (Champa)
function TreeNapCat({ className, animate }) {
  return (
    <svg viewBox="0 0 150 130" className={className} aria-hidden="true">
      {/* Grass patch */}
      <ellipse cx="75" cy="112" rx="60" ry="12" fill="#BCE3BC" />
      {/* Mini Champak branch arching over */}
      <path d="M18 110 Q14 48 56 26 Q86 16 118 28" fill="none" stroke="#8C6B4A" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="64" cy="24" rx="22" ry="12" fill="#67AD6E" />
      <ellipse cx="96" cy="24" rx="24" ry="13" fill="#589C60" />
      <ellipse cx="118" cy="34" rx="18" ry="11" fill="#74B97B" />
      {/* Golden Champak blossoms hanging */}
      {[
        { x: 60, y: 26 },
        { x: 96, y: 22 },
        { x: 118, y: 36 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y})`}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} rx="2.5" ry="8" fill="#FFD95A" transform={`rotate(${a}) translate(0 -4)`} />
          ))}
          <circle r="2.8" fill="#E6B84A" />
        </g>
      ))}
      {/* Fallen petal */}
      <ellipse cx="116" cy="108" rx="6" ry="2.6" fill="#FFD95A" transform="rotate(-15 116 108)" />
      {/* Peaceful snoozing cat underneath */}
      <ellipse cx="78" cy="94" rx="32" ry="18" fill="#FFFDF3" stroke="#9EB9CC" strokeWidth="2.4" />
      <circle cx="56" cy="88" r="17" fill="#FFFDF3" stroke="#9EB9CC" strokeWidth="2.4" />
      <path d="M44 76 L41 62 L53 71 Z" fill="#FFFDF3" stroke="#9EB9CC" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M62 71 L71 61 L71 76 Z" fill="#FFFDF3" stroke="#9EB9CC" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M47 89 Q51 93 55 89" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      <path d="M59 89 Q63 93 67 89" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      <path d="M53 95 Q57 98 61 95" fill="none" stroke="#2A3B4C" strokeWidth="1.8" strokeLinecap="round" />
      {/* Little petal resting on head */}
      <ellipse
        cx="58"
        cy="71"
        rx="6"
        ry="2.5"
        fill="#FFD95A"
        className={animate ? 'animate-float-slow' : ''}
      />
    </svg>
  );
}

// 9. Cat Waving Its Paw (Lucky)
function WavingCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <ellipse cx="70" cy="116" rx="34" ry="8" fill="#A9DDF5" opacity="0.4" />
      <path d="M96 96 Q116 90 116 70" fill="none" stroke="#F6C86E" strokeWidth="8.5" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      {/* Body */}
      <ellipse cx="68" cy="90" rx="28" ry="25" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2.5" />
      {/* Golden patch */}
      <path d="M46 78 Q60 72 64 90 Q52 94 44 86 Z" fill="#FFD95A" opacity="0.85" />
      {/* Head */}
      <circle cx="68" cy="52" r="24" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2.5" />
      <path d="M72 28 Q90 32 90 50 Q78 48 72 28 Z" fill="#FFD95A" opacity="0.85" />
      {/* Ears */}
      <path d="M48 39 L44 18 L62 31 Z" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M88 39 L92 18 L74 31 Z" fill="#FFD95A" stroke="#C9A86A" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Collar */}
      <path d="M50 72 Q68 78 86 72" fill="none" stroke="#5FA8D3" strokeWidth="5" strokeLinecap="round" />
      <circle cx="68" cy="77" r="4.5" fill="#FFD95A" stroke="#C48F1D" strokeWidth="1.5" />
      {/* Happy eyes */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="58" cy="51" r="4.2" fill="#2A3B4C" />
        <circle cx="78" cy="51" r="4.2" fill="#2A3B4C" />
        <circle cx="56.8" cy="49.5" r="1.4" fill="#FFFFFF" />
        <circle cx="76.8" cy="49.5" r="1.4" fill="#FFFFFF" />
      </g>
      <polygon points="68,56 65.5,58.5 70.5,58.5" fill="#E6A940" />
      <path d="M62 61 Q68 66 74 61" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Animated waving paw */}
      <g className={animate ? 'animate-paw-wave' : ''}>
        <ellipse cx="102" cy="64" rx="9" ry="13" transform="rotate(24 102 64)" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2.4" />
        <circle cx="101" cy="59" r="2.2" fill="#F2C063" />
        <circle cx="106" cy="61" r="2" fill="#F2C063" />
        <circle cx="103" cy="65" r="2.8" fill="#F2C063" />
      </g>
      <ellipse cx="54" cy="112" rx="9" ry="6" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2" />
      <ellipse cx="82" cy="112" rx="9" ry="6" fill="#FFFDF3" stroke="#C9A86A" strokeWidth="2" />
    </svg>
  );
}

// 10. Mischievous Cat (Noodle)
function MischievousCat({ className, animate }) {
  return (
    <svg viewBox="0 0 140 130" className={className} aria-hidden="true">
      <ellipse cx="70" cy="116" rx="34" ry="8" fill="#A9DDF5" opacity="0.45" />
      {/* Curled sassy tail */}
      <path d="M98 94 Q124 82 114 54 Q110 46 118 40" fill="none" stroke="#6E8BA3" strokeWidth="8.5" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      {/* Sleek blue-gray body */}
      <ellipse cx="70" cy="90" rx="26" ry="25" fill="#89A8C2" stroke="#4D6B82" strokeWidth="2.5" />
      <ellipse cx="70" cy="95" rx="14" ry="14" fill="#D9F0FF" />
      {/* Head */}
      <circle cx="70" cy="52" r="24" fill="#89A8C2" stroke="#4D6B82" strokeWidth="2.5" />
      {/* Pointy ears */}
      <path d="M49 38 L42 15 L64 30 Z" fill="#89A8C2" stroke="#4D6B82" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M91 38 L98 15 L76 30 Z" fill="#89A8C2" stroke="#4D6B82" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M51 34 L47 22 L60 30 Z" fill="#FFF3B0" />
      <path d="M89 34 L93 22 L80 30 Z" fill="#FFF3B0" />
      {/* Mischievous half-lidded golden eyes & cheeky smirk */}
      <ellipse cx="59" cy="52" rx="5.5" ry="4.5" fill="#FFD95A" stroke="#2A3B4C" strokeWidth="1.8" />
      <ellipse cx="81" cy="52" rx="5.5" ry="4.5" fill="#FFD95A" stroke="#2A3B4C" strokeWidth="1.8" />
      <circle cx="60.5" cy="52.5" r="2.2" fill="#2A3B4C" />
      <circle cx="82.5" cy="52.5" r="2.2" fill="#2A3B4C" />
      {/* Sly eyelids */}
      <path d="M52 48 L66 50 M74 50 L88 48" stroke="#4D6B82" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M62 63 Q72 67 80 60" fill="none" stroke="#2A3B4C" strokeWidth="2.2" strokeLinecap="round" />
      {/* Holding a tiny yellow pencil */}
      <g transform="translate(88, 84) rotate(-25)">
        <rect x="0" y="0" width="24" height="5" rx="1" fill="#FFD95A" stroke="#B8841E" strokeWidth="1.2" />
        <polygon points="24,0 30,2.5 24,5" fill="#FFF3CC" />
        <polygon points="28,1.5 30,2.5 28,3.5" fill="#2A3B4C" />
      </g>
    </svg>
  );
}

// 11. Funny Cat Sitting on Top of Open Textbook (Final Screen)
function TextbookCat({ className, animate }) {
  return (
    <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
      {/* Open textbook */}
      <path d="M22 104 Q56 92 90 104 Q124 92 158 104 L152 126 Q120 116 90 126 Q60 116 28 126 Z" fill="#FFFFFF" stroke="#3A7CA5" strokeWidth="3" />
      <path d="M90 104 L90 126" stroke="#A9DDF5" strokeWidth="3" />
      {/* Page lines */}
      <path d="M38 110 Q60 104 80 110 M40 117 Q60 112 80 117" stroke="#A9DDF5" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100 110 Q120 104 142 110 M100 117 Q120 112 140 117" stroke="#A9DDF5" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Textbook cover edge */}
      <path d="M24 126 Q60 118 90 128 Q120 118 156 126" fill="none" stroke="#2D6A94" strokeWidth="4.5" strokeLinecap="round" />

      {/* Plump scholarly cat sitting right on top of the book */}
      <path d="M118 92 Q146 86 142 62" fill="none" stroke="#FFB84D" strokeWidth="9" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      <ellipse cx="90" cy="84" rx="34" ry="23" fill="#FFD073" stroke="#C98A24" strokeWidth="2.5" />
      <ellipse cx="90" cy="88" rx="18" ry="13" fill="#FFFDF3" />
      {/* Head */}
      <circle cx="90" cy="48" r="24" fill="#FFD073" stroke="#C98A24" strokeWidth="2.5" />
      <path d="M69 36 L66 16 L83 28 Z" fill="#FFD073" stroke="#C98A24" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M111 36 L114 16 L97 28 Z" fill="#FFD073" stroke="#C98A24" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Study Glasses! */}
      <circle cx="79" cy="49" r="8" fill="#D9F0FF" fillOpacity="0.45" stroke="#2A3B4C" strokeWidth="2.2" />
      <circle cx="101" cy="49" r="8" fill="#D9F0FF" fillOpacity="0.45" stroke="#2A3B4C" strokeWidth="2.2" />
      <line x1="87" y1="49" x2="93" y2="49" stroke="#2A3B4C" strokeWidth="2.2" />
      {/* Eyes behind glasses */}
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="79" cy="49" r="3.2" fill="#2A3B4C" />
        <circle cx="101" cy="49" r="3.2" fill="#2A3B4C" />
      </g>
      <path d="M84 59 Q90 63 96 59" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Paws holding page down */}
      <ellipse cx="72" cy="103" rx="9" ry="5.5" fill="#FFFDF3" stroke="#C98A24" strokeWidth="2" />
      <ellipse cx="108" cy="103" rx="9" ry="5.5" fill="#FFFDF3" stroke="#C98A24" strokeWidth="2" />
    </svg>
  );
}

// 12. Cute Cat Sitting Beside Stack of Books (Final Screen)
function BooksCat({ className, animate }) {
  return (
    <svg viewBox="0 0 180 140" className={className} aria-hidden="true">
      {/* Stack of books on left */}
      <rect x="14" y="102" width="66" height="18" rx="4" fill="#5FA8D3" stroke="#2F6F97" strokeWidth="2.2" />
      <rect x="20" y="84" width="60" height="18" rx="4" fill="#FFD95A" stroke="#C48F1D" strokeWidth="2.2" />
      <rect x="16" y="66" width="56" height="18" rx="4" fill="#A9DDF5" stroke="#3A7CA5" strokeWidth="2.2" />
      <line x1="26" y1="111" x2="70" y2="111" stroke="#FFFDF3" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="93" x2="68" y2="93" stroke="#FFFDF3" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="75" x2="60" y2="75" stroke="#FFFDF3" strokeWidth="2" strokeLinecap="round" />

      {/* Cute cat sitting happily beside books */}
      <path d="M144 102 Q166 94 162 70" fill="none" stroke="#D9ECFA" strokeWidth="8.5" strokeLinecap="round" className={animate ? 'animate-tail' : ''} />
      <ellipse cx="120" cy="96" rx="26" ry="24" fill="#FFFFFF" stroke="#85AEC9" strokeWidth="2.4" />
      <circle cx="120" cy="60" r="22" fill="#FFFFFF" stroke="#85AEC9" strokeWidth="2.4" />
      <path d="M102 47 L98 28 L114 39 Z" fill="#FFFFFF" stroke="#85AEC9" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M138 47 L142 28 L126 39 Z" fill="#FFFFFF" stroke="#85AEC9" strokeWidth="2.4" strokeLinejoin="round" />
      <g className={animate ? 'animate-blink' : ''}>
        <circle cx="112" cy="59" r="3.8" fill="#2A3B4C" />
        <circle cx="128" cy="59" r="3.8" fill="#2A3B4C" />
      </g>
      <path d="M115 68 Q120 72 125 68" fill="none" stroke="#2A3B4C" strokeWidth="2" strokeLinecap="round" />
      {/* Mini Champak tucked behind ear */}
      <g transform="translate(136, 40) scale(0.32)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} rx="8" ry="24" fill="#FFD95A" transform={`rotate(${a}) translate(0 -12)`} />
        ))}
        <circle r="7" fill="#E6B84A" />
      </g>
    </svg>
  );
}

// 13. Cheering Cat Mascot for Color Pop
function CheeringCat({ className, animate }) {
  return (
    <svg viewBox="0 0 130 130" className={className} aria-hidden="true">
      <ellipse cx="65" cy="90" rx="26" ry="24" fill="#FFF4C2" stroke="#D9A73E" strokeWidth="2.5" />
      <circle cx="65" cy="54" r="23" fill="#FFF4C2" stroke="#D9A73E" strokeWidth="2.5" />
      <path d="M46 40 L42 20 L60 32 Z" fill="#FFF4C2" stroke="#D9A73E" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M84 40 L88 20 L70 32 Z" fill="#FFF4C2" stroke="#D9A73E" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Joyful curved eyes */}
      <path d="M52 53 Q57 47 62 53" fill="none" stroke="#2A3B4C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M68 53 Q73 47 78 53" fill="none" stroke="#2A3B4C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 61 Q65 68 72 61" fill="none" stroke="#2A3B4C" strokeWidth="2.3" strokeLinecap="round" />
      {/* Cheering raised paws with yellow pom-poms */}
      <g className={animate ? 'animate-paw-wave' : ''}>
        <ellipse cx="34" cy="64" rx="8" ry="12" transform="rotate(-32 34 64)" fill="#FFFDF3" stroke="#D9A73E" strokeWidth="2.2" />
        <circle cx="24" cy="52" r="9" fill="#FFD95A" stroke="#E6B84A" strokeWidth="1.5" />
      </g>
      <g className={animate ? 'animate-paw-wave' : ''}>
        <ellipse cx="96" cy="64" rx="8" ry="12" transform="rotate(32 96 64)" fill="#FFFDF3" stroke="#D9A73E" strokeWidth="2.2" />
        <circle cx="106" cy="52" r="9" fill="#A9DDF5" stroke="#5FA8D3" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
