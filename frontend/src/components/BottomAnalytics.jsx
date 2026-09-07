import { IconFlame, IconStar } from './Illustrations';

export default function BottomAnalytics({ stats, loading }) {
  const completionRate = stats?.completionRate ?? 0;
  const currentStreak = stats?.currentStreak ?? 0;
  const bestStreak = stats?.bestStreak ?? 0;

  return (
    <div className="bottom-analytics" role="region" aria-label="Detailed analytics">
      {/* Card 1: Completion Rate */}
      <div className="analytics-card">
        <button type="button" className="analytics-card-arrow" aria-label="Completion rate details">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="analytics-card-main">
          <div className="analytics-ring-wrap">
            <svg width="54" height="54" viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="18" stroke="#1E293B" strokeWidth="4" fill="none" />
              <circle
                cx="22" cy="22" r="18"
                stroke="#34D399" strokeWidth="4" fill="none"
                strokeDasharray="113"
                strokeDashoffset={113 - (113 * (loading ? 0 : completionRate)) / 100}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
              />
            </svg>
            <span className="analytics-ring-text tabular-nums">{loading ? '—' : `${completionRate}%`}</span>
          </div>

          <div className="analytics-card-details">
            <h3 className="analytics-card-title">Completion Rate</h3>
            <span className="analytics-card-sub green-sub">+12% from last month</span>
          </div>
        </div>

        {/* Green sparkline */}
        <div className="analytics-card-chart" aria-hidden="true">
          <svg width="90" height="28" viewBox="0 0 90 28" fill="none">
            <path
              d="M2 24 C15 20, 25 22, 35 15 C45 20, 55 10, 65 14 C75 8, 85 10, 88 4"
              stroke="#34D399"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Card 2: Current Streak */}
      <div className="analytics-card">
        <button type="button" className="analytics-card-arrow" aria-label="Current streak details">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="analytics-card-top-icon">
          <IconFlame />
          <span className="analytics-card-label">Current Streak</span>
        </div>
        <div className="analytics-card-value">
          {loading ? '—' : `${currentStreak} days`}
        </div>
        <div className="analytics-card-sub">Keep going!</div>

        {/* Orange bar chart */}
        <div className="analytics-card-bars" aria-hidden="true">
          <svg width="70" height="26" viewBox="0 0 70 26" fill="none">
            <rect x="4"  y="16" width="6" height="10" rx="1.5" fill="#F97316" opacity="0.4"/>
            <rect x="15" y="12" width="6" height="14" rx="1.5" fill="#F97316" opacity="0.5"/>
            <rect x="26" y="8"  width="6" height="18" rx="1.5" fill="#F97316" opacity="0.6"/>
            <rect x="37" y="14" width="6" height="12" rx="1.5" fill="#F97316" opacity="0.7"/>
            <rect x="48" y="4"  width="6" height="22" rx="1.5" fill="#F97316"/>
            <rect x="59" y="8"  width="6" height="18" rx="1.5" fill="#F97316"/>
          </svg>
        </div>
      </div>

      {/* Card 3: Longest Streak */}
      <div className="analytics-card">
        <button type="button" className="analytics-card-arrow" aria-label="Longest streak details">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="analytics-card-top-icon">
          <IconStar />
          <span className="analytics-card-label">Longest Streak</span>
        </div>
        <div className="analytics-card-value">
          {loading ? '—' : `${bestStreak} days`}
        </div>
        <div className="analytics-card-sub">You're on fire!</div>

        {/* Purple bar chart */}
        <div className="analytics-card-bars" aria-hidden="true">
          <svg width="70" height="26" viewBox="0 0 70 26" fill="none">
            <rect x="4"  y="14" width="6" height="12" rx="1.5" fill="#A855F7" opacity="0.4"/>
            <rect x="15" y="10" width="6" height="16" rx="1.5" fill="#A855F7" opacity="0.5"/>
            <rect x="26" y="16" width="6" height="10" rx="1.5" fill="#A855F7" opacity="0.6"/>
            <rect x="37" y="6"  width="6" height="20" rx="1.5" fill="#A855F7" opacity="0.8"/>
            <rect x="48" y="12" width="6" height="14" rx="1.5" fill="#A855F7"/>
            <rect x="59" y="2"  width="6" height="24" rx="1.5" fill="#A855F7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

