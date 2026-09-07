import { useState } from 'react';
import { IconPlus, IconSun, IconMoon } from './Illustrations';

export default function Header({
  activeTab = 'calendar',
  onTabChange,
  onAddHabit,
  onExport,
  onImport,
  theme,
  onToggleTheme,
  user,
  onSignOut,
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="top-navigation-bar">
      <div className="top-bar-container">
        <div className="top-bar-left" />

        {/* Center: Pill-Shaped Tab Group (Calendar / Statistics / Manage) */}
        <div className="top-bar-center">
          <div className="pill-tab-group" role="tablist" aria-label="View selection tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'calendar'}
              className={`pill-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
              onClick={() => onTabChange('calendar')}
            >
              Calendar
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'statistics'}
              className={`pill-tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
              onClick={() => onTabChange('statistics')}
            >
              Statistics
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'manage'}
              className={`pill-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
              onClick={() => onTabChange('manage')}
            >
              Manage
            </button>
          </div>
        </div>

        {/* Right Side: Export, Import, + Add (highest emphasis light/white pill button) */}
        <div className="top-bar-right">
          <button
            type="button"
            className="btn-pill-dark"
            onClick={onExport}
            title="Export habit data"
          >
            Export
          </button>

          <button
            type="button"
            className="btn-pill-dark"
            onClick={onImport}
            title="Import habit data"
          >
            Import
          </button>

          <button
            type="button"
            className="btn-pill-light-primary"
            onClick={onAddHabit}
          >
            <IconPlus />
            <span>Add</span>
          </button>

          {/* User & Theme Controls */}
          <div className="top-bar-controls-right">
            <button
              type="button"
              className="btn-theme-toggle-icon"
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>

            {user && (
              <div className="top-user-avatar-wrap">
                <button
                  type="button"
                  className="top-user-avatar-btn"
                  onClick={() => setShowUserDropdown((p) => !p)}
                  aria-label="User Profile"
                >
                  <span className="user-initial">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </span>
                </button>

                {showUserDropdown && (
                  <div className="header-dropdown animate-fade">
                    <span className="header-dropdown-email">{user.email}</span>
                    <button
                      type="button"
                      className="header-dropdown-item danger"
                      onClick={() => {
                        setShowUserDropdown(false);
                        onSignOut();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
