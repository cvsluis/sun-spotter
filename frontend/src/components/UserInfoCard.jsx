import React from "react";
import useUserStats from "../hooks/useUserStats";
import "../styles/UserInfoCard.scss";

export default function UserInfoCard({ user, userID }) {
  const [totalSaves, totalVisits] = useUserStats(userID);

  if (!user) {
    return null;
  }
  
  const { first_name, last_name, profile_pic, city, province, country } = user;

  return (
    <div className="user-info__container">
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
