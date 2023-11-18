import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];

// default location set to Victoria
const center = {
  lat: 48.444689,
  lng: -123.331720,
};

export default function Map({ spots, handlePinClick, borderRadius, onMapClick }) {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    borderRadius: borderRadius ? '0 24px 24px 0' : '0'
  };

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
      <MarkerF key={spot.id} position={{lat: Number(spot.lat), lng: Number(spot.lng)}} onClick={() => handlePinClick(spot.id)}/>
    );
  });

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
      onClick={onMapClick}
    >
      {markerList}
    </GoogleMap>
  );
};