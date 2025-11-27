import mexico from '../assets/mexico.png';
import '../css/highlight.css';

function Highlight1(){
    return(
        <section className="highlight1">
            <div className="highlight-round">
                <img src={mexico} alt="Mexico" />
                <h2>ROUND 2</h2>
            </div>
            <div className="highlight-circuit-name">
                <h1>MEXICO</h1>
                <h2>Autodromo Hermanos Rodriguez</h2>
            </div>
            <div className="highlight-date">
                <h1>OCT 25-27</h1>
            </div>
        </section>
    );
}

export default Highlight1;