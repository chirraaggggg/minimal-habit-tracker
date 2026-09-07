import { useState } from 'react';
import { IconPlus, IconTrash } from './Illustrations';

export default function ManageView({ habits = [], onAdd, onEdit, onDelete, onReorder }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmoji, setEditEmoji] = useState('');

  const handleStartEdit = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
    setEditEmoji(habit.emoji || '🌲');
  };

  const handleSaveEdit = (habitId) => {
    if (!editName.trim()) return;
    onEdit?.({ id: habitId, name: editName.trim(), emoji: editEmoji || '🌲' });
    setEditingId(null);
  };

  const handleMove = (idx, direction) => {
    if (!onReorder) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= habits.length) return;
    const newHabits = [...habits];
    const temp = newHabits[idx];
    newHabits[idx] = newHabits[targetIdx];
    newHabits[targetIdx] = temp;
    onReorder(newHabits);
  };

  return (
    <div className="manage-tab-view animate-fade">
      {/* Header Info */}
      <div className="manage-header-card">
        <div>
          <h3 className="manage-title">Habit Management</h3>
          <p className="manage-subtitle">Reorder habits, edit name/emoji inline, or remove inactive routines.</p>
        </div>
        <button
          type="button"
          className="btn-pill-light-primary"
          onClick={() => onAdd()}
        >
          <IconPlus />
          <span>New Habit</span>
        </button>
      </div>

      {/* Habit Rows List */}
      <div className="manage-habits-list">
        {habits.map((habit, idx) => {
          const isEditing = editingId === habit.id;

          return (
            <div key={habit.id} className="manage-habit-item-card">
              {/* Reorder Buttons */}
              <div className="manage-reorder-controls">
                <button
                  type="button"
                  className="reorder-btn"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  title="Move up"
                  aria-label="Move habit up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="reorder-btn"
                  disabled={idx === habits.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  title="Move down"
                  aria-label="Move habit down"
                >
                  ▼
                </button>
              </div>

              {/* Inline Edit Form vs Static Display */}
              {isEditing ? (
                <div className="manage-inline-edit-fields">
                  <input
                    type="text"
                    className="manage-emoji-input"
                    value={editEmoji}
                    onChange={(e) => setEditEmoji(e.target.value)}
                    maxLength={4}
                    aria-label="Edit emoji"
                  />
                  <input
                    type="text"
                    className="manage-name-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    maxLength={60}
                    autoFocus
                    aria-label="Edit habit name"
                  />
                </div>
              ) : (
                <div className="manage-habit-display-group">
                  <span className="manage-habit-emoji" aria-hidden="true">{habit.emoji || '🌲'}</span>
                  <span className="manage-habit-name">{habit.name}</span>
                </div>
              )}

              {/* Actions */}
              <div className="manage-item-actions">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn-pill-dark"
                      onClick={() => handleSaveEdit(habit.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn-pill-dark"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-pill-dark"
                      onClick={() => handleStartEdit(habit)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="btn-pill-dark danger-action"
                      onClick={() => onDelete(habit)}
                      title="Delete Habit"
                    >
                      <IconTrash />
                      <span>Delete</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
