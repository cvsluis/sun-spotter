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

  // search input state to track across home page and all spots page
  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <TopNavBar context={{userID, setUserID}}/>
    
      <main>
        <Outlet context={{userID, setUserID, searchInput, setSearchInput}} />
      </main>
    </div>
  );
}
