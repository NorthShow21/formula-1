import { Link } from 'react-router-dom';
import '../css/auth.css';

export default function Signup() {
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
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            className="auth-input"
            placeholder="driver@f1.com"
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            className="auth-input"
            placeholder="••••••••"
          />
        </div>

        <button className="auth-button">
          CREATE ACCOUNT
        </button>

        <div className="auth-footer">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
}
