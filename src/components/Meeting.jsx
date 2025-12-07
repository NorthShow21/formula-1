import { useEffect, useState, useRef } from 'react';
import '../css/meeting.css';


function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const latestRef = useRef(null);
  const containerRef = useRef(null);

  function scrollToBottom(ref) {
    if (!ref?.current) return;
    requestAnimationFrame(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    });
  }

useEffect(() => {
  let cancelled = false;

  const fetchSessionsWithRetry = async (meetingKey, attempts = 5) => {
    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(
          `https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          return data.sort(
            (a, b) => new Date(a.date_start) - new Date(b.date_start)
          );
        }
      // eslint-disable-next-line no-unused-vars
      } catch (e) { /* empty */ }


      await new Promise(r => setTimeout(r, 300));
    }

    return [];
  };

  const loadAll = async () => {
    try {
      setLoading(true);

      const meetRes = await fetch("https://api.openf1.org/v1/meetings");
      const meetData = await meetRes.json();

      const list = Array.isArray(meetData) ? meetData : [];

      const meetings2025 = list
        .filter(m => m.year === 2025)
        .sort(
          (a, b) => new Date(a.date_start) - new Date(b.date_start)
        );

      const meetingsWithSessions = await Promise.all(
        meetings2025.map(async (m) => ({
          ...m,
          sessions: await fetchSessionsWithRetry(m.meeting_key),
        }))
      );

      if (!cancelled) setMeetings(meetingsWithSessions);
    } catch (err) {
      if (!cancelled) setError(err.message);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  loadAll();
  return () => (cancelled = true);
}, []);

    useEffect(() => {
        if (meetings.length > 0) {
        scrollToBottom(latestRef);
        }
    }, [meetings]);

  if (loading) return <div className="meeting"><h2>Loading…</h2></div>;
  if (error) return <div className="meeting"><h2>Error: {error}</h2></div>;
  if (meetings.length === 0) return <div className="meeting"><h2>No 2025 meetings found</h2></div>;

  return (
    <div className="meetings-container" ref={containerRef}>
      {meetings.map((meeting, idx) => {
        const isLatest = idx === meetings.length - 1;
        return (
          <section className={`meeting ${isLatest ? 'latest' : ''}`} key={meeting.meeting_key} ref={isLatest ? latestRef : null}>
            <div className="meeting-circuit">
              <div className="circuit-name">
                <h1>{meeting.country_name}</h1>
                <p className="circuit-code">{meeting.meeting_name}</p>
              </div>
            </div>

            <SessionsForMeeting sessions={meeting.sessions} />
          </section>
        );
      })}
    </div>
  );
}

function formatTimeWithOffset(iso, gmtOffset) {
  if (!iso || !gmtOffset) return "";

  const baseDate = new Date(iso);

  const [h, m, s] = gmtOffset.split(":").map(Number);
  const totalMinutes = h * 60 + m + (s ? s / 60 : 0);

  const localDate = new Date(baseDate.getTime() + totalMinutes * 60 * 1000);

  const time = localDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const utcLabel = getUTCLabel(gmtOffset);

  return `${time} (${utcLabel})`;
}

function getUTCLabel(gmtOffset) {
  if (!gmtOffset) return "";

  const [h] = gmtOffset.split(":").map(Number);
  const sign = h >= 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(h)}`;
}

function SessionsForMeeting({ sessions }) {
  if (!sessions || sessions.length === 0) {
    return <p className="session-placeholder">No sessions available</p>;
  }

  return (
    <div className="sessions-list">
      {sessions.map(sess => (
        <div className="session-item" key={sess.session_key}>
          <div className="session-date">{formatDate(sess.date_start)}</div>
          <div className="session-info">
            <span className="session-name">{sess.session_name}</span>
            <span className="session-time">{formatTimeWithOffset(sess.date_start, sess.gmt_offset)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}