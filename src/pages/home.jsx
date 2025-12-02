import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import portrait from '../assets/portrait.png';
import DriverCard from "../components/DriverCard";
import Highlight1 from "../components/Highlight1";
import Highlight2 from "../components/Highlight2";

function Home() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const normalizeColor = (c) => {
        if (!c) return '#ff8a00';
        const s = String(c).trim();
        if (!s) return '#ff8a00';
        return s.startsWith('#') ? s : `#${s}`;
    };

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await fetch('https://api.openf1.org/v1/drivers?meeting_key=1275&&session_key=9850');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                
                const seen = new Set();
                const unique = data.filter(d => {
                    const key = String(d.driver_number ?? d.id ?? d.full_name ?? '').trim();
                    if (!key || seen.has(key)) return false;
                    seen.add(key);
                    return true;
                });

                setDrivers(unique);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <section className='highlight'>
                <h1>HIGHLIGHTS</h1>
                <Highlight1 />
                <Highlight2 />
            </section>

            <section className='driver'>
                <div className='driver-view-all'>
                    <h1>DRIVERS</h1>
                    <Link to="/result" className="view-all-link">View All {`>`}</Link>
                </div>
                {drivers.map(driver => (
                    <DriverCard 
                        key={driver.driver_number && driver.session_key} 
                        name={driver.full_name}
                        teamName={driver.team_name}
                        image={driver.headshot_url || portrait}
                        teamColor={normalizeColor(driver.team_colour)}
                    />
                ))}
            </section>
        </>
    );
}

export default Home;