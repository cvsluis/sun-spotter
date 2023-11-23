import React from "react";
import profile from "../assets/profile/janay.jpeg";

import "../styles/UserInfoCard.scss"

export default function UserInfoCard(user) {

  console.log('profile user', user);

  return (
    <div className="user-info__container">
      <img src={profile} alt="profile" className="card__image" />
      <h2 className="card__name">Janay Ma</h2>
      <p className="card__location">Victoria, British Columbia</p>
    </div>
 );
};

