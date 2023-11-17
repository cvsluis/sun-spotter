import React from 'react';
import '../styles/AboutSpot.scss'
import { Link } from 'react-router-dom'

export default function AboutSpot({spotData, spotLabels}) {


  return (
    <div className='about-spot'>

      {/* Spot info */}
      <div className='about-spot__info'>
        <h1 className='about-spot__name'>{spotData.name}</h1>
        <div>{spotData.city}, {spotData.province}</div>
      </div>

      {/* rating - static until fetch is refactored */}
      <div className='about-spot__rating'>
        <h2>4.0 ****</h2>
      </div>

      {/* Spot labels */}
      <div className='about-spot__labels'>  
        {spotLabels.length > 0 && spotLabels.map((label, i) => {

          // make every second label grey
          if (i % 2 === 0) {
            return <div key={label.id} className="about-spot__label">{label.name} ({label.count})</div>;
          }
          return <div key={label.id} className="about-spot__label about-spot__label--grey">{label.name} ({label.count})</div>;
        })}
        {spotLabels.length === 0 && <div className='about-spot__labels'>no labels yet!</div>}
      </div>
    </div>
  );
};