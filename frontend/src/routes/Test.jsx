import React, { useState, useEffect } from 'react';

export default function Test () {
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/labels')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (

    <div>
      testing api:
      {/* {JSON.stringify(items)} */}
    </div>
  )
};