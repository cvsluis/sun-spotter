import React from 'react';
import SpotCard from './SpotCard';
import '../styles/SideBar.scss';

export default function SideBar({ spots }) {

  const spotsList = spots.map((spot) => {
    return <SpotCard spot={spot}/>
  });

  return (
    <div className='sideBar__container'>
      {spotsList}
    </div>
  );
}