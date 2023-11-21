import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//import hooks
import useSpotData from '../hooks/useSpotData';
import useWeather from '../hooks/useWeather';

//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';
import VisitCard from '../components/VisitCard';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const spotID = useParams().id;
  const [ spotInfo, spotLabels, spotRating, spotVisits ] = useSpotData(spotID);

  const weather = useWeather();

  // useEffect(() => {
  //   fetch('https://api.open-meteo.com/v1/forecast?latitude=48.4359&longitude=-123.3516&daily=weather_code,temperature_2m_max,temperature_2m_min,sunset&timezone=America%2FLos_Angeles')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error fetching data:', error));
  // }, []);
  
  return (
    <div className='one-spot'>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotInfo.lng} lat={spotInfo.lat} />
        <div>
          <AboutSpot spotData={spotInfo} spotLabels={spotLabels} spotRating={spotRating}/> 
          <Link className={'one-spot__create-visit'} to="/">Add Visit</Link>
        </div>
      </header>

      <div className="one-spot__visits">
        {spotVisits.length > 0 && spotVisits.map(visit => <VisitCard visit={visit} id={visit.id}/>)}
      </div>
    </div>
  );
}
