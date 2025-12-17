import { Link, useLocation } from "react-router-dom";
import logo from "../assets/f1logoheader.png";
import usericon from "../assets/usericon.png";
import "../css/header.css";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/schedule", label: "Schedule" },
  { to: "/result", label: "Result" },
  { to: "/prediction", label: "Prediction" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="site-header">
      {/* LEFT */}
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Formula 1 Logo" className="header-logo" />
        </Link>
      </div>

      {/* CENTER NAV */}
      <nav className="header-nav">
        {navItems.map(item => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`header-link ${active ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* RIGHT */}
      <div className="header-right">
        <Link to="/profile">
          <img src={usericon} alt="User" className="header-user" />
        </Link>
      </div>
    </header>
  );
}
