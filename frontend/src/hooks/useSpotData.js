import React, { useState, useEffect } from 'react';

export default function useSpotData(spotID) {

  const [ spotData, setSpotData ] = useState({});
  const [ spotLabels, setSpotLabels ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2 ] = await Promise.all([
          fetch(`http://localhost:8080/api/spots/${spotID}`).then(res => res.json()),
          fetch(`http://localhost:8080/api/spots/${spotID}/labels`).then(res => res.json())

        ]);

        console.log(res1, res2)
        setSpotData(res1[0]);
        setSpotLabels(res2);
      } catch(err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  
  return [spotData, spotLabels];
}
