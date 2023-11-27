import React from 'react';
import { Link } from "react-router-dom";
import '../styles/SavedSpotCard.scss';

export default function SavedSpotCard({ spot, view }) {

  return (
    <Link to={`/spots/${spot.spot_id}`} className='savedSpotCard__container'>
      <div 
      className='savedSpotCard__image'>
        <img src={`http://localhost:8080/${spot.image_url}`} />
      </div>
      <div className='savedSpotCard__details'>
        <div className='savedSpotCard__header'>
          <h2 className="savedSpotCard__title">{spot.spotname}</h2>
          <h3 className="savedSpotCard__location">{spot.city}, {spot.province}</h3>
        </div>
      </div>
    </Link>
  );
}