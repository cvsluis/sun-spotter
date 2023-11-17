import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const spotID = useParams().id;

  const [ spotData, setSpotData ] = useState([]);
  const [ spotLabels, setSpotLabels ] = useState([]);
    
  useEffect(() => {
    fetch(`http://localhost:8080/api/spots/${spotID}`)
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

    fetch(`http://localhost:8080/api/spots/${spotID}/labels`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Here is your data: ", data);
        setSpotLabels(data);
      })
      .catch(error => console.error('Error fetching labels data:', error));
  }, []);

  
  return (
    <div className='one-spot'>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotData.lng} lat={spotData.lat} />
        <div>
          <AboutSpot spotData={spotData} spotLabels={spotLabels}/> 
          <Link className={'one-spot__create-visit'} to="/">Add Visit</Link>
        </div>
      </header>
    </div>
  );
}
