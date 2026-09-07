import { useMemo } from 'react';
import { IconCheck } from './Illustrations';
import { today } from '../utils/dates';

function formatTodayLabel() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function TodayPanel({ habits, completionsMap, pendingDates, onToggleToday }) {
  const todayStr = useMemo(() => today(), []);

  const totalHabits = habits?.length || 0;

  const completedCount = useMemo(() => {
    if (!habits || habits.length === 0) return 0;
    return habits.filter((h) => {
      const list = completionsMap[h.id] || [];
      return list.includes(todayStr);
    }).length;
  }, [habits, completionsMap, todayStr]);

  const percentage = totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  if (!habits || habits.length === 0) return null;

  return (
    <aside className="today-panel" aria-label="Today's habits">
      <div className="today-panel-header">
        <div>
          <h2 className="today-panel-title">Today's Sanctuary</h2>
          <span className="today-panel-date">{formatTodayLabel()}</span>
        </div>

        {/* Circular Progress Ring */}
        <div className="today-progress-ring-wrap" title={`${percentage}% completed today`}>
          <svg width="46" height="46" viewBox="0 0 46 46" className="progress-ring-svg">
            <circle
              cx="23"
              cy="23"
              r="19"
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="3.5"
            />
            <circle
              cx="23"
              cy="23"
              r="19"
              fill="none"
              stroke="var(--accent-done)"
              strokeWidth="3.5"
              strokeDasharray="119.38"
              strokeDashoffset={119.38 - (119.38 * percentage) / 100}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.4s ease-out' }}
              transform="rotate(-90 23 23)"
            />
          </svg>
          <span className="progress-ring-text tabular-nums">{percentage}%</span>
        </div>
      </div>

      {/* Progress ratio text */}
      <div className="today-progress-status">
        <span className="today-status-text">
          <strong>{completedCount}</strong> of <strong>{totalHabits}</strong> goals nurtured
        </span>
        <div className="today-progress-bar-bg">
          <div
            className="today-progress-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <ul className="today-habit-list">
        {habits.map((habit, idx) => {
          const colorIdx = idx % 6;
          const completions = completionsMap[habit.id] || [];
          const isCompleted = completions.includes(todayStr);
          const isPending = pendingDates?.has(todayStr + '-' + habit.id);

          return (
            <li
              key={habit.id}
              className={`today-habit-item ${isCompleted ? 'today-habit-item--done' : ''}`}
            >
              <div
                className="today-habit-icon"
                style={{ background: `var(--habit-${colorIdx}-icon-bg)` }}
                aria-hidden="true"
              >
                🌲
              </div>
              <span className="today-habit-name">{habit.name}</span>
              <button
                type="button"
                className={`today-checkbox ${isCompleted ? 'today-checkbox--done animate-cozy-check' : ''} ${isPending ? 'today-checkbox--pending' : ''}`}
                onClick={() => !isPending && onToggleToday(habit.id, todayStr, isCompleted)}
                aria-label={`${isCompleted ? 'Mark incomplete' : 'Mark complete'}: ${habit.name}`}
                aria-pressed={isCompleted}
                disabled={isPending}
              >
                {isCompleted && (
                  <span className="today-checkbox-icon">
                    <IconCheck />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
