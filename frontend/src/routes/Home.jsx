import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useUserPins from "../hooks/useUserPins";
import useUser from "../hooks/useUser";
import useWeather from "../hooks/useWeather";
import sunset from "../assets/sunset_header.jpg";
import "../styles/Home.scss";
import HomeCarousel from "../components/HomeCarousel";


export default function Home() {
  const [spots, setSpots] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [timeToSunset, setTimeToSunset] = useState({ hours: 0, minutes: 0 });
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
  const [userID, setUserID] = useOutletContext();
  const [userSaves, userVisits] = useUserPins(userID);
  const [user] = useUser(userID);

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
          <h4 className="header__title">Welcome, user!</h4>

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
              Time until sunset: {timeToSunset.hours} hours and {timeToSunset.minutes} minutes
            </p>
          )}
        </div>
      </header>

      <section className="list__spots">
        <div className="home__carousel--container">
          <h1 className="spots__carousel-title">Local favourites near Victoria</h1>
          <HomeCarousel places={spots} />
        </div>

        <div className="home__carousel--container">
          <h1 className="spots__carousel-title">Your saved sunset spots</h1>
          <HomeCarousel places={userSaves} />
        </div>

        <div className="home__carousel--container">
          <h1 className="spots__carousel-title">Your visits</h1>
          <HomeCarousel places={userVisits} />
        </div>
      </section>
    </div>
  );
}
