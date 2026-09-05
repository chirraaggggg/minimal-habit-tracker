import { IllustrationLogo, IconPlus } from './Illustrations';

export default function Navbar({ onOpenAddModal }) {
  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <div className="navbar-logo-frame">
          <IllustrationLogo />
        </div>
        <span className="navbar-title">Habit Tracker</span>
      </div>

      <button
        type="button"
        className="btn-accent-pill"
        onClick={onOpenAddModal}
        aria-label="Add new habit"
      >
        <IconPlus />
        <span>Add Habit</span>
      </button>
    </nav>
  );
}
