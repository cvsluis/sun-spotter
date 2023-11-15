import React from 'react';

export default function AboutSpot(props) {
  return (
    <div className='about-spot'>
      <div className='about-spot__info'>
        <h4>{props.name}</h4>
        <div>{props.city}, {props.province}</div>
        <div>4.5 starssssss</div>
      </div>
      <div className='about-spot__labels'>
        put tags here
      </div>
    </div>
  );
};