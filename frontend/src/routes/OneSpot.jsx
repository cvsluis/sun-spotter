import React from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';


//import hooks
import useSpotData from '../hooks/useSpotData';
import useSaved from '../hooks/useSaved'
import useWeather from '../hooks/useWeather';

//import components
import AboutSpot from '../components/AboutSpot';
import OneSpotMap from '../components/OneSpotMap';
import VisitCard from '../components/VisitCard';
import WeatherBar from '../components/WeatherBar';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {

  //get userID and spotID. if not logged in, userID is undefined
  const [ userID, setUserID ] = useOutletContext();
  const spotID = useParams().id;

  //handle user saves
  const [ saveID, handleSaveClick ] = useSaved(userID, spotID);

  //get spot information
  const [ spotInfo, spotLabels, spotRating, spotVisits ] = useSpotData(spotID);
  
  //get weather info
  const weather = useWeather();


  return (
    <div className='one-spot'>
          <Link className='one-spot__btn--add-spot' to='/spots'>
            <span className='one-spot__btn--icons'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-map" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </span>
            <span className='one-spot__btn--text slide-right'>Return to Map</span>
          </Link>
      <header className='one-spot__header'>
        <OneSpotMap lng={spotInfo.lng} lat={spotInfo.lat} />
        <div>
          {userID &&
          //if logged in save button works
          <button className='one-spot__save' onClick={(event) => {handleSaveClick(event, userID, spotID)}}>
            {saveID ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#F86204" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg> 
            }
          </button>
          }
          
          <AboutSpot spotData={spotInfo} spotLabels={spotLabels} spotRating={spotRating}/> 

          {userID &&
          <Link className={'one-spot__create-visit'} to={`/spots/${spotID}/visits/new`}>Add Visit</Link>
          }
        </div>
      </header>

      <WeatherBar {...weather} />

      <div className="one-spot__visits">
        {spotVisits.length > 0 && spotVisits.map(visit => <VisitCard visit={visit} isProfilePage={false} key={visit.id}/>)}
      </div>
    </div>
  );
}
