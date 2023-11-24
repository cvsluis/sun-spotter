import React, { useState, useEffect } from "react";

//checks if spot is saved
//handles toggling og save button 
export default function useSaved() {

  const[ isSaved, setIsSaved ] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/saves/checkSave`, {
      method: "POST",
      headers: 'application/json',
      body: JSON.stringify({ userID, spotID })
    })
    .then((res => res.json()))
    .then(data => console.log(data))
    .catch(err => console.log("Error: ", err))
  })
  

  //will need to handle posts to saves once user auth is implemented
  const toggleSaved = function() {
    setIsSaved(!isSaved);
  }




  return [isSaved, toggleSaved];
}