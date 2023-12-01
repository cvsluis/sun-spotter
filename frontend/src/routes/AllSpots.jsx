import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from "react-router-dom";
import Map from '../components/Map';
import SideBar from '../components/SideBar';
import AllSpotsSearch from '../components/AllSpotsSearch';
import '../styles/AllSpots.scss';

import sortSpots from '../utils/sortSpots';

export default function AllSpots() {
  // logged in user
  const [userID] = useOutletContext();
  // all spots state
  const [spots, setSpots] = useState([]);
  
  // search filter state
  const [searchInput, setSearchInput] = useState('');

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

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    fetchAllSpots(searchInput);
  };

  // fetch data from backend on intial render, set it to spots state
  useEffect(() => {
    fetchAllSpots();
  }, []);

  // scroll spot card into view when clicking on map pin
  const handlePinClick = (id) => {
    const element = document.getElementById('spot_card_' + id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='allSpots__container'>
      <SideBar spots={spots} userID={userID}/>

    <div className='allSpots__map-container'>
      <AllSpotsSearch searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} spots={spots} setSpots={setSpots}/>
      <div className='allSpots__map'>
          { userID &&
            <Link className='allSpots__btn--add-spot' to='/spots/new'>
              <span className='allSpots__btn--icon'>+</span>
              <span className='allSpots__btn--text slide-right'>Add Spot to Map</span>
            </Link> }
        <Map spots={spots} handlePinClick={handlePinClick} />
      </div>
    </div>

    </div>
  );
}