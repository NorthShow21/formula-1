import { Link, useLocation } from 'react-router-dom';
import '../css/bottomnav.css';

const items = [
  { to: '/', label: 'Home', icon: (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 11.5L12 4l9 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 13.5v6a1 1 0 0 0 1 1h3v-5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5h3a1 1 0 0 0 1-1v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { to: '/schedule', label: 'Schedule', icon: (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M16 3v4M8 3v4M3 11h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { to: '/result', label: 'Result', icon: (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h4l3 6 7-12 4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) },
  { to: '/prediction', label: 'Prediction', icon: (<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>) }
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom navigation">
      {items.map(item => {
        const active = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`nav-item ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}
            aria-label={item.label}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}