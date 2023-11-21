import React, { useState } from "react";

export default function useSaved() {
  const[ isSaved, setIsSaved ] = useState(false);
  
  const toggleSaved = function() {
    setIsSaved(!isSaved);
  }

  return [isSaved, toggleSaved];
}