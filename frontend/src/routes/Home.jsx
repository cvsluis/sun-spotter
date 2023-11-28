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
  const [loading, setLoading] = useState(true);
  const [timeToSunset, setTimeToSunset] = useState({ hours: 0, minutes: 0 });
  const [isParagraphVisible, setIsParagraphVisible] = useState(false);
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
      .finally(() => setLoading(false));
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
            {user ? `Welcome, ${user.first_name}!` : "Welcome, sun chaser!"}
          </h4>

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

          <TimeUntilSunset loading={loading} timeToSunset={timeToSunset} isParagraphVisible={isParagraphVisible}/>
        </div>
      </header>

      <section className="list__spots">
        <div className="home__carousel--container">
          <h1 className="spots__carousel-title">Local favourites near Victoria</h1>
          <HomeCarousel places={spots} />
        </div>

        { userID && 
        <>
          <div className="home__carousel--container">
            <h1 className="spots__carousel-title">Your saved sunset spots</h1>
            <HomeCarousel places={userSaves} />
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
