import '../styles/TopNavBar.scss';

export default function TopNavBar() {
  return <nav>

    <img class='logo' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'}></img>

    <div>
      <button class='login-btn'>Log In</button>
      <button class='register-btn'>Register</button>
    </div>

    </nav>
}

