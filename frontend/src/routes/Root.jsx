import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import React from "react";

import parseCookie from "../utils/parseCookie";



export default function Root () {
  let userIDState = undefined;

  if(document.cookie) {
    const parsedCookie = parseCookie(document.cookie);
    userIDState =  Number(parsedCookie.user_id);
  }

  const [ userID, setUserID ] = useState(userIDState);

  return (
    <div>
      <TopNavBar context={[userID, setUserID]}/>
    
      <main>
        <Outlet context={[userID, setUserID]}/>
      </main>
    </div>
  );
}
