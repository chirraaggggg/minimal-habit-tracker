/**
 * Small inline SVG icons in the scene's illustration language.
 * Used by StatCards and later by other panels so the whole app
 * shares one visual vocabulary rather than raw emoji-in-boxes.
 */
export function IconSeedling({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Stem */}
      <path
        d="M12 20 L12 11"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M12 13 C 9 11 7 12 7 14 C 7 16 10 15 12 13 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Right leaf */}
      <path
        d="M12 13 C 15 11 17 12 17 14 C 17 16 14 15 12 13 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Ground speckle */}
      <circle cx="12" cy="21" r="2.4" fill={color} opacity="0.55" />
      <circle cx="9" cy="22" r="1.4" fill={color} opacity="0.4" />
      <circle cx="15" cy="22" r="1.4" fill={color} opacity="0.4" />
    </svg>
  );
}

export function IconFlameIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Inner ember glow */}
      <circle cx="12" cy="12" r="11" fill={color} opacity="0.18" />
      {/* Flame body */}
      <path
        d="M12 22 C 8 17 6 14 7 11 C 8 8 10 7 12 8 C 14 7 16 8 17 11 C 18 14 16 17 12 22 Z"
        fill={color}
        opacity="0.92"
      />
      {/* Inner highlight */}
      <path
        d="M12 20 C 10 16 9 14 10 12 C 10.5 10.5 11.5 10.5 12 12 C 12.5 10.5 13.5 10.5 14 12 C 15 14 14 16 12 20 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
      {/* Small spark */}
      <circle cx="15" cy="9" r="1.1" fill={color} />
    </svg>
  );
}

export function IconSparkle({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Soft glow */}
      <circle cx="12" cy="12" r="11" fill={color} opacity="0.16" />
      {/* 4-point star */}
      <path
        d="M12 3 L13.1 10.4 L20.4 11.5 L14.4 16.6 L16 24 L12 20 L8 24 L9.6 16.6 L3.6 11.5 L10.9 10.4 Z"
        fill={color}
        opacity="0.92"
      />
      {/* Center spark */}
      <circle cx="12" cy="12" r="2.2" fill="#FFFFFF" opacity="0.7" />
      {/* Tiny surrounding dots */}
      <circle cx="6" cy="12" r="1" fill={color} opacity="0.7" />
      <circle cx="18" cy="12" r="1" fill={color} opacity="0.7" />
      <circle cx="12" cy="6" r="1" fill={color} opacity="0.7" />
      <circle cx="12" cy="18" r="1" fill={color} opacity="0.7" />
    </svg>
  );
}

export function IconTrendUp({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Soft track underlay */}
      <path
        d="M4 18 L7 15 L10 16.5 L13 12 L16 14 L19 9"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
        strokeDasharray="2 2"
      />
      {/* Rising line */}
      <path
        d="M3 18 L6.5 14.5 L9.5 16 L12.5 11.5 L15.5 13.5 L18.5 8.5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle cx="18.5" cy="8.5" r="2.2" fill={color} />
      {/* First dot */}
      <circle cx="3" cy="18" r="1.4" fill={color} opacity="0.6" />
      {/* Small spark at peak */}
      <circle cx="15" cy="11" r="1" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}
