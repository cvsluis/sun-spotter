import React, { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

//import componenets
import UserInfoCard from "../components/UserInfoCard";
import UserSpots from "../components/UserSpots";

//import styles
import "../styles/Profile.scss";

export default function Profile() {
  const { userID, setSearchInput } = useOutletContext();

  const userPageID = parseInt(useParams().id);

  const [user] = useUser(userPageID);

  useEffect(() => {
    setSearchInput('');
  }, []);

  return (
    <div className="profile">
      <UserInfoCard user={user} userID={userPageID}/>
      <UserSpots userID={userID} userPageID={userPageID}/>
    </div>
  );
}
