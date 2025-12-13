import "../css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Left */}
        <div className="footer-brand">
          <h2>FORMULA 1</h2>
          <p>
            Formula 1 statistics, results, and Prediction Website.
            Built for fans.
          </p>
        </div>

        {/* Center */}
        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <ul>
              <li>Results</li>
              <li>Schedule</li>
              <li>Drivers</li>
              <li>Teams</li>
            </ul>
          </div>

          <div>
            <h4>Season</h4>
            <ul>
              <li>2025</li>
              <li>Standings</li>
              <li>Fastest Laps</li>
              <li>Qualifying</li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="footer-meta">
          <span>© 2025 FORMULA 1</span>
          <span>Fan Made F1 Website by 3 Guys</span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
