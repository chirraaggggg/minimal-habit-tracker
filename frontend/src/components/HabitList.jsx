import { CategoryIllustration, IconEdit, IconTrash, IconChevronRight, IconDots, IconPlus } from './Illustrations';
import MiniGraph from './MiniGraph';

// Maps habit index to color index 0-5
function getColorIndex(idx) {
  return idx % 6;
}

const ICON_BG_COLORS = [
  'var(--habit-0-icon-bg)',
  'var(--habit-1-icon-bg)',
  'var(--habit-2-icon-bg)',
  'var(--habit-3-icon-bg)',
  'var(--habit-4-icon-bg)',
  'var(--habit-5-icon-bg)',
];

export default function HabitList({
  habits,
  selectedId,
  counts,
  completionsMap,
  statsMap,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
  onToggleCell,
  pendingDates,
}) {
  if (!habits || habits.length === 0) return null;

  return (
    <section className="habits-section" aria-label="My habits">
      <div className="habits-section-header">
        <h2 className="habits-section-title">My Habits</h2>
        <button
          type="button"
          className="btn-accent-pill habits-add-btn"
          onClick={onAdd}
          aria-label="Add new habit"
        >
          <IconPlus />
          <span>Add Habit</span>
        </button>
      </div>

      <div className="habits-list">
        {habits.map((habit, idx) => {
          const colorIdx = getColorIndex(idx);
          const iconBg = ICON_BG_COLORS[colorIdx];
          const completions = completionsMap[habit.id] || [];
          const stats = statsMap?.[habit.id] || null;
          const streak = stats?.currentStreak ?? 0;
          const isSelected = habit.id === selectedId;

          return (
            <article
              key={habit.id}
              className={`habit-row ${isSelected ? 'habit-row--selected' : ''}`}
              aria-label={`${habit.name} habit`}
            >
              {/* Left: icon + info */}
              <button
                type="button"
                className="habit-row-main"
                onClick={() => onSelect(habit.id)}
                aria-pressed={isSelected}
              >
                <div
                  className="habit-row-icon"
                  style={{ background: iconBg }}
                  aria-hidden="true"
                >
                  <CategoryIllustration categoryKey={habit.emoji || habit.name} />
                </div>
                <div className="habit-row-info">
                  <span className="habit-row-name">{habit.name}</span>
                  <span className="habit-row-streak">
                    {streak} day streak
                  </span>
                </div>
              </button>

              {/* Center: mini graph */}
              <div className="habit-row-graph">
                <MiniGraph
                  completions={completions}
                  colorIndex={colorIdx}
                  habitId={habit.id}
                  onToggleCell={onToggleCell}
                  pendingDates={pendingDates}
                />
              </div>

              {/* Right: actions */}
              <div className="habit-row-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="habit-icon-btn"
                  aria-label={`View ${habit.name}`}
                  onClick={() => onSelect(habit.id)}
                >
                  <IconChevronRight />
                </button>
                <div className="habit-dots-menu">
                  <button
                    type="button"
                    className="habit-icon-btn"
                    aria-label={`Options for ${habit.name}`}
                    aria-haspopup="true"
                  >
                    <IconDots />
                  </button>
                  <div className="habit-dots-dropdown" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      className="habit-dropdown-item"
                      onClick={() => onEdit(habit)}
                      aria-label={`Edit ${habit.name}`}
                    >
                      <IconEdit />
                      Edit
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className="habit-dropdown-item danger"
                      onClick={() => onDelete(habit)}
                      aria-label={`Delete ${habit.name}`}
                    >
                      <IconTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}