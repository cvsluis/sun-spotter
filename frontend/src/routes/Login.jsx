import { useState } from 'react';
//import styles
import "../styles/Login.scss";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <div className="login__container">
      <div className="login__welcome">
        <h2>Welcome back.</h2>
        <h2>Log in and chase the sun.</h2>
      </div>
      <form className="login__form">
        <div>
          <input
            className="login__input"
            type="text"
            id="email"
            placeholder="Email address"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="login__input"
            type="text"
            id="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login__btn">
          Log in
        </button>
      </form>
   
      <span className="login__forgot-password">Forgot your password?</span>
      <span className="login__register">
        Don't have an account?<strong> Sign up for free</strong>
      </span>
  
    </div>
  );
}
