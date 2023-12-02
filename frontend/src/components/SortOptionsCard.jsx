import React, { useEffect } from "react";
import '../styles/SortOptionsCard.scss'
import sortSpots from '../utils/sortSpots';

export default function SortOptionsCard({ flaggedSpots, setFlaggedSpots, selectedSortOption, setSelectedSortOption, setSpots}) {

  const handleOptionChange = function(event) {
    sortSpots(flaggedSpots, setFlaggedSpots, setSpots, event.target.value)
    setSelectedSortOption(event.target.value)
  };
  
    // set spots to all spots not flagged hidden
  useEffect(() => {
    const filteredSpots = flaggedSpots.filter((flaggedSpot) => (flaggedSpot.isHidden ? false : true))
    setSpots(filteredSpots.map(flaggedSpot => flaggedSpot.spot));
  }, [flaggedSpots]);

  return (
    <ul className="sortOptions">
      <li>
        <input type="radio" name="sort" value="id" checked={selectedSortOption === 'id'} onChange={handleOptionChange}/>
        <label htmlFor="id">Most Recent</label>
      </li>

      <li>
        <input type="radio" name="sort" value="rating_count" checked={selectedSortOption === 'rating_count'} onChange={handleOptionChange}/>
        <label htmlFor="rating_count">Most Visited</label>
      </li>

      <li>
        <input type="radio" name="sort" value="rating" checked={selectedSortOption === 'rating'} onChange={handleOptionChange}/>
        <label htmlFor="rating">Rating</label>
      </li>
    </ul>
  )
}