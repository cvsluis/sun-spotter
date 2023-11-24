import React, { useState, useEffect } from "react";

//checks if spot is saved
//handles toggling og save button 
export default function useSaved(userID, spotID) {

  //console.log('in useSaved: ', userID, spotID);
  //set isSaved stated.
  const[ saveID, setSaveID ] = useState(undefined);

  //check if save exists if user is logged in;
  useEffect(() => {
    //post to the checking endpoint
    //if user is logged in, check 
    if(userID){
      //console.log(userID)
      fetch(`http://localhost:8080/api/saves/checkSave`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ userID: userID, spotID:spotID })
      })
      .then(res => res.json())
      .then(data => {
        //data.exists <=> save exists! setSaved to true.
        if (data.id) {
          // console.log("setting save ID as: ", data.id)
          setSaveID(data.id);
        }
        console.log(data)
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
      console.log("adding id and Setting save ID to: ", data.id)
      setSaveID(data.id);

    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  
  };
  
  const removeSave = async () => {
    
    try {
      console.log("about to fetch")
      await fetch(`http://localhost:8080/api/saves/${saveID}`, { method: 'DELETE'});
      
      console.log("deleting id and setting saveID to undefined")
      setSaveID(undefined);

    } catch (error) {
      console.error("Error: ", error);
    }
  };
  
  const handleSaveClick = function(event, userID, spotID) {
    event.preventDefault();
    console.log("handle save clicked. Save id is: ", saveID);


    if (!saveID) {
      addSave(userID, spotID);
    } else {
      console.log('in handle save, removing save')
      removeSave();
    }
  }


  return [saveID, handleSaveClick];
}