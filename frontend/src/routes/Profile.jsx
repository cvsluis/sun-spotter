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
      <UserInfoCard />
      <UserSpots />
    </div>
  );
};