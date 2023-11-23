import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import React from "react";



export default function Root () {

  const [ userID, setUserID ] = useState(undefined);
  
  return (
    <div>
      <TopNavBar context={[userID, setUserID]}/>
    
      <main>
        <Outlet context={[userID, setUserID]}/>
      </main>
    </div>
  );
}
