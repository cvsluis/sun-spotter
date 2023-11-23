import React from "react";

import "../styles/UserInfoCard.scss"

export default function UserInfoCard({user}) {
  
  if (!user) {
    return null;
  }

  const {first_name, last_name, profile_pic, city, province, country} = user;
    

  return (
    <div className="user-info__container">
      <img src={`http://localhost:8080/${profile_pic}`} alt="profile" className="card__image" />
      <h2 className="card__name">{first_name} {last_name}</h2>
      <p className="card__location">{city}, {province}</p>
      <p className='card__location'>{country}</p>
    </div>
 );
};

