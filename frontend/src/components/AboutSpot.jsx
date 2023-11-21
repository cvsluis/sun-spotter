import React from 'react';
import '../styles/AboutSpot.scss'

export default function AboutSpot({spotData, spotLabels, spotRating}) {

  //how many stars to display
  const starNumber = Math.floor(Number(spotRating));

  return (
    <div className='about-spot'>

      {/* Spot info */}
      <div className='about-spot__info'>
        <h1 className='about-spot__name'>{spotData.name}</h1>
        <div>{spotData.city}, {spotData.province}</div>
      </div>

      {/* rating - currently does not handle decimal ratings for star display */}
      <div className='about-spot__rating'>
        <h2>{spotRating}{[...Array(starNumber)].map(() => '*')}</h2>
      </div>

      {/* Spot labels */}
      <div className='about-spot__labels'>  

        {spotLabels.length > 0 && spotLabels.map((label, i) => (
          //make every second label pink
          i % 2 === 0 ? 
          <div key={label.id} className="about-spot__label">{label.name} ({label.count})</div> :
          <div key={label.id} className="about-spot__label about-spot__label--pink">{label.name} ({label.count})</div>
        ))}

        {spotLabels.length === 0 && <div className='about-spot__labels'>no labels yet!</div>}
      </div>
    </div>
  );
};