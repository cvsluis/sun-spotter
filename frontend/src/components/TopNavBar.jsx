import { Link } from "react-router-dom";
import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png'

export default function TopNavBar() {
  return (
    <nav>
      <div>
      <img className='nav__logo' alt='logo' src={logo}></img>
      <Link to={`/spots`} className='nav__explore-link'>Explore</Link>
      </div>

      <div>
        <button className='nav__login-btn'>Log In</button>
        <button className='nav__register-btn'>Register</button>
      </div>
    </nav>
  )
}

