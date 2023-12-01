import React, { useEffect, useState }from "react";
import '../styles/FilterOptionsCard.scss';
import filterSpots from '../utils/filterSpots';

export default function FilterOptionsCard({ flaggedSpots, setFlaggedSpots, setSpots, spotsList, labels, setLabels}) {

  
  //static variable as there is no way to modify db labels as of right now
  const filterOptions = ['Wheelchair access', 'Hike required', 'No hike required', 'Car Pull Out', 'Bird Watching', 'Seating Available', 'Kid Friendly', 'Dog Friendly', 'Dogs on Leash', 'Ocean', 'Forest', 'Mountains', 'City', 'Waterfall', 'Lake', 'Wildflowers', 'Wildlife', 'Windy'];

  //controls label click
  const handleOptionChange = function(event) {
    const value = event.target.value;

    if (Object.values(labels).includes(event.target.value)) {
      let newLabels = [...labels]
      newLabels = newLabels.filter(item => item !== value);
      setLabels(prev => {
        //console.log("removing label from ", prev);
        return newLabels;
      })
    } else {
      const newLabels = [...labels, value]
      setLabels(prev => {
        //console.log("adding label to ", prev)
        return newLabels;
      } )
    }
  }


  const handleClearClick = function() {
    console.log('clearing')
    let clearedSpots = [...flaggedSpots];
    clearedSpots = clearedSpots.map(flaggedSpot => ({...flaggedSpot, isHidden: false}));
    setFlaggedSpots(clearedSpots);
    setLabels([]);
  }

  //trigger spot filter with every label change
  useEffect(() => {
    console.log('filtering spots ', flaggedSpots, 'with the following labels: ', labels);
    filterSpots(flaggedSpots, setFlaggedSpots, labels);
  }, [labels]);

  //setSpots to only those not hidden after filtering
  useEffect(() => {
    console.log('in setting use effect. flagged spots are: ', flaggedSpots)
    const filteredSpots = flaggedSpots.filter((flaggedSpot) => (flaggedSpot.isHidden ? false : true) )
    console.log('setting spots to', filteredSpots);
    setSpots(filteredSpots.map(flaggedSpot => flaggedSpot.spot))
  }, [flaggedSpots])

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