import React, { useEffect, useState } from 'react';
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const [ spotData, setSpotData ] = useState([]);
  const [ spotLabels, setSpotLabels ] = useState();
    
  useEffect(() => {
    fetch('http://localhost:8080/api/spots/5')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpotData(data[0]);
      })
      .catch(error => console.error('Error fetching spot data:', error));

    fetch('http://localhost:8080/api/spots/5/labels')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Here is your data: ", data)
      })
      .catch(error => console.error('Error fetching labels data:', error));
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