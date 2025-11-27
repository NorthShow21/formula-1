import logo from '../assets/f1logoheader.png';
import usericon from '../assets/usericon.png';
import '../css/header.css'

function Header() {
    return (
        <header className="header-container">
            <img className='f1logo' src={logo} alt="Formula 1 Logo" />
            <img className='usericon' src={usericon} alt="user icon" />
        </header>
    );
}

export default Header;