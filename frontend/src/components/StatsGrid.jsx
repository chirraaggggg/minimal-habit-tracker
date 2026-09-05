export default function StatsGrid({ stats, loading = false }) {
  // Show skeleton cards while loading or before first fetch
  if (loading || !stats) {
    return (
      <div className="stats-grid-container">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="stat-card stat-card-skeleton">
            <span className="stat-skeleton-label" />
            <span className="stat-skeleton-value" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stats-grid-container">
      <div className="stat-card">
        <span className="stat-card-title">Current Streak</span>
        <div className="stat-card-value font-highlight text-accent">
          {stats.currentStreak ?? 0} <span className="stat-unit">days</span>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Total Completed</span>
        <div className="stat-card-value">
          {stats.totalCompleted ?? 0} <span className="stat-unit">days</span>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Completion Rate</span>
        <div className="stat-card-value text-blue">
          {stats.completionRate ?? 0}%
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Best Streak</span>
        <div className="stat-card-value text-pink">
          {stats.bestStreak ?? 0} <span className="stat-unit">days</span>
        </div>
      </div>
    </div>
  );
}
