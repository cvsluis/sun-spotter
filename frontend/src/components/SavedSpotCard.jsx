import React from 'react';
import { Link } from "react-router-dom";
import '../styles/SavedSpotCard.scss';

export default function SpotCard({ spot }) {

  return (
    <Link to={`/spots/${spot.spot_id}`} className='savedSpotCard__container'>
      <div className='savedSpotCard__image'>
        <img src={`http://localhost:8080/${spot.image_url}`} />
      </div>
      <div className='savedSpotCard__details'>
        <div className='savedSpotCard__header'>
          <p className="savedSpotCard__title">{spot.spotname}</p>
          <p className="savedSpotCard__location">{spot.city}, {spot.province}</p>
        </div>
      </div>
    </Link>
  );
}
