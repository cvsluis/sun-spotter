import React from 'react';
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

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCDGmiLZi277Uo_aQFMSG8fX04TiLvbZ3s',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12.5}
        center={center}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};