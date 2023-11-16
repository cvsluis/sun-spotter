import React from 'react';
import '../styles/SpotCard.scss';
import image from '../assets/1.jpg'

export default function SpotCard({ spot }) {
  return (
    <div className='spotCard__container'>
      <div className='spotCard__image'>
        <img src={image} />
      </div>
      <div className='spotCard__details'>
        <div className='spotCard__header'>
          <h2>{spot.name}</h2>
          <h4>* {spot.average_rating} <span>(15)</span></h4>
        </div>
        <h3>{spot.city}, {spot.province}</h3>
        <h3>Label, Label, Label, Label</h3>
      </div>
    </div>
  );
}