import '../styles/TopNavBar.scss';

export default function TopNavBar() {
  return <nav>

    <img className='nav__logo' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'}></img>

    <div>
      <button className='nav__login-btn'>Log In</button>
      <button className='nav__register-btn'>Register</button>
    </div>

    </nav>
}

