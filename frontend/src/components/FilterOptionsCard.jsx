import React, { useEffect, useState }from "react";
import '../styles/FilterOptionsCard.scss';
import filterSpots from '../utils/filterSpots';

export default function FilterOptionsCard({ spots, setSpots }) {

  const [ isFirstRender, setIsFirstRender ] = useState(true);
  const [allSpots, setAllSpots ] =useState([]);
  
  //static variable as there is no way to modify db labels as of right now
  const filterOptions = ['Wheelchair access', 'Hike required', 'No hike required', 'Car Pull Out', 'Bird Watching', 'Seating Available', 'Kid Friendly', 'Dog Friendly', 'Dogs on Leash', 'Ocean', 'Forest', 'Mountains', 'City', 'Waterfall', 'Lake', 'Wildflowers', 'Wildlife', 'Windy'];
  const [ labels, setLabels ] = useState([]);

  const handleOptionChange = function(event) {
    const value = event.target.value;

    if (Object.values(labels).includes(event.target.value)) {
      let newLabels = [...labels]
      newLabels = newLabels.filter(item => item !== value);
      setLabels(prev => {
        console.log("removing label from ", prev);
        return newLabels;
      })
    } else {
      const newLabels = [...labels, value]
      setLabels(prev => {
        console.log("adding label to ", prev)
        return newLabels;
      } )
    }
  }

  useEffect(() => {
    if (isFirstRender) {   
      console.log(isFirstRender)
      setIsFirstRender(false);
      setAllSpots(spots);
      return;
    }
    console.log('filtering spots');
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
              />
          <label htmlFor="id">{option}</label>
        </li>
        ))}
      </ul>
      <footer>
        <button className="filterOptions__clear">
          Clear
        </button>
      </footer>


    </div>
  );

};