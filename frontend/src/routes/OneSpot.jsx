import React, { useEffect, useState } from 'react';
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const [ spotData, setSpotData ] = useState([]);
    
  useEffect(() => {
    fetch('http://localhost:8080/api/spots/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpotData(data[0]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className='one-spot'>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotData.lng} lat={spotData.lat} />
        <AboutSpot {...spotData}/> 
      </header>
    </div>
  );
}