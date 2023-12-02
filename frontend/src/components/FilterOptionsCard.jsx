import React, { useEffect } from "react";
import '../styles/FilterOptionsCard.scss';
import filterSpots from '../utils/filterSpots';

export default function FilterOptionsCard({ flaggedSpots, setFlaggedSpots, setSpots, labels, setLabels}) {
  //console.log(flaggedSpots)
  
  //static variable as there is no way to modify db labels as of right now
  const filterOptions = ['Wheelchair access', 'Hike required', 'No hike required', 'Car Pull Out', 'Bird Watching', 'Seating Available', 'Kid Friendly', 'Dog Friendly', 'Dogs on Leash', 'Ocean', 'Forest', 'Mountains', 'City', 'Waterfall', 'Lake', 'Wildflowers', 'Wildlife', 'Windy'].sort();
  
  //controls label click
  const handleOptionChange = function(event) {
    const value = event.target.value;

    if (Object.values(labels).includes(event.target.value)) {
      let newLabels = [...labels]
      newLabels = newLabels.filter(item => item !== value);
      setLabels(prev => {
        return newLabels;
      })
    } else {
      const newLabels = [...labels, value]
      setLabels(prev => {
        return newLabels;
      } )
    }
  }

  const handleClearClick = function() {
    let clearedSpots = [...flaggedSpots];
    //make all hidden flags false
    clearedSpots = clearedSpots.map(flaggedSpot => ({...flaggedSpot, isHidden: false}));
    //reset flagged spots and labels
    setFlaggedSpots(clearedSpots);
    setLabels([]);
  };

  //trigger spot filter with every label change
  useEffect(() => {
    filterSpots(flaggedSpots, setFlaggedSpots, labels);
  }, [labels]);

  // set spots to all spots not flagged hidden
  useEffect(() => {
    console.log('setting spots from sort options')
    const filteredSpots = flaggedSpots.filter((flaggedSpot) => (flaggedSpot.isHidden ? false : true))
    setSpots(filteredSpots.map(flaggedSpot => flaggedSpot.spot));
  }, [flaggedSpots]);

  return (
    <div className="filterOptions">
      <ul className="filterOptions__list">
        {filterOptions.map((option, i) => (
          <li key={i}>
            <input 
              type="checkbox" 
              name="filter" 
              value={option} 
              onChange={handleOptionChange}
              checked={labels.includes(option)}
              />
          <label htmlFor="id">{option}</label>
        </li>
        ))}
      </ul>
      <footer>
        <button className="filterOptions__clear" onClick={handleClearClick}>
          Clear
        </button>
      </footer>


    </div>
  );

};