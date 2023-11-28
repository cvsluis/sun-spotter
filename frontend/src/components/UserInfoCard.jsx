import React from "react";

import "../styles/UserInfoCard.scss";

export default function UserInfoCard({ user }) {
  if (!user) {
    return null;
  }

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
          <p>18 Followers</p>
          <p>2 Stats</p>
          <p>Lists 18</p>
          <p>Following 0</p>
        </div>
      </div>

  );
}
