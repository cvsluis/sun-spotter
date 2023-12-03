import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/TopNavBar.scss";
import logoLight from "../assets/logo.png";
import logoDark from "../assets/logo-white.png";
import Cookies from "js-cookie";

export default function TopNavBar({ context, toggleTheme, darkMode }) {
  const [userID, setUserID] = context;
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogout = function (e) {
    e.preventDefault();
    console.log("logging out!");
    //remove cookie
    Cookies.remove("user_id");
    //remove userID state
    setUserID(undefined);
    navigate("/Home");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${userID}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data[0]);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    if (userID) {
      fetchUser();
    }
  }, [userID]);

  return (
    <nav>
      <div className="nav__main">
        {darkMode ? (
          <Link to={"/home"}>
            <img className="nav__logo" alt="dark-logo" src={logoDark}></img>
          </Link>
        ) : (
          <Link to={"/home"}>
            <img className="nav__logo" alt="logo" src={logoLight}></img>
          </Link>
        )}
        <Link to={`/spots`} className="nav__explore-link">
          EXPLORE
        </Link>
      </div>

      {!userID && (
        <div className="nav__logged-out">
          <DarkModeToggle
            className="nav__toggle"
            toggleTheme={toggleTheme}
            darkMode={darkMode}
          />
          <Link to={"/login"} className="nav__login-btn">
            Log In
          </Link>
          <button className="nav__register-btn">Register</button>
        </div>
      )}

      {user && userID && (
        <div className="nav__logged-in">
          <DarkModeToggle
            className="nav__toggle"
            toggleTheme={toggleTheme}
            darkMode={darkMode}
          />
          <button className="nav__logout-btn" onClick={handleLogout}>
            Log Out
          </button>
          <Link to={`/users/${userID}`} className="nav__user-profile">
            <img
              src={`http://localhost:8080/${user.profile_pic}`}
              alt="profile-pics"
            ></img>
          </Link>
        </div>
      )}
    </nav>
  );
}
