import { CategoryIllustration } from './Illustrations';

export default function HabitHero({ habit }) {
  if (!habit) return null;

  return (
    <div className="selected-habit-card">
      <div className="selected-habit-illustration-frame">
        <CategoryIllustration categoryKey={habit.name || habit.emoji} />
      </div>
      <div className="selected-habit-text">
        <span className="selected-habit-tag">SELECTED HABIT</span>
        <h2 className="selected-habit-title">{habit.name}</h2>
        <p className="selected-habit-desc">
          Focus on consistency and build your daily streak step by step.
        </p>
      </div>
    </div>
  );
}
