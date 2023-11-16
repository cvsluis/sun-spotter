import React from 'react';
import '../styles/AboutSpot.scss'

export default function AboutSpot(props) {
  return (
    <div className='about-spot'>
      <div className='about-spot__info'>
        <h1>{props.name}</h1>
        <div>{props.city}, {props.province}</div>
        <div>implement rating here</div>
      </div>
      <div className='about-spot__labels'>
        put tags here
      </div>
    </div>
  );
};