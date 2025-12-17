import "../css/article.css";
import article1 from "../assets/article1.png";
import article2 from "../assets/article2.png";

function Article() {
  return (
    <div className="article-page">
      <header className="article-header">
        <h1>
          Norris adamant that ‘nothing has changed’ in title fight following
          Las Vegas disqualification
        </h1>

        <h2>
          Lando Norris saw his championship lead cut to 24 points due to
          McLaren's double disqualification in Las Vegas
        </h2>

        <div className="article-meta">
          <span>November 27, 2025</span>
          <span>•</span>
          <span>Formula 1</span>
        </div>
      </header>

      <article className="article-content">
        <img src={article1} alt="Lando Norris in Las Vegas" />

        <p className="article-lead">
          Lando Norris has admitted that despite the frustrating double
          disqualification for McLaren in Las Vegas, nothing has changed within
          himself or the team as he continues to target his maiden Drivers'
          Championship crown.
        </p>

        <p>
          The standings leader and his team mate Oscar Piastri originally
          finished the Las Vegas Grand Prix in second and fourth respectively,
          but they were later disqualified from the final result due to
          excessive skid wear on both cars.
        </p>

        <p>
          Norris’ points advantage over the Australian and Red Bull's Max
          Verstappen was subsequently cut down to 24, but he can nevertheless
          secure the title if he outscores his rivals by two points over the
          Qatar Grand Prix weekend.
        </p>

        <blockquote>
          “It doesn’t change anything. I want to try and win here in Qatar and
          I want to try and win in Abu Dhabi. It sucks, but that’s life
          sometimes.”
        </blockquote>

        <img src={article2} alt="McLaren car detail" />

        <p>
          Following the disqualification, both drivers mentioned that the ride
          height will be adjusted to guard against any further wear to the
          plank, with Norris adding that the change will most likely improve
          their speed in Qatar.
        </p>

        <p>
          “We’ll probably be quicker now we have to put it up because I won’t
          have to back off everywhere. Everyone thinks it’ll make us slow but
          it’ll probably make us quicker.”
        </p>
      </article>
    </div>
  );
}

export default Article;
