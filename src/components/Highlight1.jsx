import mexico from '../assets/mexico.png';
import '../css/highlight.css';

function Highlight1(meeting){
    return(
        <section className="highlight1">
            <div className="highlight-round">
                <img src={mexico} alt={meeting.country} />
                <h2>ROUND 2</h2>
            </div>
            <div className="highlight-circuit-name">
                <h1>{meeting.country}</h1>
                <h2>{meeting.circuit}</h2>
            </div>
            <div className="highlight-date">
                <h1>{meeting.date}</h1>
            </div>
        </section>
    );
}

export default Highlight1;