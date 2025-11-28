import logo from '../assets/f1logoheader.png';
import usericon from '../assets/usericon.png';
import '../css/header.css'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header-container">
            <Link to="/"><img className='f1logo' src={logo} alt="Formula 1 Logo" /></Link>
            <Link to="/profile"><img className='usericon' src={usericon} alt="user icon" /></Link>
        </header>
    );
}

export default Header;