import React from 'react';
import '../styles/AllSpotsSearch.scss';
import sortSpots from '../utils/sortSpots';

export default function AllSpotsSearch({ searchInput, handleSearchInputChange, spots }) {
  return (
    <div className='allSpotsSearch__container'>
      <div className='allSpotsSearch__input'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search allSpotsSearch__icon" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input placeholder='Search location' autoComplete='off' value={searchInput} onChange={handleSearchInputChange} onKeyUp={handleSearchInputChange} />
      </div>
      {/* to be implemented */}
      <div className='allspots-dropdown'>
        <button id='allspots-btn-filter' className='allSpots-btn-grey'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" class="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
          </svg>
          Filter
        </button>
      </div>
      <div className='allspots-dropdown'>
        <button id='allspots-btn-sort' className='allSpots-btn-grey'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
          </svg>
          Sort
        </button>
      <ul>
        <button onClick={() => sortSpots(spots, 'rating')}>Top Rated</button>
        <button onClick={() => sortSpots(spots, 'rating_count')}>Most Popular</button>
        <button onClick={() => sortSpots(spots, 'id')}>Recently added</button>
      </ul>
      </div>
      {/* <button id='allspots-btn-clear' className='allSpots-btn-grey'>Clear All Filters</button> */}
    </div>
  );
};