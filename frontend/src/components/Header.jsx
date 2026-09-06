import { useState } from 'react';
import { IconSun, IconMoon, IconPlus } from './Illustrations';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getGreetingEmoji(hour = new Date().getHours()) {
  if (hour < 12) return '☀️';
  if (hour < 17) return '🌤️';
  return '🌙';
}

function getUserDisplayName(user) {
  if (!user) return 'Alex';
  const meta = user.user_metadata;
  if (meta?.full_name) return meta.full_name.split(' ')[0];
  if (meta?.name) return meta.name.split(' ')[0];
  if (user.email) {
    const prefix = user.email.split('@')[0];
    return prefix.charAt(0).toUpperCase() + prefix.slice(1);
  }
  return 'Alex';
}

function getAvatarInitial(user) {
  const name = getUserDisplayName(user);
  return name ? name.charAt(0).toUpperCase() : 'A';
}

export default function Header({ user, theme, onToggleTheme, onSignOut, onAddHabit }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const greeting = getGreeting();
  const emoji = getGreetingEmoji();
  const displayName = getUserDisplayName(user);
  const initial = getAvatarInitial(user);

  return (
    <header className="top-header">
      <div className="top-header-left">
        <h1 className="header-greeting">
          {greeting}, {displayName}! {emoji}
        </h1>
        <p className="header-subtitle">Consistency today, a brighter tomorrow.</p>
      </div>

      <div className="top-header-right">
        {/* Motivational quote pill */}
        <div className="header-quote-pill" aria-label="Motivational quote">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 2C8 2 4 5 4 10C4 12.5 5.8 14 8 14C10.2 14 12 12.5 12 10C12 5 8 2 8 2Z" fill="#7DBA91" />
          </svg>
          <span>"Progress, not perfection."</span>
        </div>

        {/* Real Pill-style Theme Toggle */}
        <div className="theme-toggle-pill" title="Toggle theme">
          <IconSun />
          <button
            type="button"
            id="theme-toggle-btn"
            className={`theme-toggle-switch ${theme === 'dark' ? 'active' : ''}`}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={theme === 'dark'}
          >
            <span className="theme-toggle-knob" />
          </button>
          <IconMoon />
        </div>

        {/* Add Habit button (mobile / desktop shortcut) */}
        <button
          type="button"
          className="btn-accent-pill header-add-btn"
          onClick={onAddHabit}
          aria-label="Add new habit"
        >
          <IconPlus />
          <span>Add Habit</span>
        </button>

        {/* User avatar + dropdown menu */}
        <div className="header-user-wrap">
          <button
            type="button"
            className="header-avatar-btn"
            onClick={() => setShowDropdown((prev) => !prev)}
            aria-label="User profile menu"
            aria-expanded={showDropdown}
          >
            <div className="header-avatar" aria-hidden="true">{initial}</div>
            <svg className={`header-chevron ${showDropdown ? 'open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showDropdown && (
            <div className="header-dropdown" role="menu">
              <div className="header-dropdown-info">
                <span className="header-dropdown-name">{displayName}</span>
                <span className="header-dropdown-email">{user?.email}</span>
              </div>
              <button
                type="button"
                id="header-signout-btn"
                className="header-dropdown-item danger"
                onClick={() => {
                  setShowDropdown(false);
                  onSignOut();
                }}
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

