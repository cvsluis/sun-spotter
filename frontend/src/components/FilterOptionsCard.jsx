import React, { useEffect, useState }from "react";
import '../styles/FilterOptionsCard.scss';
import filterSpots from '../utils/filterSpots';

export default function FilterOptionsCard({ spots, setSpots, labels, setLabels, allSpots }) {

  // const [ isFirstRender, setIsFirstRender ] = useState(true);
  // const [allSpots, setAllSpots ] =useState([]);
  // //

  console.log(allSpots)
  
  //static variable as there is no way to modify db labels as of right now
  const filterOptions = ['Wheelchair access', 'Hike required', 'No hike required', 'Car Pull Out', 'Bird Watching', 'Seating Available', 'Kid Friendly', 'Dog Friendly', 'Dogs on Leash', 'Ocean', 'Forest', 'Mountains', 'City', 'Waterfall', 'Lake', 'Wildflowers', 'Wildlife', 'Windy'];

  //handle checkmark click
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

  //handle clear button click
  const handleClearClick = function() {
    setSpots(allSpots);
    setLabels([]);
  }

  useEffect(() => {
    // //if firstRender, do not filter spots and save list of all spots
    // if (isFirstRender) {   
    //   setIsFirstRender(false);
    //   setAllSpots(spots);
    //   return;
    // }
    filterSpots(allSpots, setSpots, labels);
  }, [labels]);

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