import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

import parseCookie from "../utils/parseCookie";

export default function Root () {
  const navigate = useNavigate();

  let userIDState = undefined;

  if (document.cookie) {
    const parsedCookie = parseCookie(document.cookie);
    userIDState = Number(parsedCookie.user_id);
  }

  const [userID, setUserID] = useState(userIDState);
  const [darkMode, setDarkMode] = useState(false);

  const dark = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setDarkMode(true);
  };

  const light = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setDarkMode(false);
  };

  const toggleTheme = (e) => {
    if (e.target.checked) dark();
    else light();
  };

  // search input state to track across home page and all spots page
  const [searchInput, setSearchInput] = useState('');

  return (
    <div>
      <TopNavBar
        context={{userID, setUserID}}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />

      <main>
        <Outlet context={{userID, setUserID, searchInput, setSearchInput}} />
      </main>
    </div>
  );
}
