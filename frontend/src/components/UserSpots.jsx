import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import useUserPins from "../hooks/useUserPins";
import VisitCard from "./VisitCard";
import SavedSpotCard from './SavedSpotCard';
import ViewToggle from "./ViewToggle";
import Map from "./Map";
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
        <div className="user-spots__category">
          { view === 'map' && <h1>My Spots</h1> }
          { view === 'saved' && <h1>My Saved Spots</h1> }
          { view === 'visits' && <h1>My Visited Spots</h1>}
        </div>

        <div>
        <ViewToggle view={view} setView={setView}/>
        </div>
      </header>

      {/* user spot view changes with toggle */}
      {view === 'saved' && 
      <div className="user-spots__saves">
        {userSaves.map(spot => <SavedSpotCard spot={spot} key={spot.id}/>)}
      </div>
      }

      {view === 'map' && 
      <div className="user-spots__map">
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

