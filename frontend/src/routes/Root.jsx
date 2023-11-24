import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import React from "react";

import parseCookie from "../utils/parseCookie";



export default function Root () {
  console.log(document.cookie)
  let userIDState = { user_id: undefined};

  if(document.cookie) {
    console.log('parsing cookie')
    const parsedCookie = parseCookie(document.cookie);
    userIDState = { user_id: Number(parsedCookie.user_id) };
  }
  const [ userID, setUserID ] = useState(userIDState);
  console.log(userID)
  
  
  
  return (
    <div>
      <TopNavBar context={[userID, setUserID]}/>
    
      <main>
        <Outlet context={[userID, setUserID]}/>
      </main>
    </div>
  );
}
