import React, { useState } from 'react';
import SpotCarousel from '../components/SpotCarousel';
import "../styles/Home.scss";
import sunset from "../assets/sunset_header.jpg";
// import SpotCard from "../components/SpotCard";

export default function Home() {

  // all spots state
  const [spots, setSpots] = useState([]);

  const fetchAllSpots = (searchInput) => {
    let url = 'http://localhost:8080/api/spots';

    if (searchInput) {
      url += `?search=${searchInput.trim()}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpots(data))
      .catch(error => console.error('Error fetching data:', error));
  };


  return (
    <div>
      <header>
        <img className="header__img" alt="sunset" src={sunset}></img>

        <div className="welcome__section">
          <h4>Welcome, user!</h4>

          <div className="search__wrapper">
            <form action="/search" method="get">
              <input
                className="search__bar"
                type="text"
                id="search"
                placeholder="Search by city"
              ></input>
            </form>
          </div>
          <p>It's 2 hours to sunset in Victoria</p>
        </div>
      </header>

      <section className='list__spots'>

      <div className="spots__near-user">
        <h1>Local favourites near Victoria</h1>
        <div className="spots__carousel"></div>
        <SpotCarousel />
      </div>

      <div className="spots__saved">
        <h1>Your favourites sunset spots</h1>
        <div className="spots__carousel"></div>
        <SpotCarousel />   
      </div>
    </section>

    </div>
  );
}
