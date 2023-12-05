import React, { useState, useEffect, useRef } from 'react';
import '../styles/AllSpotsSearch.scss';

import useSearchOptions from '../hooks/useSearchOptions';
import SortOptionsCard from './SortOptionsCard';
import FilterOptionsCard from './FilterOptionsCard';

export default function AllSpotsSearch({ searchInput, handleSearchInputChange, spots, setSpots, clearHomeSearchInput }) {

  const [isSearchMenu, isFilterMenu, toggleSearchOptionMenu, useOutsideClick ] = useSearchOptions();

  //state for which filter labels are clicked
  const [ labels, setLabels ] = useState([]);
  //state for sorting type
  const [ selectedSortOption, setSelectedSortOption ] = useState('id');

  //create spots array with flag for visibility
  const [ flaggedSpots, setFlaggedSpots ] = useState([]);
  useEffect(() => {
    //if has not yet been initialized
    if (flaggedSpots.length === 0) {
      //map into array of spots with hidden flag
      const newFlaggedSpots = spots.map(spot => ({spot, isHidden: false}))
      //initialize new Flagged spots array
      setFlaggedSpots(newFlaggedSpots);
    }
  }, [spots]);


  const filterRef = useRef(null);
  const searchRef = useRef(null);
  useOutsideClick(filterRef, 'filter');
  useOutsideClick(searchRef, 'search');

  return (
    <div className='allSpotsSearch__container'>
      <div className='allSpotsSearch__input'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search allSpotsSearch__icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        { searchInput !== '' &&
        <svg onClick={clearHomeSearchInput} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill allSpotsSearch__delete" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
        </svg> }
        <input placeholder='Search location' autoComplete='off' value={searchInput} onChange={handleSearchInputChange} onKeyUp={handleSearchInputChange} />
      </div>

      <div className='allSpots__searchOption'>
        <button id='allspots-btn-filter' className={ isFilterMenu ? 'allSpots-btn-grey allSpots-btn--pressed' : 'allSpots-btn-grey'} onClick={() => toggleSearchOptionMenu('filter')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
          </svg>
          Filter
        </button>
        <div ref={filterRef}>
          {isFilterMenu && <FilterOptionsCard
            flaggedSpots={flaggedSpots}
            setFlaggedSpots={setFlaggedSpots}
            setSpots={setSpots}
            labels={labels}
            setLabels={setLabels} />}
        </div>
        
      </div>
      <div className='allSpots__searchOption'>
        <button id='allspots-btn-sort' className={ isSearchMenu ? 'allSpots-btn-grey allSpots-btn--pressed' : 'allSpots-btn-grey'} onClick={() => toggleSearchOptionMenu('sort')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
          </svg>
          Sort
        </button>
        <div ref={searchRef}>
          {isSearchMenu && <SortOptionsCard
            flaggedSpots={flaggedSpots}
            setFlaggedSpots={setFlaggedSpots}
            selectedSortOption={selectedSortOption}
            setSelectedSortOption={setSelectedSortOption}
            setSpots={setSpots}
          />}
        </div>
      </div>
    </div>

  );
};