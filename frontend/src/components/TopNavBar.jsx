import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png';
import Cookies from 'js-cookie';

export default function TopNavBar({ context }) {

  const [ userID, setUserID ] = context;
  const [user] = useUser(userID);
  const navigate = useNavigate();
  
  const handleLogout = function (e) {
    e.preventDefault();
    console.log('logging out!')
    //remove cookie
    Cookies.remove('user_id');
    //remove userID state
    setUserID(undefined);
    navigate(-1);      
  }


  console.log("userID:", userID);
  console.log("user:", user);

  return (
    <nav>
      <div className='nav__main'>
      <Link to={'/home'}><img className='nav__logo' alt='logo' src={logo}></img></Link>
      <Link to={`/spots`} className='nav__explore-link'>Explore</Link>
      </div>

      {!userID && 
      <div>
        <Link to={'/login'} className='nav__login-btn'>Log In</Link>
        <button className='nav__register-btn'>Register</button>
      </div>

      }

      {user && userID && 
      <div className="nav__logged-in">
        <button className="nav__logout-btn" onClick={handleLogout}>Log Out</button>
        <Link to={`/users/${userID}`} className="nav__user-profile"><img src={`http://localhost:8080/${user.profile_pic}`} alt='profile-pics'></img></Link>
      </div>
      }
    </nav>
  )
}

