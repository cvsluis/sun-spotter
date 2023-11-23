import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ViewToggle from "./ViewToggle";

import '../styles/UserSpots.scss';

export default function UserSpots() {

  const userID = useParams().id;
  const [ userVisits, setUserVisits ] = useState([]);
  
  //view toggle
  const [ view, setView ] = useState('visits');
    

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUserVisits(data)
      })
      .catch(err => console.log('Error fetching data: ', err));
  }, []);

  //which spots view is being displayed?

  return (
    <div className="user-spots__container">
      <header className="user-spots__header">
        <span className="user-spots__category">
          { view === 'map' && <h2>Saves and Favourites</h2> }
          { view === 'saves' && <h2>My Saved Spots</h2> }
          { view === 'visits' && <h2>My Visited Spots</h2>}
        </span>

        <ViewToggle view={view} setView={setView}/>
      </header>

      {view === 'visits' && 
      <div className="user-spots__visits">
        user visits
      </div>
      }
    </div>
  );
};

