import { CategoryIllustration, IconEdit, IconTrash } from './Illustrations';

export default function HabitList({ habits, selectedId, counts, onSelect, onEdit, onDelete }) {
  if (!habits || habits.length === 0) return null;

  return (
    <section className="habits-section-container">
      <div className="habits-section-header">
        <h2 className="habits-section-title">Your Habits</h2>
        <span className="habits-count-badge">{habits.length} habits</span>
      </div>

      <div className="habits-grid">
        {habits.map((habit) => {
          const isSelected = habit.id === selectedId;
          const completedDays = counts[habit.id] ?? 0;

          return (
            <div
              key={habit.id}
              className={`habit-card-item ${isSelected ? 'selected' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(habit.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(habit.id);
                }
              }}
              aria-selected={isSelected}
            >
              <div className="habit-card-content">
                <div className="habit-illustration-frame">
                  <CategoryIllustration categoryKey={habit.name || habit.emoji} />
                </div>

                <div className="habit-text-group">
                  <h3 className="habit-card-name">{habit.name}</h3>
                  <span className="habit-card-sub">
                    {completedDays} {completedDays === 1 ? 'day' : 'days'} completed
                  </span>
                </div>
              </div>

              <div className="habit-card-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="habit-action-btn edit"
                  title="Edit habit"
                  aria-label={`Edit ${habit.name}`}
                  onClick={() => onEdit(habit)}
                >
                  <IconEdit />
                </button>
                <button
                  type="button"
                  className="habit-action-btn delete"
                  title="Delete habit"
                  aria-label={`Delete ${habit.name}`}
                  onClick={() => onDelete(habit)}
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}