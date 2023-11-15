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

export default function Map() {
  // spots for markers state
  const [spots, setSpots] = useState([]);

  // fetch data from backend, set it to spots state
  useEffect(() => {
    fetch('http://localhost:8080/api/spots')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpots(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

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
      >
        {markerList}
      </GoogleMap>
    </div>
  );
};