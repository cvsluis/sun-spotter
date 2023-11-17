import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SideBar from '../components/SideBar';
import '../styles/AllSpots.scss';

export default function AllSpots() {
  // all spots state
  const [spots, setSpots] = useState([]);

  // fetch data from backend, set it to spots state
  useEffect(() => {
    fetch('http://localhost:8080/api/spots')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpots(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handlePinClick = (id) => {
    const element = document.getElementById('spot_card_' + id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='allSpots__container'>
      <SideBar spots={spots} />

      <div className='allSpots__map'>
        <Map spots={spots} handlePinClick={handlePinClick} />
      </div>

    </div>
  );
}