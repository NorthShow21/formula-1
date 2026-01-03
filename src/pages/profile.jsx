import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';
import usericon from '../assets/usericon.png';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', predictionsMade: 0 });

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      navigate('/login'); // redirect if not logged in
    } else {
      // Load user data from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const preds = JSON.parse(localStorage.getItem('predictions') || '{}');
        const predsCount = Object.keys(preds).length;
        // prefer stored counter if present, otherwise derive from predictions map
        const predictionsMade = userData.predictionsMade ? Number(userData.predictionsMade) : predsCount;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser({
          username: userData.username,
          email: userData.email,
          predictionsMade,
        });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // clear login status
    navigate('/login'); // redirect to login page
  };

  return (
    <main className="profile-page">
      {/* HERO */}
      <section className="profile-hero">
        <div className="profile-avatar">
          <img src={usericon} alt="User avatar" />
        </div>

        <div className="profile-info">
          <h1 className="profile-username">{user.username || 'User'}</h1>
          <p className="profile-email">{user.email || 'email@example.com'}</p>
        </div>

        <div className="profile-points">
          <span className="points-label">POINTS</span>
          <span className="points-value">0</span>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>

      {/* STAT TABLE */}
      <section className="profile-table">
        <h2 className="table-title">SEASON STATS</h2>
        <div className="stats-table">
          <div className="stats-row">
            <span className="stats-label">Predictions Made</span>
            <span className="stats-value">{user.predictionsMade || 0}</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">Correct Picks</span>
            <span className="stats-value">0</span>
          </div>
          <div className="stats-row highlight">
            <span className="stats-label">Leaderboard Rank</span>
            <span className="stats-value">#5</span>
          </div>
        </div>
      </section>
    </main>
  );
}
