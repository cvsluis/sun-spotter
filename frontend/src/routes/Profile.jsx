import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

//import styles
import '../styles/Profile.scss'

export default function Profile() {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useOutletContext();

  const findLoggedInUser = () => {

  }

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/users/${user}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setUser(data))
    .catch((error) => console.error('Error fetching data', error))
  };

  const fetchSavedUserSpots = () => {

  }

  const fetchUserVisits = () => {

  }

  return (
    <div className="profile">
      <UserInfoCard />
      <UserSpots />
    </div>
  );
};