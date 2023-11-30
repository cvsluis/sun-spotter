import React from 'react';
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const libraries = ['places'];

// default location set to Victoria
const center = {
  lat: 48.468211,
  lng: -123.332404
}; 



export default function Map({ spots, spots2, handlePinClick, handleVisitClick, borderRadius, onMapClick }) {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    margin: '0 auto',
    borderRadius: borderRadius ? '24px' : '0'
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

  // for each spot, create yellow marker component
  const markerList = spots.map(spot => {
    return (
      <MarkerF key={'marker_' + spot.id}
        position={{ lat: Number(spot.lat), lng: Number(spot.lng) }}
        onClick={() => handlePinClick(spot.id)}
        icon={{ url: (require('../assets/pins/yellow.svg')).default }} />
    );
  });

  // for each spot, create purple marker component
  const markerList2 = spots2.map(visit => {
    return (
      <MarkerF key={'visit_' + visit.id}
        position={{ lat: Number(visit.lat), lng: Number(visit.lng) }}
        onClick={() => handleVisitClick(visit.id)}
        icon={{ url: (require('../assets/pins/purple.svg')).default }} />
    );
  });

  // join lists together
  const markers = markerList.concat(markerList2);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={{ fullscreenControl: false, streetViewControl: false, mapTypeControl: false }}
      onClick={onMapClick}
    >
      {markers}
    </GoogleMap>
  );
};

Map.defaultProps = {
  handlePinClick: null,
  handleVisitClick: null,
  onMapClick: null,
  borderRadius: false,
  spots2: []
};