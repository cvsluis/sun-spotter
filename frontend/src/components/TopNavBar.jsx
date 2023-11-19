import '../styles/TopNavBar.scss';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function TopNavBar() {
  return (
    <nav>
      <img className='nav__logo' alt='logo' src={logo}></img>

      <div>
        <Link to='/login' className='nav__login-btn'>Log In</Link>
        <button className='nav__register-btn'>Register</button>
      </div>
    </nav>
  )
}

