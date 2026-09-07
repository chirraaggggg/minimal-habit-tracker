import { useMemo } from 'react';
import MiniGraph from './MiniGraph';
import { IconCheck, IconEdit, IconTrash, IconPlus } from './Illustrations';
import { today } from '../utils/dates';

const STARTER_PRESETS = [
  { name: 'Write Clean Code', emoji: '💻' },
  { name: 'Read 20 Mins', emoji: '📖' },
  { name: 'Exercise & Gym', emoji: '🏋️' },
  { name: 'Hydrate 2.5L Water', emoji: '💧' },
  { name: 'Daily Mindfulness', emoji: '🧘' },
];

export default function HabitList({
  habits,
  selectedId,
  completionsMap,
  statsMap,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
  onToggleCell,
  pendingDates,
  isFullView = true,
  onToggleToday = null,
}) {
  const todayStr = useMemo(() => today(), []);

  if (!habits || habits.length === 0) {
    return (
      <section className="habits-section habits-empty-section" aria-label="Habits dashboard">
        <div className="empty-state-card animate-fade">
          <div className="empty-icon-frame">⚡</div>
          <h3 className="empty-title">No Habits Created Yet</h3>
          <p className="empty-text">
            Start tracking your daily performance. Pick a starter preset below or create a custom habit.
          </p>

          <div className="preset-chips-container">
            {STARTER_PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                className="preset-chip-btn"
                onClick={() => onAdd(preset.name, preset.emoji)}
              >
                <span>{preset.emoji} {preset.name}</span>
                <span className="preset-chip-plus">+</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-pill-light-primary empty-create-btn"
            onClick={() => onAdd()}
          >
            <IconPlus />
            <span>Create New Habit</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="habits-section" aria-label="Habit cards list">
      <div className="habits-cards-stack">
        {habits.map((habit, habitIndex) => {
          const stats = statsMap[habit.id] || { currentStreak: 0, longestStreak: 0, totalCompletions: 0 };
          const completions = completionsMap[habit.id] || [];
          const isSelected = habit.id === selectedId;
          const isCompletedToday = completions.includes(todayStr);
          const isPendingToday = pendingDates?.has(`${todayStr}-${habit.id}`);

          const completionPercentage = completions.length > 0
            ? Math.min(100, Math.round((completions.length / 365) * 100))
            : 0;

          return (
            <article
              key={habit.id}
              className={`habit-card-developer ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect?.(habit.id)}
            >
              {/* Header Row */}
              <div className="habit-card-header-row">
                <div className="habit-header-left">
                  {/* Circular Checkbox Toggle */}
                  <button
                    type="button"
                    className={`circular-checkbox ${isCompletedToday ? 'completed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isPendingToday && onToggleToday) {
                        onToggleToday(habit.id, todayStr, isCompletedToday);
                      }
                    }}
                    aria-label={`Toggle today completion for ${habit.name}`}
                  >
                    {isCompletedToday ? <IconCheck /> : <span className="checkbox-ring" />}
                  </button>

                  {/* Habit Emoji & Name */}
                  <span className="habit-card-emoji" aria-hidden="true">{habit.emoji || '🌲'}</span>
                  <h3 className="habit-card-name">{habit.name}</h3>

                  {/* 3 Inline Pill Badges */}
                  <div className="habit-card-badges-inline">
                    {/* 1. Streak Status */}
                    <span className={`badge-pill streak-pill ${stats.currentStreak > 0 ? 'active-streak' : ''}`}>
                      {stats.currentStreak > 0 ? `🔥 ${stats.currentStreak} day streak` : 'No streak'}
                    </span>

                    {/* 2. Best Streak */}
                    <span className="badge-pill best-streak-pill">
                      Best: {stats.longestStreak}
                    </span>

                    {/* 3. Percentage Pill */}
                    <span className="badge-pill percentage-pill tabular-nums">
                      {completionPercentage}%
                    </span>
                  </div>
                </div>

                {/* Edit & Delete Action Triggers */}
                <div className="habit-header-right-actions">
                  <button
                    type="button"
                    className="icon-action-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(habit);
                    }}
                    title="Edit Habit"
                  >
                    <IconEdit />
                  </button>
                  <button
                    type="button"
                    className="icon-action-btn danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(habit);
                    }}
                    title="Delete Habit"
                  >
                    <IconTrash />
                  </button>
                </div>
              </div>

              {/* Full-Width Edge-to-Edge Heatmap */}
              <div className="habit-card-heatmap-wrapper">
                <MiniGraph
                  completions={completions}
                  habitId={habit.id}
                  onToggleCell={onToggleCell}
                  pendingDates={pendingDates}
                  isFullView={isFullView}
                  colorIndex={habitIndex}
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Keyboard Shortcut Hints in Bottom-Right */}
      <div className="keyboard-shortcuts-footer">
        <span className="keycap-badge">
          <kbd>N</kbd> New habit
        </span>
      </div>
    </section>
  );
}