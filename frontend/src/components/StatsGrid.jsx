import { useMemo } from 'react';

function getPast12WeeksData(habits, completionsMap) {
  const weeks = [];
  const now = new Date();

  for (let w = 11; w >= 0; w--) {
    const end = new Date(now);
    end.setDate(end.getDate() - w * 7);
    const start = new Date(end);
    start.setDate(start.getDate() - 6);

    const startStr = start.toISOString().slice(0, 10);
    const endStr = end.toISOString().slice(0, 10);

    let count = 0;
    habits.forEach((h) => {
      const dates = completionsMap[h.id] || [];
      dates.forEach((d) => {
        if (d >= startStr && d <= endStr) count++;
      });
    });

    const label = `${start.getMonth() + 1}/${start.getDate()}`;
    weeks.push({ label, count, weekIdx: 11 - w });
  }

  return weeks;
}

export default function StatsGrid({ habits = [], statsMap = {}, completionsMap = {} }) {
  const overallStats = useMemo(() => {
    return habits.reduce(
      (acc, habit) => {
        const s = statsMap[habit.id] || { currentStreak: 0, longestStreak: 0, totalCompletions: 0 };
        const comps = completionsMap[habit.id] || [];
        acc.totalCompleted += s.totalCompletions || comps.length;
        if (s.currentStreak > acc.bestCurrentStreak) acc.bestCurrentStreak = s.currentStreak;
        if (s.longestStreak > acc.bestLongestStreak) acc.bestLongestStreak = s.longestStreak;
        return acc;
      },
      { totalCompleted: 0, bestCurrentStreak: 0, bestLongestStreak: 0 }
    );
  }, [habits, statsMap, completionsMap]);

  const thirtyDayRate = useMemo(() => {
    if (!habits || habits.length === 0) return 0;
    const now = new Date();
    const start30 = new Date(now);
    start30.setDate(start30.getDate() - 30);
    const start30Str = start30.toISOString().slice(0, 10);

    let totalPossible = habits.length * 30;
    let totalDone30 = 0;

    habits.forEach((h) => {
      const dates = completionsMap[h.id] || [];
      dates.forEach((d) => {
        if (d >= start30Str) totalDone30++;
      });
    });

    return Math.min(100, Math.round((totalDone30 / totalPossible) * 100));
  }, [habits, completionsMap]);

  const weeklyTrendData = useMemo(
    () => getPast12WeeksData(habits, completionsMap),
    [habits, completionsMap]
  );

  const maxWeeklyCount = useMemo(
    () => Math.max(...weeklyTrendData.map((d) => d.count), 1),
    [weeklyTrendData]
  );

  return (
    <div className="statistics-tab-view animate-fade">
      {/* 3 Primary Metric Cards */}
      <div className="stats-summary-grid-three">
        {/* Card 1: Current Streak */}
        <div className="stat-metric-card">
          <span className="stat-metric-label">Current Peak Streak</span>
          <div className="stat-metric-value tabular-nums">
            {overallStats.bestCurrentStreak} <span className="unit">days</span>
          </div>
          <span className="stat-metric-subtext">Active consecutive daily momentum</span>
        </div>

        {/* Card 2: Longest Streak */}
        <div className="stat-metric-card">
          <span className="stat-metric-label">Longest All-Time Streak</span>
          <div className="stat-metric-value tabular-nums">
            {overallStats.bestLongestStreak} <span className="unit">days</span>
          </div>
          <span className="stat-metric-subtext">Personal best continuous performance</span>
        </div>

        {/* Card 3: 30-Day Completion Rate */}
        <div className="stat-metric-card highlight-card">
          <span className="stat-metric-label">30-Day Completion Rate</span>
          <div className="stat-metric-value tabular-nums text-accent">
            {thirtyDayRate}%
          </div>
          <span className="stat-metric-subtext">Recent 30-day consistency score</span>
        </div>
      </div>

      {/* 12-Week Completions Trend Bar Chart */}
      <div className="stats-chart-card">
        <div className="chart-header">
          <h3 className="stats-table-title">12-Week Activity Trend</h3>
          <span className="chart-subtitle">Total completed habits per week</span>
        </div>

        <div className="bar-chart-container">
          <div className="bar-chart-bars">
            {weeklyTrendData.map((item) => {
              const heightPct = Math.max(8, Math.round((item.count / maxWeeklyCount) * 100));
              return (
                <div key={item.label} className="bar-column" title={`${item.count} completions (Week ${item.label})`}>
                  <span className="bar-value-top tabular-nums">{item.count}</span>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                  <span className="bar-label">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Habit Metrics Table */}
      <div className="stats-table-card">
        <h3 className="stats-table-title">Habit Performance Breakdown</h3>
        <table className="developer-data-table">
          <thead>
            <tr>
              <th>Habit Name</th>
              <th>Current Streak</th>
              <th>Best Streak</th>
              <th>Total Done</th>
              <th>30-Day Rate</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => {
              const s = statsMap[habit.id] || { currentStreak: 0, longestStreak: 0, totalCompletions: 0 };
              const comps = completionsMap[habit.id] || [];
              const rate = Math.min(100, Math.round((comps.length / 30) * 100));

              return (
                <tr key={habit.id}>
                  <td className="habit-name-cell">
                    <span className="table-emoji">{habit.emoji || '🌲'}</span>
                    <strong>{habit.name}</strong>
                  </td>
                  <td className="tabular-nums">
                    {s.currentStreak > 0 ? `🔥 ${s.currentStreak}d` : '0d'}
                  </td>
                  <td className="tabular-nums">{s.longestStreak}d</td>
                  <td className="tabular-nums">{comps.length}</td>
                  <td className="tabular-nums">
                    <div className="table-rate-wrap">
                      <span className="rate-text">{rate}%</span>
                      <div className="mini-progress-bar-bg">
                        <div className="mini-progress-bar-fill" style={{ width: `${rate}%` }} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
