import { IconSeedling, IconFlameIcon, IconSparkle, IconTrendUp } from './IconSet';

const STAT_CONFIG = [
  {
    key: 'habits',
    label: 'Active habits',
    Icon: IconSeedling,
    accent: 'var(--accent-done)',
    bgVar: 'var(--stat-bg-0)',
    unit: '',
  },
  {
    key: 'streak',
    label: 'Best streak',
    Icon: IconFlameIcon,
    accent: 'var(--accent)',
    bgVar: 'var(--stat-bg-1)',
    unit: 'd',
  },
  {
    key: 'total',
    label: 'Total nurtured',
    Icon: IconSparkle,
    accent: 'var(--accent-blue)',
    bgVar: 'var(--stat-bg-2)',
    unit: '',
  },
  {
    key: 'rate',
    label: 'Consistency',
    Icon: IconTrendUp,
    accent: 'var(--accent)',
    bgVar: 'var(--stat-bg-3)',
    unit: '%',
  },
];

export default function StatCards({ habitsCount = 0, selectedStats = null, totalCompleted = 0, loading = false }) {
  const values = {
    habits: habitsCount,
    streak: selectedStats?.longestStreak ?? selectedStats?.currentStreak ?? 0,
    total:  totalCompleted,
    rate:   selectedStats?.completionRate ?? 0,
  };

  return (
    <div className="stat-cards-row" role="region" aria-label="Summary statistics">
      {STAT_CONFIG.map(({ key, label, Icon, accent, bgVar, unit }) => (
        <div
          key={key}
          className={`stat-card-v2 ${loading && key !== 'habits' ? 'stat-card-v2--loading' : ''}`}
          style={{ background: bgVar }}
        >
          <div
            className="stat-card-v2-icon"
            style={{ color: accent, background: 'rgba(255,255,255,0.25)' }}
          >
            <Icon size={22} />
          </div>
          <div className="stat-card-v2-body">
            <div className="stat-card-v2-value tabular-nums" style={{ color: accent }}>
              {loading && key !== 'habits' ? '—' : `${values[key]}${unit}`}
            </div>
            <div className="stat-card-v2-label">{label}</div>
          </div>
          <span className="stat-card-v2-edge" style={{ background: accent }} aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
