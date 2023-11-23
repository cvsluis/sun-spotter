import { Link } from "react-router-dom";
import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png';

export default function TopNavBar() {
  return (
    <nav>
      <div className='nav__main'>
      <Link to={'/home'}><img className='nav__logo' alt='logo' src={logo}></img></Link>
      <Link to={`/spots`} className='nav__explore-link'>Explore</Link>
      </div>

      <div>
        <Link to={'/login'} className='nav__login-btn'>Log In</Link>
        <button className='nav__register-btn'>Register</button>

        <Link to={'users/:id'} className="nav__user-profile"><img src={''} alt='profile-pics'></img></Link>
      </div>

    </nav>
  )
}

