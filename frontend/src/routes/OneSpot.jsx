import React from 'react';
import { useParams, Link } from 'react-router-dom';

//import hooks
import useSpotData from '../hooks/useSpotData';

//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';
import VisitCard from '../components/VisitCard';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  const spotID = useParams().id;
  const [ spotInfo, spotLabels, spotRating, spotVisits ] = useSpotData(spotID);
  
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
        {spotVisits.length > 0 && spotVisits.map(visit => <VisitCard visit={visit}/>)}
      </div>
    </div>
  );
}
