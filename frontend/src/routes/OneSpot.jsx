import React, { useEffect, useState } from 'react';
import AboutSpot from '../components/AboutSpot';

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
        console.log(data[0])
        setSpotData(data[0]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // //check spotInfo
  // useEffect(() => {
  //   console.log(spotInfo);
  // }, [spotInfo]);

  return (
    <div className='one-spot'>
      {/* <h1>Spot Information</h1>
      <p><strong>Name:</strong> {spotData.name}</p>
      <p><strong>City:</strong> {spotData.city}</p>
      <p><strong>Province:</strong> {spotData.province}</p> */}

      <AboutSpot {...spotData}/> 
    </div>
  );
}