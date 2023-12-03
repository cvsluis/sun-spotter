import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import React from "react";

import parseCookie from "../utils/parseCookie";

export default function Root() {
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

  return (
    <div>
      <TopNavBar
        context={[userID, setUserID]}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />

      <main>
        <Outlet context={[userID, setUserID]} darkMode={darkMode} />
      </main>
    </div>
  );
}
