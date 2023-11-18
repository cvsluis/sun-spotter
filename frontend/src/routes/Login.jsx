//import styles 
import '../styles/Login.scss';

export default function Login () {
  return (
    <div className="login__container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            id='username'            
            />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="text" 
            id='password'
          />
        </div>
        <button type='submit'>
            Login
        </button>
      </form>
    </div>


  )
}