import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import SideBar from '../components/SideBar';

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

  return (
    <>
    <div style={{width: '100%', height:'64px', backgroundColor: '#ddd'}}></div>
      <SideBar spots={spots}/>
      <Map spots={spots}/>
    </>
  );
}