import { useState } from 'react';
import {
  IllustrationExercise,
  IllustrationReading,
  IllustrationCoding,
  IllustrationWater,
  IllustrationMeditation,
  IllustrationSleep,
  IconClose,
} from './Illustrations';

const CATEGORY_OPTIONS = [
  { id: 'exercise', name: 'Exercise', icon: <IllustrationExercise /> },
  { id: 'reading', name: 'Reading', icon: <IllustrationReading /> },
  { id: 'coding', name: 'Coding', icon: <IllustrationCoding /> },
  { id: 'water', name: 'Water', icon: <IllustrationWater /> },
  { id: 'meditation', name: 'Meditation', icon: <IllustrationMeditation /> },
  { id: 'sleep', name: 'Sleep', icon: <IllustrationSleep /> },
];

export default function HabitModal({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '');
  const [category, setCategory] = useState(initial?.emoji || 'exercise');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      // Pass category string as second parameter (preserves backend emoji string column without requiring DB migration)
      await onSubmit(name.trim(), category);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="cute-modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-top">
          <h2 className="modal-title">{initial ? 'Edit Habit' : 'New Habit'}</h2>
          <button type="button" className="modal-close-btn" onClick={onCancel} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <div className="modal-body-content">
          <label className="input-group">
            <span className="input-label">Habit Name</span>
            <input
              type="text"
              className="soft-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Daily Reading"
              autoFocus
              required
            />
          </label>

          <div className="input-group">
            <span className="input-label">Choose an Illustration</span>
            <div className="category-selection-grid">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = category.toLowerCase() === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    <div className="category-icon-wrapper">{cat.icon}</div>
                    <span className="category-name">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {submitError && <p className="modal-error">{submitError}</p>}
        </div>

        <div className="modal-footer-actions">
          <button
            type="button"
            className="btn-soft-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-accent-pill"
            disabled={loading || !name.trim()}
          >
            {loading ? 'Saving...' : initial ? 'Save Changes' : 'Create Habit'}
          </button>
        </div>
      </form>
    </div>
  );
}
