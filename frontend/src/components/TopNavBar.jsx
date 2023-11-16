import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png'

export default function TopNavBar() {
  return (
    <nav>
      <img className='nav__logo' alt='logo' src={logo}></img>

      <div>
        <button className='nav__login-btn'>Log In</button>
        <button className='nav__register-btn'>Register</button>
      </div>
    </nav>
  )
}

