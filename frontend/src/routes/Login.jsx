//import styles
import "../styles/Login.scss";

export default function Login() {
  
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
          />
        </div>
        <div>
          <input
            className="login__input"
            type="text"
            id="password"
            placeholder="Password"
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
