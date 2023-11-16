import React from "react";
import { GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api';


const mapContainerStyle = {
  width: '471px',
  height: '350px',
};


const center = {
  lat: 48.424158647072495,
  lng: -123.41913232109277
};

export default function OneSpotMap (props) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCZ4m4MUuWXxIlkrriyTTQp4f3TRby2yes',
  });

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading maps';

  // const center = {
  //   lat: Number(props.lat),
  //   lng: Number(props.long),
  // };
 

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options = {{fullscreenControl: false}}
      > 
        <MarkerF position={{lat: Number(center.lat), lng: Number(center.lng)}} />
      </GoogleMap>
    
    </>
  );
};