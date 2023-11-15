import '../styles/TopNavBar.scss';

export default function TopNavBar() {
  return <nav>

    <img className='logo' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'}></img>

    <div>
      <button className='login-btn'>Log In</button>
      <button className='register-btn'>Register</button>
    </div>

    </nav>
}

