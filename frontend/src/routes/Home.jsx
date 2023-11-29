import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import useUserPins from "../hooks/useUserPins";
import useUser from "../hooks/useUser";
import sunset from "../assets/sunset_header.jpg";
import "../styles/Home.scss";
import TimeUntilSunset from "../components/TimeUntilSunset";
import HomeCarousel from "../components/HomeCarousel";


export default function Home() {
  const [spots, setSpots] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [userID] = useOutletContext();
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
  };

  useEffect(() => {
    fetchAllSpots();
  }, []);

  return (
    <div>
      <header>
        <img className="header__img" alt="sunset" src={sunset}></img>

        <div className="welcome__section">
        <h4 className="header__title">
            Welcome, sun-chaser!
          </h4>

          <div className="search__wrapper">
            <form onSubmit={handleFormSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search home-search__icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <input
                className="homepage-search__input"
                type="text"
                id="search"
                placeholder="Search by city"
                autoComplete='off'
                value={searchInput}
                onChange={handleInput}
              ></input>
            </form>
          </div>

          <TimeUntilSunset />
        </div>
      </header>

      <section className="list__spots">
        <div className="home__carousel--container">
          <h1 className="spots__carousel-title">Local favourites near Victoria</h1>
          <HomeCarousel places={spots} />
        </div>

        { userID && 
        <>
          <div className="bg-grey">
          <div className="home__carousel--container">
              <h1 className="spots__carousel-title">Your saved sunset spots</h1>
              <HomeCarousel places={userSaves} />
            </div>
        </div>

          <div className="home__carousel--container">
            <h1 className="spots__carousel-title">Your visits</h1>
            <HomeCarousel places={userVisits} visit={true}/>
          </div>
        </> }
      </section>
    </div>
  );
}
