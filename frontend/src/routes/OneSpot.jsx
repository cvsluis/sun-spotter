import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

//import hooks
import useSpotData from '../hooks/useSpotData';
import useWeather from '../hooks/useWeather';

//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';
import VisitCard from '../components/VisitCard';
import WeatherBar from '../components/WeatherBar';
//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const spotID = useParams().id;
  const [ spotInfo, spotLabels, spotRating, spotVisits ] = useSpotData(spotID);

  const weather = useWeather();
  if(weather.sunsetTime) {
    console.log('the weather is: ', weather);
  }

  
  return (
    <div className='one-spot'>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotInfo.lng} lat={spotInfo.lat} />
        <div>
          <AboutSpot spotData={spotInfo} spotLabels={spotLabels} spotRating={spotRating}/> 
          <Link className={'one-spot__create-visit'} to="/">Add Visit</Link>
        </div>
      </header>

      <WeatherBar {...weather} />


      <div className="one-spot__visits">
        {spotVisits.length > 0 && spotVisits.map(visit => <VisitCard visit={visit} key={visit.id}/>)}
      </div>
    </div>
  );
}
