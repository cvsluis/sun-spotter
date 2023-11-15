import '../styles/TopNavBar.scss';

export default function TopNavBar() {
  return <nav>

    <img class='logo' alt='logo' src={process.env.PUBLIC_URL + '/logo.png'}></img>

    <div>
      <button>Log In</button>
      <button>Register</button>
    </div>

    </nav>
}

