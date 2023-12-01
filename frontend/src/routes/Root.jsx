import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

import parseCookie from "../utils/parseCookie";

export default function Root () {
  const navigate = useNavigate();

  let userIDState = undefined;

  if(document.cookie) {
    const parsedCookie = parseCookie(document.cookie);
    userIDState =  Number(parsedCookie.user_id);
  }

  const [ userID, setUserID ] = useState(userIDState);

  // search input state to track across home page and all spots page
  const [searchInput, setSearchInput] = useState('');

  // redirect root page to home after initial render
  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <div>
      <TopNavBar context={{userID, setUserID}}/>
    
      <main>
        <Outlet context={{userID, setUserID, searchInput, setSearchInput}} />
      </main>
    </div>
  );
}
