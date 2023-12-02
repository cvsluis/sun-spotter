import React, { useState, useEffect } from "react";
import {  useOutletContext } from "react-router-dom";

export default function useAllSpotsData() {
  const { searchInput, setSearchInput } = useOutletContext();

  // all spots state
  const [spots, setSpots] = useState([]);

  const fetchAllSpots = (searchInput) => {
    let url = 'http://localhost:8080/api/spots';

    if (searchInput) {
      url += `?search=${searchInput.trim()}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpots(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    fetchAllSpots(searchInput);
  };

  const handleHomeSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearHomeSearchInput = () => {
    setSearchInput('');
  };

  return { spots, fetchAllSpots, searchInput, handleSearchInputChange, handleHomeSearchInputChange, clearHomeSearchInput };
}