import { BunnyLogo, IconPlus } from './Illustrations';

export default function Navbar({ onOpenAddModal, onSignOut }) {
  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <div className="navbar-logo-frame">
          <BunnyLogo size={28} />
        </div>
        <span className="navbar-title">Cozy Sanctuary</span>
      </div>

      <div className="navbar-actions">
        <button
          type="button"
          className="btn-pill-coral"
          onClick={onOpenAddModal}
          aria-label="Add new habit"
        >
          <IconPlus />
          <span>Add Habit</span>
        </button>

        {onSignOut && (
          <button
            type="button"
            id="navbar-logout-btn"
            className="btn-logout"
            onClick={onSignOut}
            aria-label="Sign out"
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}
