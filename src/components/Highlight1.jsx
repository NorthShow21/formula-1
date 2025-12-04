import { useEffect, useState } from 'react';
import '../css/highlight.css';

function formatDateISO(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .replace(/,/g, '')
    .toUpperCase();
}

export default function Highlight1({ meetingKey = 1275 }) {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchMeeting = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.openf1.org/v1/meetings?meeting_key=${meetingKey}`);
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        const item = Array.isArray(data) ? data[0] : data;
        if (!cancelled) setMeeting(item || null);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeeting();
    return () => { cancelled = true; };
  }, [meetingKey]);

  if (loading) return <section className="highlight1"><div className="highlight-round"><h2>Loading…</h2></div></section>;
  if (error) return <section className="highlight1"><div className="highlight-round"><h2>Error</h2><div>{error}</div></div></section>;

  const country = meeting?.country || meeting?.country_name || 'Unknown country';
  const circuit = meeting?.circuit || meeting?.circuit_short_name || meeting?.venue || 'Unknown circuit';
  const rawDate = meeting?.date_start || meeting?.meeting_date || meeting?.local_date || '';
  const date = formatDateISO(rawDate);

  return (
    <section className="highlight1">
      <div className="highlight-round">
      </div>
      <div className="highlight-circuit-name">
        <h1>{country}</h1>
        <h2>{circuit}</h2>
      </div>
      <div className="highlight-date">
        <h1>{date}</h1>
      </div>
    </section>
  );
}