import { IconSprout, IconFlame, IconStar, IconChart } from './Illustrations';

const STAT_CONFIG = [
  {
    key: 'habits',
    label: 'Active habits',
    Icon: IconSprout,
    bgVar: 'var(--stat-bg-0)',
    unit: '',
  },
  {
    key: 'streak',
    label: 'Day streak',
    Icon: IconFlame,
    bgVar: 'var(--stat-bg-1)',
    unit: '',
  },
  {
    key: 'total',
    label: 'Total completed',
    Icon: IconStar,
    bgVar: 'var(--stat-bg-2)',
    unit: '',
  },
  {
    key: 'rate',
    label: 'Completion rate',
    Icon: IconChart,
    bgVar: 'var(--stat-bg-3)',
    unit: '%',
  },
];

export default function StatCards({ habitsCount = 0, selectedStats = null, totalCompleted = 0, loading = false }) {
  const values = {
    habits: habitsCount,
    streak: selectedStats?.currentStreak ?? 0,
    total:  totalCompleted,
    rate:   selectedStats?.completionRate ?? 0,
  };

  return (
    <div className="stat-cards-row" role="region" aria-label="Summary statistics">
      {STAT_CONFIG.map(({ key, label, Icon, bgVar, unit }) => (
        <div
          key={key}
          className={`stat-card-v2 ${loading && key !== 'habits' ? 'stat-card-v2--loading' : ''}`}
          style={{ background: bgVar }}
        >
          <div className="stat-card-v2-icon">
            <Icon />
          </div>
          <div className="stat-card-v2-body">
            <div className="stat-card-v2-value">
              {loading && key !== 'habits' ? '—' : `${values[key]}${unit}`}
            </div>
            <div className="stat-card-v2-label">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

