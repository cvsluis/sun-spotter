import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png'

export default function TopNavBar() {
  return (
    <nav>
      <img class='nav__logo' alt='logo' src={logo}></img>

      <div>
        <button class='nav__login-btn'>Log In</button>
        <button class='nav__register-btn'>Register</button>
      </div>
    </nav>
  )
}

