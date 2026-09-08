import { CalendarLogo, IconHome, IconHabits, IconStats, IconCalendar, IconSettings } from './Illustrations';

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
        <div className="sidebar-logo-wrap" aria-hidden="true">
          <CalendarLogo size={36} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-app-name">Habito</span>
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
              {isActive && <span className="sidebar-active-pip" aria-hidden="true" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom streak tagline */}
      <div className="sidebar-bottom">
        <div className="sidebar-streak-tagline" aria-hidden="true">
          <span className="sidebar-streak-flame">🌲</span>
          <p className="sidebar-tagline">Quiet steps,<br />lasting growth.</p>
        </div>
      </div>
    </aside>
  );
}
