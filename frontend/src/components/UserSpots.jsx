import React from "react";

import ViewToggle from "./ViewToggle";

import '../styles/UserSpots.scss';

export default function UserSpots() {

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

