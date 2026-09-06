import { BunnyLogo, BunnySidebar, IconHome, IconHabits, IconStats, IconCalendar, IconSettings } from './Illustrations';

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     Icon: IconHome },
  { id: 'habits',   label: 'Habits',   Icon: IconHabits },
  { id: 'stats',    label: 'Stats',    Icon: IconStats },
  { id: 'calendar', label: 'Calendar', Icon: IconCalendar },
  { id: 'settings', label: 'Settings', Icon: IconSettings },
];

export default function Sidebar({ activeNav = 'home', onNavChange }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      {/* Brand */}
      <div className="sidebar-brand">
        <BunnyLogo size={42} />
        <div className="sidebar-brand-text">
          <span className="sidebar-app-name">Better</span>
          <span className="sidebar-app-sub">Days</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" aria-label="App sections">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = id === activeNav;
          return (
            <button
              key={id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavChange?.(id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar-nav-icon">
                <Icon />
              </span>
              <span className="sidebar-nav-label">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom illustration */}
      <div className="sidebar-bottom">
        <BunnySidebar />
        <p className="sidebar-tagline">
          Small steps<br />create big changes
        </p>
        <div className="sidebar-heart-outline" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 13.5L2.8 8.6C1.4 7.2 1.4 4.8 2.8 3.4C4.2 2 6.5 2 7.9 3.4L8 3.5L8.1 3.4C9.5 2 11.8 2 13.2 3.4C14.6 4.8 14.6 7.2 13.2 8.6L8 13.5Z" stroke="#F58B96" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
}

