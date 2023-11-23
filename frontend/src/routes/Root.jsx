import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import Cookies from 'js-cookie';
import React from "react";


export default function Root () {

  const [ userID, setUserID ] = useState(undefined);
  
  //is there a cookie?
  // const id = Cookies.get('user_id');
  // console.log("current user", userID)
  // setUserID(userID);

  return (
    <div>
      <TopNavBar />
    
      <main>
        <Outlet context={[userID, setUserID]}/>
      </main>
    </div>
  );
}
