import React, { useState, useEffect } from "react";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

//import styles
import '../styles/Profile.scss'

export default function Profile() {
  const [user, setUser] = useState({});

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/users/${user.id}`)
    .then((response) => {

    }) 
  }
  return (
    <div className="profile">
      <UserInfoCard className="user-info__container" />
      <UserSpots className="user-spots-visits__container"/>
    </div>
  );
};