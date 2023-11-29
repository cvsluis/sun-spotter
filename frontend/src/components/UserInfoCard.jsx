import React from "react";
import useUserStats from '../hooks/useUserStats';
import "../styles/UserInfoCard.scss";

export default function UserInfoCard({ user, userID }) {

  const [totalSaves, totalVisits] = useUserStats(userID);

  if (!user) {
    return null;
  }
  console.log(totalSaves, totalVisits);
  const { first_name, last_name, profile_pic, city, province, country } = user;

  return (
    <div class="user-info__container">
      <div class="user-info__picture">
        <img
          src={`http://localhost:8080/${profile_pic}`}
          alt="profile"
          className="card__image"
        />
      </div>
      <div class="card__info">
        <h1>{first_name} {last_name}</h1>
        <p>{city}, {province}</p>
        <p>{country}</p>
        </div>
        <div class="profile-stats">
          <p>{totalSaves} Saved</p>
          <p>{totalVisits} Visited</p>
        </div>
      </div>

  );
}
