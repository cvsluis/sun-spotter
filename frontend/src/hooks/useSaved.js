import React, { useState } from "react";

export default function useSaved() {
  const[ isSaved, setIsSaved ] = useState(false);
  

  //will need to handle posts to saves once user auth is implemented
  const toggleSaved = function() {
    setIsSaved(!isSaved);
  }

  return [isSaved, toggleSaved];
}