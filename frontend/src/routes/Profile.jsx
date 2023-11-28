import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import useUser from "../hooks/useUser";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

//import styles
import "../styles/Profile.scss";

export default function Profile() {
  const [userID, setUserID] = useOutletContext();

  const userPageID = useParams().id;

  const [user] = useUser(userID);

  useEffect(() => {
    const userIDFromCookie = Cookies.get("user_id");
    setUserID(userIDFromCookie);
  });

  return (
    <div className="profile">
      <UserInfoCard user={user}/>
      <UserSpots userID={userID} userPageID={userPageID}/>
    </div>
  );
}
