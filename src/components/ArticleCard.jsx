import { Link } from 'react-router-dom';
import '../css/highlight.css';

function ArticleCard({ to = '/', image, title, alt }) {
    return (
        <article className="article-card">
            <Link to={to} className="article-link" aria-label={title}>
                <img className="article-thumb" src={image} alt={alt || title} />
                <h3 className="article-title">{title}</h3>
            </Link>
        </article>
    );
}

export default ArticleCard;