import React, { useState, useEffect } from "react";
import SpotCarousel from "../components/SpotCarousel";
import "../styles/Home.scss";
import sunset from "../assets/sunset_header.jpg";

export default function Home() {
  // all spots state
  const [spots, setSpots] = useState([]);

  //search by city
  const [searchInput, setSearchInput] = useState("");

  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Redirect to spots page when search form is submitted
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Replace '/search-results' with the actual path you want to navigate to
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
      .catch((error) => console.error("Error fetching data:", error));
  };

  // fetch data from backend on intial render, set it to spots state
  useEffect(() => {
    fetchAllSpots();
  }, []);

  return (
    <div>
      <header>
        <img className="header__img" alt="sunset" src={sunset}></img>

        <div className="welcome__section">
          <h4>Welcome, user!</h4>

          <div className="search__wrapper">
            <form action="/search" method="get" onSubmit={handleFormSubmit}>
              <input
                className="homepage-search__input"
                type="text"
                id="search"
                placeholder="Search by city"
                
              ></input>
            </form>
          </div>
          <p>It's 2 hours to sunset in Victoria</p>
        </div>
      </header>

      <section className="list__spots">
        <div className="spots__near-user">
          <h1>Local favourites near Victoria</h1>
          <div className="spots__carousel"></div>
          <SpotCarousel spots={spots} />
        </div>

        <div className="spots__saved">
          <h1>Your favourites sunset spots</h1>
          <div className="spots__carousel"></div>
          <SpotCarousel spots={spots} />
        </div>
      </section>
    </div>
  );
}
