import '../css/driver.css';

export default function DriverCard({ name = 'Driver Name', teamName, image, teamColor}) {
  return (
    <article className="driver-card" style={{ ['--team-color']: teamColor }}>
      <div className="driver-left">
        <div className="driver-portrait">
          <img src={image} alt={name} />
        </div>
      </div>

      <div className="driver-right">
        <div className="driver-name">{name}</div>
        <div className="driver-points">{teamName}</div>
      </div>
    </article>
  );
}