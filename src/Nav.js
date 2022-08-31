import './App.css';
import {Link} from 'react-router-dom';

function Nav() {
    const navStyle = {
        color: 'white'
    }
  return (
  <nav>
    <h3>Analyzer</h3>
    <ul className = "nav-links">
    <Link style={navStyle} to='/home'>
        <li>Home</li>
        </Link>
        <Link style={navStyle} to='/about'>
        <li>About</li>
        </Link>
        <Link style={navStyle} to='/result'>
        <li>FAQ</li>
        </Link>
    </ul>
  </nav>
  );
}

export default Nav;
