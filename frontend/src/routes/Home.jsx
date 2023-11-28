import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";
import useWeather from "../hooks/useWeather";
import SpotCarousel from "../components/SpotCarousel";
import UserSpotsCarousel from "../components/UserSpotsCarousel";
import VisitSpotsCarousel from "../components/VisitSpotsCarousel";
import useUserPins from "../hooks/useUserPins";
import useUser from "../hooks/useUser";
import sunset from "../assets/sunset_header.jpg";
import "../styles/Home.scss";

export default function Home() {
  const [spots, setSpots] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeToSunset, setTimeToSunset] = useState({ hours: 0, minutes: 0 });
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [userID, setUserID] = useOutletContext();
  const [userSaves, userVisits] = useUserPins(userID);
  const [user] = useUser(userID);

  console.log("hey user", user);

  useEffect(() => {
    const userIDFromCookie = Cookies.get("user_id");
    setUserID(userIDFromCookie);
  }, []);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/spots?query=${searchInput}`;
  };

  const fetchAllSpots = () => {
    let url = "http://localhost:8080/api/spots";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setSpots(data))
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllSpots();
  }, []);

  const weather = useWeather();
  const sunsetTime = weather.sunsetTime;

  const currentTime = {
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  };

  const convertToMinutes = (time) => {
    if (
      !time ||
      typeof time !== "object" ||
      !("hour" in time) ||
      !("minute" in time)
    ) {
      //console.error("Invalid time object:", time);
      return NaN;
    }
    const { hour, minute } = time;
    return hour * 60 + minute;
  };

  const currentTimeInMin = convertToMinutes(currentTime);
  const sunsetTimeInMin = convertToMinutes(sunsetTime);

  const calculateTimeUntilSunset = (currentTime, sunsetTime) => {
    let timeDifference = sunsetTime - currentTime;

    if (timeDifference < 0) {
      timeDifference += 24 * 60;
    }

    const hours = Math.floor(timeDifference / 60);
    const minutes = timeDifference % 60;

    return { hours, minutes };
  };

  useEffect(() => {
    if (!loading && sunsetTime) {
      const result = calculateTimeUntilSunset(
        currentTimeInMin,
        sunsetTimeInMin
      );
      setTimeToSunset(result);
    }
  }, [loading, sunsetTime, currentTimeInMin, sunsetTimeInMin]);

  useEffect(() => {
    // Assuming you want the paragraph to slide down after a delay
    const timeoutId = setTimeout(() => {
      setIsParagraphVisible(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <header>
        <img className="header__img" alt="sunset" src={sunset}></img>
        <div className="welcome__section">
          <h1 className="header__title">{user ? `Welcome, ${user.first_name}!` : "Welcome, sun chaser!"}</h1>

          <div className="search__wrapper">
            <form action="/search" method="get" onSubmit={handleFormSubmit}>
              <input
                className="homepage-search__input"
                type="text"
                id="search"
                placeholder="Search by city"
                value={searchInput}
                onChange={handleInput}
              ></input>
            </form>
          </div>
          {loading ? (
            <p className="header__paragraph">Loading...</p>
          ) : (
            <p
              className={`header__paragraph slide-down-paragraph ${
                isParagraphVisible ? "visible" : ""
              }`}
            >
              Time until sunset: {timeToSunset.hours} hours and{" "}
              {timeToSunset.minutes} minutes
            </p>
          )}
        </div>
      </header>

      {!userID && (
        <section className="list__spots">
          <div className="spots__near-user">
            <h1 className="spots__carousel-title">
              Local favourites near Victoria
            </h1>
            <div className="spots__carousel"></div>
            <SpotCarousel spots={spots} />
          </div>
        </section>
      )}

      {userID && (
        <section className="list__spots">
          <div className="spots__near-user">
            <h1 className="spots__carousel-title">
              Local favourites near Victoria
            </h1>
            <div className="spots__carousel"></div>
            <SpotCarousel spots={spots} />
          </div>

          <div className="spots__saved">
            <h1 className="spots__carousel-title">
              Your favourite sunset spots
            </h1>
            <div className="spots__carousel"></div>
            <UserSpotsCarousel spots={userSaves} />
          </div>

          <div className="spots__visits">
            <h1 className="spots__carousel-title">Your Visits</h1>
            <div className="spots__carousel"></div>
            <VisitSpotsCarousel visits={userVisits} />
          </div>
        </section>
      )}
    </div>
  );
}
