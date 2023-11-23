import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// import styles
import "../styles/Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Corrected import

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   const userData = {
  //     email: email,
  //     password: password,
  //   }

  //   fetch("http://localhost:8080/api/login", {
  //     method: "POST",
  //     credentials: 'include',
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //  })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         console.log('Login successful');
  //         // localStorage.setItem()
  //         console.log(document.cookie);
  //         navigate("/home");
  //       } else {
  //         console.log('Login failed');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('An error occurred:', error);
  //     });
  // };

  const handleLogin = function(e) {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    }

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('Login successful!');
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
