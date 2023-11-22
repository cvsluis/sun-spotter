import React from "react";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

//import styles
import '../styles/Profile.scss'

export default function Profile() {
  return (
    <div className="profile">
      <UserInfoCard />
      <UserSpots />
    </div>
  );
};