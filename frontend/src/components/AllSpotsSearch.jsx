import React from 'react';
import '../styles/AllSpotsSearch.scss';

export default function AllSpotsSearch({ searchInput, handleSearchInputChange, handleSearchSubmit }) {
  return (
    <div className='allSpotsSearch__container'>
      <input placeholder='Search location' autoComplete='off' value={searchInput} onChange={handleSearchInputChange} onKeyUp={handleSearchInputChange}/>
      {/* to be implemented */}
      {/* <button id='allspots-btn-filter' className='allSpots-btn-grey'>Filter</button>
      <button id='allspots-btn-sort' className='allSpots-btn-grey'>Sort</button>
      <button id='allspots-btn-clear' className='allSpots-btn-grey'>Clear All Filters</button> */}
    </div>
  );
};