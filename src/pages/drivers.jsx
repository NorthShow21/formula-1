import { useEffect, useState } from 'react';
import DriverCard from '../components/DriverCard';
import portrait2 from '../assets/portrait2.png';
import '../css/drivers.css';
import { Link } from 'react-router-dom';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeColor = (c) => {
    if (!c) return '#2a2a2a';
    const s = String(c).trim();
    if (!s) return '#2a2a2a';
    return s.startsWith('#') ? s : `#${s}`;
  };

  useEffect(() => {
    let cancelled = false;
    const fetchDrivers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://api.openf1.org/v1/drivers?meeting_key=1275');
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();

        const seen = new Set();
        const unique = (Array.isArray(data) ? data : []).filter(d => {
          const key = String(d.driver_number ?? d.full_name ?? '').trim();
          if (!key || seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        if (!cancelled) setDrivers(unique);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDrivers();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="drivers-loading">Loading drivers…</div>;
  if (error) return <div className="drivers-error">Error: {error}</div>;

  const groupsMap = drivers.reduce((acc, d) => {
    const team = d.team_name ?? d.team ?? 'Unknown Team';
    if (!acc[team]) acc[team] = [];
    acc[team].push(d);
    return acc;
  }, {});

  const grouped = Object.keys(groupsMap)
    .sort((a, b) => a.localeCompare(b))
    .map(team => ({ team, drivers: groupsMap[team] }));

  return (
    <div className="drivers-page">
      <header className="drivers-hero">
        <div className="drivers-hero-inner">
          <Link to="/" className="back-link">← Home</Link>
          <h1>DRIVERS</h1>
          <p className="drivers-sub">Find the current Formula 1 drivers for the 2025 season</p>
          
        </div>
      </header>

      <main className="drivers-list">
        {grouped.map(group => {
          const teamColor = normalizeColor(group.drivers[0]?.team_colour);
          return (
            <section className="team-group" key={group.team}>
              <div className="team-header">
                <h2 className="team-title">{group.team}</h2>
                <span className="team-count">{group.drivers.length}</span>
              </div>

              <div className="team-row">
                {group.drivers.map(driver => (
                  <DriverCard
                    key={driver.session_key ?? driver.id ?? driver.driver_number ?? driver.full_name}
                    name={driver.full_name}
                    teamName={driver.team_name}
                    driverNumber={driver.driver_number}
                    image={driver.headshot_url || portrait2}
                    teamColor={teamColor}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}