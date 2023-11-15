import '../styles/TopNavBar.scss';

export default function TopNavBar() {
  return <nav>

    <img className='nav__logo' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'}></img>

    <div>
      <button className='login__btn'>Log In</button>
      <button className='register__btn'>Register</button>
    </div>

    </nav>
}

