import { useEffect, useState } from "react";
import ResultsTable from "../components/ResultsTable";
import "../css/result.css";

const MEETING_KEY = 1276;

function getBestQualiTime(duration) {
  if (!Array.isArray(duration)) return duration ?? null;
  return duration[2] ?? duration[1] ?? duration[0] ?? null;
}

function getQualiGap(gap) {
  if (!Array.isArray(gap)) return gap ?? null;
  return gap.find(g => g !== 0) ?? 0;
}


function Result() {
  const [meetings, setMeetings] = useState([]);
  const [meetingKey, setMeetingKey] = useState(MEETING_KEY);

  const [sessionOpen, setSessionOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);

  const [, setAnimating] = useState(false);

  const [sessions, setSessions] = useState([]);
  const [sessionKey, setSessionKey] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeetings = async () => {
      const res = await fetch(
        "https://api.openf1.org/v1/meetings?year=2025"
      );
      const data = await res.json();

      setMeetings(data);

      // Default meeting
      const defaultMeeting =
        data.find(m => m.meeting_key === MEETING_KEY) || data[0];

      setMeetingKey(defaultMeeting.meeting_key);
      setMeeting(defaultMeeting);
    };

    loadMeetings();
  }, []);

  useEffect(() => {
    if (!meetingKey) return;

    const loadSessions = async () => {
      setLoading(true);

      const res = await fetch(
        `https://api.openf1.org/v1/sessions?meeting_key=${meetingKey}`
      );
      const data = await res.json();

      setSessions(data);

      // Default to Race
      const race =
        data.find(s => s.session_type === "Race") || data[0];

      setSessionKey(race?.session_key);
      setMeeting(meetings.find(m => m.meeting_key === meetingKey));
    };

    loadSessions();
  }, [meetingKey, meetings]);


  useEffect(() => {
    if (!sessionKey) return;

    const loadResults = async () => {
      setLoading(true);

      const [resultRes, driverRes] = await Promise.all([
        fetch(`https://api.openf1.org/v1/session_result?session_key=${sessionKey}`),
        fetch(`https://api.openf1.org/v1/drivers?session_key=${sessionKey}`)
      ]);

      const resultData = await resultRes.json();
      const driverData = await driverRes.json();

      // Index drivers by number
      const driversByNumber = {};
      driverData.forEach(d => {
        driversByNumber[d.driver_number] = d;
      });
      const currentSession = sessions.find(
        s => s.session_key === sessionKey
      );

      
      // Merge
      const merged = resultData
  .filter(r => !r.dns && !r.dsq)
  .map(r => {
    const d = driversByNumber[r.driver_number] || {};
    const isQuali = currentSession?.session_type === "Qualifying";

    const displayTime = isQuali
      ? getBestQualiTime(r.duration)
      : r.duration;

    const displayGap = isQuali
      ? getQualiGap(r.gap_to_leader)
      : r.gap_to_leader;

    return {
      ...r,
      displayTime,
      displayGap,
      full_name: d.full_name,
      team_name: d.team_name,
      team_colour: d.team_colour
        ? `#${d.team_colour}`
        : "#ff8a00",
      headshot_url: d.headshot_url
    };
  })
  .sort((a, b) => {
    // If position exists, trust it
    if (a.position != null && b.position != null) {
      return a.position - b.position;
    }

    // Otherwise sort by best time
    return (a.displayTime ?? Infinity) - (b.displayTime ?? Infinity);
  });


      setResults(merged);
      setLoading(false);
    };

    loadResults();
  }, [sessionKey, sessions]);

  return (
    <div className="result">
      {/* Controls */}
<div className="result-controls">

  {/* Meeting dropdown */}
  <div className="session-dropdown">
    <button
      className="session-trigger"
      onClick={() => {
        setMeetingOpen(o => !o);
        setSessionOpen(false);
      }}
    >
      {meeting?.meeting_name || "Select Event"}
      <span className={`chevron ${meetingOpen ? "up" : ""}`} />
    </button>

    {meetingOpen && (
      <ul className="session-menu">
        {meetings.map(m => (
          <li
            key={m.meeting_key}
            className={m.meeting_key === meetingKey ? "active" : ""}
            onClick={() => {
              setAnimating(true);
              setMeetingKey(m.meeting_key);
              setMeetingOpen(false);
            }}
          >
            {m.meeting_name}
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* Session dropdown */}
  <div className="session-dropdown">
    <button
      className="session-trigger"
      onClick={() => {
        setSessionOpen(o => !o);
        setMeetingOpen(false);
      }}
    >
      {sessions.find(s => s.session_key === sessionKey)?.session_name || "Session"}
      <span className={`chevron ${sessionOpen ? "up" : ""}`} />
    </button>

    {sessionOpen && (
      <ul className="session-menu">
        {sessions.map(s => (
          <li
            key={s.session_key}
            className={s.session_key === sessionKey ? "active" : ""}
            onClick={() => {
              setAnimating(true);
              setSessionKey(s.session_key);
              setSessionOpen(false);
            }}
          >
            {s.session_name}
          </li>
        ))}
      </ul>
    )}
  </div>

</div>


      {/* Header */}
      {meeting && (
        <header className="result-header">
          <h1>{meeting.meeting_official_name}</h1>
          <div className="result-meta">
            <span>{meeting.date_start.slice(0, 10)}</span>
            <span>{meeting.circuit_short_name}</span>
          </div>
        </header>
      )}

      {/* Table */}
      {loading
        ? <p>Loading...</p>
        : <ResultsTable results={results} />
      }
    </div>
  );
}

export default Result;
