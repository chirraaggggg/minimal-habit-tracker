export default function StatsGrid({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-grid-container">
      <div className="stat-card">
        <span className="stat-card-title">Current Streak</span>
        <div className="stat-card-value font-highlight text-accent">
          {stats.currentStreak} <span className="stat-unit">days</span>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Total Completed</span>
        <div className="stat-card-value">
          {stats.total} <span className="stat-unit">days</span>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Completion Rate</span>
        <div className="stat-card-value text-blue">
          {stats.completionRate}%
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-card-title">Best Streak</span>
        <div className="stat-card-value text-pink">
          {stats.longestStreak} <span className="stat-unit">days</span>
        </div>
      </div>
    </div>
  );
}
