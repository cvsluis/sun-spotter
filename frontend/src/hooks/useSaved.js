import React, { useState, useEffect } from "react";

export default function useSaved(userID, spotID) {

  const[ saveID, setSaveID ] = useState(undefined);

  //check if save exists if user is logged in;
  useEffect(() => {
    if(userID){

      fetch(`http://localhost:8080/api/saves/checkSave`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userID: userID, spotID:spotID })
      })
      .then(res => res.json())
      .then(data => {
        //data.exists <=> save exists! setSaved to true.
        if (data.id) {
          setSaveID(data.id);
        }
      })
      .catch(err => console.log("Error: ", err))  
    } 
  }, [])
  

  // add save
  const addSave = async (userID, spotID) => {

    try {
      const res = await fetch('http://localhost:8080/api/saves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID, spotID: spotID })
      });
      
      //wait for response data
      const data = await res.json();
      setSaveID(data.id);

    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  };
  
  const removeSave = async () => {
    
    try {
      await fetch(`http://localhost:8080/api/saves/${saveID}`, { method: 'DELETE'});
      
      setSaveID(undefined);

    } catch (error) {
      console.error("Error: ", error);
    }
  };
  
  const handleSaveClick = function(event, userID, spotID) {
    event.preventDefault();

    if (!saveID) {
      addSave(userID, spotID);
    } else {
      removeSave();
    }
  }

  return [saveID, handleSaveClick];
}