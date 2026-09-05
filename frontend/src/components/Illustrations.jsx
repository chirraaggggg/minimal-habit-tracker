/**
 * Cute, Soft & Minimal SVG Illustration System for Habit Tracker
 * Zero emojis - Pure vector illustrations with soft fills and friendly paths.
 */

// Brand Logo Illustration: Cute Plant Sprout in Pot
export function IllustrationLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14C7 14 5 19 8 19H16C19 19 17 14 17 14H7Z" fill="#FCE38A" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 14V9" stroke="#2D3142" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 9C12 9 8 8.5 8 5C11.5 5 12 9 12 9Z" fill="#6EB887" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 11C12 11 16 10.5 16 7C12.5 7 12 11 12 11Z" fill="#A3B18A" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// Category 1: Exercise (Dumbbell / Active)
export function IllustrationExercise() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="11" width="4" height="10" rx="2" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
      <rect x="23" y="11" width="4" height="10" rx="2" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
      <rect x="9" y="13" width="3" height="6" rx="1" fill="#FFD166" stroke="#2D3142" strokeWidth="1.2" />
      <rect x="20" y="13" width="3" height="6" rx="1" fill="#FFD166" stroke="#2D3142" strokeWidth="1.2" />
      <rect x="12" y="14" width="8" height="4" rx="1" fill="#EAE5DC" stroke="#2D3142" strokeWidth="1.5" />
    </svg>
  );
}

// Category 2: Reading (Book)
export function IllustrationReading() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9C5 9 10 8 16 11C22 8 27 9 27 9V23C27 23 22 22 16 25C10 22 5 23 5 23V9Z" fill="#A0C4FF" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 11V25" stroke="#2D3142" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 13H13M9 16H13M19 13H23M19 16H23" stroke="#2D3142" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Category 3: Coding (Laptop)
export function IllustrationCoding() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="20" height="13" rx="2" fill="#BDB2FF" stroke="#2D3142" strokeWidth="1.5" />
      <path d="M4 23H28C28 23 27 25 24 25H8C5 25 4 23 4 23Z" fill="#EAE5DC" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M11 13L13 15L11 17M17 17H21" stroke="#2D3142" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Category 4: Water (Glass / Drops)
export function IllustrationWater() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 8L10 25C10 25 10.5 26.5 16 26.5C21.5 26.5 22 25 22 25L24 8H8Z" fill="#9BF6FF" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 14C12 15 14 13 16 14C18 15 20 13 22.5 14" stroke="#2D3142" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M16 3C16 3 13 6 13 8C13 9.6 14.3 11 16 11C17.7 11 19 9.6 19 8C19 6 16 3 16 3Z" fill="#CAFFBF" stroke="#2D3142" strokeWidth="1.2" />
    </svg>
  );
}

// Category 5: Meditation (Peaceful Sun / Lotus)
export function IllustrationMeditation() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="8" fill="#FDFFB6" stroke="#2D3142" strokeWidth="1.5" />
      <path d="M16 4V6M16 26V28M4 16H6M26 16H28M7.5 7.5L9 9M23 23L24.5 24.5M7.5 24.5L9 23M23 9L24.5 7.5" stroke="#2D3142" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 16C13 16 14 17.5 16 17.5C18 17.5 19 16 19 16" stroke="#2D3142" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// Category 6: Sleep (Moon & Star)
export function IllustrationSleep() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16C21 20.4 17.4 24 13 24C11.3 24 9.7 23.5 8.4 22.5C11.7 22.3 14.5 19.5 14.5 16C14.5 12.5 11.7 9.7 8.4 9.5C9.7 8.5 11.3 8 13 8C17.4 8 21 11.6 21 16Z" fill="#FFD6A5" stroke="#2D3142" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M24 7L24.5 8.5L26 9L24.5 9.5L24 11L23.5 9.5L22 9L23.5 8.5L24 7Z" fill="#FDFFB6" stroke="#2D3142" strokeWidth="1" />
    </svg>
  );
}

// Companion Growth Stage 1: Seed
export function StageSeed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="38" rx="16" ry="5" fill="#EAE5DC" />
      <path d="M24 24C28 24 30 28 30 32C30 36 26 38 24 38C22 38 18 36 18 32C18 28 20 24 24 24Z" fill="#FCE38A" stroke="#2D3142" strokeWidth="2" />
      <path d="M22 28C22 28 23 29 24 29C25 29 26 28 26 28" stroke="#2D3142" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Companion Growth Stage 2: Sprout
export function StageSprout() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="40" rx="14" ry="4" fill="#EAE5DC" />
      <path d="M24 40V24" stroke="#2D3142" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28C24 28 17 27 17 20C22 20 24 28 24 28Z" fill="#A3B18A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 25C24 25 31 24 31 17C26 17 24 25 24 25Z" fill="#6EB887" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Companion Growth Stage 3: Growing Plant in Pot
export function StagePlant() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 36C18 36 15 48 20 48H36C41 48 38 36 38 36H18Z" fill="#FCE38A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 36V18" stroke="#2D3142" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 28C28 28 18 26 18 18C25 18 28 28 28 28Z" fill="#A3B18A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 24C28 24 38 22 38 14C31 14 28 24 28 24Z" fill="#6EB887" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 20C28 20 22 13 24 8C28 8 28 20 28 20Z" fill="#CAFFBF" stroke="#2D3142" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

// Companion Growth Stage 4: Blooming Flower
export function StageFlower() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 42C22 42 19 56 24 56H40C45 56 42 42 42 42H22Z" fill="#FCE38A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M32 42V22" stroke="#2D3142" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 32C32 32 20 30 20 22C28 22 32 32 32 32Z" fill="#6EB887" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M32 28C32 28 44 26 44 18C36 18 32 28 32 28Z" fill="#A3B18A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      
      {/* Flower Petals */}
      <circle cx="32" cy="14" r="5" fill="#FDFFB6" stroke="#2D3142" strokeWidth="1.5" />
      <circle cx="26" cy="14" r="4.5" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
      <circle cx="38" cy="14" r="4.5" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
      <circle cx="32" cy="8" r="4.5" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
      <circle cx="32" cy="20" r="4.5" fill="#F4ACB7" stroke="#2D3142" strokeWidth="1.5" />
    </svg>
  );
}

// Empty State: Watering Can & Pot
export function IllustrationEmptyState() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 46C26 46 22 62 28 62H44C50 62 46 46 46 46H26Z" fill="#FCE38A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M36 46V36" stroke="#2D3142" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 38C36 38 28 36 28 28C34 28 36 38 36 38Z" fill="#6EB887" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
      <path d="M36 36C36 36 44 34 44 26C38 26 36 36 36 36Z" fill="#A3B18A" stroke="#2D3142" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

// Category Illustration Component
export function CategoryIllustration({ categoryKey = 'exercise' }) {
  switch (String(categoryKey).toLowerCase()) {
    case 'exercise':
    case 'fitness':
    case 'gym':
    case 'running':
      return <IllustrationExercise />;
    case 'reading':
    case 'book':
    case 'study':
      return <IllustrationReading />;
    case 'coding':
    case 'work':
    case 'laptop':
      return <IllustrationCoding />;
    case 'water':
    case 'drink':
    case 'health':
      return <IllustrationWater />;
    case 'meditation':
    case 'peace':
    case 'yoga':
      return <IllustrationMeditation />;
    case 'sleep':
    case 'rest':
      return <IllustrationSleep />;
    default:
      return <IllustrationLogo />;
  }
}

// UI Control Icons (Plus, Edit, Trash, Checkmark, Close)
export function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconEdit() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 2L14 5L5 14H2V11L11 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTrash() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4H13M5 4V3C5 2.5 5.5 2 6 2H10C10.5 2 11 2.5 11 3V4M12 4V13C12 13.5 11.5 14 11 14H5C4.5 14 4 13.5 4 13V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
