import { Link } from "react-router-dom";
import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png';
import Cookies from 'js-cookie';



export default function TopNavBar({ context }) {

  const [ userID, setUserID ] = context;
  
  const handleLogout = function (e) {
    e.preventDefault();
    console.log('logging out!')
    //remove cookie
    Cookies.remove('user_id');
    //remove userID state
    setUserID(undefined);
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
        <button className="nav__logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
      }
    </nav>
  )
}

