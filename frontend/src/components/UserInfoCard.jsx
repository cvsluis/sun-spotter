import React from "react";
import useUserStats from "../hooks/useUserStats";
import { useOutletContext } from "react-router-dom";
import "../styles/UserInfoCard.scss";

export default function UserInfoCard({ user, userPageID }) {
  // get logged in user
  const { userID } = useOutletContext();

  const [totalSaves, totalVisits] = useUserStats(userPageID);

  if (!user) {
    return null;
  }
  
  const { first_name, last_name, profile_pic, city, province, country } = user;

  return (
    <div className="user-info__container">
      { user.id === userID && 
      <div className="user-info__edit">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
        </svg>
      </div> }
      <div>
        <img
          src={`http://localhost:8080/${profile_pic}`}
          alt="profile"
          className="user-info__picture"
        />
      </div>
      <div className="user-info__details">
        <h1>
          {first_name} {last_name}
        </h1>
        <div className="user-info__location">
          <p>
            {city}, {province}
          </p>
          <p>{country}</p>
        </div>
      </div>
      <div className="user-info__profile-stats">
        <h2>My Spots</h2>
        <div className="user-info__counts">
        <div className="user-info__saved">
          <p className="user-info__counts-number">
            <strong>{totalSaves}</strong>
          </p>
          <p>Saved</p>
        </div>
        <div className="user-info__visits">
          <p className="user-info__counts-number">
            <strong>{totalVisits}</strong>
          </p>
          <p>Visited</p>
        </div>
        </div>
      </div>
    </div>
  );
}
