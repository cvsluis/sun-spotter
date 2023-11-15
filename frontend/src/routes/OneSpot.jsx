import React, { useEffect, useState } from 'react';

export default function OneSpot () {

  const [ spotInfo, setSpotInfo ] = useState();

    
  useEffect(() => {
    fetch('http://localhost:8080/api/spot/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='one-spot'>
      One spot view!!

    </div>
  );
}