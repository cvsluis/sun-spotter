import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useSpotData from '../hooks/useSpotData';


//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const spotID = useParams().id;
  //console.log(spotID);

  const [ spotData, spotLabels, spotRating ] = useSpotData(spotID);
  
  return (
    <div className='one-spot'>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotData.lng} lat={spotData.lat} />
        <div>
          <AboutSpot spotData={spotData} spotLabels={spotLabels} spotRating={spotRating}/> 
          <Link className={'one-spot__create-visit'} to="/">Add Visit</Link>
        </div>
      </header>
    </div>
  );
}
