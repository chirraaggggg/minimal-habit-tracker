import { useMemo } from 'react';
import { CategoryIllustration, IconCheck } from './Illustrations';
import { today } from '../utils/dates';

const HABIT_COLORS = [
  'var(--habit-0-strong)',
  'var(--habit-1-strong)',
  'var(--habit-2-strong)',
  'var(--habit-3-strong)',
  'var(--habit-4-strong)',
  'var(--habit-5-strong)',
];

const ICON_BG_COLORS = [
  'var(--habit-0-icon-bg)',
  'var(--habit-1-icon-bg)',
  'var(--habit-2-icon-bg)',
  'var(--habit-3-icon-bg)',
  'var(--habit-4-icon-bg)',
  'var(--habit-5-icon-bg)',
];

function formatTodayLabel() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function TodayPanel({ habits, completionsMap, pendingDates, onToggleToday }) {
  const todayStr = useMemo(() => today(), []);

  if (!habits || habits.length === 0) return null;

  return (
    <aside className="today-panel" aria-label="Today's habits">
      <div className="today-panel-header">
        <h2 className="today-panel-title">Today</h2>
        <span className="today-panel-date">{formatTodayLabel()}</span>
      </div>

      <ul className="today-habit-list">
        {habits.map((habit, idx) => {
          const colorIdx = idx % 6;
          const color = HABIT_COLORS[colorIdx];
          const iconBg = ICON_BG_COLORS[colorIdx];
          const completions = completionsMap[habit.id] || [];
          const isCompleted = completions.includes(todayStr);
          const isPending = pendingDates?.has(todayStr + '-' + habit.id);

          return (
            <li key={habit.id} className="today-habit-item">
              <div className="today-habit-icon" style={{ background: iconBg }} aria-hidden="true">
                <CategoryIllustration categoryKey={habit.emoji || habit.name} />
              </div>
              <span className="today-habit-name">{habit.name}</span>
              <button
                type="button"
                className={`today-checkbox ${isCompleted ? 'today-checkbox--done' : ''} ${isPending ? 'today-checkbox--pending' : ''}`}
                style={isCompleted ? { background: color, borderColor: color } : {}}
                onClick={() => !isPending && onToggleToday(habit.id, todayStr, isCompleted)}
                aria-label={`${isCompleted ? 'Mark incomplete' : 'Mark complete'}: ${habit.name}`}
                aria-pressed={isCompleted}
                disabled={isPending}
              >
                {isCompleted && (
                  <span className="today-checkbox-icon" style={{ color: '#fff' }}>
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
