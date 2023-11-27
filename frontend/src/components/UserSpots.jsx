import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useUserPins from "../hooks/useUserPins";
import VisitCard from "./VisitCard";
import SavedSpotCard from './SavedSpotCard';
import ViewToggle from "./ViewToggle";
import Map from "./Map";

import { ReactComponent as Yellow } from '../assets/pins/yellow.svg';
import { ReactComponent as Purple } from '../assets/pins/purple.svg';
import '../styles/UserSpots.scss';

export default function UserSpots() {
  // for redirect after form submission
  const navigate = useNavigate();

  const handlePinClick = (spotId) => {
    navigate(`/spots/${spotId}`);
  };

  const handleVisitClick = (visitId) => {
    navigate(`/visits/${visitId}`);
  };
  
  const userID = useParams().id;

  // User Visits & Spots Data
  const [userSaves, userVisits] = useUserPins(userID);
  //view toggle
  const [ view, setView ] = useState('visits');

  return (
    <div className="user-spots__container">
      <header className="user-spots__header">
        <span className="user-spots__category">
          { view === 'map' && <h2>My Spots</h2> }
          { view === 'saved' && <h2>My Saved Spots</h2> }
          { view === 'visits' && <h2>My Visited Spots</h2>}
        </span>

        <ViewToggle view={view} setView={setView}/>
      </header>

      {/* user spot view changes with toggle */}
      {view === 'saved' && 
      <div className="user-spots__saves">
        {userSaves.map(spot => <SavedSpotCard spot={spot} key={spot.id}/>)}
      </div>
      }

      {view === 'map' && 
      <div className="user-spots__map">
        <div className="user-spots__legend">
          <div className="user-spots__legend-item"><Yellow /> Saved Spots</div>
          <div className="user-spots__legend-item"><Purple /> Visits</div>
        </div>
        <Map spots={userSaves} spots2={userVisits} borderRadius={true} handlePinClick={handlePinClick} handleVisitClick={handleVisitClick} />
      </div>
      }

      {view === 'visits' &&
      <div className="user-spots__visits">
        {userVisits.map(visit => <VisitCard visit={visit} isProfilePage={true} key={visit.id} />) }
      </div>
      }
    </div>
  );
};

