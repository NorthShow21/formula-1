import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'vynandrog@gmail.com' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      navigate('/profile'); 
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">LOGIN</h1>
        <p className="auth-subtitle">Welcome back, driver.</p>

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

        <button className="auth-button" onClick={handleLogin}>
          SIGN IN
        </button>

        <div className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </main>
  );
}
