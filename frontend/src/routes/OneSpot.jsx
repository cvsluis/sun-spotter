import React, { useEffect } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';

//import hooks
import useSpotData from '../hooks/useSpotData';
import useSaved from '../hooks/useSaved';
import useWeather from '../hooks/useWeather';

//import components
import OneSpotMap from '../components/OneSpotMap';
import VisitCard from '../components/VisitCard';
import WeatherBar from '../components/WeatherBar';
import Label from '../components/Label';

// import svgs
import Compass from '../assets/svg/Compass';
import Add from '../assets/svg/Add';
import SaveEmpty from '../assets/svg/SaveEmpty';
import SaveFilled from '../assets/svg/SaveFilled';
import ArrowLeft from '../assets/svg/ArrowLeft';
import pin from '../assets/sun-pin.png';

//import styles 
import '../styles/OneSpot.scss';


export default function OneSpot() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  //get userID and spotID. if not logged in, userID is undefined
  const [userID] = useOutletContext();
  const spotID = useParams().id;

  //handle user saves
  const [saveID, handleSaveClick] = useSaved(userID, spotID);

  //get spot information
  const [spotInfo, spotLabels, spotRating, spotVisits] = useSpotData(spotID);

  //get weather info
  const weather = useWeather();

  const lat = Number(spotInfo.lat);
  const lng = Number(spotInfo.lng);

  //how many stars to display
  const starNumber = Math.floor(Number(spotRating));
  const needsPartialStar = starNumber - Number(spotRating) !== 0;

  const labelList = spotLabels.map(label => {
    return <Label key={'one-visit_' + label.id} active={true} label={label} lightorange={true} labelCount={label.count} />;
  });

  let backgroundUrl = 'http://localhost:8080/';
  const comments = [];

  if (spotVisits.length > 0) {
    backgroundUrl += spotVisits[0].image_url;

    for (let i = 0; i < spotVisits.length; i++) {
      if (i === 3) {
        break;
      } else {
        comments[i] = {};
        comments[i].description = spotVisits[i].description;
        comments[i].first_name = spotVisits[i].first_name;
      }
    }
  }

  const commentsList = comments.map((comment, index) => {
    return (<p key={'comment_' + index}>"{comment.description}" - {comment.first_name}</p>);
  });

  return (
    <div className='one-spot'>
      <button onClick={() => navigate(-1)} className='button-navigate'>
        <ArrowLeft sixe={'32px'} />
      </button>
      <div className='one-spot__header' style={{ "--one-spot-img": `url(${backgroundUrl})` }} >
        <div className='one-spot__title-container'>
          <img src={pin} className='one-spot__pin' />
          <div>
            <h1>{spotInfo.name}</h1>
            <h2>{spotInfo.city}, {spotInfo.province}, {spotInfo.country}</h2>
          </div>
        </div>

        <div className='one-spot__button-container'>
          <Link className='one-spot__button' target='_blank' to={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}>
            <Compass />
            Directions
          </Link>

          {userID &&
            <>
              <Link className='one-spot__button' to={`/spots/${spotID}/visits/new`}>
                <Add />
                Add Visit
              </Link>

              <button className='one-spot__button' onClick={(event) => { handleSaveClick(event, userID, spotID); }}>
                {saveID ? <SaveFilled /> : <SaveEmpty />}
                {saveID ? 'Spot Saved' : 'Save Spot'}
              </button>
            </>}
        </div>

      </div>

      <div className='one-spot__details--container'>
        <div className='one-spot__details'>
          <div className='one-spot__about-spot'>
            <h2>About This Spot</h2>

            <div className='about-spot__rating'>
              <h2>{spotRating}</h2>
              <div className='about-spot__stars'>
                {/* display all whole stars */}
                {[...Array(starNumber)].map(() => (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-star-fill about-spot__star"} viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ))}
                {/* display partial star if needed */}
                {needsPartialStar &&
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={"bi bi-star-half about-spot__star"} viewBox="0 0 16 16">
                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
                  </svg>
                }
              </div>
            </div>

            <div className='one-spot__labels'>
              {labelList}
            </div>

          </div>

          <div className='one-spot__comments--container'>
            <h2>Visitors Recently Said</h2>
            {commentsList}
          </div>

        </div>
        <div className='one-spot__map'>
          <OneSpotMap lng={spotInfo.lng} lat={spotInfo.lat} />
        </div>
      </div>

      <WeatherBar {...weather} />

      <div className='one-spot__visits--container'>
        <h2>Visits</h2>
        <div className="one-spot__visits">
          {spotVisits.length > 0 && spotVisits.map(visit => <VisitCard visit={visit} isProfilePage={false} key={visit.id} />)}
        </div>
      </div>

    </div>
  );
}
