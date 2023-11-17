import React from 'react';
import SpotCard from './SpotCard';
import '../styles/SideBar.scss';

export default function SideBar({ spots }) {

  const spotsList = spots.map((spot) => {
    return <SpotCard spot={spot} key={spot.id} />
  });

  return (
    <div className='sideBar__container'>
      {spotsList}
      {spotsList.length == 0 && <p className='sideBar__error'>No search results found</p>}
    </div>
  );
}