import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username && email && password) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify({ username, email, password }));
      navigate('/login');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">SIGN UP</h1>
        <p className="auth-subtitle">Join the grid.</p>

        <div className="auth-field">
          <label>Username</label>
          <input
            type="text"
            className="auth-input"
            placeholder="Race name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            placeholder="driver@f1.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="auth-button" onClick={handleSignup}>
          CREATE ACCOUNT
        </button>

        <div className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}
