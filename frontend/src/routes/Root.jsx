import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

import parseCookie from "../utils/parseCookie";
import useDarkMode from "../hooks/useDarkMode";

export default function Root () {
  let userIDState = undefined;

  if (document.cookie) {
    const parsedCookie = parseCookie(document.cookie);
    userIDState = Number(parsedCookie.user_id);
  }

  const [userID, setUserID] = useState(userIDState);

  // search input state to track across home page and all spots page
  const [searchInput, setSearchInput] = useState('');

  // dark mode state from hook
  const { darkMode, toggleTheme } = useDarkMode();

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
