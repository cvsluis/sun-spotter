//import styles 
import '../styles/Login.scss';

export default function Login () {
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
            id='username'
            placeholder='Username'       
            />
        </div>
        <div>
          <input 
            className="login__input"
            type="text" 
            id='password'
            placeholder='Password'
          />
        </div>
        <button type='submit' className="login__btn">
            Log in
        </button>
      </form>
      <p>Forgot your password?</p>
      <p>Don't have an account?<strong>Sign up for free</strong></p>
    </div>


  )
}