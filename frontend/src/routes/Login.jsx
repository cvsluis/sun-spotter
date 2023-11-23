import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useOutletContext } from "react-router-dom";


// import styles
import "../styles/Login.scss";

export default function Login() {

  const [userID, setUserID] = useOutletContext();
  console.log('in login:', userID)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = function(e) {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    }
    console.log(userData)

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          console.log('Login successful!', data);
          //set cookie
          Cookies.set('user_id', data.user_id, {expires: 1})
          setUserID(data.user_id)
          //return to home
          navigate("/Home");
          
        }
        else {
          console.log('Login failed');
        }
      })
      .catch(err => console.log("Error: ", err));
  }

  return (
    <div className="login__container">
      <div className="login__welcome">
        <h2>Welcome back.</h2>
        <h2>Log in and chase the sun.</h2>
      </div>
      <form className="login__form" onSubmit={handleLogin}>
        <div>
          <input
            className="login__input"
            type="text"
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="login__input"
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
