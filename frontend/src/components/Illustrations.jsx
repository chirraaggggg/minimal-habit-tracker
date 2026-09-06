/**
 * Cute, Soft & Minimal SVG Illustration System for "better days" / "Better Me" Habit Tracker
 * Zero emojis — Pure vector illustrations with soft fills and friendly paths.
 */

/* ─────────────────────────────────────────────────────────────────────────────
   BRAND — Green Leaf Logo (sidebar top)
───────────────────────────────────────────────────────────────────────────── */
export function BunnyLogo({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft circular background */}
      <circle cx="22" cy="22" r="20" fill="#E8F5E9" />
      {/* Primary Leaf */}
      <path d="M22 8C22 8 13 14 13 24C13 29 17 33 22 33C27 33 31 29 31 24C31 14 22 8 22 8Z" fill="#4E8752" />
      <path d="M22 8V33" stroke="#FAF9F6" strokeWidth="1.8" strokeLinecap="round" />
      {/* Side Leaf sprout */}
      <path d="M22 20C22 20 27 18 28 14C24 14 22 20 22 20Z" fill="#7DBA91" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SIDEBAR BOTTOM — Bunny in garden
───────────────────────────────────────────────────────────────────────────── */
export function BunnySidebar() {
  return (
    <svg width="100" height="90" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft ground hill */}
      <ellipse cx="50" cy="80" rx="42" ry="7" fill="#E2F0D9" opacity="0.8"/>
      {/* Small plants/grass */}
      <path d="M16 78 Q18 70 20 78" stroke="#4E8752" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M20 78 Q22 68 24 78" stroke="#4E8752" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M76 76 Q78 68 80 76" stroke="#4E8752" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M80 76 Q82 67 84 76" stroke="#4E8752" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      {/* Flower left */}
      <circle cx="14" cy="68" r="3" fill="#FCE38A"/>
      <circle cx="14" cy="68" r="1.2" fill="#F5A27D"/>
      {/* Flower right */}
      <circle cx="86" cy="66" r="3" fill="#F58B96"/>
      <circle cx="86" cy="66" r="1.2" fill="#FCE38A"/>

      {/* Bunny Body */}
      <ellipse cx="50" cy="68" rx="16" ry="12" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1"/>
      {/* Tail */}
      <circle cx="66" cy="72" r="4" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1"/>
      {/* Head */}
      <ellipse cx="48" cy="56" rx="11" ry="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1"/>
      {/* Ears */}
      <ellipse cx="43" cy="42" rx="3.5" ry="9" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1"/>
      <ellipse cx="51" cy="41" rx="3.5" ry="9" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1"/>
      <ellipse cx="43" cy="42" rx="1.8" ry="5" fill="#F9A8D4"/>
      <ellipse cx="51" cy="41" rx="1.8" ry="5" fill="#F9A8D4"/>
      {/* Closed happy eye */}
      <path d="M43 55 Q45 53 47 55" stroke="#18233B" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      {/* Cheek */}
      <ellipse cx="42" cy="58" rx="2" ry="1" fill="#F9A8D4" opacity="0.6"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO BANNER — Bunny in peaceful landscape
───────────────────────────────────────────────────────────────────────────── */
export function BunnyHero() {
  return (
    <svg width="220" height="110" viewBox="0 0 220 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Soft rolling hills background */}
      <path d="M0 100 Q60 70 120 95 Q180 80 220 100 V110 H0 Z" fill="#D8ECDC" opacity="0.6"/>
      <path d="M0 105 Q70 85 140 102 Q190 92 220 105 V110 H0 Z" fill="#C5E3CA" opacity="0.8"/>

      {/* Sun soft glow */}
      <circle cx="190" cy="35" r="16" fill="#FDE68A" opacity="0.5"/>
      <circle cx="190" cy="35" r="11" fill="#FDE68A"/>

      {/* Clouds */}
      <ellipse cx="40" cy="28" rx="16" ry="8" fill="#FFFFFF" opacity="0.85"/>
      <ellipse cx="52" cy="30" rx="11" ry="6" fill="#FFFFFF" opacity="0.85"/>
      <ellipse cx="130" cy="22" rx="14" ry="7" fill="#FFFFFF" opacity="0.75"/>

      {/* Flowers & Plants */}
      <line x1="24" y1="82" x2="24" y2="98" stroke="#4E8752" strokeWidth="1.8"/>
      <circle cx="24" cy="79" r="4.5" fill="#F58B96"/>
      <circle cx="24" cy="79" r="2" fill="#FDE68A"/>

      <line x1="36" y1="88" x2="36" y2="100" stroke="#4E8752" strokeWidth="1.6"/>
      <circle cx="36" cy="85" r="3.5" fill="#FCE38A"/>

      <line x1="165" y1="86" x2="165" y2="98" stroke="#4E8752" strokeWidth="1.6"/>
      <circle cx="165" cy="83" r="4" fill="#B58AD9"/>

      <line x1="178" y1="84" x2="178" y2="98" stroke="#4E8752" strokeWidth="1.6"/>
      <circle cx="178" cy="81" r="3.5" fill="#F5A27D"/>

      {/* Cute White Bunny lying down */}
      {/* Body */}
      <ellipse cx="90" cy="84" rx="26" ry="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2"/>
      {/* Tail */}
      <circle cx="114" cy="88" r="5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2"/>
      {/* Head */}
      <ellipse cx="74" cy="74" rx="13" ry="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2"/>
      {/* Ears */}
      <ellipse cx="68" cy="56" rx="4.5" ry="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" transform="rotate(-8 68 56)"/>
      <ellipse cx="78" cy="54" rx="4.5" ry="12" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.2" transform="rotate(8 78 54)"/>
      <ellipse cx="68" cy="56" rx="2.2" ry="7" fill="#F9A8D4" transform="rotate(-8 68 56)"/>
      <ellipse cx="78" cy="54" rx="2.2" ry="7" fill="#F9A8D4" transform="rotate(8 78 54)"/>
      {/* Closed happy eyes */}
      <path d="M68 73 Q70 71 72 73" stroke="#18233B" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M76 73 Q78 71 80 73" stroke="#18233B" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      {/* Cheeks */}
      <ellipse cx="66" cy="76" rx="2.5" ry="1.2" fill="#F9A8D4" opacity="0.6"/>
      <ellipse cx="81" cy="76" rx="2.5" ry="1.2" fill="#F9A8D4" opacity="0.6"/>
      {/* Tiny Nose */}
      <ellipse cx="74" cy="76" rx="1.5" ry="1" fill="#F58B96"/>

      {/* Butterfly */}
      <ellipse cx="140" cy="54" rx="5" ry="3" fill="#F58B96" opacity="0.8" transform="rotate(-25 140 54)"/>
      <ellipse cx="148" cy="51" rx="5" ry="3" fill="#F58B96" opacity="0.8" transform="rotate(25 148 51)"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROGRESS CARD — Bunny looking at landscape (under Today panel)
───────────────────────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────────────────────
   PROGRESS CARD — Sleeping Bunny under crescent moon and stars
───────────────────────────────────────────────────────────────────────────── */
export function BunnySleeping() {
  return (
    <svg width="130" height="85" viewBox="0 0 130 85" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Crescent Moon */}
      <path d="M105 14C100 14 96 18 96 24C96 30 101 35 107 35C108.5 35 109.8 34.6 111 33.8C108.5 36.5 104.8 38 100.5 38C92.5 38 86 31.5 86 23.5C86 16.5 91 10.8 97.5 9.5C96 10.8 95 12.8 95 15C95 19.4 98.6 23 103 23C104.8 23 106.5 22.4 107.8 21.3C106.5 22.4 105 23 105 23Z" fill="#FDE68A" />

      {/* Yellow Stars & Sparkles */}
      <circle cx="75" cy="18" r="1.5" fill="#FDE68A" />
      <path d="M68 28L69.5 31L72.5 32.5L69.5 34L68 37L66.5 34L63.5 32.5L66.5 31L68 28Z" fill="#FDE68A" />
      <circle cx="118" cy="28" r="1.2" fill="#FDE68A" />

      {/* Soft Ground hill */}
      <path d="M0 72 Q65 58 130 70 V85 H0 Z" fill="#2E4D43" opacity="0.9" />
      <path d="M0 75 Q70 64 130 74 V85 H0 Z" fill="#3D6456" />

      {/* Tiny grass blades */}
      <path d="M22 68 Q24 60 26 68" stroke="#528271" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M26 68 Q28 58 30 68" stroke="#528271" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* Sleeping White Bunny */}
      {/* Body */}
      <ellipse cx="80" cy="65" rx="18" ry="11" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      {/* Tail */}
      <circle cx="97" cy="67" r="3.5" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      {/* Head tucked down */}
      <ellipse cx="66" cy="67" rx="10" ry="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      {/* Ears laying back */}
      <ellipse cx="74" cy="55" rx="3.2" ry="9" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(35 74 55)" />
      <ellipse cx="80" cy="57" rx="3.2" ry="9" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" transform="rotate(45 80 57)" />
      <ellipse cx="74" cy="55" rx="1.6" ry="5" fill="#F9A8D4" transform="rotate(35 74 55)" />
      <ellipse cx="80" cy="57" rx="1.6" ry="5" fill="#F9A8D4" transform="rotate(45 80 57)" />
      {/* Sleeping eye curve */}
      <path d="M62 67 Q64 69 66 67" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Cheek */}
      <ellipse cx="61" cy="69" rx="1.8" ry="1" fill="#F9A8D4" opacity="0.6" />
    </svg>
  );
}

export function BunnyProgress() {
  return <BunnySleeping />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   HABIT CATEGORY ICONS (Hand-drawn rounded vector icons)
───────────────────────────────────────────────────────────────────────────── */
export function IllustrationReading() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Open Book */}
      <path d="M4 7C4 7 8.5 6 14 9C19.5 6 24 7 24 7V20C24 20 19.5 19 14 22C8.5 19 4 20 4 20V7Z" fill="#1E3A8A" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 9V22" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 11H11M7 14H11M17 11H21M17 14H21" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationExercise() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dumbbell */}
      <rect x="4" y="9" width="3.5" height="10" rx="1.5" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" strokeWidth="1.6" />
      <rect x="20.5" y="9" width="3.5" height="10" rx="1.5" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" strokeWidth="1.6" />
      <rect x="7.5" y="11" width="2.5" height="6" rx="1" fill="#FB7185" stroke="#F43F5E" strokeWidth="1.2" />
      <rect x="18" y="11" width="2.5" height="6" rx="1" fill="#FB7185" stroke="#F43F5E" strokeWidth="1.2" />
      <rect x="10" y="12.5" width="8" height="3" rx="1" fill="#F43F5E" stroke="#F43F5E" strokeWidth="1" />
    </svg>
  );
}

export function IllustrationWater() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Water Drop */}
      <path d="M14 4C14 4 6 13 6 18C6 22.4 9.6 25 14 25C18.4 25 22 22.4 22 18C22 13 14 4 14 4Z" fill="#134E4A" fillOpacity="0.4" stroke="#06B6D4" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11 16C11 16 11.5 19 14.5 19.5" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationJournal() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Notebook with Pencil */}
      <rect x="6" y="5" width="16" height="18" rx="2.5" fill="#78350F" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="1.8" />
      <path d="M6 9H22" stroke="#FBBF24" strokeWidth="1.4" />
      <path d="M10 13H18M10 16H15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="9" r="1" fill="#F59E0B" />
    </svg>
  );
}

export function IllustrationMeditation() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lotus Flower */}
      <path d="M14 6C14 6 10 12 10 17C10 20 12 21.5 14 21.5C16 21.5 18 20 18 17C18 12 14 6 14 6Z" fill="#581C87" fillOpacity="0.4" stroke="#A855F7" strokeWidth="1.6" />
      <path d="M14 12C11 13 6 15 6 19C6 21 8.5 21.5 11 21.5C13 21.5 14 19.5 14 17" fill="#C084FC" opacity="0.6" stroke="#A855F7" strokeWidth="1.4" />
      <path d="M14 12C17 13 22 15 22 19C22 21 19.5 21.5 17 21.5C15 21.5 14 19.5 14 17" fill="#C084FC" opacity="0.6" stroke="#A855F7" strokeWidth="1.4" />
    </svg>
  );
}

export function IllustrationNoSocialMedia() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone with slash */}
      <rect x="8" y="5" width="12" height="18" rx="2.5" fill="#7C2D12" fillOpacity="0.4" stroke="#EA580C" strokeWidth="1.6" />
      <line x1="12" y1="20" x2="16" y2="20" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="22" x2="23" y2="6" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationCoding() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Code Brackets </> */}
      <path d="M9 9L4 14L9 19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 9L24 14L19 19" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 6L12 22" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IllustrationSleep() {
  return <IllustrationNoSocialMedia />;
}

export function IllustrationEmptyState() {
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="30" fill="#E8F5E9" />
      <path d="M35 18C35 18 24 24 24 35C24 41 29 45 35 45C41 45 46 41 46 35C46 24 35 18 35 18Z" fill="#4E8752" />
      <path d="M35 18V45" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CategoryIllustration({ categoryKey = 'read', size = 24 }) {
  const key = String(categoryKey).toLowerCase();
  if (key.includes('gym') || key.includes('exercise') || key.includes('fitness') || key.includes('workout')) return <IllustrationExercise />;
  if (key.includes('read') || key.includes('book') || key.includes('study')) return <IllustrationReading />;
  if (key.includes('code') || key.includes('coding') || key.includes('dev')) return <IllustrationCoding />;
  if (key.includes('meditat') || key.includes('peace') || key.includes('mindful')) return <IllustrationMeditation />;
  if (key.includes('water') || key.includes('drink') || key.includes('hydrat')) return <IllustrationWater />;
  if (key.includes('social') || key.includes('phone') || key.includes('media') || key.includes('screen') || key.includes('no social')) return <IllustrationNoSocialMedia />;
  if (key.includes('journal') || key.includes('note') || key.includes('write')) return <IllustrationJournal />;
  
  return <IllustrationReading />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   STAT CARD ICONS
───────────────────────────────────────────────────────────────────────────── */
export function IconSprout() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 21V13" stroke="#4E8752" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 13C12 13 6 12 6 7C10 7 12 13 12 13Z" fill="#7DBA91" stroke="#4E8752" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 11C12 11 18 10 18 5C14 5 12 11 12 11Z" fill="#A3D9B1" stroke="#4E8752" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconFlame() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3C12 3 7 8 7 13C7 15.8 8.8 17.5 12 17.5C15.2 17.5 17 15.8 17 13C17 11 16 9 14.8 7.8C14.8 9.8 13.5 11 12 11C10.8 11 9.8 10 9.8 8.8C9.8 6.5 12 3 12 3Z" fill="#F5A27D" stroke="#E65100" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 17.5C12 17.5 9.5 19 9.5 20.5C9.5 21.3 10.6 22 12 22C13.4 22 14.5 21.3 14.5 20.5C14.5 19 12 17.5 12 17.5Z" fill="#FCE38A" stroke="#F57F17" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconStar() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 2.5L14.8 8.8L21.5 9.7L16.5 14.4L17.8 21.5L12 18.1L6.2 21.5L7.5 14.4L2.5 9.7L9.2 8.8L12 2.5Z" fill="#B58AD9" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

export function IconChart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Circular progress / target */}
      <circle cx="12" cy="12" r="8" stroke="#78A9E8" strokeWidth="3" strokeDasharray="50" strokeDashoffset="12" fill="none" />
      <circle cx="12" cy="12" r="4" fill="#78A9E8" />
    </svg>
  );
}

export function IconCrown() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 17L2 7L8 12L12 4L16 12L22 7L20 17H4Z" fill="#FFF9E6" stroke="#F57F17" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
      <path d="M4 17H20V19H4V17Z" fill="#FFE082" stroke="#F57F17" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVIGATION ICONS
───────────────────────────────────────────────────────────────────────────── */
export function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 12L12 4L21 12V21H15V15H9V21H3V12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconHabits() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}

export function IconStats() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 9H21" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M8 2V6M16 2V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 1V4M12 20V23M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M1 12H4M20 12H23M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   THEME ICONS
───────────────────────────────────────────────────────────────────────────── */
export function IconSun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 1V3M12 21V23M4.2 4.2L5.6 5.6M18.4 18.4L19.8 19.8M1 12H3M21 12H23M4.2 19.8L5.6 18.4M18.4 5.6L19.8 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconMoon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   UI ICONS
───────────────────────────────────────────────────────────────────────────── */
export function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconEdit() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M11 2L14 5L5 14H2V11L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTrash() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 4H13M5 4V3C5 2.5 5.5 2 6 2H10C10.5 2 11 2.5 11 3V4M12 4V13C12 13.5 11.5 14 11 14H5C4.5 14 4 13.5 4 13V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconDots() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="8" cy="3.5" r="1.3" fill="currentColor"/>
      <circle cx="8" cy="8" r="1.3" fill="currentColor"/>
      <circle cx="8" cy="12.5" r="1.3" fill="currentColor"/>
    </svg>
  );
}

export function IllustrationLogo() { return <BunnyLogo />; }
export function StageSeed() { return null; }
export function StageSprout() { return null; }
export function StagePlant() { return null; }
export function StageFlower() { return null; }

