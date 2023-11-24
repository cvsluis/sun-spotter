import React, { useState, useEffect } from "react";

//checks if spot is saved
//handles toggling og save button 
export default function useSaved(userID, spotID) {

  console.log('in useSaved: ', userID, spotID);
  //set isSaved stated.
  const[ isSaved, setIsSaved ] = useState(false);

  //check if save exists
  useEffect(() => {
    fetch(`http://localhost:8080/api/saves/checkSave`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ userID: 2, spotID:spotID })
    })
    .then((res => res.json()))
    .then(data => {
      //data.exists <=> save exists! setSaved to true.
      if (data.exists) {
        setIsSaved(true);
      }
      console.log(data)
    })
    .catch(err => console.log("Error: ", err))
  }, [])
  

  
  // add save
  const addSave = async (userID, spotID) => {
    console.log('adding save')
    
    console.log("save button clicked!")
    try {
      await fetch('http://localhost:8080/api/saves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: 2, spotID: 5 })
      });
      
      console.log('save added!')
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  };
  
  const removeSave = () => {
    console.log("removing save(implement mee!");
  }
  
  
  // //will need to handle posts to saves once user auth is implemented
  const handleSaveClick = function(event, userID, spotID) {
    event.preventDefault();

    if (isSaved) {
      addSave(userID, spotID);
    } else {
      removeSave();
    }
    setIsSaved(!isSaved);
  }


  return [isSaved, handleSaveClick];
}