import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import ViewToggle from "./ViewToggle";

import '../styles/UserSpots.scss';

export default function UserSpots() {

  const userID = useParams();
  const [ userVisits, setUserVisits ] = useState();

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userID}`)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log('Error fetching data: ', err));

  }, []);

  //which spots view is being displayed?
  const isMapView = false;
  const isSaves = false;
  const isVisits = true;

  return (
    <div className="user-spots__container">
      <header className="user-spots__header">
        <span className="user-spots__category">
          { isMapView && <h2>Saves and Favourites</h2> }
          { isSaves && <h2>My Saved Spots</h2> }
          { isVisits && <h2>My Visited Spots</h2>}
        </span>

        <ViewToggle />
      </header>
    </div>
  );
};

