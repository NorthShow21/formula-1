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

export default function Highlight1() {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchMeeting = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://api.openf1.org/v1/meetings');
        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
        const data = await res.json();
        
        const list = Array.isArray(data) ? data : [];
        const latest = list.sort((a, b) => {
          const timeA = new Date(a.date_start ?? '').getTime() || 0;
          const timeB = new Date(b.date_start ?? '').getTime() || 0;
          return timeB - timeA; 
        })[0];

        if (!cancelled) setMeeting(latest || null);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMeeting();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <section className="highlight1"><div className="highlight-round"><h2>Loading…</h2></div></section>;
  if (error) return <section className="highlight1"><div className="highlight-round"><h2>Error</h2><div>{error}</div></div></section>;

  const country = meeting?.country_name || meeting?.country || 'Unknown country';
  const circuit = meeting?.circuit_short_name || meeting?.circuit || meeting?.venue || 'Unknown circuit';
  const rawDate = meeting?.date_start || meeting?.meeting_date || meeting?.local_date || '';
  const date = formatDateISO(rawDate);

  return (
    <section className="highlight1">
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