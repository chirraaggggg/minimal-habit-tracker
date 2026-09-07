import { useState } from 'react';
import {
  IllustrationExercise,
  IllustrationReading,
  IllustrationCoding,
  IllustrationWater,
  IllustrationMeditation,
  IllustrationNoSocialMedia,
  IconClose,
} from './Illustrations';

const CATEGORY_OPTIONS = [
  { id: 'exercise', name: 'Gym', icon: <IllustrationExercise /> },
  { id: 'reading', name: 'Read', icon: <IllustrationReading /> },
  { id: 'coding', name: 'Code', icon: <IllustrationCoding /> },
  { id: 'water', name: 'Water', icon: <IllustrationWater /> },
  { id: 'meditation', name: 'Meditate', icon: <IllustrationMeditation /> },
  { id: 'nosocial', name: 'Focus', icon: <IllustrationNoSocialMedia /> },
];

function resolveInitialCategory(emoji) {
  if (!emoji) return 'exercise';
  const key = String(emoji).toLowerCase();
  if (key.includes('gym') || key.includes('exercise') || key.includes('workout')) return 'exercise';
  if (key.includes('read') || key.includes('book') || key.includes('study')) return 'reading';
  if (key.includes('code') || key.includes('coding') || key.includes('dev')) return 'coding';
  if (key.includes('water') || key.includes('drink') || key.includes('hydrat')) return 'water';
  if (key.includes('meditat') || key.includes('mindful') || key.includes('peace')) return 'meditation';
  return 'nosocial';
}

export default function HabitModal({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '');
  const [category, setCategory] = useState(resolveInitialCategory(initial?.emoji));
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setSubmitError(null);
    try {
      await onSubmit(name.trim(), category);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form
        className="cute-modal animate-fade"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="modal-top">
          <h2 className="modal-title">
            {initial ? '✏️ Edit Habit' : '✨ New Habit'}
          </h2>
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
              maxLength={60}
            />
          </label>

          <div className="input-group">
            <span className="input-label">Choose Icon</span>
            <div className="category-selection-grid">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = category === cat.id;
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
            {loading ? 'Saving...' : initial ? 'Save Changes' : 'Create Habit 🔥'}
          </button>
        </div>
      </form>
    </div>
  );
}
