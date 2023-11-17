import React from 'react';
import { Link } from "react-router-dom";
import '../styles/SpotCard.scss';

export default function SpotCard({ spot }) {
  const labelList = spot.list.join(', ');

  return (
    <Link to={`/spots/${spot.id}`} className='spotCard__container'>
      <div className='spotCard__image'>
        <img src={`http://localhost:8080/${spot.image_url}`} />
      </div>
      <div className='spotCard__details'>
        <div className='spotCard__header'>
          <h2>{spot.name}</h2>
          <h5>* {spot.rating} <span>({spot.rating_count})</span></h5>
        </div>
        <h3>{spot.city}, {spot.province}</h3>
        <h4>{labelList}</h4>
      </div>
    </Link>
  );
}