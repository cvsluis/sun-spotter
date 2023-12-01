import React, { useState } from 'react';

import '../styles/ViewToggle.scss';

export default function({ view, setView }) {

  const [animation, setAnimation] = useState('');

  const getSwitchAnimation = (value) => {
    if (value === "saved" && view === "map") {
      setAnimation("map-to-saved");
    } else if (value === "visits" && view === "saved") {
      setAnimation("saved-to-visits");
    } else if (value === "saved" && view === "visits") {
      setAnimation("visits-to-saved");
    } else if (value === "map" && view === "saved") {
      setAnimation("saved-to-map");
    } else if (value === "visits" && view === "map") {
      setAnimation("map-to-visits");
    } else if (value === "map" && view === "visits") {
      setAnimation("visits-to-map");
    }
    setView(value);
  };

  return (
      <div className="view-toggle">
        <div className={`switch ${animation} ${view}-position`}></div>
        <input
          onChange={(e) => getSwitchAnimation(e.target.value)}
          name="profile-toggle"
          id="map"
          type="radio"
          value="map"
        />
        <label className={`map-label ${view === "map"}`} htmlFor="map" >
          <h4>Map</h4>
        </label>

        <input
          onChange={(e) => getSwitchAnimation(e.target.value)}
          name="profile-toggle"
          id="saved"
          type="radio"
          value="saved"
        />
        <label className={`saved-label ${view === "saved"}`} htmlFor="saved">
          <h4>Saved</h4>
        </label>

        <input
          defaultChecked
          onChange={(e) => getSwitchAnimation(e.target.value)}
          name="profile-toggle"
          id="visits"
          type="radio"
          value="visits"
        />
        <label className={`visits-label ${view === "visits"}`} htmlFor="visits">
          <h4>Visits</h4>
        </label>
      </div>
  );
}