import React from 'react';
import Map from './Map';

export default function ChooseSpot({ onMapClick, marker }) {
  return (
    <div>
      <div className='chooseSpot__map-container'>
        <Map spots={marker} borderRadius={true} onMapClick={onMapClick} />
      </div>
    </div>
  );
};