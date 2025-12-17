import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import portrait2 from '../assets/portrait2.png';
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
                const response = await fetch('https://api.openf1.org/v1/drivers?meeting_key=1275&&team_name=McLaren&&team_name=Ferrari&&team_name=Red Bull Racing');
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


    const groupsMap = drivers.reduce((acc, d) => {
        const team = d.team_name ?? d.team ?? 'Unknown Team';
        if (!acc[team]) acc[team] = [];
        acc[team].push(d);
        return acc;
    }, {});


    const grouped = Object.keys(groupsMap)
        .sort((a, b) => a.localeCompare(b))
        .map(team => ({ team, drivers: groupsMap[team] }));

    return (
        <>
            <section className='highlight'>
                <h1>HIGHLIGHTS</h1>

                <div className="highlights-container">
                    <Link to="/schedule" style={{ textDecoration: 'none' }} className="highlight1-link">
                        <Highlight1 />
                    </Link>
                    <Highlight2 />
                </div>
            </section>


            <section className='driver'>
                <div className='driver-view-all'>
                    <h1>DRIVERS</h1>
                    <Link to="/drivers" className="view-all-link">View All {`>`}</Link>
                </div>


                {grouped.map(group => {
                    const teamColor = normalizeColor(group.drivers[0]?.team_colour);
                    return (
                        
                        <div className="team-group" key={group.team}>
                            <div className="team-header" style={{ color: 'white' }}>
                                {group.team}
                            </div>
                            <Link to={`/driverdetails`} className='driver-link'>
                            {group.drivers.map(driver => (
                                
                                    <DriverCard
                                        key={driver.session_key ?? driver.id ?? driver.driver_number ?? driver.full_name}
                                        name={driver.full_name}
                                        teamName={driver.team_name}
                                        image={driver.headshot_url || portrait2}
                                        teamColor={teamColor}
                                    />
                                
                            ))}
                            </Link>
                        </div>
                        
                    );
                })}
            </section>
        </>
    );
}

export default Home;