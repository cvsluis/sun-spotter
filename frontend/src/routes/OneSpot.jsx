import React, { useEffect, useState } from 'react';
import SpotInfo from '../components/SpotInfo';

export default function OneSpot () {

  const [ spotInfo, setSpotInfo ] = useState([]);

    
  useEffect(() => {
    fetch('http://localhost:8080/api/spots/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSpotInfo(data[0]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // //check spotInfo
  // useEffect(() => {
  //   console.log(spotInfo);
  // }, [spotInfo]);

  return (
    <div className='one-spot'>
      <h1>Spot Information</h1>
      <p><strong>Name:</strong> {spotInfo.name}</p>
      <p><strong>City:</strong> {spotInfo.city}</p>
      <p><strong>Province:</strong> {spotInfo.province}</p>

      <SpotInfo /> 
    </div>
  );
}