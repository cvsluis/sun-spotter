import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SideBar from '../components/SideBar';
import AllSpotsSearch from '../components/AllSpotsSearch';
import '../styles/AllSpots.scss';

export default function AllSpots() {
  // all spots state
  const [spots, setSpots] = useState([]);
  
  // search filter state
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // call fetch request for data that matches search string
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAllSpots(searchInput);
  };

  const fetchAllSpots = (searchInput) => {
    let url = '';
    if (searchInput) {
      url = `http://localhost:8080/api/spots?search=${searchInput.trim()}`;
    } else {
      url = `http://localhost:8080/api/spots`;
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

  // fetch data from backend, set it to spots state
  useEffect(() => {
    fetchAllSpots();
  }, []);

  const handlePinClick = (id) => {
    const element = document.getElementById('spot_card_' + id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='allSpots__container'>
      <SideBar spots={spots} />

    <div className='allSpots__map-container'>
      <AllSpotsSearch searchInput={searchInput} handleSearchInputChange={handleSearchInputChange} handleSearchSubmit={handleSearchSubmit} />
      <div className='allSpots__map'>
        <Map spots={spots} handlePinClick={handlePinClick} />
      </div>
    </div>

    </div>
  );
}