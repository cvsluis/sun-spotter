import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import VisitCard from "./VisitCard";
import ViewToggle from "./ViewToggle";
import '../styles/UserSpots.scss';

export default function UserSpots() {
  
  const userID = useParams().id;

  //visit data
  const [ userVisits, setUserVisits ] = useState([]);
  
  //view toggle
  const [ view, setView ] = useState('visits');
    
  //fetch visits
  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userID}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setUserVisits(data)
      })
      .catch(err => console.log('Error fetching data: ', err));
  }, []);

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
        saved spots content here
      </div>
      }

      {view === 'map' && 
      <div className="user-spots__map">
        user saved spots here
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

