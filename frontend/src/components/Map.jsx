import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '800px',
  height: '600px',
  margin: '0 auto'
};

// default location set to Victoria
const center = {
  lat: 48.444689,
  lng: -123.331720,
};

export default function Map({spots}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCZ4m4MUuWXxIlkrriyTTQp4f3TRby2yes',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  // for each spot, create marker component
  const markerList = spots.map(spot => {
    return (
      <MarkerF key={spot.id} position={{lat: Number(spot.lat), lng: Number(spot.lng)}} />
    );
  });

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12.5}
        center={center}
        options={{fullscreenControl: false}}
      >
        {markerList}
      </GoogleMap>
    </div>
  );
};