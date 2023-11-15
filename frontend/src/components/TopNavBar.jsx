import '../styles/TopNavBar.scss';
import logo from '../assets/logo.png'

export default function TopNavBar() {
  return (
    <nav>
      <img class='logo' alt='logo' src={logo}></img>

      <div>
        <button class='login-btn'>Log In</button>
        <button class='register-btn'>Register</button>
      </div>
    </nav>
  )
}

