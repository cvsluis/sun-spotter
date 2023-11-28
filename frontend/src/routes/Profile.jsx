import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Cookies from "js-cookie";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

import useUser from '../hooks/useUser';

//import styles
import "../styles/Profile.scss";

export default function Profile() {
  const [userID, setUserID] = useOutletContext();
  const [user] = useUser(userID);

  useEffect(() => {
    const userIDFromCookie = Cookies.get("user_id");
    setUserID(userIDFromCookie);
  }, []);

  // const fetchUser = () => {
  //   fetch(`http://localhost:8080/api/users/${userID}`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setUser(data[0]))
  //     .catch((error) => console.error("Error fetching data", error));
  // };

  // useEffect(() => {
  //   if (userID) {
  //     fetchUser();
  //   }
  // }, [userID]);

  // const fetchSavedUserSpots = () => {};

  // const fetchUserVisits = () => {};

  return (
    <div className="profile">
      <UserInfoCard user={user}/>
      <UserSpots />
    </div>
  );
}
