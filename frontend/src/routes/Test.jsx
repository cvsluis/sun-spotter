import React, { useState, useEffect } from 'react';

export default function Test () {
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    fetch('api/labels')
      .then(res => console.log(res))
  }, []);

  return (
    <div>testing api...</div>
  )
};