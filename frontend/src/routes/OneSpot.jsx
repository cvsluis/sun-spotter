// first let's make sure we can get one spot's data, say with id: 1


import React, { useEffect, useState } from 'react';


export default function OneSpot () {

  //fetch spot data:
  const [ spot, setSpot ] = useState();
  
  //fetch spot data. for now console log result
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
    <>
    <div className="one-spot">
      you are on the one spot page

    </div>

    </>
  );
};