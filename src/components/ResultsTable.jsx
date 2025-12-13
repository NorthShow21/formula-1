import fallback from "../assets/portrait2.png";

function ResultsTable({ results }) {
  return (
    <div className="result-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>POS.</th>
            <th>DRIVER</th>
            <th>TEAM</th>
            <th>TIME / GAP</th>
            <th>LAPS</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.driver_number}className={`result-row pos-${r.position ?? "na"}`}>
              <td>{r.position ?? "—"}</td>


              <td>
                <div className="driver-cell">
                  <img
                    className="driver-avatar"
                    src={r.headshot_url || fallback}
                    alt={r.full_name}
                  />
                  {r.full_name}
                </div>
              </td>

              <td>
                <div className="team-cell">
                  <span
                    className="team-dot"
                    style={{ backgroundColor: r.team_colour }}
                  />
                  {r.team_name}
                </div>
              </td>

              <td>
                {r.displayTime == null
                ? "NO TIME"
                : r.position === 1
                    ? formatDuration(r.displayTime)
                    : `+${r.displayGap?.toFixed(3) ?? "0.000"}s`}
              </td>

              <td>{r.number_of_laps}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(3);
  return `${m}:${s.padStart(6, "0")}`;
}

export default ResultsTable;
