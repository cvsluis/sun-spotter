import { Link } from "react-router-dom";
import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png';
import Cookies from 'js-cookie'

export default function TopNavBar() {

  let userID = Cookies.get('user_id')

  const handleLogout = function (e, userID) {
    e.preventDefault();
    console.log('logging out!')
    Cookies.remove('user_id');
    userID = 0;
  }
  return (
    <nav>
      <div className='nav__main'>
      <Link to={'/home'}><img className='nav__logo' alt='logo' src={logo}></img></Link>
      <Link to={`/spots`} className='nav__explore-link'>Explore</Link>
      </div>

      {!userID && 
      <div>
        <Link to='/login' className='nav__login-btn'>Log In</Link>
        <button className='nav__register-btn'>Register</button>
      </div>
      }

      {userID && 
      <div>
        <button className="'nav__logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      }
    </nav>
  )
}

