import { useRef, useEffect } from 'react';

/**
 * NatureBackground — full-bleed illustrated sky/canopy/scene behind the app.
 *
 * Composition mirrors the reference:
 *   bright sky (cerulean -> blue), a thick branch + foliage mass from the top-right,
 *   dense leaf clusters upper-center/left, soft cumulus clouds (lower-left + mid),
 *   a single diagonal contrail mid-left, drifting petals/leaves, a soft glow lower-left,
 *   and dark foreground leaf silhouettes bottom-right.
 *
 * It is a hand-authored SVG (inline), fixed to the viewport, z-index -1, and
 * theme-aware via CSS variables so light/dark both read as the same world.
 */
export default function NatureBackground() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Gentle parallax drift on scroll for the mid layers only.
    let rafId = null;
    let lastY = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (svgRef.current) {
          const t = Math.min(y * 0.06, 26);
          const c = Math.min(y * 0.03, 14);
          const f = Math.min(y * 0.10, 30);
          svgRef.current.style.setProperty('--parallax-mid', `${t}px`);
          svgRef.current.style.setProperty('--parallax-clouds', `${c}px`);
          svgRef.current.style.setProperty('--parallax-foreground', `${f}px`);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="nature-background"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--sky-top)" />
          <stop offset="55%" stopColor="var(--sky-mid)" />
          <stop offset="100%" stopColor="var(--sky-bottom)" />
        </linearGradient>

        {/* Soft glow gradient (lower-left bloom) */}
        <radialGradient id="bloomGrad" cx="0.22" cy="0.72" r="0.32">
          <stop offset="0%" stopColor="var(--bloom-core)" stopOpacity="0.95" />
          <stop offset="45%" stopColor="var(--bloom-core)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--bloom-core)" stopOpacity="0" />
        </radialGradient>

        {/* Foliage texture: small overlapping leaf speckles */}
        <pattern id="leafSpeckle" width="14" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M3 2 q4 4 0 8 q-4 -4 0 -8 z"
            fill="var(--leaf-speckle)"
            opacity="0.55"
          />
          <path
            d="M10 8 q3 3 0 6 q-3 -3 0 -6 z"
            fill="var(--leaf-speckle-light)"
            opacity="0.4"
          />
        </pattern>

        {/* Contrail soft blur */}
        <filter id="contrailSoft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        {/* Foreground leaf blur */}
        <filter id="fgBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
      </defs>

      <style>{`
        .nature-background .parallax-mid { transform: translateY(var(--parallax-mid, 0px)); }
        .nature-background .parallax-clouds { transform: translateX(var(--parallax-clouds, 0px)); }
        .nature-background .parallax-foreground { transform: translateY(var(--parallax-foreground, 0px)); }

        .nature-background .petal {
          animation: petalFloat 9s ease-in-out infinite;
        }
        .nature-background .petal:nth-child(2) { animation-delay: 1.4s; }
        .nature-background .petal:nth-child(3) { animation-delay: 2.8s; }
        .nature-background .petal:nth-child(4) { animation-delay: 4.2s; }
        .nature-background .petal:nth-child(5) { animation-delay: 5.6s; }

        .nature-background .contrail {
          animation: contrailFade 7s ease-in-out infinite;
        }

        @keyframes petalFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(14px, -12px) rotate(6deg); }
          50% { transform: translate(6px, -26px) rotate(-3deg); }
          75% { transform: translate(18px, -10px) rotate(4deg); }
        }

        @keyframes contrailFade {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.85; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nature-background * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* 1. SKY */}
      <rect width="1600" height="900" fill="url(#skyGrad)" />

      {/* 2. SOFT BLOOM lower-left */}
      <rect width="1600" height="900" fill="url(#bloomGrad)" />

      {/* 3. DISTANT HAZE hills (very soft, low opacity) */}
      <g opacity="0.5">
        <path
          d="M-120 640 Q 420 560 980 620 T 1680 600 L 1680 900 L -120 900 Z"
          fill="var(--haze-far)"
        />
        <path
          d="M-120 700 Q 520 640 1080 700 T 1680 690 L 1680 900 L -120 900 Z"
          fill="var(--haze-mid)"
        />
      </g>

      {/* 4. CLOUDS (parallax-clouds) */}
      <g className="parallax-clouds" opacity="0.92">
        {/* Lower-left cumulus */}
        <g transform="translate(180 560)">
          <ellipse cx="0" cy="0" rx="120" ry="44" fill="var(--cloud)" />
          <ellipse cx="-50" cy="-22" rx="70" ry="34" fill="var(--cloud)" />
          <ellipse cx="60" cy="-18" rx="80" ry="32" fill="var(--cloud)" />
          <ellipse cx="10" cy="-40" rx="58" ry="26" fill="var(--cloud-light)" />
        </g>
        {/* Middle-left cumulus */}
        <g transform="translate(380 470)">
          <ellipse cx="0" cy="0" rx="150" ry="48" fill="var(--cloud)" />
          <ellipse cx="-70" cy="-26" rx="80" ry="36" fill="var(--cloud)" />
          <ellipse cx="80" cy="-22" rx="90" ry="34" fill="var(--cloud)" />
          <ellipse cx="10" cy="-50" rx="62" ry="26" fill="var(--cloud-light)" />
        </g>
        {/* Upper-right wisps */}
        <g transform="translate(1240 170)" opacity="0.8">
          <ellipse cx="0" cy="0" rx="90" ry="16" fill="var(--cloud-wisp)" />
          <ellipse cx="70" cy="4" rx="60" ry="12" fill="var(--cloud-wisp)" />
        </g>
      </g>

      {/* 5. CONTRAIL (mid-left diagonal) */}
      <g className="contrail" opacity="0.75">
        <line
          x1="120"
          y1="520"
          x2="430"
          y2="360"
          stroke="var(--contrail)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#contrailSoft)"
        />
        <line
          x1="130"
          y1="528"
          x2="440"
          y2="368"
          stroke="var(--contrail-light)"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* 6. MID CANOPY (parallax-mid): upper-center + upper-left + bottom canopy */}
      <g className="parallax-mid">
        {/* Upper-center dense clusters */}
        <g transform="translate(640 190)">
          <circle cx="0" cy="0" r="150" fill="var(--canopy-1)" />
          <circle cx="-90" cy="40" r="110" fill="var(--canopy-2)" />
          <circle cx="90" cy="30" r="120" fill="var(--canopy-3)" />
          <circle cx="-40" cy="-60" r="90" fill="var(--canopy-light)" />
          <circle cx="60" cy="-70" r="100" fill="var(--canopy-4)" />
          <circle cx="0" cy="80" r="90" fill="var(--canopy-2)" />
          <circle cx="-150" cy="80" r="70" fill="var(--canopy-1)" />
          <circle cx="150" cy="70" r="80" fill="var(--canopy-3)" />
          <circle cx="0" cy="0" r="150" fill="url(#leafSpeckle)" />
        </g>

        {/* Upper-left cluster */}
        <g transform="translate(300 170)">
          <circle cx="0" cy="0" r="130" fill="var(--canopy-2)" />
          <circle cx="-70" cy="30" r="90" fill="var(--canopy-3)" />
          <circle cx="70" cy="20" r="100" fill="var(--canopy-light)" />
          <circle cx="-30" cy="-50" r="70" fill="var(--canopy-4)" />
          <circle cx="40" cy="-60" r="80" fill="var(--canopy-1)" />
          <circle cx="0" cy="0" r="130" fill="url(#leafSpeckle)" />
        </g>

        {/* Scatter mid clusters */}
        <g transform="translate(980 160)">
          <circle cx="0" cy="0" r="100" fill="var(--canopy-3)" />
          <circle cx="-60" cy="20" r="70" fill="var(--canopy-1)" />
          <circle cx="60" cy="20" r="78" fill="var(--canopy-light)" />
          <circle cx="0" cy="-40" r="60" fill="var(--canopy-2)" />
          <circle cx="0" cy="0" r="100" fill="url(#leafSpeckle)" />
        </g>

        <g transform="translate(1300 180)">
          <circle cx="0" cy="0" r="110" fill="var(--canopy-2)" />
          <circle cx="-70" cy="30" r="80" fill="var(--canopy-3)" />
          <circle cx="70" cy="30" r="85" fill="var(--canopy-light)" />
          <circle cx="0" cy="-40" r="65" fill="var(--canopy-4)" />
          <circle cx="0" cy="0" r="110" fill="url(#leafSpeckle)" />
        </g>

        {/* Bottom canopy (lighter yellowish-green) */}
        <g>
          <ellipse cx="400" cy="820" rx="320" ry="120" fill="var(--canopy-bottom-1)" />
          <ellipse cx="800" cy="860" rx="420" ry="130" fill="var(--canopy-bottom-2)" />
          <ellipse cx="1200" cy="830" rx="340" ry="120" fill="var(--canopy-bottom-1)" />
          <ellipse cx="600" cy="860" rx="260" ry="90" fill="var(--canopy-bottom-3)" />
          <ellipse cx="1000" cy="870" rx="300" ry="95" fill="var(--canopy-bottom-3)" />
        </g>
      </g>

      {/* 7. TOP-RIGHT BRANCH + FOLIAGE MASS */}
      <g>
        {/* Trunk + main branch */}
        <path
          d="M1600 0 L 1600 120 L 1500 150 Q 1440 165 1360 150 L 1320 150 L 1300 600 L 1280 720"
          fill="none"
          stroke="var(--branch)"
          strokeWidth="54"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <path
          d="M1600 0 L 1600 120 L 1500 150 Q 1440 165 1360 150 L 1320 150 L 1300 600 L 1280 720"
          fill="none"
          stroke="var(--branch-shadow)"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        {/* Sub-branches */}
        <path
          d="M1380 150 Q 1280 120 1180 140"
          fill="none"
          stroke="var(--branch)"
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M1300 210 Q 1200 240 1120 210"
          fill="none"
          stroke="var(--branch)"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M1280 360 Q 1180 400 1100 360"
          fill="none"
          stroke="var(--branch)"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Main foliage mass on the trunk */}
        <g>
          <circle cx="1370" cy="120" r="170" fill="var(--foliage-dr-1)" />
          <circle cx="1280" cy="70" r="150" fill="var(--foliage-dr-2)" />
          <circle cx="1460" cy="90" r="150" fill="var(--foliage-dr-3)" />
          <circle cx="1320" cy="180" r="120" fill="var(--foliage-dr-2)" />
          <circle cx="1430" cy="190" r="110" fill="var(--foliage-dr-1)" />
          <circle cx="1260" cy="160" r="100" fill="var(--foliage-dr-4)" />
          <circle cx="1500" cy="180" r="90" fill="var(--foliage-dr-3)" />
          <circle cx="1370" cy="120" r="170" fill="url(#leafSpeckle)" />
        </g>

        {/* Sub-foliage clusters at sub-branch ends */}
        <g>
          <circle cx="1180" cy="130" r="90" fill="var(--foliage-mid-1)" />
          <circle cx="1240" cy="160" r="80" fill="var(--foliage-mid-2)" />
          <circle cx="1120" cy="200" r="80" fill="var(--foliage-mid-3)" />
          <circle cx="1180" cy="130" r="90" fill="url(#leafSpeckle)" />

          <circle cx="1120" cy="205" r="78" fill="var(--foliage-mid-2)" />
          <circle cx="1060" cy="220" r="66" fill="var(--foliage-mid-1)" />
          <circle cx="1120" cy="205" r="78" fill="url(#leafSpeckle)" />

          <circle cx="1100" cy="355" r="70" fill="var(--foliage-mid-3)" />
          <circle cx="1040" cy="375" r="58" fill="var(--foliage-mid-2)" />
          <circle cx="1100" cy="355" r="70" fill="url(#leafSpeckle)" />
        </g>

        {/* Sunlit leaf edges (yellow-green highlights) */}
        <g opacity="0.9">
          <circle cx="1320" cy="80" r="34" fill="var(--leaf-highlight)" />
          <circle cx="1420" cy="140" r="28" fill="var(--leaf-highlight)" />
          <circle cx="1210" cy="120" r="24" fill="var(--leaf-highlight)" />
          <circle cx="1100" cy="190" r="22" fill="var(--leaf-highlight)" />
          <circle cx="1080" cy="345" r="20" fill="var(--leaf-highlight)" />
        </g>
      </g>

      {/* 8. DRIFTING PETALS / LEAVES */}
      <g>
        <g className="petal">
          <ellipse cx="620" cy="430" rx="7" ry="3.4" fill="var(--petal)" transform="rotate(20 620 430)" />
        </g>
        <g className="petal">
          <ellipse cx="780" cy="490" rx="6" ry="3" fill="var(--petal-light)" transform="rotate(-15 780 490)" />
        </g>
        <g className="petal">
          <ellipse cx="540" cy="520" rx="7.5" ry="3.6" fill="var(--petal)" transform="rotate(35 540 520)" />
        </g>
        <g className="petal">
          <ellipse cx="920" cy="440" rx="6.5" ry="3.2" fill="var(--petal-light)" transform="rotate(-25 920 440)" />
        </g>
        <g className="petal">
          <ellipse cx="700" cy="560" rx="7" ry="3.4" fill="var(--petal)" transform="rotate(10 700 560)" />
        </g>
      </g>

      {/* 9. FOREGROUND LEFT soft glow bloom (over canopy) */}
      <g>
        <circle cx="210" cy="780" r="210" fill="url(#bloomGrad)" opacity="0.7" />
      </g>

      {/* 10. FOREGROUND RIGHT dark leaf silhouettes (blurred) */}
      <g className="parallax-foreground" filter="url(#fgBlur)" opacity="0.96">
        <path
          d="M1500 900 C 1440 820 1380 820 1340 900 Z"
          fill="var(--fg-leaf-1)"
        />
        <path
          d="M1560 900 C 1520 800 1460 790 1420 900 Z"
          fill="var(--fg-leaf-2)"
        />
        <path
          d="M1580 900 C 1560 780 1510 760 1470 900 Z"
          fill="var(--fg-leaf-1)"
        />
        <path
          d="M1440 900 C 1400 820 1360 830 1340 900 Z"
          fill="var(--fg-leaf-2)"
        />
        <path
          d="M1380 900 C 1350 840 1310 850 1290 900 Z"
          fill="var(--fg-leaf-1)"
        />
        {/* Leaf veins */}
        <g stroke="var(--fg-vein)" strokeWidth="1.4" opacity="0.5" fill="none" strokeLinecap="round">
          <path d="M1470 900 Q 1495 840 1520 820" />
          <path d="M1510 820 Q 1500 840 1490 870" />
          <path d="M1430 900 Q 1455 830 1490 810" />
          <path d="M1490 810 Q 1475 835 1460 870" />
          <path d="M1380 900 Q 1405 830 1440 800" />
        </g>
      </g>
    </svg>
  );
}
