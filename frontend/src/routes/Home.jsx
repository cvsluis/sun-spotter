import React, { useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import useUserPins from "../hooks/useUserPins";
import sunset from "../assets/sunset_header.jpg";
import logoDark from "../assets/logo-white.png";
import "../styles/Home.scss";
import TimeUntilSunset from "../components/TimeUntilSunset";
import HomeCarousel from "../components/HomeCarousel";
import useAllSpotsData from "../hooks/useAllSpotsData";


export default function Home() {
  const navigate = useNavigate();
  const { userID } = useOutletContext();
  const [userSaves, userVisits] = useUserPins(userID);
  const { spots, fetchAllSpots, searchInput, handleHomeSearchInputChange, clearHomeSearchInput } = useAllSpotsData();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/spots/`);
  };

  useEffect(() => {
    fetchAllSpots();
    clearHomeSearchInput();
  }, []);

  return (
    <div>
      <header className="home__header">
        <img className="header__img" alt="sunset" src={sunset}></img>

        <div className="welcome__section">
        <h4 className="header__title">
            Welcome, sun-chaser!
          </h4>

          <div className="search__wrapper">
            <form onSubmit={handleFormSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search home-search__icon" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
              <input
                className="homepage-search__input"
                type="text"
                id="search"
                placeholder="Search by location"
                autoComplete='off'
                value={searchInput}
                onChange={handleHomeSearchInputChange}
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

      <footer className="home__footer">
        <div className="footer__container">
          <img className="footer__logo" alt="dark-logo" src={logoDark}></img>
          {/* <p>About</p> */}
          <p className="footer__at">@2023 Sun Spotter</p>
        </div>
      </footer>

    </div>
  );
}
