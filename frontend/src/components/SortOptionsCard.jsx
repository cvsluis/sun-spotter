import React, {useState} from "react";
import '../styles/SortOptionsCard.scss'

export default function SortOptionsCard({ spots, menuOptions, isCheckbox}) {

  const [ selectedSortOption, setSelectedSortOption ] = useState('id');

  const handleOptionChange = function(event) {
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