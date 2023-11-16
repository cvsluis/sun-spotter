import React from 'react';
import '../styles/SpotCard.scss';

export default function SpotCard({ spot }) {
  const labelList = spot.list.join(', ');

  return (
    <div className='spotCard__container'>
      <div className='spotCard__image'>
        <img src={`http://localhost:8080/${spot.image_url}`} />
      </div>
      <div className='spotCard__details'>
        <div className='spotCard__header'>
          <h2>{spot.name}</h2>
          <h4>* {spot.rating} <span>({spot.rating_count})</span></h4>
        </div>
        <h3>{spot.city}, {spot.province}</h3>
        <h3>{labelList}</h3>
      </div>
    </div>
  );
}