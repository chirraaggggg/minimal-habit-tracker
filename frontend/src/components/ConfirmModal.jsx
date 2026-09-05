import { IconClose } from './Illustrations';

export default function ConfirmModal({ habit, busy, onCancel, onConfirm }) {
  if (!habit) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div
        className="cute-modal delete-confirm-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-top">
          <h2 className="modal-title">Delete this habit?</h2>
          <button type="button" className="modal-close-btn" onClick={onCancel} aria-label="Close">
            <IconClose />
          </button>
        </div>

        <div className="modal-body-content">
          <p className="modal-text font-medium">
            This will permanently remove <strong>“{habit.name}”</strong> and its completion history.
          </p>
        </div>

        <div className="modal-footer-actions">
          <button
            type="button"
            className="btn-soft-cancel"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger-pill"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
