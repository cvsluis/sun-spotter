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
      <header className='one-spot__header'>
        <OneSpotMap lng={spotInfo.lng} lat={spotInfo.lat} />
        <div>
          {userID ?
          //if logged in save button works
          <button className='one-spot__save' onClick={(event) => {handleSaveClick(event, userID, spotID)}}>
            {saveID ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#F86204" class="bi bi-bookmark-fill" viewBox="0 0 16 16">
              <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg> 
            }
          </button>
          :
          //if not logged in, button redirects to login
          <Link to='/login' className='one-spot__save'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
            </svg> 
          </Link>
          }
          
          <AboutSpot spotData={spotInfo} spotLabels={spotLabels} spotRating={spotRating}/> 

          {userID ?
          <Link className={'one-spot__create-visit'} to={`/spots/${spotID}/visits/new`}>Add Visit</Link>
          : 
          //redirect to login if not logged in
          <Link className={'one-spot__create-visit'} to={`/Login`}>Add Visit</Link>
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
