import React, {useState} from "react";
import '../styles/SortOptionsCard.scss'
import sortSpots from '../utils/sortSpots';

export default function SortOptionsCard({ spots, setSpots}) {

  const [ selectedSortOption, setSelectedSortOption ] = useState('id');

  const handleOptionChange = function(event) {
    sortSpots(spots, setSpots, event.target.value)
    setSelectedSortOption(event.target.value)
  }

  


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