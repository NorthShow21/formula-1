import "../css/driverdetail.css";
import driverImg from "../assets/max.png";
import flagNL from "../assets/nl.png";

export default function DriverDetails() {
  return (
    <div className="driver-details">
        <section className="driver-hero">
        <div className="hero-content">
            <span className="hero-firstname">Max</span>
            <h1 className="hero-lastname">VERSTAPPEN</h1>

            <div className="hero-meta">
            <img src={flagNL} alt="Netherlands" />
            <span>Netherlands</span>
            <span className="dot" />
            <span>Red Bull Racing</span>
            <span className="dot" />
            <span>#1</span>
            </div>

            
        </div>

        <div className="hero-image">
            <img src={driverImg} alt="Max Verstappen" />
        </div>

        <div className="hero-shape" />
        </section>


        <main className="driver-statistic">
        <h1>STATISTICS</h1>

        <div className="stat-grid">
            <div className="stat-column">
            <section className="stat-section">
                <h2>SEASON</h2>

                <div className="stat-row">
                <span className="stat-name">Championship Position</span>
                <span className="stat-number">2</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Points</span>
                <span className="stat-number">421</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Wins</span>
                <span className="stat-number">9</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Podiums</span>
                <span className="stat-number">14</span>
                </div>
            </section>

            <section className="stat-section">
                <h2>RECORDS</h2>

                <div className="stat-row">
                <span className="stat-name">World Championships</span>
                <span className="stat-number">3</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Wins in a Season</span>
                <span className="stat-number">19</span>
                </div>
            </section>
            </div>

            <div className="stat-column">
            <section className="stat-section">
                <h2>CAREER</h2>

                <div className="stat-row">
                <span className="stat-name">Race Starts</span>
                <span className="stat-number">185</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Career Wins</span>
                <span className="stat-number">54</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Career Podiums</span>
                <span className="stat-number">98</span>
                </div>

                <div className="stat-row">
                <span className="stat-name">Career Points</span>
                <span className="stat-number">2586</span>
                </div>
            </section>
            </div>
        </div>
        </main>




    </div>
  );
}
