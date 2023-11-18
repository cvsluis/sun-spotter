import React, { useState, useEffect } from "react";

//import styles
import "../styles/Login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUsers = () => {
    let url = "http://localhost:8080/api/users";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));

    };
    //   if (email ===  user.email && password === user.password ) {
    //     setIsLoggedIn(true);
    //     setErrorMessage('');
    //   } else {
    //     setIsLoggedIn(false);
    //     setErrorMessage('Invalid username or password.');
    //   }

  console.log("here", users);
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLogin = (event) =>{
    event.preventDefault();

    const user = users.find((user) => user.email === email);

    if (user && user.password === password) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <h2>Welcome back.</h2>
        <h2>Log in and chase the sun.</h2>
      </div>
      <form 
        className="login__form"
        onSubmit={handleLogin}>
        <div>
          <input
            className="login__input"
            type="text"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="login__input"
            type="text"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login__btn">
          Log in
        </button>
      </form>
      <p>Forgot your password?</p>
      <p>
        Don't have an account?<strong>Sign up for free</strong>
      </p>
    </div>
  );
}
