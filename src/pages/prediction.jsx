import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/prediction.css";
import userIcon from "../assets/usericon.png";
import fallbackDriver from "../assets/portrait2.png";

function Prediction() {
  const navigate = useNavigate();
  const [userRaceName, setUserRaceName] = useState("Joel");

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      navigate("/login");
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserRaceName(userData.username);
      }
    }
  }, [navigate]);

  const [leaderboard, setLeaderboard] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [sessionOpen, setSessionOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setPredictionsMap] = useState({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeaderboard([
      { id: 1, username: "MaxFan", points: 220 },
      { id: 2, username: "PoleHunter", points: 198 },
      { id: 3, username: "Slipstream", points: 181 },
      { id: 4, username: "DRSKing", points: 142 },
      { id: 5, username: userRaceName, points: 0 }
    ]);
  }, [userRaceName]);

  useEffect(() => {
    const loadSessions = async () => {
      const meetingRes = await fetch(
        "https://api.openf1.org/v1/meetings?year=2025"
      );
      const meetings = await meetingRes.json();
      const latest = meetings[meetings.length - 1];

      const sessRes = await fetch(
        `https://api.openf1.org/v1/sessions?meeting_key=${latest.meeting_key}`
      );
      const sessData = await sessRes.json();

      setSessions(
        sessData.sort(
          (a, b) => new Date(a.date_start) - new Date(b.date_start)
        )
      );
    };

    loadSessions();
  }, []);

  useEffect(() => {
    if (!selectedSession) return;

    const loadDrivers = async () => {
      const res = await fetch(
        `https://api.openf1.org/v1/drivers?session_key=${selectedSession}`
      );
      const data = await res.json();
      setDrivers(data);
    };

    loadDrivers();
  }, [selectedSession]);

  useEffect(() => {
    const preds = JSON.parse(localStorage.getItem('predictions') || '{}');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPredictionsMap(preds);

    if (!selectedSession) return;
    const existing = preds[selectedSession];
    if (existing) {
      setSelectedDriver(existing);
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }, [selectedSession]);

  const handleSubmit = () => {
    if (!selectedSession || !selectedDriver) return;

    const preds = JSON.parse(localStorage.getItem('predictions') || '{}');
    const hadPrediction = Boolean(preds[selectedSession]);

    preds[selectedSession] = selectedDriver;
    localStorage.setItem('predictions', JSON.stringify(preds));
    setPredictionsMap(preds);

    if (!hadPrediction) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const current = storedUser.predictionsMade ? Number(storedUser.predictionsMade) : 0;
      storedUser.predictionsMade = current + 1;
      localStorage.setItem('user', JSON.stringify(storedUser));
    }

    setSubmitted(true);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const filteredDrivers = drivers
    .filter((d) =>
      d.full_name?.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, visibleCount);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSessionOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="prediction">
      {/* ================= LEADERBOARD ================= */}
      <section className="prediction-leaderboard">
        <h1>Leaderboard</h1>
        {leaderboard.map((u, idx) => (
          <div key={u.id} className={`leaderboard-card pos-${idx + 1}`}>
            <span className="leaderboard-pos">{idx + 1}</span>
            <img src={userIcon} alt="user avatar" />
            <span className="leaderboard-name">{u.username}</span>
            <span className="leaderboard-points">{u.points} pts</span>
          </div>
        ))}
      </section>

      {/* ================= SESSION SELECT ================= */}
      <section className="prediction-session">
        <h1 className="prediction-title">Make Your Prediction</h1>

        <div className="session-dropdown" ref={dropdownRef}>
          <button
            className="session-trigger"
            onClick={() => setSessionOpen((o) => !o)}
          >
            {selectedSession
              ? sessions.find((s) => s.session_key === selectedSession)
                  ?.session_name
              : "Select Session"}
            <span className={`chevron ${sessionOpen ? "up" : ""}`} />
          </button>

          <div className={`session-menu ${sessionOpen ? "open" : ""}`}>
            {sessions.map((s) => (
              <button
                key={s.session_key}
                className="session-option"
                onClick={() => {
                  setSelectedSession(s.session_key);
                  setSelectedDriver(null);
                  setSessionOpen(false);
                }}
              >
                <span className="session-name">{s.session_name}</span>
                <span className="session-time">
                  {new Date(s.date_start).toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DRIVER PICK ================= */}
      {selectedSession && (
        <section className="prediction-drivers">
          <div className="driver-search-wrapper">
            <span className="search-icon">⌕</span>
            <input
              className="driver-search"
              placeholder="Search driver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="driver-list">
            {filteredDrivers.map((d) => {
              const teamColor = d.team_colour
                ? `#${d.team_colour}`
                : "#e10600";

              return (
                <div
                  key={d.driver_number}
                  className={`driver-card 
                    ${selectedDriver === d.driver_number ? "selected" : ""}
                    ${
                      submitted && selectedDriver === d.driver_number
                        ? "confirmed"
                        : ""
                    }
                  `}
                  style={{ "--team-color": teamColor }}
                  onClick={() => {
                    if (submitted) return;
                    setSelectedDriver(d.driver_number);
                    setSubmitted(false);
                  }}
                >
                  <div className="driver-left">
                    <div className="driver-portrait">
                      <img
                        src={d.headshot_url || fallbackDriver}
                        alt={d.full_name}
                      />
                    </div>
                  </div>

                  <div className="driver-right">
                    <span className="driver-name">{d.full_name}</span>
                    <span className="driver-points">{d.team_name}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="driver-controls">
            {drivers.length > 5 && (
              <div className="show-controls">
                {visibleCount > 5 && (
                  <button
                    className="show-pill left"
                    onClick={() => setVisibleCount(5)}
                  >
                    <span className="chevron up" />
                    Show less
                  </button>
                )}
                {visibleCount < drivers.length && (
                  <button
                    className="show-pill right"
                    onClick={() =>
                      setVisibleCount((v) => Math.min(v + 5, drivers.length))
                    }
                  >
                    Show more
                    <span className="chevron down" />
                  </button>
                )}
              </div>
            )}
          </div>

          {!submitted ? (
            <button
              className="submit-prediction"
              disabled={!selectedDriver}
              onClick={handleSubmit}
            >
              Submit Prediction
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="submit-prediction" onClick={() => setSubmitted(false)}>
                Change Prediction
              </button>
            </div>
          )}

          {showConfirmation && (
            <div className="prediction-confirmation">
              <span className="confirm-icon">✓</span>

              <div className="confirm-text">
                <h3>Prediction Submitted</h3>
                <p>Your winner has been submitted</p>
              </div>

              <button
                className="confirm-close"
                onClick={() => setShowConfirmation(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default Prediction;
