import React from "react";
import '../styles/FilterOptionsCard.scss';

export default function FilterOptionsCard({ spots, setSpots }) {
  
  //static variable as there is no way to modify db labels as of right now
  const filterOptions = ['Wheelchair access', 'Hike required', 'No hike required', 'Car Pull Out', 'Bird Watching', 'Seating Available', 'Kid Friendly', 'Dog Friendly', 'Dogs on Leash', 'Ocean', 'Forest', 'Mountains', 'City', 'Waterfall', 'Lake', 'Wildflowers', 'Wildlife', 'Windy'];

  const handleOptionChange = function() {

  }
  return (
    <div className="filterOptions">
      <ul className="filterOptions__list">
        {filterOptions.map((option, i) => (
          <li key={i}>
            <input 
              type="checkbox" 
              name="filter" 
              value={option} 
              />
          <label htmlFor="id">{option}</label>
        </li>
        ))}
      </ul>
      <footer>
        <button className="filterOptions__submit">
          Clear
        </button>
      </footer>


    </div>
  );

};