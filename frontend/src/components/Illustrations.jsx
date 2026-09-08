/**
 * Cozy Nature Retreat Pixel-Art & Vector SVG System
 * Theme: Quiet nature sanctuary — Sage, Cream, Coral, Pines, Water & Pixels
 */

/* ─────────────────────────────────────────────────────────────────────────────
   BRAND — Pixel Tree Logo (sidebar / top header)
───────────────────────────────────────────────────────────────────────────── */
export function CalendarLogo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Shadow for depth - stronger for visibility */}
      <defs>
        <filter id="logoShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.25)" />
        </filter>
      </defs>
      {/* Background with stronger shadow */}
      <rect width="64" height="64" rx="14" fill="#FFFFFF" filter="url(#logoShadow)" />
      {/* Accent border for visibility */}
      <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#76bc7e" strokeWidth="1.5" opacity="0.5" />
      
      {/* Plant sprout - stem */}
      <path d="M32 8 C32 8 30 14 30 18" stroke="#54a86b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M34 8 C34 8 36 14 36 18" stroke="#54a86b" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Left leaf */}
      <path d="M30 18 C26 14 22 16 22 20 C22 24 26 22 30 18Z" fill="#9be089" />
      <path d="M30 18 C26 14 22 16 22 20" stroke="#2b1a13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Right leaf */}
      <path d="M34 18 C38 14 42 16 42 20 C42 24 38 22 34 18Z" fill="#9be089" />
      <path d="M34 18 C38 14 42 16 42 20" stroke="#2b1a13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Action lines / sparkles - upper left */}
      <ellipse cx="16" cy="14" rx="4" ry="2" fill="#ffdb75" transform="rotate(-30 16 14)" />
      <ellipse cx="12" cy="20" rx="3" ry="1.5" fill="#ffdb75" transform="rotate(-30 12 20)" />
      
      {/* Action lines / sparkles - upper right */}
      <ellipse cx="48" cy="14" rx="4" ry="2" fill="#ffdb75" transform="rotate(30 48 14)" />
      <ellipse cx="52" cy="20" rx="3" ry="1.5" fill="#ffdb75" transform="rotate(30 52 20)" />
      
      {/* Calendar body - cleaner look */}
      <rect x="12" y="22" width="40" height="34" rx="6" fill="#fcfaf5" />
      {/* Subtle inner shadow for calendar */}
      <rect x="13" y="23" width="38" height="15" rx="4" fill="rgba(0,0,0,0.03)" />
      
      {/* Calendar top bar */}
      <rect x="12" y="22" width="40" height="10" rx="4" fill="#76bc7e" />
      <rect x="12" y="28" width="40" height="4" fill="#76bc7e" />
      
      {/* Binder rings */}
      <ellipse cx="22" cy="22" rx="3" ry="4" fill="none" stroke="#f2efe9" strokeWidth="2.5" />
      <ellipse cx="42" cy="22" rx="3" ry="4" fill="none" stroke="#f2efe9" strokeWidth="2.5" />
      
      {/* Face - happy eyes */}
      <path d="M24 34 Q26 31 28 34" stroke="#2b1a13" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M36 34 Q38 31 40 34" stroke="#2b1a13" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Blush */}
      <circle cx="22" cy="37" r="2.5" fill="#f9a081" opacity="0.6" />
      <circle cx="42" cy="37" r="2.5" fill="#f9a081" opacity="0.6" />
      
      {/* Smile */}
      <path d="M28 39 Q32 43 36 39" stroke="#2b1a13" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M30 39 Q32 41 34 39" fill="#f9a081" />
      
      {/* Calendar grid - row 1 */}
      <rect x="17" y="42" width="6" height="6" rx="1" fill="#85c490" />
      <path d="M19 45 L20 44 L22 42" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      
      <rect x="26" y="42" width="6" height="6" rx="1" fill="#e2e8df" />
      
      <rect x="35" y="42" width="6" height="6" rx="1" fill="#85c490" />
      <path d="M37 45 L38 44 L40 42" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      
      <rect x="44" y="42" width="6" height="6" rx="1" fill="#e2e8df" />
      
      {/* Calendar grid - row 2 */}
      <rect x="17" y="50" width="6" height="5" rx="1" fill="#e2e8df" />
      <rect x="26" y="50" width="6" height="5" rx="1" fill="#e2e8df" />
      <rect x="35" y="50" width="6" height="5" rx="1" fill="#e2e8df" />
      <rect x="44" y="50" width="6" height="5" rx="1" fill="#e2e8df" />
      
      {/* Badge/checkmark circle */}
      <circle cx="48" cy="50" r="8" fill="#76bc7e" />
      <path d="M45 50 L47 52 L51 47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Small hand holding badge */}
      <circle cx="44" cy="49" r="2.5" fill="#4A3425" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PIXEL NATURE LANDSCAPE HERO ILLUSTRATION
   Rendered in HeroSection / HeroBanner
───────────────────────────────────────────────────────────────────────────── */
export function PixelNatureScene({ className = "" }) {
  return (
    <svg
      className={`pixel-nature-scene ${className}`}
      width="100%"
      height="100%"
      viewBox="0 0 800 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cozy pixel-art nature sanctuary scene with sky, clouds, pine trees, water stream, and a small retreat character."
      role="img"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFECE6" />
          <stop offset="60%" stopColor="#E4E9E3" />
          <stop offset="100%" stopColor="#D8E2D7" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#85B4C5" />
          <stop offset="100%" stopColor="#5C94A8" />
        </linearGradient>
        <pattern id="pixelGridPattern" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="none" stroke="rgba(28, 45, 39, 0.02)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Sky Background */}
      <rect width="800" height="360" fill="url(#skyGrad)" />
      <rect width="800" height="360" fill="url(#pixelGridPattern)" />

      {/* Distant Mountains (Pixel Blocks) */}
      <path d="M-20 230 L90 140 L160 190 L260 110 L380 230 Z" fill="#B2C5B8" opacity="0.65" />
      <path d="M220 230 L350 120 L480 230 Z" fill="#9FB7A6" opacity="0.5" />
      <path d="M420 230 L540 130 L660 210 L780 110 L840 230 Z" fill="#ABC0B2" opacity="0.6" />

      {/* Animated Floating Pixel Clouds */}
      <g className="animate-cloud">
        <rect x="60" y="38" width="64" height="16" fill="#F7F5F0" opacity="0.9" rx="2" />
        <rect x="76" y="26" width="32" height="12" fill="#F7F5F0" opacity="0.9" rx="2" />
        <rect x="100" y="46" width="40" height="12" fill="#F7F5F0" opacity="0.8" rx="2" />
      </g>
      <g className="animate-cloud-rev">
        <rect x="520" y="44" width="80" height="18" fill="#F7F5F0" opacity="0.9" rx="2" />
        <rect x="548" y="30" width="40" height="14" fill="#F7F5F0" opacity="0.9" rx="2" />
        <rect x="620" y="52" width="28" height="10" fill="#F7F5F0" opacity="0.75" rx="2" />
      </g>

      {/* Midground Hills */}
      <path d="M-10 260 Q180 210 380 260 T810 260 L810 360 L-10 360 Z" fill="#78A886" opacity="0.7" />
      <path d="M-10 280 Q250 250 500 290 T810 270 L810 360 L-10 360 Z" fill="#4A7C59" opacity="0.85" />

      {/* Pixel Pine Trees (Left Group) */}
      <g className="animate-tree" style={{ transformOrigin: '120px 300px' }}>
        {/* Trunk */}
        <rect x="114" y="270" width="12" height="36" fill="#3D291D" />
        {/* Foliage */}
        <polygon points="120,150 70,220 170,220" fill="#2D5037" />
        <polygon points="120,180 78,245 162,245" fill="#3B6547" />
        <polygon points="120,210 86,275 154,275" fill="#4A7C59" />
      </g>

      <g className="animate-tree" style={{ transformOrigin: '50px 310px', animationDelay: '1.5s' }}>
        <rect x="46" y="275" width="8" height="30" fill="#3D291D" />
        <polygon points="50,180 15,240 85,240" fill="#2D5037" />
        <polygon points="50,210 22,260 78,260" fill="#3B6547" />
        <polygon points="50,230 28,280 72,280" fill="#4A7C59" />
      </g>

      {/* Pixel Water Stream */}
      <path d="M340 270 Q370 290 350 320 T420 360 L490 360 Q430 320 440 290 T390 270 Z" fill="url(#waterGrad)" />
      {/* Water Ripple Lines */}
      <rect x="365" y="285" width="24" height="3" fill="#E8F4F8" className="animate-water" rx="1.5" />
      <rect x="390" y="315" width="30" height="3" fill="#E8F4F8" className="animate-water" rx="1.5" style={{ animationDelay: '1s' }} />

      {/* Cozy Cabin / Shelter (Right Midground) */}
      <g>
        {/* Cabin Walls */}
        <rect x="580" y="230" width="84" height="60" fill="#6E4A35" rx="2" />
        {/* Roof */}
        <polygon points="622,185 560,234 684,234" fill="#A84E3A" />
        <polygon points="622,192 570,234 674,234" fill="#E06D53" />
        {/* Door */}
        <rect x="610" y="254" width="24" height="36" fill="#3D291D" rx="2" />
        <circle cx="628" cy="272" r="2.5" fill="#E6BD80" />
        {/* Window with warm glow */}
        <rect x="590" y="246" width="16" height="16" fill="#FCE38A" rx="2" />
        <rect x="597" y="246" width="2" height="16" fill="#6E4A35" />
        <rect x="590" y="253" width="16" height="2" fill="#6E4A35" />
        {/* Chimney Smoke */}
        <rect x="650" y="200" width="10" height="25" fill="#52392B" />
        <rect x="652" y="184" width="12" height="10" fill="#F7F5F0" opacity="0.75" rx="3" className="animate-cloud" />
      </g>

      {/* Right Trees */}
      <g className="animate-tree" style={{ transformOrigin: '720px 300px', animationDelay: '0.8s' }}>
        <rect x="715" y="260" width="10" height="36" fill="#3D291D" />
        <polygon points="720,165 675,230 765,230" fill="#2D5037" />
        <polygon points="720,195 682,250 758,250" fill="#3B6547" />
        <polygon points="720,225 690,275 750,275" fill="#4A7C59" />
      </g>

      {/* Character Sitting on Bench (Cozy Sanctuary Vibe) */}
      <g>
        {/* Wooden Bench */}
        <rect x="260" y="280" width="40" height="6" fill="#6E4A35" rx="1" />
        <rect x="266" y="286" width="4" height="14" fill="#3D291D" />
        <rect x="290" y="286" width="4" height="14" fill="#3D291D" />
        {/* Small Pixel Character */}
        {/* Body/Jacket */}
        <rect x="274" y="262" width="14" height="18" fill="var(--accent)" rx="2" />
        {/* Head */}
        <circle cx="281" cy="254" r="7" fill="#F7D4B6" />
        {/* Cozy Beanie Cap */}
        <rect x="273" y="244" width="16" height="7" fill="#4A7C59" rx="3" />
        <circle cx="281" cy="243" r="2.5" fill="#E6BD80" />
        {/* Warm Cup in hands */}
        <rect x="279" y="268" width="6" height="7" fill="#F7F5F0" rx="1" />
        {/* Steam */}
        <rect x="281" y="262" width="2" height="4" fill="#F7F5F0" opacity="0.7" />
      </g>

      {/* Foreground Wildflowers & Plants */}
      <g>
        <circle cx="160" cy="320" r="3" fill="#E06D53" />
        <circle cx="210" cy="335" r="3.5" fill="#EE9884" />
        <circle cx="530" cy="328" r="3" fill="#E6BD80" />
        <circle cx="560" cy="338" r="4" fill="#E06D53" />
        <path d="M150 340 Q155 320 160 340" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
        <path d="M220 345 Q225 330 230 345" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PIXEL ART EMPTY STATE ILLUSTRATION
───────────────────────────────────────────────────────────────────────────── */
export function PixelEmptyState() {
  return (
    <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="10" y="100" width="160" height="16" fill="var(--bg-subtle)" rx="8" />
      {/* Small Cozy Garden Plot */}
      <rect x="40" y="85" width="100" height="20" fill="#6E4A35" rx="4" />
      {/* Sprouting Seeds */}
      <g>
        <path d="M60 85 V75 M56 77 Q60 72 64 77" stroke="var(--accent-done)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M90 85 V70 M85 73 Q90 66 95 73" stroke="var(--accent-done)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M120 85 V75 M116 77 Q120 72 124 77" stroke="var(--accent-done)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Pixel Watering Can */}
      <g transform="translate(108, 42)">
        <rect x="0" y="10" width="22" height="18" fill="var(--accent-blue)" rx="3" />
        <path d="M22 14 L30 8" stroke="var(--accent-blue)" strokeWidth="3" strokeLinecap="round" />
        <path d="M-6 16 C-6 8 0 8 0 12" stroke="var(--accent-blue)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Water drops */}
        <circle cx="32" cy="18" r="1.5" fill="var(--accent-blue)" />
        <circle cx="35" cy="24" r="1.5" fill="var(--accent-blue)" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAV & ICON COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
export function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function IconHabits() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="7" y1="8" x2="17" y2="8" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="7" y1="16" x2="13" y2="16" />
    </svg>
  );
}

export function IconStats() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function IconMoon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconFire() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
    </svg>
  );
}

export function IconFlame() {
  return <IconFire />;
}

export function IconStar() {
  return <span style={{ fontSize: '16px' }}>✨</span>;
}

export function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconEdit() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export function IconTrash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

/* Category Icons */
export function IllustrationExercise() {
  return <span style={{ fontSize: '20px' }}>🌲</span>;
}
export function IllustrationReading() {
  return <span style={{ fontSize: '20px' }}>📖</span>;
}
export function IllustrationCoding() {
  return <span style={{ fontSize: '20px' }}>💻</span>;
}
export function IllustrationWater() {
  return <span style={{ fontSize: '20px' }}>💧</span>;
}
export function IllustrationMeditation() {
  return <span style={{ fontSize: '20px' }}>🧘</span>;
}
export function IllustrationNoSocialMedia() {
  return <span style={{ fontSize: '20px' }}>🌱</span>;
}
