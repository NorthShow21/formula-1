import ArticleCard from './ArticleCard';
import thumb1 from '../assets/thumb1.png';
import thumb2 from '../assets/thumb2.png';
import thumb3 from '../assets/thumb3.png';
import '../css/highlight.css';

function Highlight2(){
    const articles = [
        { id: 1, title: "Norris adamant that ‘nothing has changed’ in title fight", image: thumb1, to: '/article/1' },
        { id: 2, title: "Verstappen vows to go 'all in' for title ahead of Qatar GP", image: thumb2, to: '/article/2' },
        { id: 3, title: "'I don't regret decision' to join Ferrari – Hamilton", image: thumb3, to: '/article/3' },
    ];

    return (
        <section className="highlight2">
            {articles.map(a => <ArticleCard key={a.id} {...a} />)}
        </section>
    );
}

export default Highlight2;